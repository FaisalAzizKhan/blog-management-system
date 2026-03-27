interface FieldInterface {
  label: string;
  type: string;
  name: keyof LoginFormData;
}

interface CustomInputProps {
  field: FieldInterface;
  // formData: LoginFormData; 
}
interface LoginFormData {
  email: string;
  password: string;
}


interface FieldInterface {
  label: string;
  type: string;
  name: keyof LoginFormData; // Restrict to valid keys of FormData
}

interface IFieldInterface{
  label: string;
  type: string;
  name: keyof LoginFormData;
}