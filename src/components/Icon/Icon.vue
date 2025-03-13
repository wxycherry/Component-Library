<template>
  <i class="hs-icon" :class="{ [`hs-icon--${type}`]: type }" :style="customStyles" v-bind="$attrs">
    <font-awesome-icon v-bind="filteredProps "/>
  </i>
</template>
<script setup lang="ts">
import {computed} from 'vue'
import {omit} from 'lodash-es'
import type {IconProps} from './types'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
defineOptions({
  name: 'HsIcon',
  inheritAttrs: false
})
const props = defineProps<IconProps>()
const filteredProps = computed(()=>omit(props, ['type','color']))
const customStyles = computed(() => {
  return props.color ? { color: props.color } : {};
});
</script>