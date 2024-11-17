export type Template = {
  _id: string;
  name: string;
  description: string;
  category: string;
  template: string;
  templateVars: string[];
  preview?: string;
  previewValues: string[];
  createdAt: Date;
  updatedAt: Date;
};
