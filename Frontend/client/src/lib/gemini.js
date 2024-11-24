  // src/lib/gemini.js
  import { GoogleGenerativeAI } from "@google/generative-ai";

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  export async function getShippingEstimates(packageDetails) {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      You are a shipping cost calculator API. Based on the following package details, provide realistic shipping cost estimates.
      
      Package Details:
      - Source: ${packageDetails.source}
      - Destination: ${packageDetails.destination}
      - Weight: ${packageDetails.weight}kg
      - Dimensions: ${packageDetails.length}x${packageDetails.width}x${packageDetails.height}cm

      Important: Respond ONLY with a JSON object in the following format, with no additional text or markdown:
      {
        "estimates": [
          {
            "provider": "provider name",
            "cost": numeric cost in INR,
            "duration": "delivery time range",
            "service_type": "service level"
          }
        ]
      }

      Include 3 shipping providers: one express, one standard, and one economy option.
      Base the cost on distance, weight, and dimensions provided.
      `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      // Remove any markdown code block syntax and extra whitespace
      text = text.replace(/```json\s*|\s*```/g, '').trim();
      
      // Additional cleanup for any remaining markdown or text
      if (text.includes('{')) {
        text = text.substring(text.indexOf('{'));
      }
      if (text.includes('}')) {
        text = text.substring(0, text.lastIndexOf('}') + 1);
      }

      try {
        return JSON.parse(text);
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError);
        // Fallback response if parsing fails
        return {
          estimates: [
            {
              provider: "Express Courier",
              cost: calculateBaseCost(packageDetails) * 2,
              duration: "1-2 days",
              service_type: "Express"
            },
            {
              provider: "Standard Shipping",
              cost: calculateBaseCost(packageDetails),
              duration: "3-5 days",
              service_type: "Standard"
            },
            {
              provider: "Economy Delivery",
              cost: calculateBaseCost(packageDetails) * 0.7,
              duration: "5-7 days",
              service_type: "Economy"
            }
          ]
        };
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw new Error("Failed to get shipping estimates");
    }
  }

  // Helper function to calculate a base cost for fallback scenarios
  function calculateBaseCost(packageDetails) {
    const baseRate = 20; // Base shipping rate in USD
    const weightFactor = parseFloat(packageDetails.weight) * 2;
    const volume = parseFloat(packageDetails.length) * 
                  parseFloat(packageDetails.width) * 
                  parseFloat(packageDetails.height) / 5000; // Volume in cubic cm
    
    return Math.round((baseRate + weightFactor + volume) * 100) / 100;
  }