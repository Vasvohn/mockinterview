import { EventName, Webhooks } from "@paddle/paddle-node-sdk";
import { planIdFromPrice } from "@/lib/paddle";

const webhooks = new Webhooks();

/**
 * Accuse réception des notifications Paddle après vérification de signature.
 * Le plan affiché reste sur l'appareil : il s'active via checkout.completed.
 */
export async function POST(request: Request) {
  const secret = process.env.PADDLE_WEBHOOK_SECRET?.trim();
  if (!secret) {
    return Response.json({ error: "Secret webhook Paddle manquant." }, { status: 500 });
  }

  const signature = request.headers.get("paddle-signature");
  if (!signature) {
    return Response.json({ error: "Signature absente." }, { status: 400 });
  }

  const raw = await request.text();

  try {
    const event = await webhooks.unmarshal(raw, secret, signature);
    if (event.eventType === EventName.TransactionCompleted) {
      const planId =
        event.data.items
          .map((item) => (item.price ? planIdFromPrice(item.price.id) : null))
          .find((id) => id != null) ?? null;
      return Response.json({ received: true, planId });
    }
    return Response.json({ received: true });
  } catch {
    return Response.json({ error: "Signature Paddle invalide." }, { status: 400 });
  }
}
