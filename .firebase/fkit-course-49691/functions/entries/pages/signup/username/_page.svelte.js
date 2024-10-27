import { s as subscribe } from "../../../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component, f as add_attribute, j as escape } from "../../../../chunks/ssr.js";
import { A as AuthCheck } from "../../../../chunks/AuthCheck.js";
import { a as user, u as userData } from "../../../../chunks/firebase.js";
import "firebase/firestore";
import "../../../../chunks/index3.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_description, d as Card_content } from "../../../../chunks/card-title.js";
import { C as Card_footer } from "../../../../chunks/card-footer.js";
import { B as Button } from "../../../../chunks/button.js";
const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isValid;
  let isTouched;
  let $$unsubscribe_user;
  let $userData, $$unsubscribe_userData;
  $$unsubscribe_user = subscribe(user, (value) => value);
  $$unsubscribe_userData = subscribe(userData, (value) => $userData = value);
  let username = "";
  let loading = false;
  let isAvailable = false;
  isValid = username?.length > 2 && username.length < 16 && re.test(username);
  isTouched = username.length > 0;
  $$unsubscribe_user();
  $$unsubscribe_userData();
  return `${validate_component(AuthCheck, "AuthCheck").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Card, "Card.Root").$$render($$result, { class: "" }, {}, {
        default: () => {
          return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Card_title, "Card.Title").$$render($$result, { class: "text-xl" }, {}, {
                default: () => {
                  return `Username`;
                }
              })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
                default: () => {
                  return `Enter a username for your account.`;
                }
              })}`;
            }
          })} ${validate_component(Card_content, "Card.Content").$$render($$result, { class: "py-10" }, {}, {
            default: () => {
              return `${$userData?.username ? `<p class="text-lg">Your username is <span class="text-success font-bold">@${escape($userData.username)}</span></p> <p class="text-sm" data-svelte-h="svelte-9l80or">(Usernames cannot be changed)</p>` : `<form class=""><input type="text" placeholder="Username" class="input w-full"${add_attribute("value", username, 0)}> <div class="my-4 min-h-16 px-8 w-full">${``} ${!isValid && isTouched ? `<p class="text-error text-sm" data-svelte-h="svelte-vt0dol">must be 3-16 characters long, alphanumeric only</p>` : ``} ${isValid && !isAvailable && !loading ? `<p class="text-warning text-sm">@${escape(username)} is not available</p>` : ``} ${``}</div></form>`}`;
            }
          })} ${validate_component(Card_footer, "Card.Footer").$$render(
            $$result,
            {
              class: "border-t px-6 py-4 flex justify-between"
            },
            {},
            {
              default: () => {
                return `${validate_component(Button, "Button").$$render($$result, { href: "/signup", variant: "outline" }, {}, {
                  default: () => {
                    return `Previous`;
                  }
                })} ${validate_component(Button, "Button").$$render(
                  $$result,
                  {
                    href: "/signup/photo",
                    variant: "outline"
                  },
                  {},
                  {
                    default: () => {
                      return `Next`;
                    }
                  }
                )}`;
              }
            }
          )}`;
        }
      })}`;
    }
  })}`;
});
export {
  Page as default
};
