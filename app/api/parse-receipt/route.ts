import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are a clothing receipt parser for StyleDebt, a wardrobe tracking app.
Extract clothing items from the receipt text provided.

Return ONLY a JSON array with no preamble, no markdown, no backticks. Each object must have:
- name: string (item name, cleaned up and capitalized)
- brand: string (store/brand name)
- price: number (price as a number, no $ sign)
- category: string (one of: "Tops", "Bottoms", "Dresses", "Outerwear", "Shoes", "Accessories")
- color: string (primary color if detectable, otherwise "")

Example output:
[{"name":"Floral Midi Dress","brand":"Zara","price":59.90,"category":"Dresses","color":"floral"}]

If no clothing items are found, return an empty array: []`;

export async function POST(req: NextRequest) {
  try {
    const { text } = await req.json();
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-3-5-haiku-20241022",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: text }],
      }),
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    const data = await response.json();
    const content = data.content?.[0]?.text;
    if (!content) throw new Error("Empty response");
    const items = JSON.parse(content);
    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ error: "Failed to parse receipt" }, { status: 500 });
  }
}
