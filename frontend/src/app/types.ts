export interface noteType {
  id?: number;
  title: string | undefined | null;
  content: string | undefined | null;
  category: string | undefined | null;
  created_at?: string | undefined | null;
}

export interface SignupFormType {
  id?: number | undefined | null;
  name: string | undefined | null;
  email: string | undefined | null;
  password: string | undefined | null;
}
export interface LoginFormType {
  email: string | undefined | null;
  password: string | undefined | null;
}
