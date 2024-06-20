// 3rd party imports
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

// local imports
import { redirections } from "@/tools/Redirections";

export async function GET(request: NextRequest) {
  try {
    const key = request.nextUrl.pathname.split("/").slice(2).join("/");
    const response = await redirections.getUrl(key);
    if (typeof response !== "string") return NextResponse.json(response);
    return NextResponse.redirect(response);
  } catch (e) {
    if (e instanceof Error)
      return NextResponse.json({ message: e.message }, { status: 500 });
    return NextResponse.json(
      { message: "Unknown error: " + e },
      { status: 500 }
    );
  }
}
