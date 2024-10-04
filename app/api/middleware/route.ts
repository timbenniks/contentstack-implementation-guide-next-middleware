import contentstack from "@contentstack/delivery-sdk";
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const content_type_uid = searchParams.get("content_type_uid")
  const entry_uid = searchParams.get("entry_uid")
  const live_preview = searchParams.get("live_preview")

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("api_key", process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string);
  headers.append("access_token", process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN as string);

  headers.append("preview_token", process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW_TOKEN as string);
  headers.append("live_preview", live_preview as string);

  const hostname = process.env.NEXT_PUBLIC_CONTENTSTACK_REGION === 'EU' ? "eu-rest-preview.contentstack.com" : "rest-preview.contentstack.com";
  const environment = process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string;
  const url = `https://${hostname}/v3/content_types/${content_type_uid}/entries/${entry_uid}?environment=${environment}`

  const res = await fetch(url, {
    method: "GET",
    headers: headers,
  });

  const result = await res.json();
  const { entry } = result

  if (process.env.NEXT_PUBLIC_CONTENTSTACK_EDITABLE_TAGS) {
    contentstack.Utils.addEditableTags(entry, 'page', true);
  }

  return NextResponse.json(entry)
}