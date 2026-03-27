// types.ts or inside your Signup component file

 interface SignupFormData {
  full_name: string;
  email: string;
  date_of_birth: string;
  password: string;
  confirmPassword: string;
}

 interface FieldInterfaceSignup {
  label: string;
  type: string;
  css?: string;
  name: keyof SignupFormData;
}


 interface CustomInputProps {
  field: FieldInterface;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
