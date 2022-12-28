import BasicLoadingConstance from "@/components/basic-loading/basicLoading";
let loading: BasicLoadingConstance | null = null;
const useBasicLoading = () => {
  const showLoading = (text?: string) => {
    if (!loading) {
      loading = new BasicLoadingConstance(text);
    }
    loading.show();
  };
  const hideLoading = () => {
    loading && loading.hide();
  };
  return {
    showLoading,
    hideLoading,
  };
};
export default useBasicLoading;
