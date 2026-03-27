interface User {
  users_id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string | null;
  phone: string | null;
  profile_image: string | null;
  is_active: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
}
