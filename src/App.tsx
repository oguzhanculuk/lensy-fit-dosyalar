import React, { useState, useRef } from 'react';
import { Camera, Shirt, Footprints, Wand2, Sparkles, AlertCircle, Loader2, Menu, X, ChevronDown, ArrowLeft, ShieldCheck } from 'lucide-react';
import { ImageUpload, ImageUploadData } from './components/ImageUpload';
import { motion, AnimatePresence } from 'motion/react';

type Language = 'tr' | 'en';
type View = 'home' | 'studio' | 'about' | 'contact' | 'privacy' | 'terms';

const translations = {
  tr: {
    home: 'Anasayfa',
    studio: 'Stüdyo',
    about: 'Nasıl Çalışır?',
    contact: 'İletişim',
    heroBadge: '✨ LensyFit AI 2.0 Açık Beta',
    heroTitle: 'Kendi Fotoğrafında\nYeni Stili Keşfet.',
    heroSubtitle: 'Yapay zeka odaklı sanal kabin deneyimi. Üzerinde nasıl duracağını merak ettiğin kıyafetleri yükle, saniyeler içinde mükemmel uyumu gör.',
    startBtn: 'Stüdyoya Git',
    learnMoreBtn: 'Nasıl Çalışır?',
    title: 'Üzerinde Gör',
    subtitle: 'Kombinlerini oluşturmak için referans fotoğrafını ve kıyafetlerini yükle.',
    step1Title: 'Referans Fotoğraf',
    step1Desc: 'Üzerinizde denemek istediğiniz kıyafetleri görebilmemiz için tam boy, iyi ışıklandırılmış bir fotoğrafınızı yükleyin.',
    step2Title: 'Dolabınızı Oluşturun',
    step2Desc: 'Giyinmek istediğiniz parçaları ekleyin. Yeni stilinizi oluşturmak için en az bir kıyafet yüklemeniz yeterlidir.',
    urPhoto: 'Senin Fotoğrafın',
    top: 'Üst Giyim',
    bottom: 'Alt Giyim',
    shoes: 'Ayakkabı',
    generating: 'Hazırlanıyor',
    emptyResult: 'Referans fotoğrafları yükleyip\n"Kombini Oluştur" butonuna tıkla.',
    generateBtn: 'Kombini Oluştur',
    generatingBtn: 'Oluşturuluyor...',
    credit: 'Kalan Kredi:',
    errPerson: 'Lütfen önce kendi fotoğrafınızı yükleyin.',
    errClothes: 'Lütfen en az bir kıyafet yükleyin (üst, alt veya ayakkabı).',
    errCredit: 'Yetersiz kredi.',
    aboutTitle: 'LensyFit Nasıl Çalışır?',
    aboutText1: 'LensyFit, yapay zeka destekli yenilikçi bir sanal kabin uygulamasıdır. Algoritmalar, yüklediğiniz kendi fotoğrafınızı analiz eder, vücut hatlarınızı ve duruşunuzu tanımlar.',
    aboutText2: 'Daha sonra seçtiğiniz kıyafetleri (üst, alt, ayakkabı) dijital olarak analiz ederek orantılı ve doğal bir şekilde üzerinize uyarlar. Kıyafetlerin gölgesi, dokusu ve dökümü yapay zeka tarafından gerçekçi bir şekilde fotoğrafa işlenir.',
    aboutSteps: [
      '1. Işığın iyi olduğu, vücut hatlarınızın net göründüğü tam boy bir fotoğrafınızı yükleyin.',
      '2. Üzerinizde denemek istediğiniz bir tişört, pantolon veya ayakkabı fotoğrafını kutucuklara ekleyin.',
      '3. Kombini oluştur butonuna basın ve birkaç saniye içinde yeni tarzınızı görün.'
    ],
    contactTitle: 'Bize Ulaşın',
    contactDesc: 'Sorularınız, önerileriniz veya işbirlikleri için formu doldurarak bize doğrudan ulaşabilirsiniz.',
    name: 'Ad & Soyad:',
    email: 'E-Postanız:',
    message: 'Mesajınız:',
    send: 'Gönder',
    lang: 'Dil Seçim',
    uploadText: 'Yükle',
    removeText: 'Kaldır',
    genStep0: 'Vücut hatları analiz ediliyor...',
    genStep1: 'Kıyafet modeli taranıyor...',
    genStep2: '3D yerleştirme hesaplanıyor...',
    genStep3: 'Gölge ve ışık ayarlanıyor...',
    genStep4: 'Son rötuşlar yapılıyor...',
    genTitle: 'LENSY FİT',
    genSubtitle: 'ANALİZİ',
    genDesc: 'Şu anda sizin ve seçtiğiniz kıyafetlerin analizi yapılıyor.',
    privacyPolicy: 'Gizlilik Politikası',
    termsOfUse: 'Kullanım Koşulları',
    backBtn: 'GERİ DÖN',
    consentTitle: 'Yapay Zeka Veri İşleme Onayı',
    consentText1: 'Uygulamamız, Görsel işleme özelliklerini sağlamak için güvenli bir şekilde Google LLC (Gemini) yapay zeka servisini kullanmaktadır.',
    consentText2: 'Gönderdiğiniz veriler bu hizmetin sunulması amacıyla Google ile paylaşılır, reklam veya başka amaçlarla kullanılmaz. İşlem bitiminde yüklediğiniz görseller ve sonuç görseli anında silinir.',
    consentApprove: 'ONAYLIYORUM',
    consentCancel: 'İPTAL'
  },
  en: {
    home: 'Home',
    studio: 'Studio',
    about: 'How it Works',
    contact: 'Contact',
    heroBadge: '✨ LensyFit AI 2.0 Public Beta',
    heroTitle: 'Discover Styles\nOn Your Photo.',
    heroSubtitle: 'AI-driven virtual fitting room experience. Upload clothes you want to try on and see the perfect fit in seconds.',
    startBtn: 'Open Studio',
    learnMoreBtn: 'How it Works',
    title: 'Try It On',
    subtitle: 'Upload your reference photo and clothes to generate your outfit.',
    step1Title: 'Reference Photo',
    step1Desc: 'Upload a full-body, well-lit photo of yourself so we can see how the clothes fit on you.',
    step2Title: 'Create Your Closet',
    step2Desc: 'Add the items you want to wear. You just need to upload at least one physical garment to create your new style.',
    urPhoto: 'Your Photo',
    top: 'Top Garment',
    bottom: 'Bottom Garment',
    shoes: 'Shoes',
    generating: 'Generating',
    emptyResult: 'Upload reference photos and\nclick "Generate Outfit".',
    generateBtn: 'Generate Outfit',
    generatingBtn: 'Generating...',
    credit: 'Credits:',
    errPerson: 'Please upload your own photo first.',
    errClothes: 'Please upload at least one clothing item (top, bottom, or shoes).',
    errCredit: 'Insufficient credits.',
    aboutTitle: 'How LensyFit Works?',
    aboutText1: 'LensyFit is an innovative AI-powered virtual fitting room application. Algorithms analyze the photo you upload, identifying your body contours and posture.',
    aboutText2: 'Then, it digitally analyzes the clothes you selected (top, bottom, shoes) and perfectly adapts them to your body naturally and proportionally. The shadows, textures, and drape of the clothes are realistically rendered onto your photo by AI.',
    aboutSteps: [
      '1. Upload a full-body picture where lighting is good and your body shape is clearly visible.',
      '2. Add photos of a t-shirt, pants, or shoes you want to try on into the respective boxes.',
      '3. Click the generate button and see your new style in just seconds.'
    ],
    contactTitle: 'Contact Us',
    contactDesc: 'You can reach us directly by filling out the form for your questions, suggestions, or collaborations.',
    name: 'Full Name:',
    email: 'Your Email:',
    message: 'Message:',
    send: 'Send',
    lang: 'Select Language',
    uploadText: 'Upload',
    removeText: 'Remove',
    genStep0: 'Analyzing body contours...',
    genStep1: 'Scanning clothing model...',
    genStep2: 'Calculating 3D placement...',
    genStep3: 'Adjusting shadows and lighting...',
    genStep4: 'Applying final touches...',
    genTitle: 'LENSY FIT',
    genSubtitle: 'ANALYSIS',
    genDesc: 'Currently analyzing you and your selected clothes.',
    privacyPolicy: 'Privacy Policy',
    termsOfUse: 'Terms of Use',
    backBtn: 'GO BACK',
    consentTitle: 'AI Data Processing Consent',
    consentText1: 'Our application securely uses the Google LLC (Gemini) artificial intelligence service to provide image processing features.',
    consentText2: 'The data you send is shared with Google to provide this service and is not used for advertising or other purposes. The images you upload and the result image are deleted immediately after the process is completed.',
    consentApprove: 'I APPROVE',
    consentCancel: 'CANCEL'
  }
};

export default function App() {
  const [personImage, setPersonImage] = useState<ImageUploadData | null>(null);
  const [topImage, setTopImage] = useState<ImageUploadData | null>(null);
  const [bottomImage, setBottomImage] = useState<ImageUploadData | null>(null);
  const [shoesImage, setShoesImage] = useState<ImageUploadData | null>(null);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [credits, setCredits] = useState(100);

  // Layout states
  const [view, setView] = useState<View>('home');
  const [lang, setLang] = useState<Language>('tr');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);

  const resultRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isGenerating) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep(prev => (prev < 4 ? prev + 1 : prev));
      }, 1500); // Progress every 1.5s
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const t = translations[lang];

  const handleGenerate = async () => {
    if (!personImage) {
      setError(t.errPerson);
      return;
    }
    if (!topImage && !bottomImage && !shoesImage) {
      setError(t.errClothes);
      return;
    }
    if (credits <= 0) {
      setError(t.errCredit);
      return;
    }
    setIsGenerating(true);
    setError(null);
    setResultImage(null);

    // Scroll to the result panel
    setTimeout(() => {
      if (resultRef.current) {
        const top = resultRef.current.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 100);

    try {
      const response = await fetch('/api/try-on', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personImage, topImage, bottomImage, shoesImage }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu.');
      }
      setResultImage(data.imageUrl);
      setCredits(prev => prev - 1);
      setPersonImage(null);
      setTopImage(null);
      setBottomImage(null);
      setShoesImage(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const changeView = (newView: View) => {
    setView(newView);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FCFCFA] text-[#111111] font-sans selection:bg-stone-200/50 flex flex-col">
      
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${view === 'home' ? 'bg-[#FCFCFA]/30 backdrop-blur-md border-b border-white/10' : 'bg-[#FCFCFA]/90 backdrop-blur-md border-b border-black/[0.02]'}`}>
        <div className="max-w-[84rem] mx-auto px-6 h-16 md:h-[74px] flex items-center justify-between transition-all duration-300">
          <div className="flex items-center gap-3 cursor-pointer group opacity-90 hover:opacity-100 transition-opacity" onClick={() => changeView('home')}>
            <span className="w-6 md:w-7 h-[1px] bg-stone-400 group-hover:bg-stone-800 transition-all duration-300"></span>
            <h1 className="font-serif text-lg md:text-[19px] tracking-[0.25em] text-stone-900 uppercase mt-0.5 transition-all duration-300">Lensy Fit</h1>
          </div>
          
          <div className="flex items-center gap-2">
            
            {/* Language Selector */}
            <div className="relative">
              <button 
                type="button"
                onClick={(e) => { e.preventDefault(); setIsLangMenuOpen(!isLangMenuOpen); }} 
                className="flex items-center justify-center w-9 h-9 md:w-[38px] md:h-[38px] bg-transparent rounded-full border border-stone-200 hover:bg-stone-50 transition-all duration-300"
              >
                <img src={lang === 'tr' ? "https://flagicons.lipis.dev/flags/4x3/tr.svg" : "https://flagicons.lipis.dev/flags/4x3/gb.svg"} alt={lang.toUpperCase()} className="w-[16px] h-[12px] md:w-[17px] md:h-[13px] object-cover rounded-[1.5px] transition-all duration-300" />
              </button>
              
              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full right-0 mt-2 bg-white border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-xl p-1 flex flex-col min-w-[120px] overflow-hidden z-50 origin-top-right"
                  >
                    <button type="button" onClick={() => { setLang('tr'); setIsLangMenuOpen(false); }} className={`flex items-center gap-2.5 p-2 px-3 rounded-lg hover:bg-stone-50 transition text-[13px] font-medium ${lang === 'tr' ? 'bg-stone-50 text-black' : 'text-stone-500'}`}>
                      <img src="https://flagicons.lipis.dev/flags/4x3/tr.svg" alt="TR" className="w-4 h-3 object-cover rounded-[1px] opacity-80" />
                      Türkçe
                    </button>
                    <button type="button" onClick={() => { setLang('en'); setIsLangMenuOpen(false); }} className={`flex items-center gap-2.5 p-2 px-3 rounded-lg hover:bg-stone-50 transition text-[13px] font-medium ${lang === 'en' ? 'bg-stone-50 text-black' : 'text-stone-500'}`}>
                      <img src="https://flagicons.lipis.dev/flags/4x3/gb.svg" alt="EN" className="w-4 h-3 object-cover rounded-[1px] opacity-80" />
                      English
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Menu */}
            <div className="relative">
              <button 
                type="button"
                onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(!isMobileMenuOpen); }} 
                className="flex items-center justify-center w-9 h-9 md:w-[38px] md:h-[38px] bg-transparent rounded-full border border-stone-200 hover:bg-stone-50 transition-all duration-300 text-[#666666]"
              >
                {isMobileMenuOpen ? <X className="w-[18px] h-[18px] md:w-[19px] md:h-[19px]" strokeWidth={1.2} /> : <Menu className="w-[18px] h-[18px] md:w-[19px] md:h-[19px]" strokeWidth={1.2} />}
              </button>

              <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full right-0 mt-2 bg-white border border-black/[0.04] shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-xl p-1 flex flex-col min-w-[160px] overflow-hidden z-50 origin-top-right"
                  >
                    <button type="button" onClick={() => changeView('home')} className={`text-left px-4 py-2.5 rounded-lg hover:bg-stone-50 transition text-[13px] font-medium ${view === 'home' ? 'bg-stone-50 text-black' : 'text-stone-500'}`}>{t.home}</button>
                    <button type="button" onClick={() => { setShowConsentModal(true); setIsMobileMenuOpen(false); }} className={`text-left px-4 py-2.5 rounded-lg hover:bg-stone-50 transition text-[13px] font-medium ${view === 'studio' ? 'bg-stone-50 text-black' : 'text-stone-500'}`}>{t.studio}</button>
                    <button type="button" onClick={() => changeView('about')} className={`text-left px-4 py-2.5 rounded-lg hover:bg-stone-50 transition text-[13px] font-medium ${view === 'about' ? 'bg-stone-50 text-black' : 'text-stone-500'}`}>{t.about}</button>
                    <button type="button" onClick={() => changeView('contact')} className={`text-left px-4 py-2.5 rounded-lg hover:bg-stone-50 transition text-[13px] font-medium ${view === 'contact' ? 'bg-stone-50 text-black' : 'text-stone-500'}`}>{t.contact}</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`flex-1 w-full ${view === 'home' ? '' : 'max-w-[84rem] mx-auto px-6 py-12 md:py-16 pt-24 md:pt-28'}`}>
        
        {view !== 'home' && (
          <div className={`w-full mb-2 lg:mb-8 ${['privacy', 'terms', 'about', 'contact'].includes(view) ? 'max-w-3xl mx-auto' : ''}`}>
            <button 
              onClick={() => changeView('home')} 
              className="flex items-center gap-2 text-[12px] font-bold text-stone-400 hover:text-stone-700 transition-colors uppercase tracking-widest group"
            >
              <ArrowLeft size={14} strokeWidth={2.5} className="group-hover:-translate-x-1 transition-transform" /> 
              {t.backBtn}
            </button>
          </div>
        )}

        {/* Landing Page View */}
        {view === 'home' && (
          <div className="relative animate-in fade-in duration-1000 flex flex-col items-center justify-center min-h-screen text-center overflow-hidden px-6 py-12 pt-24 md:py-20">
            
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
              <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover opacity-80" crossOrigin="anonymous">
                <source src="/lensy-fit-kiyafet.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-[#FCFCFA] via-[#FCFCFA]/40 to-transparent"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-[84rem] mx-auto min-h-[60vh]">
              <h2 className="text-5xl md:text-7xl lg:text-[5rem] font-serif tracking-tight text-[#111] mb-6 max-w-4xl leading-[1.05] whitespace-pre-line drop-shadow-sm">
                {t.heroTitle}
              </h2>
              
              <p className="text-lg md:text-xl text-stone-600 max-w-2xl leading-relaxed mb-10 drop-shadow-sm font-medium">
                {t.heroSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
                <button onClick={() => setShowConsentModal(true)} className="h-[3.5rem] px-12 bg-[#111] text-white rounded-full font-bold tracking-wider text-[13px] hover:bg-black hover:scale-[1.02] transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.15)] flex items-center justify-center">
                  {t.startBtn}
                </button>
                <button onClick={() => changeView('about')} className="h-[3.5rem] px-12 bg-white/90 backdrop-blur-md text-[#111] border border-black/10 rounded-full font-bold tracking-wider text-[13px] hover:bg-white hover:scale-[1.02] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex items-center justify-center">
                  {t.learnMoreBtn}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Studio View */}
        {view === 'studio' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col items-center text-center mb-16 px-4">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#111] mb-4">
                {t.title}
              </h2>
              <p className="text-base text-stone-500 max-w-xl">
                {t.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
              
              {/* Left Column: Input */}
              <div className="lg:col-span-7 space-y-0 pt-2 relative">
                
                {/* Step 1 */}
                <div className="relative pb-16">
                  <div className="absolute top-10 left-[1.15rem] bottom-0 w-[1px] bg-gradient-to-b from-stone-200 via-stone-200/50 to-transparent"></div>
                  
                  <div className="flex items-start gap-6 relative">
                    <div className="w-10 h-10 rounded-[14px] bg-white border border-black/[0.04] flex items-center justify-center text-stone-800 text-sm font-semibold shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.02)] z-10">1</div>
                    <div className="flex-1 pt-1.5">
                      <h3 className="text-xl font-medium tracking-tight text-[#111] mb-2">{t.step1Title}</h3>
                      <p className="text-stone-500 text-[15px] mb-8 leading-relaxed max-w-[90%]">
                        {t.step1Desc}
                      </p>
                      
                      <div className="w-full max-w-[220px]">
                        <ImageUpload 
                          label={t.urPhoto} 
                          icon={<Camera size={22} strokeWidth={1.5} />} 
                          value={personImage} 
                          onChange={setPersonImage}
                          aspectRatio="portrait"
                          uploadText={t.uploadText}
                          removeTitle={t.removeText}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative">
                  <div className="flex items-start gap-6 relative">
                    <div className="w-10 h-10 rounded-[14px] bg-white border border-black/[0.04] flex items-center justify-center text-stone-800 text-sm font-semibold shrink-0 shadow-[0_2px_8px_rgba(0,0,0,0.02)] z-10">2</div>
                    <div className="flex-1 pt-1.5 pb-4">
                      <h3 className="text-xl font-medium tracking-tight text-[#111] mb-2">{t.step2Title}</h3>
                      <p className="text-stone-500 text-[15px] mb-8 leading-relaxed max-w-[90%]">
                        {t.step2Desc}
                      </p>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6">
                        <div className="w-full">
                          <ImageUpload 
                            label={t.top} 
                            icon={<Shirt size={22} strokeWidth={1.5} />} 
                            value={topImage} 
                            onChange={setTopImage} 
                            uploadText={t.uploadText}
                            removeTitle={t.removeText}
                          />
                        </div>
                        <div className="w-full">
                          <ImageUpload 
                            label={t.bottom} 
                            icon={<img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-scissors'%3E%3Cpath d='M3 9h18v12H3z'/%3E%3Cpath d='M9 21v-6'/%3E%3Cpath d='M15 21v-6'/%3E%3Cpath d='M3 9l4-6'/%3E%3Cpath d='M21 9l-4-6'/%3E%3C/svg%3E" alt="Pants" className="w-6 h-6 opacity-60" style={{ filter: 'grayscale(100%)' }} />}
                            value={bottomImage} 
                            onChange={setBottomImage} 
                            uploadText={t.uploadText}
                            removeTitle={t.removeText}
                          />
                        </div>
                        <div className="w-full">
                          <ImageUpload 
                            label={t.shoes} 
                            icon={<Footprints size={22} strokeWidth={1.5} />} 
                            value={shoesImage} 
                            onChange={setShoesImage} 
                            uploadText={t.uploadText}
                            removeTitle={t.removeText}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Output */}
              <div className="lg:col-span-5 relative" ref={resultRef}>
                <div className="sticky top-28 bg-white p-6 sm:p-8 rounded-[2rem] shadow-[0_4px_30px_rgba(0,0,0,0.03)] border border-black/[0.04] flex flex-col items-center">
                  
                  <button
                    onClick={handleGenerate}
                    disabled={isGenerating || !personImage || (!topImage && !bottomImage && !shoesImage)}
                    className={`w-full h-[52px] mb-8 rounded-2xl font-medium text-[15px] flex items-center justify-center gap-2 transition-all duration-300
                      ${isGenerating || !personImage || (!topImage && !bottomImage && !shoesImage)
                        ? 'bg-stone-50 text-stone-400 cursor-not-allowed border border-black/[0.04]'
                        : 'bg-[#111] text-white hover:bg-black shadow-[0_8px_20px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 active:translate-y-0'
                      }`}
                  >
                    {isGenerating ? t.generatingBtn : t.generateBtn}
                  </button>

                  <div className="w-full aspect-[3/4] bg-[#FDFDFB] rounded-[1.2rem] border border-black/[0.04] overflow-hidden flex items-center justify-center mb-0 relative shadow-inner">
                    {isGenerating ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-white/95 backdrop-blur-sm z-10">
                        <div className="relative mb-8 mt-2 flex justify-center items-center h-32 w-full">
                          <div className="w-28 h-28 rounded-full border border-stone-200 border-dashed absolute opacity-50"></div>
                          <div className="w-20 h-20 rounded-full border border-stone-200 absolute opacity-70"></div>
                          <div className="w-14 h-14 rounded-full bg-white border border-stone-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex items-center justify-center relative z-10">
                             <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23B69666' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-user'%3E%3Cpath d='M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E" alt="Logo" className="w-7 h-7" />
                          </div>
                          <motion.div 
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                            className="absolute w-28 h-28 border border-transparent border-t-[#B69666] rounded-full opacity-40"
                          />
                          <motion.div 
                            animate={{ rotate: -360 }}
                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                            className="absolute w-20 h-20 border border-transparent border-b-[#B69666] border-l-[#B69666] rounded-full opacity-50"
                          />
                        </div>

                        <div className="flex flex-col gap-4 w-full max-w-[220px] mx-auto pl-2 relative">
                          <div className="absolute left-4 top-2 bottom-2 w-[1px] bg-stone-100 z-0"></div>
                          
                          {[t.genStep0, t.genStep1, t.genStep2, t.genStep3, t.genStep4].map((step, idx) => (
                            <div key={idx} className="flex items-center gap-4 relative z-10">
                              <div className="w-8 flex justify-center">
                                <div className={`w-3 h-3 rounded-full transition-all duration-500 ${
                                  loadingStep === idx 
                                    ? 'bg-white border-[2px] border-[#B69666] scale-125 shadow-[0_0_12px_rgba(182,150,102,0.4)]' 
                                    : loadingStep > idx 
                                      ? 'bg-[#B69666]' 
                                      : 'bg-stone-200'
                                }`}></div>
                              </div>
                              <p className={`text-[12px] transition-colors duration-500 font-medium ${
                                loadingStep === idx 
                                  ? 'text-[#B69666]' 
                                  : loadingStep > idx 
                                    ? 'text-stone-800' 
                                    : 'text-stone-300'
                              }`}>
                                {step}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : resultImage ? (
                      <img 
                        src={resultImage} 
                        alt="Oluşturulan Kombin" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center p-8 text-center text-stone-400">
                        <div className="w-14 h-14 rounded-[1rem] bg-white flex items-center justify-center mb-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-black/[0.04] transition-all duration-300">
                          <Wand2 size={24} strokeWidth={1.5} className="text-stone-400" />
                        </div>
                        <p className="text-[13px] font-medium text-stone-400 whitespace-pre-line leading-relaxed max-w-[200px]">{t.emptyResult}</p>
                      </div>
                    )}
                  </div>

                  {error && (
                    <div className="w-full mt-6 p-4 rounded-[1rem] bg-rose-50/50 border border-rose-100/50 flex gap-3 text-rose-600 text-sm">
                      <AlertCircle size={18} className="shrink-0 mt-0.5" strokeWidth={1.5} />
                      <p className="leading-relaxed font-medium">{error}</p>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* About View */}
        {view === 'about' && (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 py-12 md:py-20">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-[#111] mb-8 text-center">{t.aboutTitle}</h2>
            
            <div className="prose prose-stone lg:prose-lg text-stone-600 mx-auto">
              <p className="lead text-xl text-stone-800 font-medium mb-6 text-center text-balance">
                {t.aboutText1}
              </p>
              <p className="mb-12 leading-relaxed text-[17px] text-center text-balance opacity-80">
                {t.aboutText2}
              </p>

              <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.04)] border border-black/[0.04] mt-10">
                <div className="space-y-8">
                  {t.aboutSteps.map((step, index) => (
                    <div key={index} className="flex gap-5">
                      <div className="w-10 h-10 rounded-[14px] bg-[#111] flex items-center justify-center text-sm font-semibold shrink-0 text-white shadow-md">
                        {index + 1}
                      </div>
                      <p className="pt-2 text-stone-600 leading-relaxed text-[16px]">{step.substring(3)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Privacy View */}
        {view === 'privacy' && (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12 md:pb-20">
            <div className="text-center mb-10 mt-2">
              <h1 className="text-4xl md:text-[44px] font-serif tracking-tight text-[#111] mb-5">Gizlilik Politikası</h1>
              <p className="text-[12px] font-bold tracking-[0.15em] text-stone-400 uppercase">SON GÜNCELLEME: 5 NİSAN 2026</p>
            </div>
            <div className="bg-white p-8 md:p-12 lg:p-14 rounded-[2rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.04)] border border-black/[0.04]">
              <div className="space-y-10 text-stone-600 leading-relaxed text-[15px]">
                <section>
                  <h3 className="text-2xl font-serif text-[#111] mb-4">1. Veri Toplama ve Kullanımı</h3>
                  <p>Lensy Fit olarak gizliliğinize büyük önem veriyoruz. Uygulamamızı kullanırken yüklediğiniz, kamera aracılığıyla çektiğiniz kendi fotoğraflarınız veya internet üzerinden bularak uygulamaya eklediğiniz kıyafet/ayakkabı görselleri sunucularımızda kesinlikle saklanmamakta ve kaydedilmemektedir. Görüntüler yalnızca anlık olarak yapay zekâ destekli sanal kombin deneme işleminin gerçekleştirilmesi amacıyla işlenir ve işlem tamamlandıktan hemen sonra kalıcı olarak silinir.</p>
                </section>

                <section>
                  <h3 className="text-2xl font-serif text-[#111] mb-4">2. Hesap Bilgileri</h3>
                  <p>Uygulamamıza kayıt olurken sağladığınız e-posta adresi ve ad-soyad gibi temel bilgiler, yalnızca hesabınızın yönetilmesi, güvenliğinizin sağlanması ve size daha iyi bir hizmet sunulabilmesi amacıyla güvenli veritabanlarımızda (Google Firebase) saklanmaktadır. Bu bilgiler üçüncü şahıslarla paylaşılmaz.</p>
                </section>

                <section>
                  <h3 className="text-2xl font-serif text-[#111] mb-4">3. Çerezler ve İzleme Teknolojileri</h3>
                  <p>Uygulamamızın performansını artırmak ve kullanıcı deneyimini iyileştirmek amacıyla temel çerezler kullanılabilir. Bu çerezler kişisel verilerinizi takip etmek için kullanılmaz.</p>
                </section>

                <section>
                  <h3 className="text-2xl font-serif text-[#111] mb-4">4. Veri Güvenliği</h3>
                  <p>Kullanıcı verilerinin güvenliğini sağlamak için endüstri standardı şifreleme ve güvenlik önlemleri kullanıyoruz. Ancak, internet üzerinden yapılan hiçbir veri aktarımının %100 güvenli garanti edilemeyeceğini unutmayın.</p>
                </section>

                <section>
                  <h3 className="text-2xl font-serif text-[#111] mb-4">5. Üçüncü Taraf Yapay Zekâ Hizmetleri ve Görsel Veri İşleme</h3>
                  <p className="mb-4">Uygulamamız, kullanıcılara yapay zekâ destekli sanal kıyafet ve ayakkabı deneme (virtual try-on), vücut ve kombin analizi ile görsel işleme hizmetleri sunabilmek amacıyla Google LLC tarafından sağlanan Google Gemini API hizmetlerinden yararlanmaktadır.</p>
                  
                  <p className="mb-4"><strong>İşlenen ve Aktarılan Veriler:</strong> Kullanıcıların sanal deneme özelliğini kullanırken yükledikleri veya kamera aracılığıyla sağladıkları kişisel fotoğrafları ile internet üzerinden alarak uygulamaya yükledikleri üst giyim, alt giyim ve ayakkabı görselleri, ilgili yapay zekâ işlemlerinin gerçekleştirilebilmesi amacıyla Google Gemini API hizmetine aktarılabilir.</p>
                  
                  <p className="mb-3"><strong>Veri Aktarımının Amacı:</strong> Görsel veriler yalnızca aşağıdaki amaçlarla işlenir:</p>
                  <ul className="list-disc pl-5 mb-5 space-y-2">
                    <li>Vücut yapısının, hatlarının ve duruşun tespit edilmesi/analiz edilmesi,</li>
                    <li>Kullanıcının internetten seçip yüklediği kıyafetlerin (gömlek, t-shirt, pantolon, şort vb.) ve ayakkabıların vücut üzerinde doğru ve gerçekçi şekilde konumlandırılması,</li>
                    <li>Kullanıcı tarafından talep edilen sanal kombin deneme sonucunun oluşturulması,</li>
                    <li>Uygulamanın yapay zekâ destekli modelleme işlevlerinin yerine getirilmesi.</li>
                  </ul>
                  
                  <p className="mb-4"><strong>Önemli Not:</strong> Bu veriler reklamcılık, davranışsal profilleme, pazarlama faaliyetleri veya biyometrik kimlik doğrulama amacıyla kesinlikle kullanılmaz.</p>
                  
                  <p className="mb-4"><strong>Veri Saklama:</strong> Lensy Fit, kullanıcıların yüklediği veya kamera aracılığıyla sağladığı hiçbir görseli kendi sistemlerinde kalıcı olarak saklamaz. Görseller yalnızca ilgili kombinleme işleminin gerçekleştirilmesi amacıyla geçici olarak işlenir. Google LLC tarafından gerçekleştirilen veri işleme faaliyetleri ise Google'ın kendi hizmet şartları ve gizlilik politikalarına tabidir.</p>
                  
                  <p className="mb-4"><strong>Veri Güvenliği:</strong> Google Gemini API hizmetine yapılan veri aktarımı güvenli iletişim protokolleri kullanılarak gerçekleştirilir. Lensy Fit ve Google LLC, aktarılan verilerin korunması amacıyla makul teknik ve organizasyonel güvenlik tedbirleri uygulamaktadır.</p>
                  
                  <p><strong>Kullanıcı Onayı:</strong> Kullanıcıların görsel verileri, yalnızca ilgili yapay zekâ özelliğinin kullanılması sırasında ve kullanıcıya gerekli bilgilendirmenin yapılmasının ardından işlenir ve aktarılır. Kullanıcı, yapay zekâ destekli kombin deneme özelliğini kullanmamayı tercih ederek bu veri aktarımını reddedebilir.</p>
                </section>

                <section>
                  <h3 className="text-2xl font-serif text-[#111] mb-4">6. İletişim</h3>
                  <p>Gizlilik politikamızla ilgili herhangi bir sorunuz veya endişeniz varsa, lütfen bizimle iletişime geçmekten çekinmeyin.</p>
                </section>
              </div>
            </div>
          </div>
        )}

        {/* Terms View */}
        {view === 'terms' && (
          <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12 md:pb-20">
            <div className="text-center mb-10 mt-2">
              <h1 className="text-4xl md:text-[44px] font-serif tracking-tight text-[#111] mb-5">Kullanım Koşulları</h1>
              <p className="text-[12px] font-bold tracking-[0.15em] text-stone-400 uppercase">SON GÜNCELLEME: 5 NİSAN 2026</p>
            </div>
            <div className="bg-white p-8 md:p-12 lg:p-14 rounded-[2rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.04)] border border-black/[0.04]">
              <div className="space-y-10 text-stone-600 leading-relaxed text-[15px]">
                <section>
                  <h3 className="text-2xl font-serif text-[#111] mb-4">1. Hizmetin Kullanımı</h3>
                  <ul className="list-disc pl-5 space-y-3">
                    <li>Lensy Fit, kullanıcıların üst (gömlek, t-shirt vb.), alt (pantolon, şort vb.) ve ayakkabı ürünlerini sanal olarak deneyebilmesi amacıyla yapay zeka destekli bir hizmet sunar.</li>
                    <li>Uygulama, kullanıcıların internette beğendikleri kıyafet ve ayakkabıları satın almadan önce üzerlerinde nasıl duracağını ve oluşturdukları kombinleri canlı olarak görmelerini sağlamak amacıyla geliştirilmiştir.</li>
                    <li>Uygulama içerisinde hazır veya yerleşik bir ürün/elbise seçeneği bulunmamaktadır.</li>
                    <li>Hizmet tamamen kullanıcıların kendi görsellerini ve internetten seçtikleri ürün fotoğraflarını yüklemesi mantığına dayanır.</li>
                    <li>Hizmetimizi kullanarak, yasalara ve işbu koşullara uygun davranmayı kabul edersiniz.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-2xl font-serif text-[#111] mb-4">2. Kullanıcı İçerikleri</h3>
                  <ul className="list-disc pl-5 space-y-3">
                    <li>Kullanıcıların sisteme yüklediği kendi fotoğrafları ile internet üzerinden alarak uygulamaya eklediği üst, alt ve ayakkabı görsellerinin mülkiyeti kendilerine aittir.</li>
                    <li>Söz konusu içeriklerin ve kombin görsellerinin üçüncü şahısların telif veya diğer haklarını ihlal etmemesi tamamen kullanıcının sorumluluğundadır.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-2xl font-serif text-[#111] mb-4">3. Sorumluluk Reddi</h3>
                  <ul className="list-disc pl-5 space-y-3">
                    <li>Yapay zeka teknolojisi aracılığıyla oluşturulan sanal kombin ve deneme görüntüleri tahmin edilerek üretilmektedir.</li>
                    <li>Üretilen sanal deneme sonuçları, gerçek hayattaki görünümler veya ürünlerin fiziksel halleri ile birebir aynı olmayabilir.</li>
                    <li>Lensy Fit, bu görsel farklılıklardan doğabilecek veya doğrudan/dolaylı hiçbir zarardan sorumlu tutulamaz.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-2xl font-serif text-[#111] mb-4">4. Fikri Mülkiyet</h3>
                  <ul className="list-disc pl-5 space-y-3">
                    <li>Lensy Fit markası, yazılım kodları, arayüz tasarımları ve üretilen tüm dijital materyaller Invexa Software'e aittir.</li>
                    <li>Kopyalanamaz veya izinsiz kullanılamaz.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-2xl font-serif text-[#111] mb-4">5. Değişiklikler</h3>
                  <p>Lensy Fit, önceden haber vermeksizin kullanım koşullarını değiştirme hakkını saklı tutar.</p>
                </section>
              </div>
            </div>
          </div>
        )}

        {/* Contact View */}
        {view === 'contact' && (
          <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12 md:pb-20">
            <div className="text-center mb-10 mt-2">
              <h1 className="text-4xl md:text-[44px] font-serif tracking-tight text-[#111] mb-4">{t.contactTitle}</h1>
              <p className="text-stone-500 text-[15px] max-w-md mx-auto">{t.contactDesc}</p>
            </div>

            <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.04)] border border-black/[0.04] overflow-hidden flex flex-col md:flex-row">
              {/* Left Column - Contact Info */}
              <div className="p-8 md:p-12 lg:p-14 flex-1 border-b md:border-b-0 md:border-r border-black/[0.04] flex flex-col justify-center">
                <h2 className="text-2xl font-serif text-[#111] mb-4">{t.contactTitle}</h2>
                <p className="text-stone-500 text-[15px] leading-relaxed mb-10">{t.contactDesc}</p>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#fcf9f2] flex items-center justify-center shrink-0 border border-[#f0e6d2]">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4b483" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center h-12">
                    <p className="text-[11px] font-bold tracking-[0.1em] text-stone-400 mb-1">{lang === 'tr' ? 'E-POSTA' : 'EMAIL'}</p>
                    <p className="text-[#111] font-medium text-[15px]">info@lensyfit.com</p>
                  </div>
                </div>
              </div>

              {/* Right Column - Form */}
              <div className="p-8 md:p-12 lg:p-14 flex-1 bg-[#fafafa]">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="block text-[13px] font-semibold text-stone-600 mb-2">{t.name}</label>
                    <input type="text" className="w-full px-5 h-12 bg-white border border-black/[0.06] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#111]/10 focus:border-[#111]/30 transition-all text-[14px] placeholder:text-stone-400" placeholder={lang === 'tr' ? 'Adınız Soyadınız' : 'John Doe'} />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-stone-600 mb-2">{t.email}</label>
                    <input type="email" className="w-full px-5 h-12 bg-white border border-black/[0.06] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#111]/10 focus:border-[#111]/30 transition-all text-[14px] placeholder:text-stone-400" placeholder={lang === 'tr' ? 'ornek@email.com' : 'john@example.com'} />
                  </div>
                  <div>
                    <label className="block text-[13px] font-semibold text-stone-600 mb-2">{t.message}</label>
                    <textarea rows={4} className="w-full p-5 bg-white border border-black/[0.06] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#111]/10 focus:border-[#111]/30 transition-all resize-none text-[14px] placeholder:text-stone-400" placeholder={lang === 'tr' ? 'Nasıl yardımcı olabiliriz?' : 'How can we help?'}></textarea>
                  </div>
                  <button className="w-full h-12 bg-[#111] text-white rounded-xl font-bold tracking-widest text-[12px] uppercase hover:bg-black transition-all hover:-translate-y-0.5 shadow-[0_4px_14px_rgba(0,0,0,0.1)] mt-2 flex items-center justify-center">
                    {t.send}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

      </main>
      
      {/* Footer minimal */}
      <footer className="py-10 text-center text-stone-400 text-[13px] mt-auto border-t border-black/[0.02] bg-white/30 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-6 mb-4">
          <button onClick={() => changeView('privacy')} className="hover:text-stone-700 transition-colors">{t.privacyPolicy}</button>
          <button onClick={() => changeView('terms')} className="hover:text-stone-700 transition-colors">{t.termsOfUse}</button>
        </div>
        <p className="opacity-80">&copy;{new Date().getFullYear()} | Lensy Fit - Bir Invexa Software ürünüdür.</p>
      </footer>

      {/* Consent Modal */}
      <AnimatePresence>
        {showConsentModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#111]/40 backdrop-blur-sm"
              onClick={() => setShowConsentModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-stone-50 border border-black/[0.04] flex items-center justify-center mb-6 text-[#111]">
                <ShieldCheck size={28} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-2xl font-serif tracking-tight text-[#111] mb-6">
                {t.consentTitle}
              </h3>
              
              <div className="space-y-4 text-[15px] leading-relaxed text-stone-500 mb-10">
                <p>{t.consentText1}</p>
                <p>{t.consentText2}</p>
              </div>

              <div className="w-full flex flex-col gap-3">
                <button 
                  onClick={() => {
                    setShowConsentModal(false);
                    changeView('studio');
                  }}
                  className="w-full h-14 bg-[#111] text-white rounded-2xl font-bold tracking-wider text-[13px] hover:bg-black transition-all hover:-translate-y-0.5 shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
                >
                  {t.consentApprove}
                </button>
                <button 
                  onClick={() => setShowConsentModal(false)}
                  className="w-full h-14 bg-transparent text-stone-500 rounded-2xl font-bold tracking-wider text-[13px] hover:text-[#111] hover:bg-stone-50 transition-all"
                >
                  {t.consentCancel}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
