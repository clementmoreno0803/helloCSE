import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { describe, it, expect } from "vitest";
import HeaderLayout from "@/layout/HeaderLayout.vue";
import { createPinia, setActivePinia } from "pinia";

const routes = [{ path: "/", component: { template: "<div>Home</div>" } }];

const router = createRouter({
  history: createWebHistory(),
  routes
});

const generateWrapper = () => {
  const pinia = createPinia();
  return mount(HeaderLayout, {
    global: {
      plugins: [router, setActivePinia(pinia)]
    }
  });
};
describe("HeaderComponent", () => {
  it("should render correctly", () => {
    const wrapper = generateWrapper();

    expect(wrapper.element).toMatchSnapshot();
  });
  it("renders the header and nav elements", () => {
    const wrapper = generateWrapper();

    const title = wrapper.find("h1");
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe("HELLO CSE");

    const searchInput = wrapper.findComponent({ name: "search-input" });
    expect(searchInput.exists()).toBe(true);
  });

  it("navigates to the home page when the title is clicked", async () => {
    const wrapper = generateWrapper();

    await wrapper.find("h1").trigger("click");

    expect(wrapper.vm.$route.path).toBe("/");
  });
});
