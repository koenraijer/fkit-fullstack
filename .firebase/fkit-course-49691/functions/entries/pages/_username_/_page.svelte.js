import { c as create_ssr_component, f as add_attribute, j as escape, i as each, v as validate_component } from "../../../chunks/ssr.js";
const UserLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon = "default" } = $$props;
  let { url = "foo" } = $$props;
  let { title = "some cool title" } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  return `<a${add_attribute("href", url, 0)} class="stack w-full max-w-md text-center bg-base-300 flex justify-center items-center p-4 rounded-lg not-prose no-underline"><img${add_attribute("src", `/${icon}.png`, 0)}${add_attribute("alt", icon, 0)} width="32" height="32" class="w-8"> <span class="text-lg text-white font-bold">${escape(title)}</span></a>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-2pftis_START -->${$$result.title = `<title>@${escape(data.username)} Links</title>`, ""}<meta name="description"${add_attribute("content", data.bio, 0)}><!-- HEAD_svelte-2pftis_END -->`, ""} <main class="prose text-center mx-auto mt-8"><h1 class="text-7xl text-purple-500">@${escape(data.username)}</h1> <img${add_attribute("src", data.photoURL ?? "/user.png", 0)} alt="photoURL" width="256" class="mx-auto"> <p class="text-xl my-8">${escape(data.bio ?? "no bio yet...")}</p> <ul class="list-none">${each(data.links, (item) => {
    return `<li class="my-2">${validate_component(UserLink, "UserLink").$$render($$result, Object.assign({}, item), {}, {})} </li>`;
  })}</ul></main>`;
});
export {
  Page as default
};
