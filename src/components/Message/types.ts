import type {VNode,ComponentInternalInstance} from 'vue'

export interface MessageProps{
  message?:string|VNode;
  duration?:number;
  showClose?:boolean;
  type?:'success'|'warning'|'info'|'error';
  onDestory:()=>void;
  id:string;
  zIndex:number;
  offset?:number;
  transitionName?:string;
}
// 创建对应的数组
export interface MessageContext{
  id:string;
  vnode:VNode;
  vm:ComponentInternalInstance;
  props:MessageProps;
  destory:()=>void;
}
export type CreateMessageProps = Omit<MessageProps,'onDestory'|'id'|'zIndex'>