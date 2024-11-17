import { Template } from "@/types";

import { PreviewContainer } from "./_components/preview-container";

interface PreviewTemplatePageProps {
  params: {
    templateId: string;
  };
}

export default async function PreviewTemplatePage({
  params: { templateId },
}: PreviewTemplatePageProps) {
  const res = await fetch(
    `${process.env.DEV_HOST}/api/whatsapp-template/${templateId}`
  );
  const template: Template = await res.json();

  return <PreviewContainer template={template} />;
}
