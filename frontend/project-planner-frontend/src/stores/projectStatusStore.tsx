import { create } from 'zustand';

interface StatusState {
  active: boolean;
  completed: boolean;
  archived: boolean;

  setActive: () => void;
  setCompleted: () => void;
  setArchived: () => void;
}

const useStatusStore = create<StatusState>((set) => ({
  active: true,
  completed: false,
  archived: false,

  setActive: () => set(() => ({
    active: true,
    completed: false,
    archived: false,
  })),
  
  setCompleted: () => set(() => ({
    active: false,
    completed: true,
    archived: false,
  })),
  
  setArchived: () => set(() => ({
    active: false,
    completed: false,
    archived: true,
  })),
}));

export default useStatusStore;
