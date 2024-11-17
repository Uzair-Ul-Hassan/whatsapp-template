import { Template } from "@/types";
import { PreviewContainer } from "./_components/preview-container";

// interface PreviewTemplatePageProps {
//   params: {
//     templateId: string;
//   };
// }

// const fetchTemplate = async (templateId: string) => {
const fetchTemplate = async () => {
  // const res = await fetch(
  //   `http://localhost:3000/api/whatsapp-template/${templateId}`
  // );
  // const template: Template = await res.json();
  const template: Template = {
    _id: "1",
    name: "Template 1",
    description: "This is a template",
    category: "Category 1",
    template: "Hello {{1}}",
    templateVars: ["{{1}}"],
    previewValues: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return template;
};

export default async function PreviewTemplatePage() {
//   params: { templateId },
// }: PreviewTemplatePageProps) {
  // const template = await fetchTemplate(templateId);
  const template = await fetchTemplate();

  return <PreviewContainer template={template} />;
}
