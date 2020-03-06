import{shallowMount} from '@vue/test-utils' 
import {expect} from 'chai'
import { Wrapper } from '@vue/test-utils';


import Button from '@/packages/button.vue'
import Icon from '@/packages/icon.vue'

describe('button.vue', () => {
  // it('1.测试 test 1+ 1', () => {
  //   // expect(1 + 1).toBe(2)
  //   // expect(1 + 1).to.be.eq(2)
  //   expect(1 + 1).to.eq(2)
  //   expect(getComputedStyle(document.body).color).to.eq('rgb(0, 0, 0)')
  // })
  it('1.测试button能否正常显示slot里的内容', () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: 'hll-ui'
      }
    })
    expect(wrapper.text()).to.eq('hll-ui')
  })

  it('2.测试icon传入是否能正常显示', () => {
    const wrapper = shallowMount(Button, {
      stubs: {
        'hll-icon': Icon
      },
      propsData: {
        icon: 'info'
      }
    })
    expect(wrapper.find('use').attributes('href')).to.eq('#icon-info')
  })

  it('3.测试loading时 按钮是否为禁用状态', () => {
    const wrapper = shallowMount(Button, {
      stubs: {
        'hll-icon': Icon
      },
      propsData: {
        loading: true
      }
    })
    expect(wrapper.find('use').attributes('href')).to.eq('#icon-loading')
    expect(wrapper.find('button').attributes('disabled')).to.eq('disabled')
  })

  it('4.测试按钮能否正常点击', () => {
    const wrapper = shallowMount(Button, {
      // stubs: ['hll-icon'], // 不渲染icon只是添加一个标签
      // propsData: {
      //   loading: true
      // }
    })
    // console.log(wrapper.vm.$el)
    wrapper.find('button').trigger('click')
    expect(wrapper.emitted('click').length).to.eq(1)
  })

  it('5.测试按钮传入的postion是否能正常显示', () => { // 测试样式
    const wrapper = shallowMount(Button, {
      attachToDocument: true, // 将当前组件挂载到浏览器上 不加该属性就是使用jsdom
      stubs: {
        'hll-icon': Icon
      },
      slots: {
        default: 'hll-ui'
      },
      propsData: {
        icon: 'info',
        iconPosition: 'left'
      }
    })
    const span = wrapper.vm.$el.querySelector('span')
    expect(getComputedStyle(span).order).to.eq('2')
    wrapper.setProps({iconPosition: 'right'})
    // 修改属性之后是异步渲染的 要在下一个事件环中执行
    return wrapper.vm.$nextTick().then(() => {
      expect(getComputedStyle(span).order).to.eq('1')
    })
  })
})