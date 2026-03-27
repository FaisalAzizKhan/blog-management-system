interface AuthState {
  user: User | null;
  token: string | null;
  expiresIn: number | null;
}
interface CartState {
  cart: any;
}

interface User {
  id: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  image?: string;
  
}
const initialState: AuthState = {
  user: null,
  token: null,
  expiresIn: null,
};

