import { create } from "zustand";

export const useStore = create(() => ({
  test: "Moin!",
}));

export const setState = useStore.setState;
export const getState = useStore.getState;
