"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    username: z.string().min(3, "Kullanici Adi en az 3 karakter"),
    email: z.string().email("gecerli bir email giriniz"),
    password: z.string().min(6, "En az 6 karakter"),
    confirmPassword: z.string().min(1, "Sifre tekrari zorunludur"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Sifreler eslesmiyor",
    path: ["confirmPassword"],
  });

export default function RegisterPage() {
  const toast = useRef(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(data) {
    console.log(data);
    toast.current?.show({
      severity: "success",
      summary: "Kayıt başarılı",
      detail: "İşlem tamamlandı",
      life: 3000,
    });
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText {...register("username")} placeholder="username giriniz" />
      {errors.username && <p>{errors.username.message}</p>}
      <InputText {...register("email")} placeholder="email giriniz" />
      {errors.email && <p>{errors.email.message}</p>}
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Password
            {...field}
            feedback={false}
            toggleMask
            placeholder="parola giriniz"
          />
        )}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <Password
            {...field}
            feedback={false}
            toggleMask
            placeholder="parolanizi tekrar giriniz"
          />
        )}
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      <Toast ref={toast} />
      <Button type="submit" label="Gonder" />
    </form>
  );
}
