import { mount } from "@vue/test-utils";
import CommentsArea from "@/components/comments/comments-area.vue";



import { describe, it, expect, vi } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import CommentsArea from "@/components/comments/comments-area.vue";
import { useMovie } from "@/composables/UseMovie"; // Assurez-vous que le chemin est correct

// Mock des fonctions de useMovie
const mockSetMovieComment = vi.fn();
const mockGetMovieComment = vi.fn(() => []);

vi.mock('@/composables/UseMovie.ts', () => ({
  useMovie: () => ({
    setMovieComment: mockSetMovieComment,
    getMovieComment: mockGetMovieComment,
  }),
}));

const generateWrapper = () => {
  return shallowMount(CommentsArea, {})
}
describe('CommentsArea', () => {

  it('should render correctly', () => {
    const wrapper = generateWrapper();
    console.log(wrapper.html());

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('should validate name field correctly', async () => {
    const wrapper = generateWrapper();

    const nameInput = wrapper.find('input[type="text"]');
    await nameInput.setValue('Te'); // Invalide (moins de 3 caractères)
    await nameInput.trigger('blur');
    expect(wrapper.vm.v$.name.$error).toBe(true);

    await nameInput.setValue('TestName'); // Valide
    await nameInput.trigger('blur');
    expect(wrapper.vm.v$.name.$error).toBe(false);
  });

  it('should validate note field correctly', async () => {
    const wrapper = generateWrapper();

    const noteInput = wrapper.findAll('input[type="text"]')[1]; // Assuming it's the second input
    await noteInput.setValue('11'); // Invalide (plus que 10)
    await noteInput.trigger('blur');
    expect(wrapper.vm.v$.note.$error).toBe(true);

    await noteInput.setValue('5'); // Valide
    await noteInput.trigger('blur');
    expect(wrapper.vm.v$.note.$error).toBe(false);
  });

  it('should submit the form correctly when valid', async () => {
    const wrapper = generateWrapper();

    await wrapper.setData({
      comment: {
        name: 'TestUser',
        note: 5,
        commentPart: '<p>This is a comment</p>',
      },
    });

    await wrapper.vm.submitComment();
    expect(mockSetMovieComment).toHaveBeenCalledWith({
      name: 'TestUser',
      note: 5,
      commentPart: 'This is a comment', // Nettoyage des balises HTML
    });
  });

  it('should not submit the form if invalid', async () => {
    const wrapper = generateWrapper();

    await wrapper.setData({
      comment: {
        name: '',
        note: null,
        commentPart: '',
      },
    });

    await wrapper.vm.submitComment();
    expect(mockSetMovieComment).not.toHaveBeenCalled(); // La soumission ne doit pas être appelée
  });
});
