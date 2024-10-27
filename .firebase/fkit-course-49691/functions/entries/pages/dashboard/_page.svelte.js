import { s as subscribe } from "../../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component, j as escape } from "../../../chunks/ssr.js";
import { a as user, u as userData } from "../../../chunks/firebase.js";
import "firebase/auth";
import { A as AuthCheck } from "../../../chunks/AuthCheck.js";
import "firebase/firestore";
import { C as Card, a as Card_header, b as Card_title, c as Card_description, d as Card_content } from "../../../chunks/card-title.js";
import { C as Card_footer } from "../../../chunks/card-footer.js";
import "../../../chunks/index3.js";
import { I as Input } from "../../../chunks/input.js";
import { B as Button } from "../../../chunks/button.js";
const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isValid;
  let isTouched;
  let $user, $$unsubscribe_user;
  let $userData, $$unsubscribe_userData;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_userData = subscribe(userData, (value) => $userData = value);
  let username = "";
  let loading = false;
  let isAvailable = false;
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    isValid = username?.length > 2 && username.length < 16 && re.test(username);
    isTouched = username.length > 0;
    $$rendered = `<h2 class="card-title mb-8" data-svelte-h="svelte-romd70">Dashboard</h2> ${validate_component(AuthCheck, "AuthCheck").$$render($$result, {}, {}, {
      default: () => {
        return `<div class="flex flex-col gap-2"><h2>Welcome, ${escape($user?.displayName)}</h2> ${$userData?.username ? `${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
          default: () => {
            return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
                  default: () => {
                    return `Username`;
                  }
                })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
                  default: () => {
                    return `Change your username here.`;
                  }
                })}`;
              }
            })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
              default: () => {
                return `<form class="w-2/5">${validate_component(Input, "Input").$$render(
                  $$result,
                  {
                    type: "text",
                    placeholder: "Username",
                    class: "input w-fit input-bordered",
                    value: username
                  },
                  {
                    value: ($$value) => {
                      username = $$value;
                      $$settled = false;
                    }
                  },
                  {}
                )} <div class="my-4 min-h-16 w-full">${``} ${!isValid && isTouched ? `<p class="text-error text-sm" data-svelte-h="svelte-k3aqf9">must be 3-16 characters long, alphanumeric only</p>` : ``} ${isValid && !isAvailable && !loading ? `<p class="text-warning text-sm">@${escape(username)} is not available</p>` : ``} ${``}</div></form>`;
              }
            })} ${validate_component(Card_footer, "Card.Footer").$$render($$result, { class: "border-t px-6 py-4" }, {}, {
              default: () => {
                return `${validate_component(Button, "Button").$$render($$result, {}, {}, {
                  default: () => {
                    return `Save`;
                  }
                })}`;
              }
            })}`;
          }
        })} <p class="text-lg">Your username is <span class="text-success font-bold">@${escape($userData.username)}</span></p> <h2 data-svelte-h="svelte-1pqqmj2">Change Username</h2> <button class="btn btn-accent w-fit px-4" data-svelte-h="svelte-thboqa">Sign out</button>` : ``}</div>`;
      }
    })}`;
  } while (!$$settled);
  $$unsubscribe_user();
  $$unsubscribe_userData();
  return $$rendered;
});
export {
  Page as default
};
