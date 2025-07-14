import { create } from 'zustand';

interface StatusState {
  active: boolean;
  finished: boolean;
  archived: boolean;

  setActive: () => void;
  setFinished: () => void;
  setArchived: () => void;
}

const useStatusStore = create<StatusState>((set) => ({
  active: true,
  finished: false,
  archived: false,

  setActive: () => set(() => ({
    active: true,
    finished: false,
    archived: false,
  })),
  
  setFinished: () => set(() => ({
    active: false,
    finished: true,
    archived: false,
  })),
  
  setArchived: () => set(() => ({
    active: false,
    finished: false,
    archived: true,
  })),
}));

export default useStatusStore;
