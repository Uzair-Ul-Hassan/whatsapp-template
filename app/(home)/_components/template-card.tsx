"use client";

import Link from "next/link";
import {
  MessageSquare,
  ShoppingCart,
  Calendar,
  ThumbsUp,
  Package,
  LucideIcon,
  Eye,
} from "lucide-react";

import { Template } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const categoryColors: Record<string, string> = {
  onboarding: "bg-blue-500",
  transactional: "bg-green-500",
  reminder: "bg-yellow-500",
  engagement: "bg-purple-500",
  promotional: "bg-red-500",
};

const iconMap: Record<string, LucideIcon> = {
  onboarding: MessageSquare,
  transactional: ShoppingCart,
  reminder: Calendar,
  engagement: ThumbsUp,
  promotional: Package,
};

interface TemplateCardProps {
  template: Template;
}

// TODO: replace `index` with `_id`
const TemplateCard = ({ template }: TemplateCardProps) => {
  const Icon = iconMap[template.category];
  const color = categoryColors[template.category];
  const lastModified = new Date(template.updatedAt).toDateString();

  return (
    <Card className="hover:scale-[1.09] transition-all ease-out duration-300 hover:shadow-md rounded-md overflow-hidden">
      <CardContent className="p-0">
        <div className="h-48 bg-gradient-to-br from-green-400 to-blue-500 p-6 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <Badge className={`${color} text-white`}>{template.category}</Badge>
            <Icon className="text-white h-8 w-8" />
          </div>
          <div>
            <h2 className="text-white text-xl font-semibold mb-2">
              {template.name}
            </h2>
            <p className="text-white text-sm opacity-90">
              {template.description}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-card p-4 flex justify-between items-center">
        <span className="text-sm text-muted-foreground">
          Last modified: {lastModified}
        </span>
        <Link href={`/preview/${template._id}`} passHref>
          <Button variant="outline" className="group">
            <Eye className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="relative overflow-hidden group">
              <span className="inline-block group-hover:-translate-y-full transition duration-300">
                Preview
              </span>
              <span className="absolute top-full left-0 w-full h-full group-hover:-translate-y-full transition duration-300">
                Preview
              </span>
            </span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
