import { InputHTMLAttributes } from "react";

export interface InputElementProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id?: string;
  key?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}