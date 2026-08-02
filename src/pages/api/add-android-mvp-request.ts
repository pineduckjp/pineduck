export const prerender = false;

import type { APIRoute } from "astro";
import { z } from "astro/zod";
import { drizzle } from "drizzle-orm/d1";
import { env } from "cloudflare:workers";
import { TURNSTILE_SECRET_KEY } from "astro:env/server";

import { jsonResponse, verifyTurnstile } from "@/server/helper";
import { androidMvpRequests } from "@/db/schema";

const requestSchema = z.object({
  email: z
    .string({ error: "メールアドレスは必須です。" })
    .trim()
    .min(1, { error: "メールアドレスは必須です。" })
    .pipe(z.email({ error: "メールアドレスの形式が不正です。" })),
  turnstileToken: z
    .string({ error: "検証が必要です。" })
    .trim()
    .min(1, { error: "検証が必要です。" }),
});

export const POST = (async ({ request }) => {
  if (request.headers.get("Content-Type") === "application/json") {
    const body = await request.json();

    try {
      // バリデーション
      const result = requestSchema.safeParse(body);
      if (!result.success) {
        const resultMessage =
          result.error.issues[0]?.message ?? "入力値が不正です。";
        return jsonResponse(JSON.stringify({ message: resultMessage }), 400);
      }
      const data = result.data;

      // Turnstile 検証
      if (TURNSTILE_SECRET_KEY) {
        const turnstileOk = await verifyTurnstile(
          data.turnstileToken,
          TURNSTILE_SECRET_KEY,
        );
        if (!turnstileOk) {
          return jsonResponse(
            JSON.stringify({ error: "Turnstile 検証に失敗しました。" }),
            403,
          );
        }
      }

      // データベースに保存
      const db = drizzle(env.DB);
      await db.insert(androidMvpRequests).values({
        email: data.email,
      });

      return jsonResponse(
        JSON.stringify({
          success: true,
          message: "Android MVP リクエストを受け付けました。",
        }),
        200,
      );
    } catch (error) {
      console.error("Error parsing request body:", error);
      return jsonResponse(
        JSON.stringify({
          message: "サーバーエラーが発生しました。もう一度お試しください。",
        }),
        500,
      );
    }
  }

  return new Response(JSON.stringify({ message: "入力値が不正です。" }), {
    status: 400,
  });
}) satisfies APIRoute;
