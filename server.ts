import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit because we are receiving base64 image strings
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  app.post("/api/try-on", async (req, res) => {
    try {
      const { personImage, topImage, bottomImage, shoesImage } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        // Mock response for demo purposes when API key is missing
        console.warn("No GEMINI_API_KEY found, returning mock response for preview.");
        return res.json({
          imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80",
          prompt: "Mock generation without API key"
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
      });

      // Build the parts for the multimodal request
      const parts: any[] = [];
      
      if (personImage) {
        parts.push({
          inlineData: { data: personImage.data, mimeType: personImage.mimeType },
        });
        parts.push({ text: "Image 1: Target person. Please keep the person's face, body, hair, pose and background EXACTLY the same as this image." });
      }

      if (topImage) {
        parts.push({
          inlineData: { data: topImage.data, mimeType: topImage.mimeType },
        });
        parts.push({ text: "Image 2: Top clothing reference." });
      }
      
      if (bottomImage) {
        parts.push({
          inlineData: { data: bottomImage.data, mimeType: bottomImage.mimeType },
        });
        parts.push({ text: "Image 3: Bottom clothing reference." });
      }
      
      if (shoesImage) {
        parts.push({
          inlineData: { data: shoesImage.data, mimeType: shoesImage.mimeType },
        });
        parts.push({ text: "Image 4: Shoes reference." });
      }

      parts.push({
        text: "Generate an image of the EXACT same person from Image 1 wearing the clothing items shown in the reference images. It is critically important that the person's face, identity, body shape, skin color, and pose remain 100% identical to Image 1. Only change the clothes they are wearing to match the reference images. Ignore the models in the reference images.",
      });

      // We use gemini-2.5-flash-image to perform image editing/generation
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: { parts },
        config: {
          imageConfig: {
            aspectRatio: "3:4", 
            imageSize: "1K",
          },
        },
      });

      let imageUrl = "";
      let textResponse = "";
      // Find the image part in the response
      if (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
              break;
            }
            if (part.text) {
              textResponse += part.text + " ";
            }
          }
      }

      if (!imageUrl) {
        throw new Error(`Görüntü oluşturulamadı. Model yanıtı: ${textResponse.trim() || 'boş'}`);
      }

      res.json({ imageUrl });
    } catch (error: any) {
      console.error("API error:", error);
      res.status(500).json({
        error: error.message || "Bilinmeyen bir sunucu hatası oluştu.",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
