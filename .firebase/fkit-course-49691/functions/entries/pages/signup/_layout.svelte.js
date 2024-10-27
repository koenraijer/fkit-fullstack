import { s as subscribe } from "../../../chunks/utils.js";
import { c as create_ssr_component, j as escape, f as add_attribute, v as validate_component } from "../../../chunks/ssr.js";
import { p as page } from "../../../chunks/stores.js";
import { t as buttonVariants } from "../../../chunks/index3.js";
const AnimatedRoute = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_page();
  return `<div>${slots.default ? slots.default({}) : ``}</div>`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<div class="max-w-md mx-auto"><ul class="mt-8"><a href="/signup" class="${escape(buttonVariants({ variant: "secondary" }), true) + ""}">Create Account</a> <a href="/signup/username"${add_attribute(
    "class",
    $page.route.id?.match(/username|photo/g) ? buttonVariants({ variant: "secondary" }) : buttonVariants({ variant: "outline" }),
    0
  )}>Choose Username</a> <a href="/signup/photo"${add_attribute(
    "class",
    $page.route.id?.includes("photo") ? buttonVariants({ variant: "secondary" }) : buttonVariants({ variant: "outline" }),
    0
  )}>Upload Photo</a></ul> ${validate_component(AnimatedRoute, "AnimatedRoute").$$render($$result, {}, {}, {
    default: () => {
      return `<main class="my-8"><div class="items-center text-center">${slots.default ? slots.default({}) : ``}</div></main>`;
    }
  })}</div>`;
});
export {
  Layout as default
};
