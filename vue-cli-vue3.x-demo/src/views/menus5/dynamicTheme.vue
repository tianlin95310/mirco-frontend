<template>
  <div class="themes" :class="[theme1Index === 1 ? 'theme1' : 'theme2']">
    <div class="dynamic-theme">
      <div class="dynamic-header">
        <div class="dynamic-title">方案1</div>
      </div>
      <div class="dynamic-center">
        <button class="dynamic-button" @click="changeTheme1">切换主题</button>
      </div>
    </div>

    <div class="dynamic-theme-way2">
      <div class="dynamic-header">
        <div class="dynamic-title">方案2</div>
      </div>
      <div class="dynamic-center">
        <button class="dynamic-button" @click="changeTheme2">切换主题</button>
      </div>
    </div>

    <div class="dynamic-theme-way3">
      <div class="dynamic-header">
        <div class="dynamic-title">方案3</div>
      </div>
      <div class="dynamic-center">
        <button class="dynamic-button" @click="changeTheme3">切换主题</button>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { setTheme } from './theme/themeUtil';
import { theme1, theme2 } from './theme/theme';
import { throttleS } from '../menus3/utils';
const theme1Index = ref(1)
const theme3Index = ref(1)
const changeTheme3 = () => {
  if (theme3Index.value === 1) {
    theme3Index.value = 2
    setTheme(theme2)
  } else {
    theme3Index.value = 1
    setTheme(theme1)
  }
}
// 动态修改link
const changeTheme2Body = () => {
  // 获取所有的link元素
  var links = document.getElementsByTagName('link');
  // 创建一个新的link元素
  var newLink = document.createElement('link');
  newLink.rel = 'stylesheet';
  // 替换所有旧的link元素
  for (var i = 0; i < links.length; i++) {
    var oldLink = links[i];
    if (oldLink.id === 'dynamic') {
      // 复制原有属性到新的link元素
      for (var j = 0, attrs = oldLink.attributes.length; j < attrs; j++) {
        var attr = oldLink.attributes[j];
        console.log('oldLink', oldLink, 'attr', attr.name, attr.value)
        if (attr.name === 'href') {
          const newHref = attr.value.includes('theme1') ? attr.value.replace('theme1', 'theme2') : attr.value.replace('theme2', 'theme1')
          newLink.setAttribute(attr.name, newHref);
        } else {
          newLink.setAttribute(attr.name, attr.value);
        }
      }
      // 替换元素
      // oldLink.parentNode.replaceChild(newLink.cloneNode(true), );
      setTimeout(() => {
        oldLink.parentNode.appendChild(newLink.cloneNode(true))
      }, 0)
      setTimeout(() => {
        oldLink.parentNode.removeChild(oldLink)
      }, 200)
    }

  }
}
const changeTheme2 = throttleS(changeTheme2Body, 300)

const changeTheme1 = () => {
  if (theme1Index.value === 1) {
    theme1Index.value = 2
  } else {
    theme1Index.value = 1
  }
}
</script>
<style lang="scss" scoped>
.themes {
  background-color: white;
}

.dynamic-theme {
  width: 300px;
  height: 400px;
  display: inline-block;
  margin-right: 20px;

  .dynamic-center {
    margin-top: 1px;

    .dynamic-button {
      padding: 8px 16px;
      border-radius: 10%;
    }
  }

  .dynamic-header {
    height: 40px;

    .dynamic-title {
      font-size: 16px;
    }
  }
}

.dynamic-theme-way3 {
  width: 300px;
  height: 400px;
  display: inline-block;
  margin-right: 20px;

  .dynamic-center {
    margin-top: 1px;

    .dynamic-button {
      padding: 8px 16px;
      border-radius: 10%;
    }
  }

  .dynamic-header {
    height: 40px;

    .dynamic-title {
      font-size: 16px;
    }
  }
}

.dynamic-theme-way3 {
  background-color: var(--backgroundColor);

  .dynamic-center {
    background-color: var(--centerBackgroundColor);

    .dynamic-button {
      background-color: var(--buttonColor);
      color: var(--buttonTextColor);
    }
  }

  .dynamic-header {
    background-color: var(--headerBackgroundColor);

    .dynamic-title {
      color: var(--titleColor);
    }
  }
}
</style>