import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { path: string[] } }
) {
  const apiUrl = `https://moloyal.com/test/mosave/customerapi/${params.path.join(
    "/"
  )}`;
  const body = await req.text();

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.text();
  return new NextResponse(data, {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
