import { Template } from "@/types";
import { PreviewContainer } from "./_components/preview-container";

interface PreviewTemplatePageProps {
  params: {
    templateId: string;
  };
}

const fetchTemplate = async (templateId: string) => {
  const res = await fetch(
    `${process.env.PROD_HOST}/api/whatsapp-template/${templateId}`
  );
  const template: Template = await res.json();

  return template;
};

export default async function PreviewTemplatePage({
  params: { templateId },
}: PreviewTemplatePageProps) {
  const template = await fetchTemplate(templateId);

  return <PreviewContainer template={template} />;
}
