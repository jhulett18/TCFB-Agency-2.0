// src/store/useSelectedAgencyStore.ts
import { create } from "zustand";

type SelectedAgencyStore = {
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
};

export const useSelectedAgencyStore = create<SelectedAgencyStore>((set) => ({
  selectedId: null,
  setSelectedId: (id) => set({ selectedId: id }),
}));
