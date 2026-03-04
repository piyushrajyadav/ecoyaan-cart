import { getCartData } from "@/lib/data";
import CartPageClient from "./CartPageClient";

export default async function CartPage() {
  // Using direct data fetching instead of HTTP fetch for Next.js 14 SSR
  // This avoids ECONNREFUSED on Vercel deployments when fetching localhost
  const data = await getCartData();

  return <CartPageClient data={data} />;
}
