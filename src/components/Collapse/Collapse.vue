<template>
  <div
    class="hs-collapse"
  >
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import {ref,provide,watch} from 'vue';
import type {NameType,CollapseProps,CollapseEmits } from './types'
import {CollapseContextKey } from './types'
defineOptions({
  name:'HsCollapse'
})
const props = defineProps<CollapseProps>()
const emit = defineEmits<CollapseEmits>()
// 创建响应式数组
const activeNames = ref<NameType[]>(props.modelValue??[])
watch(()=>props.modelValue,()=>{
  activeNames.value = props.modelValue??[]
})
if(props.accordion&&activeNames.value.length>1){
  console.warn('accordion模式下，activeNames数组不能超过1个')
}
const handleItemClick = (item:NameType)=>{
  if(props.accordion){
    activeNames.value = [activeNames.value[0] === item?'':item]
  }else{
    const index = activeNames.value.indexOf(item)
    if(index>-1){
      // 存在，删除数组中对应的一项
      activeNames.value.splice(index,1)
    }else{
      // 不存在，插入对应的name
      activeNames.value.push(item)
    }
  }
 emit('update:modelValue',activeNames.value)
 emit('change',activeNames.value)
}
provide(CollapseContextKey,{
  activeNames,
  handleItemClick
} )
</script>
