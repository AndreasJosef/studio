import { create } from "zustand";

export const useStore = create(() => ({
  test: "Ciao!",
}));

export const setState = useStore.setState;
export const getState = useStore.getState;
