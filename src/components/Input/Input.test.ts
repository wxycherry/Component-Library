import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import Input from './Input.vue';

describe('Input', () => {
  it('基本展示', () => {
    // 针对动态class,查看classes是否正确
    // 针对v-if，是否渲染正确的标签以及内容
    // 针对slots，是否渲染对应的slots内容
    const wrapper = mount(Input,{
      props:{
        size:'small',
        type:'text',
        modelValue:''
      },
      slots:{
        prepend:'prepend',
        prefix:'prefix'
      }
    })
    console.log(wrapper.html())
    //classes
    expect(wrapper.classes()).toContain('hs-input--small');
    expect(wrapper.classes()).toContain('is-prepend');
    //是否渲染正确的标签以及节点 should render input
    expect(wrapper.find('input').exists()).toBe(true);
    expect(wrapper.get('input').attributes('type')).toBe('text')
    // slots
    expect(wrapper.find('.hs-input__prepend').exists()).toBeTruthy();
    expect(wrapper.get('.hs-input__prepend').text()).toBe('prepend');
    expect(wrapper.find('.hs-input__prefix').exists()).toBeTruthy();
    expect(wrapper.get('.hs-input__prefix').text()).toBe('prefix');
    //textarea
    const wrapper2 = mount(Input,{
      props:{
        type:'textarea',
        modelValue:''
      },
    })
    expect(wrapper2.find('textarea').exists()).toBe(true);
  });
  it('支持v-model',async ()=>{
    const wrapper = mount(Input,{
      props:{
        modelValue:'test',
        'onUpdate:modelValue':(e:any)=>wrapper.setProps({modelValue:e})
      }
    })
    // 测试初始值
    const input = wrapper.get('input');
    expect(input.element.value).toBe('test');
    // 更新值
    //注意setValue是组合事件会触发input以及change
    await input.setValue('update')
    // modelvalue是否更新
    expect(wrapper.props('modelValue')).toBe('update');
    // dom元素的值是否更新
    expect(input.element.value).toBe('update');
    console.log(wrapper.emitted())
    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    const inputEvent = wrapper.emitted('input');
    const changeEvent = wrapper.emitted('change');
    expect(inputEvent![0]).toEqual(['update']);
    expect(changeEvent![0]).toEqual(['update']);
    //v-model异步更新
    await wrapper.setProps({modelValue:'prop iupdate'})
    expect(input.element.value).toBe('prop iupdate');
  })
  it('支持点击清空字符串',async ()=>{
    const wrapper = mount(Input,{
      props:{
        modelValue:'test',
        clearable:true,
        type:'text'
      },
      global:{
        stubs:['Icon']
      }
    })
    // 不应该出现对应的Icon区域
    expect(wrapper.find('.hs-input__clear').exists()).toBe(false);
    const input = wrapper.get('input');
    await input.trigger('focus')
    expect(wrapper.emitted()).toHaveProperty('focus')
    // 出现icon区域
    expect(wrapper.find('.hs-input__clear').exists()).toBe(true);
    // 点击值变为空并且消失
    await wrapper.get('.hs-input__clear').trigger('click')
    expect(input.element.value).toBe('')
    expect(wrapper.emitted()).toHaveProperty('input')
    expect(wrapper.emitted()).toHaveProperty('change')
    expect(wrapper.emitted()).toHaveProperty('clear')
    const inputEvent = wrapper.emitted('input');
    const changeEvent = wrapper.emitted('change');
    expect(inputEvent![0]).toEqual(['']);
    expect(changeEvent![0]).toEqual(['']);
  })
  it('支持切换密码显示',async ()=>{
    const wrapper = mount(Input,{
      props:{
        modelValue:'',
        showPassword:true,
        type:'text'
      },
      global:{
        stubs:['Icon']
      }
    })
    // 不出现对应的Icon区域，因为当前值为空
    expect(wrapper.find('.hs-input__password').exists()).toBeFalsy()
    const input = wrapper.get('input')
    expect(input.element.type).toBe('password')
    // 出现Icon区域，并且Icon为特点的图标
    await input.setValue('123')
    const eyeIcon = wrapper.find('.hs-input__password')
    expect(eyeIcon.exists()).toBeTruthy()
    expect(eyeIcon.attributes('icon')).toBe('eye-slash')
    // 点击值切换input类型，并且图标Icon会切换
    await eyeIcon.trigger('click')
    expect(input.element.type).toBe('text')
    expect(wrapper.find('.hs-input__password').attributes('icon')).toBe('eye')
  })
});