import { IApplicationSlice } from '@/types/applicationSlice.interface';
import { IParticipantSlice } from '@/types/participantSlice.interface';
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { applicationSlice } from './slices/applicationSlice';
import { participantSlice } from './slices/participantSlice';

export const useBoundStore = create<IApplicationSlice & IParticipantSlice>()(
  devtools(
    persist(
      (...a) => ({
        ...applicationSlice(...a),
        ...participantSlice(...a),
      }),
      {
        name: 'europe-open-store'
      }
    )
  )
);