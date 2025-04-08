<template>
  <div
    class="hs-tooltip"
    v-on = 'outerevents'
    ref="popperContainerNode"
  >
  <!-- 触发器 -->
    <div
      class="hs-tooltip__trigger"
      ref="triggerNode"
      v-on = 'events'
    >
      <slot></slot>
    </div>
    <!-- 展示区 -->
    <Transition :name="transition">
      <div
        v-if="isOpen"
        class="hs-tooltip__popper"
        ref="popperNode"
      >
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import {ref,watch,reactive,onUnmounted,computed} from 'vue'
import type {Instance} from '@popperjs/core'
import {debounce} from 'lodash-es'
import {createPopper} from '@popperjs/core'
import type {TooltipProps,TooltipEmits,TooltipInstance} from './types'
import useClickOutside from '../../hooks/useClickOutside'

defineOptions({
  name:'HsTooltip'
})
const props = withDefaults(defineProps<TooltipProps>(),{
  placement:'bottom',
  trigger:'hover',
  transition:'fade',
  openDelay:0,
  closeDelay:0,
})
const emits = defineEmits<TooltipEmits>()
const isOpen = ref(false)
const popperNode = ref<HTMLElement>()
const triggerNode = ref<HTMLElement>()
const popperContainerNode = ref<HTMLElement>()
let popperInstance:null|Instance = null
let events:Record<string,unknown> = reactive({})
let outerevents:Record<string,unknown> = reactive({})
let openTimes = 0;
let closeTimes = 0;
const popperOptions = computed(()=>{
  return {
    placement:props.placement,
    modifiers:[
      {
        name:'offset',
        options:{
          offset:[0,9]
        }
      }
    ],
    ...props.popperOptions
  }
})

const open = ()=>{
    openTimes++
    console.log('openTimes',openTimes)
    isOpen.value = true
    emits('visible-change',true);
}
const close = ()=>{
     closeTimes++;
     console.log('closeTimes',closeTimes)
     isOpen.value = false
     emits('visible-change',false);
}
const openDebounced = debounce(open,props.openDelay)
const closeDebounced = debounce(close,props.closeDelay)

const openFinal = ()=>{
  closeDebounced.cancel()
  openDebounced()
}
const closeFinal = ()=>{
  openDebounced.cancel()
  closeDebounced()
}
const togglePropper = ()=>{
  if(isOpen.value){
    closeFinal()
  }else{
    openFinal()
  }
}
useClickOutside(popperContainerNode,()=>{
  if(props.trigger === 'click'&& isOpen.value&&!props.manual){
    closeFinal()
  }
})
const attachEvent = ()=>{
  if(props.trigger === 'hover'){
    events['mouseenter'] = openFinal;
    outerevents['mouseleave'] = closeFinal;
  }else if(props.trigger === 'click'){
    events['click']= togglePropper
  }
}
if(!props.manual){
  attachEvent()
}
watch(()=>props.manual,(isManual)=>{
  if(isManual){
    events = {};
    outerevents = {}
  }else{
    attachEvent()
  }
})
watch(()=>props.trigger,(newTrigger,oldTrigger)=>{
  if(newTrigger !== oldTrigger){
    events = {};
    outerevents = {}
    attachEvent()
  }
})
watch(isOpen,(newVal)=>{
  if(newVal){
    if(triggerNode.value && popperNode.value){
      popperInstance = createPopper(triggerNode.value,popperNode.value,popperOptions.value)
    }else{
      popperInstance?.destroy()
    }
}
},{flush:'post'})
onUnmounted(()=>{
  popperInstance?.destroy()
})
defineExpose<TooltipInstance>({
  'show':openFinal,
  'hide':closeFinal
})
</script>

<style scoped>

</style>