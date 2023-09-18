import { IStore } from "@/types/store.interface";

export const participantsSlice = (set: any): IStore => ({
    videoLoading: true,
    setVideoLoading: (state: boolean) =>
		  set(() => ({ videoLoading: state })),
    // activeTab: 'Projects',
    // switchTab: (state: string) =>
	// 	  set(() => ({ activeTab: state })),
});