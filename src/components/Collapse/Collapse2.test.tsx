import { describe, test,expect,vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from './Collapse.vue'
// import {h} from 'vue'
// import Item from './CollapseItem.vue'
import CollapseItem from './CollapseItem.vue'

describe('Collapse.vue', () => {
  test('basic collapse', async () => {
    // const wrapper = mount(Collapse, {
    //   props:{
    //     modelValue:['a']
    //   },
    //   slots: {
    //     default: h(Item, { name:'a',title: 'title A' },'countent a'),
    //   },
    //   global:{
    //     stubs:['Icon']
    //   }
    // })
    const onChange = vi.fn()
    const wrapper = mount(() =>
      <Collapse modelValue={['a']} onChange={onChange}>
        <CollapseItem name="a" title="title a">
          content a
        </CollapseItem>
        <CollapseItem name="b" title="title b">
          content b
        </CollapseItem>
        <CollapseItem name="c" title="title c" disabled>
          content c
        </CollapseItem>
      </Collapse>
    , {
      global: {
        stubs: ['Icon']
      },
      attachTo: document.body//解决下面交互节点没更新的bug
    })
    // console.log(wrapper.html())
    const headers = wrapper.findAll('.hs-collapse-item__header')
    const contents = wrapper.findAll('.hs-collapse-item__wrapper')

    //长度
    expect(headers.length).toBe(3)
    expect(contents.length).toBe(3)

    // 文本
    const firstHeader = headers[0]
    const secondHeader = headers[1]
    expect(firstHeader.text()).toBe('title a')

    //内容
    const firstContent = contents[0]
    const secondContent = contents[1]
    const disabledContent = contents[2]
    expect(firstContent.isVisible()).toBeTruthy()
    expect(secondContent.isVisible()).toBeFalsy()
    expect(firstContent.text()).toBe('content a')

    // 交互，行为(这个是异步的过程)
    await firstHeader.trigger('click')
    console.log(firstContent.html())
    expect(firstContent.isVisible()).toBeFalsy()
    expect(onChange).toHaveBeenCalledWith([])

    await secondHeader.trigger('click')
    expect(secondContent.isVisible()).toBeTruthy()
    expect(onChange).toHaveBeenLastCalledWith(['b'])

    //diaabled
    const disabledHeader = headers[2]
    expect(disabledHeader.classes()).toContain('is-disabled')
    await disabledHeader.trigger('click')
    expect(disabledContent.isVisible()).toBeFalsy()

  })
})