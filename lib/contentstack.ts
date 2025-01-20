import ContentstackLivePreview from "@contentstack/live-preview-utils";

export function initLivePreview() {
  ContentstackLivePreview.init({
    ssr: true,
    enable: true,
    mode: "builder",
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

}
