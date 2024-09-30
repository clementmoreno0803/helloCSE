import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import CommentsArea from "@/components/comments/comments-area.vue";
import { describe, it, vi} from "vitest";
import { useVuelidate } from '@vuelidate/core';


vi.mock('@/composables/UseMovieId', () => ({
  useMovieId: vi.fn(() => '123'),
}));

vi.mock('@vuelidate/core', () => ({
  useVuelidate: vi.fn().mockReturnValue({
    name: {
      $touch: vi.fn(),
      $error: false,
      $errors: [{ $message: 'Le nom doit avoir au moins 3 caractères' }],
    },
    note: {
      $touch: vi.fn(),
      $error: false,
      $errors: [],
    },
    commentPart: {
      $touch: vi.fn(),
      $error: false,
      $errors: [],
    },
    $invalid: false,
    $touch: vi.fn(),
  }),
}));

const generateWrapper = () => {
  return mount(CommentsArea, {
    global: {
      plugins: [createTestingPinia({ createSpy: vi.fn })],
    },
    createSpy: true,
  });
}

describe('Comments Area', () => {
  it('should validate name field correctly', async () => {
    const wrapper = generateWrapper();
    console.log(wrapper.html());
    const nameInput = wrapper.findComponent({ name: 'VTextField' });

    console.log(nameInput);
    await nameInput.setValue('Te');
    await nameInput.trigger('blur');

    expect(wrapper.vm.v$.name.$error).toBe(true);

    await nameInput.setValue('TestName');
    await nameInput.trigger('blur');

    expect(wrapper.vm.v$.name.$error).toBe(false);
  });

  it('should validate note field correctly', async () => {
    const wrapper = generateWrapper()
    const nameInput = wrapper.find('input');
    await noteInput.setValue('0');
    await noteInput.trigger('blur');
    expect(wrapper.vm.v$.note.$error).toBe(true);

    await noteInput.setValue('5');
    await noteInput.trigger('blur');
    expect(wrapper.vm.v$.note.$error).toBe(false);
  });

  it('should validate commentPart field correctly', async () => {
    const wrapper = generateWrapper()
    const commentInput = wrapper.findComponent({ name: 'editor' });
    await commentInput.setValue('Te');
    await commentInput.trigger('blur');
    expect(wrapper.vm.v$.commentPart.$error).toBe(true);

    await commentInput.setValue('This is a valid comment.');
    await commentInput.trigger('blur');
    expect(wrapper.vm.v$.commentPart.$error).toBe(false);
  });

  it('should submit valid comment', async () => {
    const wrapper = generateWrapper()
    const nameInput = wrapper.find('input[type="text"]');
    const noteInput = wrapper.find('input[type="number"]');
    const commentInput = wrapper.findComponent({ name: 'editor' });

    await nameInput.setValue('TestUser');
    await noteInput.setValue('5');
    await commentInput.setValue('This is a valid comment.');

    await wrapper.vm.submitComment();

    expect(wrapper.vm.comment.name).toBe('TestUser');
    expect(wrapper.vm.comment.note).toBe(5);
    expect(wrapper.vm.comment.commentPart).toBe('This is a valid comment.');
    expect(wrapper.vm.allComments).toContainEqual(expect.objectContaining({
      name: 'TestUser',
      note: 5,
      commentPart: 'This is a valid comment.',
    }));
  });

  it('should not submit invalid comment', async () => {
    const wrapper = generateWrapper()
    const nameInput = wrapper.find('input[type="text"]');
    const noteInput = wrapper.find('input[type="number"]');
    const commentInput = wrapper.findComponent({ name: 'editor' });

    await nameInput.setValue('Te');
    await noteInput.setValue('0');
    await commentInput.setValue('');

    await wrapper.vm.submitComment();

    expect(console.log).toHaveBeenCalledWith("Formulaire invalide");
    expect(wrapper.vm.allComments).not.toContainEqual(expect.objectContaining({
      name: 'Te',
      note: 0,
      commentPart: '',
    }));
  })
});
