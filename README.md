# Login / Register / Ürün Yönetimi Projesi

---

## 🇹🇷 Türkçe

Bu proje, Next.js App Router kullanılarak geliştirilmiş bir mini uygulamadır.  
Kullanıcı giriş sistemi, form doğrulama ve ürün yönetimi işlemlerini içerir.

---

### 🚀 Kullanılan Teknolojiler

- Next.js (App Router)
- React
- PrimeReact (UI Bileşenleri)
- React Hook Form
- Zod (Form doğrulama)
- TanStack Query (Veri çekme ve mutation işlemleri)

---

### 📂 Sayfalar

#### 🔐 /login

- Kullanıcı adı ve şifre ile giriş formu
- React Hook Form + Zod ile doğrulama
- POST isteği:  
  https://dummyjson.com/auth/login
- Token `localStorage`’a kaydedilir
- Başarılı girişte `/products` sayfasına yönlendirme
- Hatalı girişte ekranda hata mesajı gösterilir

---

#### 📝 /register

- Kullanıcı adı, email, şifre ve şifre tekrar alanları
- Doğrulamalar:
  - Kullanıcı adı: en az 3 karakter
  - Email: geçerli format
  - Şifre: en az 6 karakter
  - Şifre tekrar: şifre ile aynı olmalı
- Submit sonrası:
  - Veriler console’a yazdırılır
  - Toast ile başarı mesajı gösterilir
  - Form resetlenir

---

#### 📦 /products

- Ürün listesi şu adresten çekilir:  
  https://dummyjson.com/products
- PrimeReact DataTable ile listelenir

##### Gösterilen kolonlar

- ID
- Ürün başlığı
- Fiyat

---

#### ➕ Ürün Ekleme Formu

- Ürün başlığı → zorunlu
- Ürün fiyatı → zorunlu, sayı ve 0’dan büyük olmalı
- POST isteği:  
  https://dummyjson.com/products/add

Başarılı işlem sonrası:

- Toast bildirimi gösterilir
- `invalidateQueries` ile liste güncellenir
- Form resetlenir

---

### 🔁 Veri Akışı

- `useQuery` → ürün listesini çeker
- `useMutation` → yeni ürün ekler
- `invalidateQueries` → veri güncellenmesini sağlar

---

### ⚠️ Not

Kullanılan API (`dummyjson.com`) mock bir servistir.  
Eklenen ürünler kalıcı olarak veri tabanına yazılmaz.

---

### 🛠️ Kurulum

```bash
npm install
npm run dev
```

---

### 📌 Özellikler

- Zod ile güçlü form doğrulama
- React Hook Form ile performanslı form yönetimi
- TanStack Query ile veri yönetimi
- PrimeReact ile modern UI bileşenleri

---

## EN English

This project is a mini application built with Next.js App Router.  
It includes authentication UI, form validation, and product management features.

---

### 🚀 Technologies

- Next.js (App Router)
- React
- PrimeReact (UI Components)
- React Hook Form
- Zod (Validation)
- TanStack Query (Data Fetching & Mutations)

---

### 📂 Pages

#### 🔐 /login

- Username & password login form
- Validation with React Hook Form + Zod
- POST request:  
  https://dummyjson.com/auth/login
- Token is saved to `localStorage`
- Redirect to `/products` on success
- Displays error message on failure

---

#### 📝 /register

- Fields:
  - Username
  - Email
  - Password
  - Confirm Password
- Validations:
  - Username: min 3 characters
  - Email: valid format
  - Password: min 6 characters
  - Confirm Password must match
- On submit:
  - Logs data to console
  - Shows success Toast
  - Resets form

---

#### 📦 /products

- Fetch products from:  
  https://dummyjson.com/products
- Display using PrimeReact DataTable

##### Columns

- ID
- Title
- Price

---

#### ➕ Add Product Form

- Title → required
- Price → required, must be a number greater than 0
- POST request:  
  https://dummyjson.com/products/add

On success:

- Shows Toast notification
- Invalidates queries
- Resets form

---

### 🔁 Data Flow

- `useQuery` → fetch product list
- `useMutation` → add product
- `invalidateQueries` → refresh data

---

### ⚠️ Note

The API (`dummyjson.com`) is a mock service.  
Added products may not persist after refresh.

---

### 🛠️ Setup

```bash
npm install
npm run dev
```

---

### 📌 Features

- Form validation with Zod
- Efficient form handling with React Hook Form
- Data management with TanStack Query
- Modern UI with PrimeReact

---

## 👤 Author

Hamit
