<template>
  <button
  ref="_ref"
  class="hs-button"
  :class="{
    [`hs-button--${type}`]:type,
    [`hs-button--${size}`]:size,
    'is-plain':plain,
    'is-round':round,
    'is-circle':circle,
    'is-disabled':disabled,
    'is-loading':loading
  }"
  :disabled="disabled || loading"
  :autofocus="autofocus"
  :type="nativeType"
  >
  <Icon icon="spinner" spin v-if="loading"/>
  <Icon :icon="icon" v-if="icon"/>
    <span>
      <slot></slot>
    </span>
  </button>
</template>


<script setup lang="ts">
import { defineProps,ref } from 'vue';
import type { ButtonProps } from './types';
import Icon from '../Icon/Icon.vue';

defineOptions({
  name:'HsButton'
})

withDefaults(defineProps<ButtonProps>(),{
  nativeType:'button'
})

const _ref = ref<HTMLButtonElement>()
defineExpose({
  ref:_ref
})
</script>

