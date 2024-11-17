"use client";

import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PreviewFormProps {
  form: UseFormReturn;
  defaultValues: Record<string, string>;
  templateId: string;
}

export const PreviewForm = ({
  form,
  defaultValues,
  templateId,
}: PreviewFormProps) => {
  const router = useRouter();
  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: Record<string, string>) => {
    const previewValues = Object.values(values);

    try {
      const res = await fetch(`/api/whatsapp-template/${templateId}`, {
        method: "PATCH",
        body: JSON.stringify(previewValues),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const errMsg = await res.json();
        throw new Error(errMsg);
      }
      toast.success("Template saved successfully");
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Card className="flex-1 shadow-md w-full">
      <CardHeader>
        <CardTitle>Template Placeholders</CardTitle>
        <CardDescription>
          Fill in the fields below to preview the template in realtime
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {Object.entries(defaultValues).map(([key]) => (
              <FormField
                key={key}
                name={key}
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">{key}</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button disabled={isSubmitting} variant="green" className="ml-auto">
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
