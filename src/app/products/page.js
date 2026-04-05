"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

async function fetchProducts() {
  const res = await fetch("https://dummyjson.com/products");
  if (!res.ok) {
    throw new Error(`HTTP Hata: ${res.status}`);
  }
  return res.json();
}

async function createPost(newData) {
  const res = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newData),
  });
  if (!res.ok) throw new Error(`HTTP Hata: ${res.status}`);

  return res.json();
}

const schema = z.object({
  title: z.string().min(1, "Urun Basligi Bos Birakilamaz"),
  price: z.coerce.number().min(1, "Urun Ucreti 1'den buyuk olmali"),
});

export default function ProductsPage() {
  const queryClient = useQueryClient();
  const toast = useRef(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.current?.show({
        severity: "success",
        summary: "Urun Eklendi",
        detail: "İşlem tamamlandı",
        life: 3000,
      });
      reset();
    },
    onError: (error) => {
      toast.current?.show({
        severity: "error",
        summary: "Urun Eklenemedi",
        detail: error.message,
        life: 3000,
      });
    },
  });

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  function onSubmit(data) {
    mutation.mutate(data);
  }

  if (isLoading) return <p>Yukleniyor...</p>;
  if (isError) return <p>Hata: {error.message}</p>;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputText {...register("title")} placeholder="Urun Basligi" />
        {errors.title && <p>{errors.title.message}</p>}
        <InputText {...register("price")} placeholder="Urun Fiyati" />
        {errors.price && <p>{errors.price.message}</p>}
        <Button
          type="submit"
          label={mutation.isPending ? "Ekleniyor..." : "Urun Ekle"}
          disabled={mutation.isPending}
        />
      </form>
      <Toast ref={toast} />
      <DataTable value={data.products}>
        <Column field="id" header="ID" />
        <Column field="title" header="Urun Basligi" />
        <Column field="price" header="Urun Fiyati" />
      </DataTable>
    </>
  );
}
