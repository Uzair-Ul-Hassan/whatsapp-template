import TemplateCard from "./template-card";
import { getAllTemplates } from "@/actions/template";

// const fetchData = async () => {
//   const res = await fetch(
//     `${
//       process.env.NODE_ENV === "production"
//         ? process.env.PROD_HOST
//         : process.env.DEV_HOST
//     }/api/whatsapp-template`
//   );
//   const data: Template[] = await res.json();

//   return data;
// };

const Templates = async () => {
  // const data = await fetchData();
  const data = await getAllTemplates();

  return data.map((template) => (
    <TemplateCard key={template._id} template={template} />
  ));
};

export default Templates;
