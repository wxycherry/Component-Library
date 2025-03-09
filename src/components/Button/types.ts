// 创建button类型
export type ButtonType =  'primary' | 'danger' | 'success' | 'warning' | 'info';
export type ButtonSize = 'large' | 'small';
export type NativeType = 'button' | 'submit' | 'reset';

// 所有属性都是可选的
export interface ButtonProps {
  type?: ButtonType;
  size?: ButtonSize;
  plain?: boolean;
  round?: boolean;
  circle?: boolean;
  disabled?: boolean;
  nativeType?: NativeType;
  autofocus?: boolean;
}

// 创建一个类型来描述实例究竟是什么样的
export interface ButtonInstance {
  ref: HTMLButtonElement;
}
