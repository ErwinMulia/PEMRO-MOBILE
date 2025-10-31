Shopping App React Native

Aplikasi belanja mobile berbasis React Native + Expo Router , state management menggunakan Zustand, dan fitur manajemen item yang lengkap.

✨ Fitur Utama

Tambah, hapus, dan edit item belanja

Tandai item sebagai sudah dibeli (purchased)

Cari item berdasarkan nama atau kategori

Notifikasi toast saat aksi sukses/error

📱 Teknologi

React Native & TypeScript

Expo Router

Zustand (state management)

react-native-toast-message

🗂 Struktur Project
/app
  home.tsx         -> Halaman utama daftar item
  add.tsx          -> Halaman tambah item
  detail.tsx       -> Halaman edit item
/components
  ShoppingCard.tsx -> Kartu item belanja
/store
  useShoppingStore.ts -> Store item belanja

🖥 Contoh Penggunaan
Home Screen

Toggle dark mode di kanan atas

Search bar untuk pencarian item

Tambah item dengan tombol "+ Tambah Item"

Add Screen

Isi Nama, Quantity, dan Kategori

Tekan Simpan untuk menambah item

Detail Screen

Edit nama, quantity, kategori

Tekan Simpan Perubahan


🛠 Store Item Belanja
import create from "zustand";
import { v4 as uuidv4 } from "uuid";

export const useShoppingStore = create((set) => ({
  items: [],
  addItem: (item) => set(state => ({ items: [...state.items, { ...item, id: uuidv4() }] })),
  editItem: (id, item) => set(state => ({ items: state.items.map(i => i.id === id ? { ...i, ...item } : i) })),
  deleteItem: (id) => set(state => ({ items: state.items.filter(i => i.id !== id) })),
  togglePurchased: (id) => set(state => ({ items: state.items.map(i => i.id === id ? { ...i, purchased: !i.purchased } : i) })),
}));

📌 Catatan

Gunakan React Native 0.72+ dan Expo Router 2.x+ untuk kompatibilitas penuh

Pastikan <Toast /> ditambahkan di root App.tsx

import Toast from "react-native-toast-message";

export default function App() {
  return (
    <>
      <RootNavigator />
      <Toast />
    </>
  );
}

VIDEO LOOM: https://www.loom.com/share/bb3647d3291648019aa46c860d8c45a3