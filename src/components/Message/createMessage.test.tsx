import { describe, expect, test } from 'vitest'
import { nextTick } from 'vue'
import { createMessage ,closeAll} from './method'

export const rAF = async () => {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null)
        await nextTick()
      })
    })
  })
}
function getTopValue(element:Element){
  const styles = window.getComputedStyle(element)
  const topValue = styles.getPropertyValue('top') //返回是是一个字符串
  return Number.parseFloat(topValue)
}
describe('createMessage', () => {
  test('调用方法应该创建对应的 Message 组件', async () => {
    const instance = createMessage({message:'hello world',duration:0})
    await rAF()
    expect(document.querySelector('.hs-message')).toBeTruthy()
    instance.destory()
    await rAF()
    expect(document.querySelector('.hs-message')).toBeFalsy()
  })
  test('多次调用方法应该创建多个实例', async () => {
    createMessage({message:'hello world',duration:0})
    createMessage({message:'hello world2',duration:0})
    await rAF()
    const elements = document.querySelectorAll('.hs-message')
    expect(elements.length).toBe(2)
    closeAll()
    await rAF()
    expect(document.querySelector('.hs-message')).toBeFalsy()

  })
  test('创建多个实例应该设置正确的 offset', async () => {
    createMessage({message:'hello world',duration:0,offset:100})
    createMessage({message:'hello world2',duration:0,offset:50})
    await rAF()
    const elements = document.querySelectorAll('.hs-message')
    expect(elements.length).toBe(2)
    const firstElementTop = getTopValue(elements[0])
    const sewcondElementTop = getTopValue(elements[1])
    expect(firstElementTop).toBe(100)
    expect(sewcondElementTop).toBe(150)
  })
})