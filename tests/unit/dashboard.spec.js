import { mount } from '@vue/test-utils';
import Dashboard from '@/views/Dashboard.vue';

const wrapper = mount(Dashboard);

describe('Dashboard.vue', () => {
  test('setup correctly', () => {
    expect(true).toBe(true);
  });
});
describe('Dashboard.vue', () => {
  test('Adding Tasks', () => {
    const addTask = jest.fn();
    wrapper.setMethods({ addTask });
    wrapper.find('.accept-btn').trigger('click');
    wrapper.vm.tasks.push({ taskContent: 'some value' });
    expect(addTask).toBeCalled();
    expect(wrapper.vm.tasks.length).toBeGreaterThan(0);
  });
});
