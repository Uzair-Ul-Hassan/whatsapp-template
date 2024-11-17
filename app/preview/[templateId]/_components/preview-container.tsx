"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";

import { Template } from "@/types";

import { Preview } from "./preview";
import { PreviewForm } from "./preview-form";

interface PreviewFormProps {
  template: Template;
}

export const PreviewContainer = ({ template }: PreviewFormProps) => {
  const defaultValues = useMemo(() => {
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
