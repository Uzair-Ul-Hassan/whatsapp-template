import { PreviewContainer } from "./_components/preview-container";

interface PreviewTemplatePageProps {
  params: {
    templateId: string;
  };
}

export default async function PreviewTemplatePage({
  params: { templateId },
}: PreviewTemplatePageProps) {
  return <PreviewContainer templateId={templateId} />;
}
