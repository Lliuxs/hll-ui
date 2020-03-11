import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';

import Row from '@/packages/layout/row';
import Col from '@/packages/layout/col';

describe('row.vue', async () => {
  it('1.测试gutter是否ok', () => {
    const wrapper = shallowMount(Row, {
      attachToDocument: true,
      stubs: {
        'hll-col': Col
      },
      propsData: {
        gutter: 20
      }
    });
  });
  expect(getComputedStyle(wrapper.vm.$el).marginLeft).to.eq('-10px');
  expect(getComputedStyle(wrapper.vm.$el).marginRight).to.eq('-10px');
  await wrapper.vm.$nextTick();
  const col = wrapper.vm.$el.querySelector('.hll-col');
  console.log(col);
  expect(getComputedStyle(col).paddingLeft).to.eq('10px');
  expect(getComputedStyle(col).paddingRight).to.eq('10px');
});
