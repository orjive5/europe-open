export interface IStore {
    videoLoading: boolean;
    setVideoLoading(loading: boolean): {
      loading: boolean;
    };
    // activeTab: string,
    // switchTab(activeTab: string): {
    //   activeTab: string;
    // };
}