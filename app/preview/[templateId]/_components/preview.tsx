"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Template } from "@/types";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent } from "@/components/ui/card";

interface PreviewProps {
  form: UseFormReturn;
  template: Template;
}

export const Preview = ({ form, template }: PreviewProps) => {
  const [checked, setChecked] = useState(false);

  let preview = template.template;

  const formValues = Object.values(form.getValues());

  if (formValues.length > 0) {
    template.templateVars.forEach((tempVar) => {
      const value = form.watch(tempVar.slice(2, -2)) || tempVar;
      preview = preview.replace(tempVar, value);
    });
  }

  return (
    <div className="flex-1">
      <div className="flex justify-center items-center gap-x-4 mb-6">
        <span className="text-sm">Light</span>
        <Switch checked={checked} onCheckedChange={setChecked} />
        <span className="text-sm">Dark</span>
      </div>

      <Card
        className={cn(
          "pt-4 bg-white text-black max-h-min",
          checked && "bg-gray-800 text-gray-200"
        )}
      >
        <CardContent>
          <pre className="whitespace-pre-wrap">{preview}</pre>
        </CardContent>
      </Card>
    </div>
  );
};
