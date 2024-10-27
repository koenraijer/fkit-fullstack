import { s as subscribe } from "../../../../chunks/utils.js";
import { c as create_ssr_component, d as createEventDispatcher, b as each, a as add_attribute, e as escape, v as validate_component } from "../../../../chunks/ssr.js";
import { p as page } from "../../../../chunks/stores.js";
import { u as userData, a as user } from "../../../../chunks/firebase.js";
import { U as UserLink } from "../../../../chunks/UserLink.js";
import "firebase/firestore";
import { w as writable } from "../../../../chunks/index2.js";
const SortableList_svelte_svelte_type_style_lang = "";
const css = {
  code: ".over.svelte-1kgq1po{@apply border-gray-400 scale-105;}",
  map: null
};
const SortableList = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { list } = $$props;
  let isOver = false;
  createEventDispatcher();
  if ($$props.list === void 0 && $$bindings.list && list !== void 0)
    $$bindings.list(list);
  $$result.css.add(css);
  return `${list?.length ? `<ul class="list-none p-0 flex flex-col items-center">${each(list, (item, index) => {
    return `<li class="${[
      "border-2 border-dashed border-transparent p-2 transition-all max-w-md w-full svelte-1kgq1po",
      item.id === isOver ? "over" : ""
    ].join(" ").trim()}"${add_attribute("data-index", index, 0)}${add_attribute("data-id", item.id, 0)} draggable="true">${slots.default ? slots.default({ item, index }) : ``} </li>`;
  })}</ul>` : `<p class="text-center my-12 text-lg font-bold" data-svelte-h="svelte-1jmwi8z">No items</p>`}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $userData, $$unsubscribe_userData;
  let $$unsubscribe_user;
  let $formData, $$unsubscribe_formData;
  let $page, $$unsubscribe_page;
  $$unsubscribe_userData = subscribe(userData, (value) => $userData = value);
  $$unsubscribe_user = subscribe(user, (value) => value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const formDefaults = {
    icon: "custom",
    title: "",
    url: "https://"
  };
  const formData = writable(formDefaults);
  $$unsubscribe_formData = subscribe(formData, (value) => $formData = value);
  $formData.url.match(/^(ftp|http|https):\/\/[^ "]+$/);
  $formData.title.length < 20 && $formData.title.length > 0;
  $$unsubscribe_userData();
  $$unsubscribe_user();
  $$unsubscribe_formData();
  $$unsubscribe_page();
  return `<main class="max-w-xl mx-auto">${$userData?.username == $page.params.username ? `<h1 class="mx-2 text-2xl font-bold mt-8 mb-4 text-center" data-svelte-h="svelte-zzls1r">Edit your Profile</h1> <div class="text-center mb-8"><p>Profile Link:
          <a${add_attribute("href", `/${$userData?.username}`, 0)} class="link link-accent">https://kung.foo/${escape($userData?.username)}</a></p></div> <div class="text-center my-4"><a class="btn btn-outline btn-xs" href="/signup/photo" data-svelte-h="svelte-uttol8">Change photo</a> <a class="btn btn-outline btn-xs"${add_attribute("href", `/${$userData.username}/bio`, 0)}>Edit Bio</a></div> <form class="form-control"><label class="label cursor-pointer flex items-start justify-center"><span class="label-text mr-6"><div class="tooltip group-hover:tooltip-open" data-tip="If public, the world can see your profile">${escape($userData?.published ? "Public profile" : "Private profile")}</div></span> <input type="checkbox" class="toggle toggle-success" ${$userData?.published ? "checked" : ""}></label></form> ${validate_component(SortableList, "SortableList").$$render($$result, { list: $userData?.links }, {}, {
    default: ({ item, index }) => {
      return `<div class="group relative">${validate_component(UserLink, "UserLink").$$render($$result, Object.assign({}, item), {}, {})} <button class="btn btn-xs btn-error invisible group-hover:visible transition-all absolute -right-6 bottom-10" data-svelte-h="svelte-1n5cbwc">Delete</button></div>`;
    }
  })} ${`<button class="btn btn-outline btn-info block mx-auto my-4" data-svelte-h="svelte-1l5hg7j">Add a Link</button>`}` : ``}</main>`;
});
export {
  Page as default
};
