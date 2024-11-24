export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export interface UsersState {
  usersList: UserDataType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  searchKey: string;
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface LoginResponse {
  token: "string";
}

export interface UserDataType {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface FetchUserResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: UserDataType[];
}

export interface CreateOrUpdateUserProps {
  show: boolean;
  setShow: (state: boolean) => void;
  userData?: UserDataType;
}
