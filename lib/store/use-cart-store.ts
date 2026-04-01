"use client";

import { create } from "zustand";

export type CartLine = {
  /** `size-17` / `size-24` for Checkout API, or legacy tier id `single`/`triple`/`five` */
  id: string;
  name: string;
  /** Unit price in EUR (matches single product offer) */
  unitPriceEuro: number;
  quantity: number;
};

type CartState = {
  isOpen: boolean;
  items: CartLine[];
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addTier: (line: Omit<CartLine, "quantity">) => void;
  /** Replace or insert one line with an exact quantity (product page). */
  putLine: (line: CartLine) => void;
  removeLine: (id: string) => void;
  setLineQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
  isOpen: false,
  items: [],

  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),
  toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

  addTier: (line) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === line.id);
      if (existing) {
        return {
          isOpen: true,
          items: state.items.map((i) =>
            i.id === line.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }
      return {
        isOpen: true,
        items: [...state.items, { ...line, quantity: 1 }],
      };
    }),

  putLine: (line) =>
    set((state) => ({
      isOpen: true,
      items: [
        ...state.items.filter((i) => i.id !== line.id),
        {
          ...line,
          quantity: Math.min(99, Math.max(1, line.quantity)),
        },
      ],
    })),

  removeLine: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  setLineQuantity: (id, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((i) => i.id !== id)
          : state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    })),

  clearCart: () => set({ items: [], isOpen: false }),
}));
