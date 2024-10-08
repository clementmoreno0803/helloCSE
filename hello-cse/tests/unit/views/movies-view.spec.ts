import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import MoviesView from "@/views/MoviesView.vue";

const generateWrapper = () => shallowMount(MoviesView, {});

describe("MoviesView", () => {
  it("should render correctly", () => {
    const wrapper = generateWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });
});
