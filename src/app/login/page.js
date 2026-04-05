"use client";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

const schema = z.object({
  username: z.string().min(1, "Kullanici Adi Zorunludur"),
  password: z.string().min(6, "Parola Zorunludur"),
});

export default function LoginPage() {
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    const res = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });

    if (!res.ok) {
      setLoginError("Kullanıcı adı veya şifre hatalı");
      return;
    }

    const tokenData = await res.json();
    const token = tokenData.accessToken;
    localStorage.setItem("token", token);
    reset();
    router.push("/products");
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText
        {...register("username")}
        placeholder="Kullanici Adi Giriniz"
      />
      {errors.username && <p>{errors.username.message}</p>}
      {loginError && <p>{loginError}</p>}
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Password
            {...field}
            feedback={false}
            toggleMask
            placeholder="Parola Giriniz"
          />
        )}
      />
      {errors.password && <p>{errors.password.message}</p>}
      <Button type="submit" label="Gonder" />
    </form>
  );
}
