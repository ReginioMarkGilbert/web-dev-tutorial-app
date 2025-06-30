// Gemini API key
const API_KEY = "AIzaSyBSQjuUEAR5-l2xMPk4Kmoz9PYx70Umb0s"

export type GeminiMessage = {
  role: "user" | "assistant"
  content: string
}

export async function sendMessageToGemini(message: string): Promise<string> {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `You are a helpful web development assistant. Answer questions related to HTML, CSS, JavaScript, React, and other web technologies.
              Keep responses concise and focused on helping the user with their web development questions.

              FORMAT YOUR RESPONSE USING MARKDOWN:
              - Use code blocks with language syntax highlighting (e.g. \`\`\`js, \`\`\`html, \`\`\`css)
              - Use headings with # for organization
              - Use **bold** for emphasis
              - Use bullet points for lists
              - Use numbered lists for steps
              - Use [links](url) when referencing resources

              User question: ${message}` }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    )

    const data = await response.json()

    if (data.candidates && data.candidates[0]?.content?.parts) {
      return data.candidates[0].content.parts[0].text
    } else {
      throw new Error("Invalid response from Gemini API")
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error)
    throw error
  }
}
