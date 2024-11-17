"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRef, ElementRef } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { createTemplateSchema, CreateTemplate } from "@/lib/schemas";

const categories = [
  { label: "Onboarding", value: "onboarding" },
  { label: "Transactional", value: "transactional" },
  { label: "Reminder", value: "reminder" },
  { label: "Engagement", value: "engagement" },
  { label: "Promotional", value: "promotional" },
] as const;

const AddTemplate = () => {
  const router = useRouter();
  const closeRef = useRef<ElementRef<"button">>(null);

  const form = useForm<CreateTemplate>({
    resolver: zodResolver(createTemplateSchema),
    defaultValues: {
      name: "",
      description: "",
      template: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;

  const onSubmit = async (values: CreateTemplate) => {
    try {
      const res = await fetch("/api/whatsapp-template", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errMsg = await res.json();
        throw new Error(errMsg);
      }

      toast.success("Template created");
      router.refresh();
      form.reset();
      closeRef.current?.click();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="green" className="mb-4">
          <PlusCircle className="mr-2 h-5 w-5" /> Add New Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add new template</DialogTitle>
          <DialogDescription>
            Set up a new template with placeholders.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-wrap gap-8"
          >
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-[47%]">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="My Template"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-[47%]">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="My Template description"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col w-[47%]">
                  <FormLabel>Category</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={isSubmitting}
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? categories.find(
                                (category) => category.value === field.value
                              )?.label
                            : "Select category"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Search category..." />
                        <CommandList>
                          <CommandEmpty>No category found.</CommandEmpty>
                          <CommandGroup>
                            {categories.map((category) => (
                              <CommandItem
                                value={category.label}
                                key={category.value}
                                onSelect={() => {
                                  form.setValue("category", category.value);
                                }}
                              >
                                {category.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    category.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="template"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Template</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="resize-none"
                      rows={6}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="w-full flex justify-end mt-2">
              <DialogClose ref={closeRef} asChild>
                <Button variant="ghost" className="mr-2">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                variant="green"
                type="submit"
                className="w-20"
                disabled={isSubmitting}
              >
                Add
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTemplate;
