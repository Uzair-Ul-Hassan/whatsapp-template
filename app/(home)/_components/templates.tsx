import { Template } from "@/types";

import TemplateCard from "./template-card";

const fetchData = async () => {
  // const res = await fetch(`http://localhost:3000/api/whatsapp-template`);
  // const data: Template[] = await res.json();
  const data: Template[] = [];

  return data;
};

const Templates = async () => {
  const data = await fetchData();

  return data.map((template) => (
    <TemplateCard key={template._id} template={template} />
  ));
};

export default Templates;
