"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Page } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import ContentstackLivePreview from "@contentstack/live-preview-utils";

export default function Home() {
  const searchParams = useSearchParams();
  const live_preview = searchParams.get("live_preview");
  const content_type_uid = searchParams.get("content_type_uid");
  const entry_uid = searchParams.get("entry_uid");

  const [page, setPage] = useState<Page>();

  const getContent = async () => {
    const result = await fetch(
      // this could be any external URL
      `/api/middleware?content_type_uid=${content_type_uid}&entry_uid=${entry_uid}&live_preview=${live_preview}`
    );

    const page = await result.json();
    setPage(page);
  };

  useEffect(() => {
    ContentstackLivePreview.init({
      ssr: true,
      enable: true,

      stackDetails: {
        apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
        environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,
      },
      clientUrlParams: {
        host:
          process.env.NEXT_PUBLIC_CONTENTSTACK_REGION === "EU"
            ? "eu-app.contentstack.com"
            : "app.contentstack.com",
      },
      editButton: {
        enable: true,
      },
    });

    getContent();
  }, []);

  return (
    <main className="max-w-screen-2xl mx-auto">
      <section className="p-4">
        {live_preview ? (
          <ul className="mb-8 text-sm">
            <li>
              live_preview_hash: <code>{live_preview}</code>
            </li>
            <li>
              content_type_uid: <code>{content_type_uid}</code>
            </li>
            <li>
              entry_uid: <code>{entry_uid}</code>
            </li>
          </ul>
        ) : null}

        {page?.title ? (
          <h1
            className="text-4xl font-bold mb-4"
            {...(page?.$ && page?.$.title)}
          >
            {page?.title}
          </h1>
        ) : null}

        {page?.description ? (
          <p className="mb-4" {...(page?.$ && page?.$.description)}>
            {page?.description}
          </p>
        ) : null}

        {page?.image ? (
          <Image
            className="mb-4"
            width={300}
            height={300}
            src={page?.image.url}
            alt={page?.image.title}
            {...(page?.image?.$ && page?.image?.$.url)}
          />
        ) : null}

        {page?.rich_text ? (
          <div
            {...(page?.$ && page?.$.rich_text)}
            dangerouslySetInnerHTML={{ __html: page?.rich_text }}
          />
        ) : null}
      </section>
    </main>
  );
}
