import BasicLoadingConstance from "@/components/basic-loading/basicLoading";
import { ref, Ref } from "vue";
let loading: Ref<BasicLoadingConstance | null> = ref(null);
const useBasicLoading = () => {
  const showLoading = (text?: string) => {
    if (!loading.value) {
      loading.value = new BasicLoadingConstance(text);
    }
    loading.value.show();
  };
  const hideLoading = () => {
    loading.value && loading.value.hide();
  };
  return {
    loading: loading && loading.value ? ref(loading.value.isShow) : ref(false),
    showLoading,
    hideLoading,
  };
};
export default useBasicLoading;
