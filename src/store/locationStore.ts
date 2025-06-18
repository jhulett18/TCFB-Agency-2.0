import { create } from "zustand";

type Location = { lat: number; lng: number } | null;

type LocationStore = {
  userLocation: Location;
  setUserLocation: (location: Location) => void;
};

export const useLocationStore = create<LocationStore>((set) => ({
  userLocation: null,
  setUserLocation: (location) => set({ userLocation: location }),
}));
