import { IStore } from '@/types/store.interface';
import { create } from 'zustand'
import { participantsSlice } from './slices/participantsSlice';

export const useStore = create<IStore>()(
    (set) => ({
      ...participantsSlice(set)
    }),
);