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
  }"
  :disabled="disabled"
  :autofocus="autofocus"
  :type="nativeType"
  >
    <span>
      <slot></slot>
    </span>
  </button>
</template>


<script setup lang="ts">
import { defineProps,ref } from 'vue';
import type { ButtonProps } from './types';

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

