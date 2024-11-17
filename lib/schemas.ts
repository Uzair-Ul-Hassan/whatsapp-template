import { z } from "zod";

export const createTemplateSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name is required" }),
  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description is required" }),
  category: z.enum(
    ["onboarding", "transactional", "reminder", "engagement", "promotional"],
    { required_error: "Please select a category" }
  ),
  template: z
    .string({ required_error: "Template is required" })
    .min(1, { message: "Template is required" }),
});

export type CreateTemplate = z.infer<typeof createTemplateSchema>;
