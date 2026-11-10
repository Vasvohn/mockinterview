"use client";

import { initializePaddle, type Paddle } from "@paddle/paddle-js";
import {
  paddleClientToken,
  paddleEnvironment,
  planIdFromPrice,
  priceIdFor,
  type PaidPlanId,
} from "@/lib/paddle";
import { offersReturnUrl } from "@/lib/appPath";
import { readPaddleCookie } from "@/lib/paddleCookie";

type PaidHandler = (planId: PaidPlanId) => void;
type NoticeHandler = (message: string | null) => void;

let paddlePromise: Promise<Paddle | undefined> | null = null;
let onPaid: PaidHandler | null = null;
let onNotice: NoticeHandler | null = null;

export function bindPaddleHandlers(paid: PaidHandler, notice: NoticeHandler): () => void {
  onPaid = paid;
  onNotice = notice;
  return () => {
    if (onPaid === paid) onPaid = null;
    if (onNotice === notice) onNotice = null;
  };
}

function ensurePaddle(token: string): Promise<Paddle | undefined> {
  if (!paddlePromise) {
    paddlePromise = initializePaddle({
      environment: paddleEnvironment(),
      token,
      eventCallback(event) {
        if (event.name === "checkout.completed") {
          const planId = event.data?.items
            .map((item) => planIdFromPrice(item.price_id))
            .find((id) => id != null);
          if (planId) {
            onPaid?.(planId);
          } else {
            onNotice?.("Paddle a confirmé un paiement qui ne correspond à aucune offre.");
          }
          return;
        }
        if (event.name === "checkout.error" || event.name === "checkout.failed") {
          onNotice?.(event.detail || "Le paiement Paddle n'a pas abouti.");
        }
      },
    }).catch((error: unknown) => {
      paddlePromise = null;
      throw error;
    });
  }
  return paddlePromise;
}

/** Ouvre l'overlay Paddle. Le plan n'est activé qu'à checkout.completed. */
export async function openPaddleCheckout(planId: PaidPlanId): Promise<void> {
  if (readPaddleCookie() !== "accepted") {
    throw new Error("Acceptez le cookie Paddle, en bas de la page, pour ouvrir le paiement.");
  }

  const token = paddleClientToken();
  const priceId = priceIdFor(planId);
  if (!token || !priceId) {
    throw new Error("Le paiement Paddle n'est pas configuré pour cette offre.");
  }

  const paddle = await ensurePaddle(token);
  if (!paddle) {
    throw new Error("Paddle.js n'a pas pu se charger.");
  }

  paddle.Checkout.open({
    items: [{ priceId, quantity: 1 }],
    customData: { planId },
    settings: {
      displayMode: "overlay",
      theme: "light",
      locale: "fr",
      variant: "one-page",
      successUrl: offersReturnUrl(),
    },
  });
}
