import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Using server-side client for better security
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, city, service } = body;

    // 1. Backend Validation
    if (!name || !phone || !city) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // 2. Insert into the table you just created in the screenshot
    const { data, error } = await supabase
      .from("leads")
      .insert([{ name, phone, city, service }])
      .select();

    if (error) throw error;

    return NextResponse.json({ message: "Success", data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}