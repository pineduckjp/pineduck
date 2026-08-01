export const prerender = false;

import type { APIRoute } from "astro";
import { z } from "astro/zod";
import { drizzle } from "drizzle-orm/d1";
import { env } from "cloudflare:workers";

import { TURNSTILE_SECRET_KEY } from "astro:env/server";

import { jsonResponse, verifyTurnstile } from "@/server/helper";
import { contacts } from "@/db/schema";

const requestSchema = z.object({
  email: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value === "" ? undefined : value))
    .refine(
      (value) => value === undefined || z.email().safeParse(value).success,
      {
        error: "メールアドレスの形式が不正です。",
      },
    ),
  userId: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
  user_id: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
  userName: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
  user_name: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
  app: z
    .string()
    .trim()
    .optional()
    .transform((value) => (value === "" ? undefined : value)),
  message: z
    .string({ error: "メッセージは必須です。" })
    .trim()
    .min(1, { error: "メッセージは必須です。" }),
  turnstileToken: z
    .string({ error: "検証が必要です。" })
    .trim()
    .min(1, { error: "検証が必要です。" }),
});

export const POST: APIRoute = async ({ request }) => {
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
      const userId = data.userId ?? data.user_id;
      const userName = data.userName ?? data.user_name;

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
      await db.insert(contacts).values({
        email: data.email,
        userId,
        userName,
        app: data.app,
        message: data.message,
      });

      return jsonResponse(
        JSON.stringify({
          success: true,
          message: "お問い合わせを受け付けました。",
        }),
        200,
      );
    } catch (error) {
      console.error("Error in add-contact API:", error);
      return jsonResponse(
        JSON.stringify({ error: "サーバーエラーが発生しました。" }),
        500,
      );
    }
  } else {
    return jsonResponse(
      JSON.stringify({
        error: "Content-Type は application/json である必要があります。",
      }),
      400,
    );
  }
};
