import { s as subscribe } from "../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component, j as escape } from "../../chunks/ssr.js";
import { u as userData } from "../../chunks/firebase.js";
import "../../chunks/index3.js";
import { B as Button } from "../../chunks/button.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userData, $$unsubscribe_userData;
  $$unsubscribe_userData = subscribe(userData, (value) => $userData = value);
  $$unsubscribe_userData();
  return `${$$result.head += `<!-- HEAD_svelte-1a42mi1_START -->${$$result.title = `<title>Kung.foo - a place for links</title>`, ""}<meta name="description" content="Demo project for the Full SvelteKit Course by Fireship"><!-- HEAD_svelte-1a42mi1_END -->`, ""} <main class="flex min-h-screen mx-auto w-fit"><div class="hero bg-base-200"><div class="hero-content text-center"><div class="w-full"><h1 class="text-7xl font-bold" data-svelte-h="svelte-upeh1a">Kung.foo</h1> <p class="py-6 text-2xl" data-svelte-h="svelte-18180bf">One simple link to share your entire developer portfolio</p> ${$userData?.username ? `<a href="${"/" + escape($userData.username, true) + "/"}" class="btn btn-primary">View Profile</a>` : `<a href="/signin" class="hover:underline" data-svelte-h="svelte-1nnifh8">Sign In</a> ${validate_component(Button, "Button").$$render($$result, { variant: "default", href: "/signup" }, {}, {
    default: () => {
      return `Sign Up`;
    }
  })}`} <p class="py-6" data-svelte-h="svelte-7tasr2">Learn how to build this app from scratch in the <a class="link" href="https://fireship.io/courses/sveltekit">Full SvelteKit Course</a></p></div></div></div></main>`;
});
export {
  Page as default
};
