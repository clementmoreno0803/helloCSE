import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import GetAllComments from "@/components/comments/get-all-comments.vue";
import { mockComments } from "../../fixtures/mockComments.mock";

const generateWrapper = () => {
  return shallowMount(GetAllComments, {
    props: {
      comments: mockComments,
    },
  })
}

describe('GetAllComments', () => {

  it('should render correctly', () => {
    const wrapper = generateWrapper()

    expect(wrapper.element).toMatchSnapshot();
    expect(wrapper.exists()).toBe(true);
  });

  it('should display the correct number of comments', () => {
    const wrapper = generateWrapper()

    const numberOfComments = wrapper.find('.get-all-comments__number-of-comments');
    expect(numberOfComments.text()).toBe(`${mockComments.length}`);
  });

  it('should render all comments', () => {
    const wrapper = generateWrapper()

    const renderedComments = wrapper.findAll('.get-all-comments__list-of-comments .v-list-item');
    expect(renderedComments.length).toBe(mockComments.length);
  });

  it('should calculate minutes since published correctly', () => {
    const wrapper = generateWrapper()

    const minutesSincePublished = wrapper.vm.getMinutesSincePublished(mockComments[0].dateCreation);
    expect(minutesSincePublished).toBe(5); // Should be 5 minutes

    const hoursSincePublished = wrapper.vm.getMinutesSincePublished(mockComments[1].dateCreation);
    expect(hoursSincePublished).toBe(2); // Should return hours for 2 hours ago
  });
});
