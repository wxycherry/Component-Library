import type {Ref,InjectionKey} from 'vue'
export type NameType = string | number;

export interface CollapseProps {
  modelValue?:NameType[];
  // 手风琴效果
  accordion?:boolean;
}
// 子组件上的属性
export interface CollapseItemProps {
  name: NameType;
  title?:string;
  disabled?:boolean;
}
// 父组件上的属性
export interface CollapseContext {
  activeNames:Ref<NameType[]>;
  handleItemClick: (name: NameType) => void;
}
// 用于描述一个组件可能触发的事件（emits）及其参数。
export interface CollapseEmits {
  (e: 'update:modelValue', values: NameType[]): void;
  (e: 'change', values: NameType[]): void;
}
export const CollapseContextKey:InjectionKey<CollapseContext> = Symbol('CollapseContextKey');
