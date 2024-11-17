"use server";

import { connectToDb } from "@/lib/db";
import Template from "@/models/templateModel";
import { Template as TemplateType } from "@/types";

export const getAllTemplates = async () => {
  await connectToDb();

  const templates: TemplateType[] = await Template.find();

  return templates;
};

export const getTemplateById = async (id: string) => {
  await connectToDb();

  const template: TemplateType | null = await Template.findById(id);

  return template;
};
