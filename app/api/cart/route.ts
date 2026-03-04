import { NextResponse } from "next/server";
import { getCartData } from "@/lib/data";

export async function GET() {
    const data = await getCartData();
    return NextResponse.json(data);
}
