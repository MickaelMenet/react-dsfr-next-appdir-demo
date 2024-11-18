import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: {
    selectValue: string;
    actionValue: string;
  };
}

export async function POST(request: NextRequest, { params }: Params) {
  const { selectValue, actionValue } = params;
  const formData = await request.formData();
  const roleValue = formData.get("role");

  console.log("roleValue:", roleValue);

  if (typeof roleValue === "string") {
    const redirectUrl = new URL(
      `/${selectValue}/${actionValue}/${roleValue}`,
      request.url
    );
    console.log("Redirecting to:", redirectUrl.href);
    return NextResponse.redirect(redirectUrl);
  }

  console.log("Invalid role data");
  return NextResponse.redirect(
    new URL(`/${selectValue}/${actionValue}`, request.url)
  );
}
