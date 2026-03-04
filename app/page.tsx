import { CartResponse } from "@/types/cart";
import CartPageClient from "./CartPageClient";

async function getCartData(): Promise<CartResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/cart`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch cart data");
  }

  return res.json();
}

export default async function CartPage() {
  const data = await getCartData();

  return <CartPageClient data={data} />;
}
