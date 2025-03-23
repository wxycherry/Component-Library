export interface InputProps {
  type: string;
  modelValue: string;
  size?: 'large' | 'small';
  disabled?: boolean;
  clearable?: boolean;
  showPassword?: boolean;
  placeholder?: string;
  readonly?: boolean;
  autocomplete?: string;
  autofocus?: boolean;
  form?: string;
}

export interface InputEmits {
  (e: 'update:modelValue', value: string): void;
  //input的Input事件指的是值有变化就算
  (e:'input',value:string):void;
  //input的change事件指的是修改了值，并且失去了focus才算
  (e: 'change', value: string): void;
  (e: 'clear'): void;
  (e: 'focus', value: FocusEvent): void;
  (e: 'blur', value: FocusEvent): void;
}
