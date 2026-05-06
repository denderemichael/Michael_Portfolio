export interface Project {
  id: string;
  title: string;
  description: string;
  image_url?: string;
  view_link?: string;
  layout?: 'standard' | 'featured' | 'mobile';
  created_at?: string;
}
