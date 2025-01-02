export interface Document {
  id: string;
  user_id: string;
  title: string;
  file_url: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}