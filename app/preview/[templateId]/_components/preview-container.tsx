"use client";

import { useForm } from "react-hook-form";
import { useMemo, useState, useEffect } from "react";

import { Template } from "@/types";

import { Preview } from "./preview";
import { PreviewForm } from "./preview-form";

const fetchTemplate = async (templateId: string) => {
  const res = await fetch(`/api/whatsapp-template/${templateId}`);
  const template: Template = await res.json();
  return template;
};

interface PreviewFormProps {
  templateId: string;
}

export const PreviewContainer = ({ templateId }: PreviewFormProps) => {
  const [template, setTemplate] = useState<Template | null>(null);

  const defaultValues = useMemo(() => {
    if (template === null) return {};

    return template.previewValues.length > 0
      ? template.previewValues.reduce((acc, value, index) => {
          acc[template.templateVars[index].slice(2, -2)] = value;
          return acc;
        }, {} as Record<string, string>)
      : template.templateVars.reduce((acc, tempVar) => {
          acc[tempVar.slice(2, -2)] = "";
          return acc;
        }, {} as Record<string, string>);
  }, [template]);

  const form = useForm({
    defaultValues,
  });

  useEffect(() => {
    fetchTemplate(templateId).then((template) => setTemplate(template));
  }, [templateId]);

  if (!template) return null;

  return (
    <div className="w-full sm:w-[80%] px-3 sm:px-0 mx-auto h-full my-8 flex flex-col-reverse sm:flex-row items-start sm:gap-8">
      <PreviewForm
        form={form}
        defaultValues={defaultValues}
        templateId={template._id}
      />
      <Preview form={form} template={template} />
    </div>
  );
};
