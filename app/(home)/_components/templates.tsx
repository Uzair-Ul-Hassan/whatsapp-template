import { Template } from "@/types";
import TemplateCard from "./template-card";

const Templates = async () => {
  const res = await fetch(
    `${
      process.env.NODE_ENV === "production"
        ? process.env.PROD_HOST
        : process.env.DEV_HOST
    }/api/whatsapp-template`
  );
  const data: Template[] = await res.json();

  return data.map((template) => (
    <TemplateCard key={template._id} template={template} />
  ));
};

export default Templates;
