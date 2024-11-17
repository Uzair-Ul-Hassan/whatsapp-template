import { PreviewContainer } from "./_components/preview-container";
import { getTemplateById } from "@/actions/template";

interface PreviewTemplatePageProps {
  params: {
    templateId: string;
  };
}

// const fetchTemplate = async (templateId: string) => {
//   const res = await fetch(
//     `${
//       process.env.NODE_ENV === "production"
//         ? process.env.PROD_HOST
//         : process.env.DEV_HOST
//     }/api/whatsapp-template/${templateId}`
//   );
//   const template: Template = await res.json();
//   return template;
// };

export default async function PreviewTemplatePage({
  params: { templateId },
}: PreviewTemplatePageProps) {
  // const template = await fetchTemplate(templateId);
  const template = await getTemplateById(templateId);

  return <PreviewContainer template={template!} />;
}
