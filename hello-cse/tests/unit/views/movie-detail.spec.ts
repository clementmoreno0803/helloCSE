import { describe, it, expect } from "vitest";
import { shallowMount } from "@vue/test-utils";
import MovieDetail from "@/views/MovieDetail.vue";

const generateWrapper = () => shallowMount(MovieDetail, {});

describe("MoviesView", () => {
  it("should render correctly", () => {
    const wrapper = generateWrapper();
    expect(wrapper.element).toMatchSnapshot();
  });
});
