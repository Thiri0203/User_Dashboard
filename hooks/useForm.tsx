"use client";

import { useState } from "react";
import { CreateUserSchema } from "@/schemas/UserSchema";
import { User } from "@/types/user";

export function useForm(
  onAdd: (user: Omit<User, "id">) => void
) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = CreateUserSchema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    onAdd({
      name: form.name,
      email: form.email,
      phone: form.phone,
      company: { name: form.company },
    });

    setForm({
      name: "",
      email: "",
      phone: "",
      company: "",
    });

    setErrors({});
  };

  return {
    form,
    errors,
    setForm,
    handleSubmit,
  };
}