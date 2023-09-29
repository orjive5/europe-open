import { IParticipantSlice } from "@/types/participantSlice.interface";
import { StateCreator } from "zustand";

export const participantSlice: StateCreator<IParticipantSlice> = (set) => ({
    videoLoading: true,
    setVideoLoading: (state: boolean) =>
		set(() => ({ videoLoading: state })),
});