<template>
  <Transition
  :name="transitionName"
  @after-leave="destoryComponent"
  @enter="updateHeight"
  >
  <div
    class="hs-message"
    v-show="visible"
    :class="{
      [`hs-message--${type}`]:type,
      'is-close':showClose,
    }"
    role="alert"
    ref="messageRef"
    :style="cssStyle"
    @mouseenter="clearTimer"
    @mouseleave="startTimer"
  >
    <div class="hs-message__content">
      <slot>
        <RenderVnode :vNode="message" v-if="message"/>
      </slot>
    </div>
    <div class="hs-message__close" v-if="showClose">
      <Icon @click.stop="$event=>visible=false" icon="xmark"/>
    </div>
  </div>
</Transition>
</template>
<script setup lang="ts">
import {onMounted, ref,watch,computed,nextTick} from 'vue'
import type {MessageProps} from './types'
import RenderVnode from '../Common/RenderVnode';
import Icon from '../Icon/Icon.vue'
import {getLastInstance,getLastBottomOffset} from './method'
import useEventListener from '../../hooks/useEventListener'
defineOptions({
  name:'HsMessage'
})
const props =withDefaults(defineProps<MessageProps>(),{
  type:'info',
  duration:3000,
  offset:20,
  transitionName:'fade-up'
})
const visible = ref(false)
const messageRef = ref<HTMLDivElement>()
// 计算偏移高度
// 这个div的高度
const height = ref(0)
// 上一个实例的最下面的坐标数字，第一个是0
const lastOffect = computed(()=>getLastBottomOffset(props.id))
// 这个元素应该使用的top
const topOffset = computed(()=>props.offset+lastOffect.value)
// 这个元素为下一个元素预留的offect,也就是它最低端的bottom的值
const bottomOffset = computed(()=>height.value+topOffset.value)
const cssStyle = computed(()=>({
  top:topOffset.value+'px',
  zIndex:props.zIndex,
}))
let timer:any
function startTimer(){
  if(props.duration===0) return
  timer = setTimeout(()=>{
    visible.value = false
  },props.duration)
}
function clearTimer(){
  clearTimeout(timer)
}
onMounted(async()=>{
  visible.value = true
  startTimer()
  // await nextTick()
  // height.value = messageRef.value!.getBoundingClientRect().height
})
function keydown(e:Event){
  const event = e as KeyboardEvent
  if(event.code==='Escape'){
    visible.value = false
  }
}
useEventListener(document,'keydown',keydown)
// watch(visible,(newValue)=>{
//   if(!newValue){
//     props.onDestory()
//   }
// })
function destoryComponent(){
  props.onDestory()
}
function updateHeight(){
  height.value = messageRef.value!.getBoundingClientRect().height
}
defineExpose({
  bottomOffset,
  visible
})
</script>
<style>

</style>