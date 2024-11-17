"use server";

import Template from "@/models/templateModel";
import { Template as TemplateType } from "@/types";

export const getAllTemplates = async () => {
  const templates: TemplateType[] = await Template.find();

  return templates;
};

export const getTemplateById = async (id: string) => {
  const template: TemplateType | null = await Template.findById(id);

  return template;
};
