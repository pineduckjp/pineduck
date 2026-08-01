import { CORS_ORIGIN } from "astro:env/server";

// API レスポンスを JSON 形式で返す（CORS ヘッダーも付与）
export function jsonResponse(data: string, status: number): Response {
  const headers = { "Content-Type": "application/json" } as Record<
    string,
    string
  >;
  if (CORS_ORIGIN) {
    console.log(
      `Setting CORS header: Access-Control-Allow-Origin: ${CORS_ORIGIN}`,
    );
    headers["Access-Control-Allow-Origin"] = CORS_ORIGIN;
  }

  return new Response(data, { status, headers });
}

// Cloudflare Turnstile のトークンを検証（ボット対策）
export async function verifyTurnstile(
  token: string,
  secret: string,
): Promise<boolean> {
  const result = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    },
  );
  const data = (await result.json()) as { success: boolean };

  return data.success === true;
}
