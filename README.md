# LensyFit - Sanal Kıyafet Giydirme ve Stil Asistanı

Kullanıcıların kendi fotoğraflarına seçtikleri kıyafetleri (üst, alt, ayakkabı) yapay zeka ile giydirip deneyebilecekleri modern bir web uygulaması.

## Özellikler

- **Sanal Kıyafet Deneme:** Portre fotoğrafı ve kıyafet görsellerini birleştirerek gerçekçi giydirme simülasyonu.
- **Kombin Oluşturma:** Üst giyim, alt giyim ve ayakkabı kombinleri seçebilme.
- **Duyarlı ve Minimalist Arayüz:** Masaüstü ve mobil uyumlu modern React arayüzü.

## Kurulum ve Çalıştırma

### Gereksinimler

- Node.js (v18 veya üzeri önerilir)
- npm veya yarn

### Adımlar

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. Çevre değişkenlerini ayarlayın:
   `.env.example` dosyasını referans alarak kök dizinde bir `.env` dosyası oluşturun ve API anahtarınızı girin:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```

3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

4. Üretim (Production) derlemesi almak için:
   ```bash
   npm run build
   ```
