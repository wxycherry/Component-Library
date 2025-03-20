import { computed, defineComponent,Fragment ,ref} from 'vue';
import type { PropType } from 'vue';
import type { Placement, Options } from '@popperjs/core';
import type { MenuOption } from './types';
import type { TooltipInstance } from '../Tooltip/types';
import Tooltip from '../Tooltip/Tooltip.vue';

export default defineComponent({
  name:'HsDropdown',
  props: {
    placement: {
      type: String as PropType<Placement>,
      default: 'bottom'
    },
    trigger: {
      type: String as PropType<'hover' | 'click'>,
      default: 'hover'
    },
    transition: {
      type: String,
      default: 'fade'
    },
    openDelay: {
      type: Number,
      default: 0
    },
    closeDelay: {
      type: Number,
      default: 0
    },
    popperOptions: {
      type: Object as PropType<Options>,
    },
    menuOptions: {
      type: Array as PropType<MenuOption[]>,
      required: true
    },
    hideAfterClick: {
      type: Boolean,
      default: true
    },
    manual:{
      type:Boolean,
    }
  },
  emits: ['visible-change','select'],
  setup(props,{slots,emit,expose}) {
    const tooltipRef = ref<TooltipInstance|null>(null)
    const itemClick = (e) => {
      if (e.disabled) {
        return;
      }
      emit('select', e);
      if (props.hideAfterClick) {
        tooltipRef.value?.hide();
      }
    };
    const visibleChange = (e: boolean) => {
      emit('visible-change', e);
    };
    const options = computed(()=>{
      return props.menuOptions.map(item=>{
        return (
          <Fragment key={item.key}>
            {item.divided?<li role='separator' class="divided-placeholder"></li>:''}
            <li
            class={{"hs-dropdown__item":true,'is-disabled': item.disabled,'is-divided': item.divided}}
            id={`dropdown-item-${item.key}`}
            onClick={()=>itemClick(item)}
            >
              {item.label}
            </li>
          </Fragment>
        )
      })
    })
    expose({
      show:()=> tooltipRef.value ?. show(),
      hide:()=> tooltipRef.value ?. hide()
    });
      return ()=>(
        <div
          class='hs-dropdown'
        >
          <Tooltip
            trigger={props.trigger}
            placement={props.placement}
            popper-options={props.popperOptions}
            open-delay={props.openDelay}
            close-delay={props.closeDelay}
            manual={props.manual}
            ref={tooltipRef}
            onVisibleChange={visibleChange}
          >
            {{
              default:()=>slots.default&&slots.default(),
              content:()=>(
                <ul class='hs-dropdown__menu'>
                  {options.value}
                </ul>
              )
            }}
          </Tooltip>
        </div>
      );
  },
})