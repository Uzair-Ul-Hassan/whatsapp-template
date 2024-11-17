import { Template } from "@/types";

import TemplateCard from "./template-card";

const fetchData = async () => {
  const res = await fetch(
    `${
      process.env.NODE_ENV === "production"
        ? process.env.PROD_HOST
        : "http://localhost:3000"
    }/api/whatsapp-template`
  );
  const data: Template[] = await res.json();

  return data;
};

const Templates = async () => {
  const data = await fetchData();

  return data.map((template) => (
    <TemplateCard key={template._id} template={template} />
  ));
};

export default Templates;
