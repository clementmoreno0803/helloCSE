import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import SearchInput from "@/components/search-input.vue"; // Assurez-vous que le chemin est correct

const mocksetSearchFilters = {
  setSearchFilters: vi.fn()
}

vi.mock('@/composables/UseMovie.ts', () => ({
  useMovie: () => mocksetSearchFilters
}))

const generateWrapper = () => {
  return shallowMount(SearchInput, {});
};

describe('SearchBar', () => {

  it('should render correctly', () => {
    const wrapper = generateWrapper();

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('should update inputSearch when user types', async () => {
    const wrapper = generateWrapper();
    const input = wrapper.find('input');
    await input.setValue('Inception');

    expect(wrapper.vm.inputSearch).toBe('Inception');
  });

  it('should change widthInput on focusin and focusout', async () => {
    const wrapper = generateWrapper();
    const input = wrapper.find('input');

    // Test de focusin
    await input.trigger('focusin');
    expect(wrapper.vm.widthInput).toBe('16rem');

    // Test de focusout
    await input.trigger('focusout');
    expect(wrapper.vm.widthInput).toBe('2rem');
  });

  it('should call setSearchFilters on keydown', async () => {
    const wrapper = generateWrapper();
    const input = wrapper.find('input');

    await input.setValue('Avatar');
    await input.trigger('keydown');

    expect(mocksetSearchFilters.setSearchFilters).toHaveBeenCalledWith('Avatar');
  });
});
