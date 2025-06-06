import { NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/sessionOptions";

export async function GET(request: NextRequest) {
  const session = await getIronSession(request, request, sessionOptions);

  if (!session.isLoggedIn) {
    return new Response(JSON.stringify({ isLoggedIn: false }), { status: 401 });
  }

  return new Response(JSON.stringify({ isLoggedIn: true, user: session.user }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
