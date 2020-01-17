import { mount } from '@vue/test-utils';
import Warehouse from '@/views/Warehouse.vue';

const wrapper = mount(Warehouse);
describe('Warehouse.vue', () => {
  test('setup correctly', () => {
    expect(true).toBe(true);
  });
});
describe('Warehouse.vue', () => {
  test('Opening add product form', () => {
    wrapper.find('.add-button').trigger('click');
    wrapper.vm.openAddingProduct();
    expect(wrapper.vm.showModal).toBe(true);
  });
});
describe('Warehouse.vue', () => {
  test('check form inputs function ', () => {
    const clearInputs = jest.fn();
    wrapper.setMethods({ clearInputs });
    wrapper.find('.button-normal').trigger('click');
    expect(clearInputs).toBeCalled();
    expect(wrapper.findAll('input')).toEqual({});
  });
});
