<template>
  <div class="async-comp page-container">
    <div class="card">
      <h4>1 import Sync setup </h4>
      <ContentSync></ContentSync>
      
      <h4>2 defineAsyncComponent(delay import Sync setup)</h4>
      <AsyncCompSynContent />

      <h4>3 Suspense + import Sync setup</h4>
      <Suspense>
        <ContentSync></ContentSync>
        <template #fallback>
          <Loading tip="Suspense Loadding..." />
        </template>
      </Suspense>

      <h4>4 Suspense + defineAsyncComponent(delay import Sync setup)</h4>
      <Suspense>
        <AsyncCompSynContent></AsyncCompSynContent>
        <template #fallback>
          <Loading tip="Suspense Loadding..." />
        </template>
      </Suspense>
    </div>

    <div class="card">
      <h4>1 Suspense + import async setup</h4>
      <Suspense>
        <ContentAsync></ContentAsync>
        <template #fallback>
          <Loading tip="Suspense1 Loadding..." />
        </template>
      </Suspense>

      <h4>2 Suspense + defineAsyncComponent(delay import Sync setup)</h4>
      <Suspense>
        <AsyncCompAsyncContent></AsyncCompAsyncContent>
        <template #fallback>
          <Loading tip="Suspense2 Loadding..." />
        </template>
      </Suspense>

      <h4>3 Encapsulation Suspense + import async setup</h4>
      <AsyncComponentContainer>
        <ContentAsync></ContentAsync>
      </AsyncComponentContainer>

      <h4>4 Encapsulation Suspense + defineAsyncComponent(delay import Sync setup)</h4>
      <AsyncComponentContainer>
        <AsyncCompAsyncContent></AsyncCompAsyncContent>
      </AsyncComponentContainer>

      <h4>5 defineAsyncComponent + Encapsulation Suspense + import async setup </h4>
      <DefineSuspenseAsyncContent>
        <ContentAsync></ContentAsync>
      </DefineSuspenseAsyncContent>

      <h4>6 defineAsyncComponent + Encapsulation Suspense + defineAsyncComponent(delay import Sync setup)</h4>
      <DefineSuspenseAsyncContent>
        <AsyncCompAsyncContent></AsyncCompAsyncContent>
      </DefineSuspenseAsyncContent>
    </div>
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

// defineAsyncComponent返回一个sync组件，加载逻辑只会执行一次，加载完毕之后会立即渲染
// Suspense的逻辑则是每一次都会执行，所以刷新和重新进入这个界面的逻辑时不一样的
const AsyncCompSynContent = defineAsyncComponent({
  loader: () =>
    new Promise(function (reslove, reject) {
      setTimeout(() => {
        reslove(import("./asyncComponent/content-sync.vue").finally(() => {
          console.log("content-sync.vue finally");
        }),)
      }, 2000)
    }),
  loadingComponent: Loading,
  errorComponent: Error,
  delay: 100,
  timeout: 10000,
  suspensible: false,
  onError: err => {
    console.log("defineAsyncComponent err", err);
  }
});

// defineAsyncComponent返回一个setup 异步组件
const AsyncCompAsyncContent = defineAsyncComponent({
  loader: () =>
    new Promise(function (reslove, reject) {
      setTimeout(() => {
        reslove(import("./asyncComponent/content-async.vue").finally(() => {
          console.log("content-async.vue finally");
        }),)
      }, 4000)
    }),
  loadingComponent: Loading,
  errorComponent: Error,
  delay: 500,
  timeout: 10000,
  suspensible: false,
  onError: err => {
    console.log("defineAsyncComponent err", err);
  }
});

// defineAsyncComponent返回一个setup 异步组件
const DefineSuspenseAsyncContent = defineAsyncComponent({
  loader: () =>
    new Promise(function (reslove, reject) {
      setTimeout(() => {
        reslove(import("./asyncComponent/asyncComponentContainer.vue").finally(() => {
          console.log("asyncComponentContainer.vue finally");
        }),)
      }, 6000)
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
    AsyncCompSynContent,
    DefineSuspenseAsyncContent
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
  display: flex;
}
</style>
