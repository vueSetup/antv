<template>
  <micro-app v-bind="props" />
</template>
<script lang="ts" setup>
interface Props {
  /**
   * 应用名称
   */
  name: string;
  /**
   * 应用地址
   */
  url: string;
  /**
   * 子应用的基础路由
   */
  baseroute: string;
  /**
   * 是否使用内联script
   */
  inline?: boolean;
  /**
   * 卸载时是否强制删除缓存资源
   */
  destroy?: boolean;
  /**
   * 禁用样式隔离
   */
  disableScopecss?: boolean;
  /**
   * 禁用js沙箱
   */
  disableSandbox?: boolean;
  /**
   * 是否开启ssr模式
   */
  ssr?: string | boolean;
  /**
   * 是否开启keep-alive模式
   */
  ['keep-alive']?: string | boolean;
  /**
   * 是否开启shadowDOM
   */
  shadowDOM?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  baseroute: '',
});
</script>
