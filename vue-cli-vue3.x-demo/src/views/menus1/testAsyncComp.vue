<template>
  <div class="async-comp page-container">
    <h4>同步的setup直接使用</h4>
    <ContentSync></ContentSync>
    <AsyncCompSynContent />

    <h4>同步的setup搭配外部Suspense使用</h4>
    <Suspense>
      <ContentSync></ContentSync>
      <template #fallback>
        <Loading />
      </template>
    </Suspense>
    <Suspense>
      <AsyncCompSynContent></AsyncCompSynContent>
      <template #fallback>
        <Loading />
      </template>
    </Suspense>
    <h4>1异步的setup搭配外部Suspense使用</h4>
    <Suspense>
      <ContentAsync></ContentAsync>
      <template #fallback>
        <Loading />
      </template>
    </Suspense>
    <h4>2异步的setup搭配外部的Suspense使用</h4>
    <Suspense>
      <AsyncCompAsyncContent></AsyncCompAsyncContent>
      <template #fallback>
        <Loading />
      </template>
    </Suspense>

    <h4>4异步的setup搭配封装的Suspense使用</h4>
    <AsyncComponentContainer>
      <template #child>
        <AsyncCompAsyncContent></AsyncCompAsyncContent>
      </template>
    </AsyncComponentContainer>

    <h4>3异步的setup搭配封装的Suspense使用</h4>
    <AsyncComponentContainer>
      <template #child>
        <ContentAsync></ContentAsync>
      </template>
    </AsyncComponentContainer>

    <!-- <h4>异步的setup直接使用会报错</h4>
    <AsyncCompAsyncContent />
    <ContentAsync /> -->
  </div>
</template>
<script>
/*eslint-disable*/
import { defineAsyncComponent } from "vue";
import Loading from "./asyncComponent/loading.vue";
import Error from "./asyncComponent/error.vue";
import AsyncComponentContainer from "./asyncComponent/asyncComponentContainer.vue";
import ContentAsync from "./asyncComponent/content-async.vue";
import ContentSync from "./asyncComponent/content-sync.vue";

// 异步组件
const AsyncCompAsyncContent = defineAsyncComponent({
  loader: () =>
    import("./asyncComponent/content-async.vue").finally(() => {
      console.log("content-async.vue finally");
    }),
  loadingComponent: Loading,
  errorComponent: Error,
  delay: 2000,
  timeout: 10000,
  suspensible: false,
  onError: err => {
    console.log("defineAsyncComponent err", err);
  }
});
// defineAsyncComponent一个sync组件
const AsyncCompSynContent = defineAsyncComponent({
  loader: () =>
    import("./asyncComponent/content-sync.vue").finally(() => {
      console.log("content-sync.vue finally");
    }),
  loadingComponent: Loading,
  errorComponent: Error,
  delay: 1000,
  timeout: 10000,
  suspensible: false,
  onError: err => {
    console.log("defineAsyncComponent err", err);
  }
});
export default {
  name: "TestAsyncComp",
  components: {
    Loading,
    AsyncComponentContainer,
    ContentAsync,
    ContentSync,
    AsyncCompAsyncContent,
    AsyncCompSynContent
  },
  setup() {
    console.log("TestAsyncComp", "TestAsyncComp setup");
  }
};
</script>

<style>
.async-comp {
  background-color: aquamarine;
  position: relative;
}
</style>
