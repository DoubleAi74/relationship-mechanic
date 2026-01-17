// app/api/user/[uid]/route.js
import { NextResponse } from "next/server";
import { getUserData } from "@/actions/getUserData"; // Reuse your existing action

export async function GET(request, { params }) {
  const { uid } = params;

  if (!uid) {
    return NextResponse.json({ error: "UID is required" }, { status: 400 });
  }

  // Reuse your existing logic
  const result = await getUserData(uid);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 404 });
  }

  return NextResponse.json(result.user);
}
