import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe-server";

/**
 * Confirms a Checkout Session after redirect (read-only, for UI).
 * For inventory / fulfillment, add a Stripe webhook later.
 */
export async function GET(request: Request) {
  if (!process.env.STRIPE_SECRET_KEY?.trim()) {
    return NextResponse.json(
      { error: "STRIPE_SECRET_KEY is not set" },
      { status: 500 },
    );
  }

  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");
  if (!sessionId || !sessionId.startsWith("cs_")) {
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      payment_status: session.payment_status,
      status: session.status,
      amount_total: session.amount_total,
      currency: session.currency,
      customer_email:
        session.customer_details?.email ?? session.customer_email ?? null,
    });
  } catch {
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }
}
