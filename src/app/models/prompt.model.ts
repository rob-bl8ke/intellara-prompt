export interface Prompt {
  id: string;
  title: string;
  description: string;
  content: string;
  tags: string[];
  category: string;
  createdDate: Date;
  author?: string;
}