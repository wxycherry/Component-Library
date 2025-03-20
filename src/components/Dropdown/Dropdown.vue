<template>
  <div
    class="hs-dropdown"
  >
  <Tooltip
    :trigger="trigger"
    :placement="placement"
    :popper-options="popperOptions"
    :open-delay="openDelay"
    :close-delay="closeDelay"
    @visible-change="visibleChange"
    ref="tooltipRef"
  >
    <slot></slot>
    <template #content>
        <ul class="hs-dropdown__menu">
          <template v-for="item in menuOptions" :key="item.key">
            <li
              v-if="item.divided"
              role="separator"
              class="divided-placeholder"
            >
            </li>
            <li
              class="hs-dropdown__item"
              @click="()=>handleItemClick(item)"
              :class="{'is-disabled': item.disabled,'is-divided': item.divided}"
              :id="`dropdown-item-${item.key}`"
            >
              <RenderVnode :vNode="item.label" />
            </li>
          </template>
        </ul>
    </template>
  </Tooltip>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import type {Ref} from 'vue'
import type {DropdownProps,DropdownEmits,DropdownInstance,MenuOption} from './types'
import Tooltip from '../Tooltip/Tooltip.vue';
import RenderVnode from '../Common/RenderVnode';
import type { TooltipInstance } from '../Tooltip/types';
// import VNode from '@/VNode';
const props = withDefaults(defineProps<DropdownProps>(), { hideAfterClick: true });
const emits = defineEmits<DropdownEmits>()
const tooltipRef = ref() as Ref<TooltipInstance>
const visibleChange = (e:boolean)=>{
  emits('visible-change',e)
}
const handleItemClick = (e:MenuOption)=>{
  if(e.disabled) return
  emits('select',e)
  if(props.hideAfterClick){
    tooltipRef.value?.hide()
  }
}
defineOptions({
  name:'HsDropdown'
})
defineExpose<DropdownInstance>({
  show: tooltipRef.value ?. show,
  hide: tooltipRef.value ?.hide
});
</script>