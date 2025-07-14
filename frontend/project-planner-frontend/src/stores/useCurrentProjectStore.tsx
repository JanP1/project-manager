import { create } from "zustand";

interface CurrentProjectState {
  projectId: string | null;
  setProjectId: (id: string) => void;
}

const useCurrentProjectStore = create<CurrentProjectState>((set) => ({
  projectId: null,
  setProjectId: (id) => set({ projectId: id }),
}));

export default useCurrentProjectStore;
