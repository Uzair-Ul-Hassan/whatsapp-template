import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { connectToDb } from "@/lib/db";
import Template from "@/models/templateModel";

/**
 * Handles GET requests to retrieve a specific WhatsApp template by ID.
 *
 * @param {Request} _ - The request object (not used in this function).
 * @param {Object} context - The context object containing route parameters.
 * @param {string} context.params.id - The ID of the template to retrieve.
 *
 * @returns {Promise<NextResponse>} - A JSON response with the template data or an error message.
 */
export async function GET(
  _: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    await connectToDb();

    const template = await Template.findById(id);

    if (!template) {
      return NextResponse.json("Template not found", { status: 404 });
    }

    return NextResponse.json(template, { status: 200 });
  } catch {
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}

/**
 * Handles PATCH requests to update a specific WhatsApp template by ID.
 *
 * @param {Request} req - The request object containing the update data.
 * @param {Object} context - The context object containing route parameters.
 * @param {string} context.params.id - The ID of the template to update.
 *
 * @returns {Promise<NextResponse>} - A JSON response with the updated template data or an error message.
 */
export async function PATCH(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    await connectToDb();

    const template = await Template.findByIdAndUpdate(
      id,
      {
        previewValues: body,
      },
      { new: true, runValidators: true }
    );

    if (!template) {
      return NextResponse.json("Template not found", { status: 404 });
    }

    revalidatePath("/");
    revalidatePath(`/preview/${id}`);
    return NextResponse.json(template, { status: 200 });
  } catch {
    return NextResponse.json("Something went wrong", { status: 500 });
  }
}
