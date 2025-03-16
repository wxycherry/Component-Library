import {test,describe,vi, expect,Mocked} from 'vitest'
import {testFn,request} from './utils'
import axios from 'axios'
vi.mock('axios')
const mockedAxios = axios as Mocked<typeof axios>

describe('functions', () => {
  // 监控回调函数
  test('create a mock function', () => {
    const callback = vi.fn() //callback被监控到
    testFn(12,callback)
    expect(callback).toHaveBeenCalled()
    expect(callback).toHaveBeenCalledWith(12)
  })
  // 监控对象上的一个方法
  test('spy on method', () => {
    const obj = {
      getName:()=>1
    }
    const spy = vi.spyOn(obj,'getName')
    obj.getName()
    expect(spy).toHaveBeenCalled()
    obj.getName()
    expect(spy).toHaveBeenCalledTimes(2) //调用几次
  })
  // 第三方模块的模拟
  test('mock third party module', async () => {
    mockedAxios.get.mockImplementation(() => {
      return Promise.resolve({
        data:123
      })
    })
    // 这个是上面的简写
    // mockedAxios.get.mockResolvedValue({
    //   data:123
    // })
    const result = await request()
    expect(result).toBe(123)

  })
})
