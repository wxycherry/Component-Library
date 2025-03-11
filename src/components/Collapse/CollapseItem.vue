<template>
  <div
  class="hs-collapse-item"
  :class="{
    'is-disabled':disabled,
  }"
  >
    <!-- title -->
    <div class="hs-collapse-item__header"
    :class="{
      'is-active':isActive,
      'is-disabled':disabled,
    }"
    :id="`item-header-${name}`"
     @click="handleClick">
      <slot name="title">{{ title }}</slot>
    </div>
    <Transition name="slide" v-on="transitionEvents">
      <!-- content -->
       <!-- 为了解决如果出现padding-bottom而导致动画出现卡顿的问题 -->
       <div class="hs-collapse-item__wrapper"  v-show="isActive">
          <div class="hs-collapse-item__content" :id="`item-content-${name}`" >
            <slot></slot>
          </div>
       </div>

    </Transition>
  </div>
</template>
<script setup lang="ts">
import { inject ,computed} from 'vue';
import type {CollapseItemProps} from './types'
import {CollapseContextKey} from './types'
defineOptions({
  name:'HsCollapseItem'
})
const props = defineProps<CollapseItemProps>()
const collapseContext = inject(CollapseContextKey)
const isActive = computed(()=>collapseContext?.activeNames.value.includes(props.name))
const handleClick = ()=>{
  if(props.disabled) {return }
  collapseContext?.handleItemClick(props.name)
}
const transitionEvents:Record<string,(el:HTMLElement)=>void> = {
  beforeEnter(el) {
    el.style.height = '0px';
    el.style.overflow = 'hidden';
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`;
  },
  afterEnter(el) {
    el.style.height = '';
    el.style.overflow = '';
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`;
    el.style.overflow = 'hidden';
  },
  leave(el) {
    el.style.height = '0px';
  },
  afterLeave(el) {
    el.style.height = '';
    el.style.overflow='';
  }
};
</script>
<style>

</style>
