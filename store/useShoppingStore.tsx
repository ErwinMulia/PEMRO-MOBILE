import { create } from "zustand";
import { nanoid } from "nanoid";

export interface ShoppingItem {
  id: string;
  nama: string;
  quantity: number;
  kategori: string;
  purchased: boolean;
}

interface ShoppingStore {
  items: ShoppingItem[];
  addItem: (item: Omit<ShoppingItem, "id">) => void;
  editItem: (id: string, newItem: Omit<ShoppingItem, "id" | "purchased"> & { purchased: boolean }) => void;
  deleteItem: (id: string) => void;
  togglePurchased: (id: string) => void;
}

export const useShoppingStore = create<ShoppingStore>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, { ...item, id: nanoid() }],
    })),
  editItem: (id, newItem) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, ...newItem } : i)),
    })),
  deleteItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),
  togglePurchased: (id) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, purchased: !i.purchased } : i)),
    })),
}));