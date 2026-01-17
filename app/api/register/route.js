// app/api/user/create/route.js
import { NextResponse } from "next/server";
import { createUserRecord } from "@/actions/getUserData";

export async function POST(request) {
  try {
    // Parse the JSON body from the mobile app
    const body = await request.json();
    const { firebaseUid, email, targetDays } = body;

    // 1. Validate input
    if (!firebaseUid || !email || !targetDays) {
      return NextResponse.json(
        { error: "Missing required fields: firebaseUid, email, or targetDays" },
        { status: 400 },
      );
    }

    // 2. Call your existing server action logic
    const result = await createUserRecord(
      firebaseUid,
      email,
      parseInt(targetDays, 10),
    );

    // 3. Handle result
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }, // Or 409 if user exists
      );
    }

    // 4. Return success
    return NextResponse.json(result.user, { status: 201 });
  } catch (error) {
    console.error("API Create User Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
