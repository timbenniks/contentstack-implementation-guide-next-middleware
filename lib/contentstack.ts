import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { getContentstackEndpoints, getRegionForString } from "@timbenniks/contentstack-endpoints";

const region = getRegionForString(process.env.NEXT_PUBLIC_CONTENTSTACK_REGION as string);
const endpoints = getContentstackEndpoints(region, true)

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
      host: endpoints.application,
    },
    editButton: {
      enable: true,
      exclude: ["outsideLivePreviewPortal"]
    },
  });

}
