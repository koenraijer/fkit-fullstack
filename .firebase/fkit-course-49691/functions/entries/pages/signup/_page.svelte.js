import { s as subscribe } from "../../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component, j as escape } from "../../../chunks/ssr.js";
import { a as user } from "../../../chunks/firebase.js";
import "firebase/auth";
import "../../../chunks/index3.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_description, d as Card_content } from "../../../chunks/card-title.js";
import "clsx";
import { L as Label } from "../../../chunks/label.js";
import { I as Input } from "../../../chunks/input.js";
import { S as SignInWithGoogle } from "../../../chunks/SignInWithGoogle.js";
import { B as Button } from "../../../chunks/button.js";
import { C as Card_footer } from "../../../chunks/card-footer.js";
const SignUp = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Card, "Card.Root").$$render($$result, { class: "w-full" }, {}, {
    default: () => {
      return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Card_title, "Card.Title").$$render($$result, { class: "text-xl" }, {}, {
            default: () => {
              return `Sign Up`;
            }
          })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
            default: () => {
              return `Enter your information to create an account`;
            }
          })}`;
        }
      })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
        default: () => {
          return `<div class="grid gap-4"><div class="grid grid-cols-2 gap-4"><div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "first-name" }, {}, {
            default: () => {
              return `First name`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              id: "first-name",
              placeholder: "Max",
              required: true
            },
            {},
            {}
          )}</div> <div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "last-name" }, {}, {
            default: () => {
              return `Last name`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              id: "last-name",
              placeholder: "Robinson",
              required: true
            },
            {},
            {}
          )}</div></div> <div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "email" }, {}, {
            default: () => {
              return `Email`;
            }
          })} ${validate_component(Input, "Input").$$render(
            $$result,
            {
              id: "email",
              type: "email",
              placeholder: "m@example.com",
              required: true
            },
            {},
            {}
          )}</div> <div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "password" }, {}, {
            default: () => {
              return `Password`;
            }
          })} ${validate_component(Input, "Input").$$render($$result, { id: "password", type: "password" }, {}, {})}</div> ${validate_component(Button, "Button").$$render($$result, { type: "submit", class: "w-full" }, {}, {
            default: () => {
              return `Create an account`;
            }
          })} ${validate_component(SignInWithGoogle, "SignInWithGoogle").$$render($$result, { goTo: "/signup/username" }, {}, {
            default: () => {
              return `Sign In With Google`;
            }
          })}</div> <div class="mt-4 text-center text-sm" data-svelte-h="svelte-gy228q">Already have an account?
        <a href="/signin" class="underline">Sign in</a></div>`;
        }
      })}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_user();
  return `${$user ? `${validate_component(Card, "Card.Root").$$render($$result, { class: "w-full" }, {}, {
    default: () => {
      return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
            default: () => {
              return `Sign Up`;
            }
          })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
            default: () => {
              return `Enter your information to create an account`;
            }
          })}`;
        }
      })} ${validate_component(Card_content, "Card.Content").$$render($$result, { class: "my-10" }, {}, {
        default: () => {
          return `<h2>Welcome, <span class="font-bold">${escape($user.displayName)}</span></h2> <p data-svelte-h="svelte-1gu2pwo">You are already logged in</p>`;
        }
      })} ${validate_component(Card_footer, "Card.Footer").$$render(
        $$result,
        {
          class: "border-t px-6 py-4 flex justify-between"
        },
        {},
        {
          default: () => {
            return `${validate_component(Button, "Button").$$render($$result, { variant: "outline" }, {}, {
              default: () => {
                return `Sign Out`;
              }
            })} ${validate_component(Button, "Button").$$render($$result, { variant: "outline" }, {}, {
              default: () => {
                return `Next`;
              }
            })}`;
          }
        }
      )}`;
    }
  })}` : `${validate_component(SignUp, "SignUp").$$render($$result, {}, {}, {})}`}`;
});
export {
  Page as default
};
