import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import Template from "@/models/templateModel";
import { CreateTemplate, createTemplateSchema } from "@/lib/schemas";

import {
  getTemplatePlaceholders,
  validateTemplate,
} from "@/lib/template-service";
import { connectToDb } from "@/lib/db";

/**
 * Handles POST requests to create a new WhatsApp template.
 *
 * @param {Request} req - The request object containing the template data.
 *
 * @returns {Promise<NextResponse>} - A JSON response with the created template data or an error message.
 */
export async function POST(req: Request) {
  const body = await req.json();

  try {
    const parsedBody: CreateTemplate = createTemplateSchema.parse(body);

    if (!validateTemplate(parsedBody.template)) {
      return NextResponse.json("Invalid template", { status: 400 });
    }

    const placeholders = getTemplatePlaceholders(parsedBody.template);

    await connectToDb();

    const template = await Template.create({
      name: parsedBody.name,
      description: parsedBody.description,
      category: parsedBody.category,
      template: parsedBody.template,
      templateVars: placeholders,
    });

    revalidatePath("/");

    return NextResponse.json(template, { status: 201 });
  } catch {
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}

/**
 * Handles GET requests to retrieve all WhatsApp templates.
 *
 * @returns {Promise<NextResponse>} - A JSON response with the list of templates or an error message.
 */
export async function GET() {
  try {
    await connectToDb();

    const templates = await Template.find();

    return NextResponse.json(templates, { status: 200 });
  } catch {
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}
