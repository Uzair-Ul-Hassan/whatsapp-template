import { Template } from "@/types";
import TemplateCard from "./template-card";

const Templates = async () => {
  const res = await fetch(`/api/whatsapp-template`);
  const data: Template[] = await res.json();

  return data.map((template) => (
    <TemplateCard key={template._id} template={template} />
  ));
};

export default Templates;
