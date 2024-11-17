"use client";

import { Template } from "@/types";

import TemplateCard from "./template-card";
import { useState, useEffect } from "react";

const fetchData = async () => {
  const res = await fetch(`/api/whatsapp-template`);
  const data: Template[] = await res.json();

  return data;
};

const Templates = () => {
  const [data, setData] = useState<Template[]>([]);

  useEffect(() => {
    fetchData().then((data) => setData(data));
  }, []);

  if (!data) return null;

  return data.map((template) => (
    <TemplateCard key={template._id} template={template} />
  ));
};

export default Templates;
