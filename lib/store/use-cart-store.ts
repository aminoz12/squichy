"use client";

import { create } from "zustand";

export type CartLine = {
  /** Matches pricing tier id */
  id: string;
  name: string;
  /** Display price for one bundle */
  unitPrice: number;
  quantity: number;
  stripeUrl: string;
};

type CartState = {
  isOpen: boolean;
  items: CartLine[];
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  addTier: (line: Omit<CartLine, "quantity">) => void;
  removeLine: (id: string) => void;
  setLineQuantity: (id: string, quantity: number) => void;
  /** Redirects to Stripe for the first line (Payment Links are one product per URL). */
  checkoutFirstLine: () => void;
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

  checkoutFirstLine: () => {
    const first = get().items[0];
    if (!first) return;
    if (typeof window !== "undefined") {
      window.location.assign(first.stripeUrl);
    }
  },
}));
