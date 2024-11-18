import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const selectValue = formData.get("select");
  const actionValue = formData.get("action");

  console.log("selectValue:", selectValue);
  console.log("actionValue:", actionValue);

  if (typeof selectValue === "string" && typeof actionValue === "string") {
    const redirectUrl = new URL(`/${selectValue}/${actionValue}`, request.url);
    console.log("Redirecting to:", redirectUrl.href);
    return NextResponse.redirect(redirectUrl);
  }

  console.log("Invalid form data");
  return NextResponse.redirect(new URL("/", request.url));
}
