import { c as create_ssr_component, v as validate_component } from "../../../chunks/ssr.js";
import { S as SignInWithGoogle } from "../../../chunks/SignInWithGoogle.js";
import "../../../chunks/index3.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_description, d as Card_content } from "../../../chunks/card-title.js";
import "clsx";
import { I as Input } from "../../../chunks/input.js";
import { L as Label } from "../../../chunks/label.js";
import { B as Button } from "../../../chunks/button.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex justify-center items-center">${validate_component(Card, "Card.Root").$$render($$result, { class: "mx-auto max-w-sm" }, {}, {
    default: () => {
      return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Card_title, "Card.Title").$$render($$result, { class: "text-2xl" }, {}, {
            default: () => {
              return `Login`;
            }
          })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
            default: () => {
              return `Enter your email below to login to your account`;
            }
          })}`;
        }
      })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
        default: () => {
          return `<div class="grid gap-4"><div class="grid gap-2">${validate_component(Label, "Label").$$render($$result, { for: "email" }, {}, {
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
          )}</div> <div class="grid gap-2"><div class="flex items-center">${validate_component(Label, "Label").$$render($$result, { for: "password" }, {}, {
            default: () => {
              return `Password`;
            }
          })} <a href="##" class="ml-auto inline-block text-sm underline" data-svelte-h="svelte-1iqfoil">Forgot your password?</a></div> ${validate_component(Input, "Input").$$render(
            $$result,
            {
              id: "password",
              type: "password",
              required: true
            },
            {},
            {}
          )}</div> ${validate_component(Button, "Button").$$render($$result, { type: "submit", class: "w-full" }, {}, {
            default: () => {
              return `Login`;
            }
          })} ${validate_component(SignInWithGoogle, "SignInWithGoogle").$$render($$result, { goTo: "/" }, {}, {
            default: () => {
              return `Login with Google`;
            }
          })}</div> <div class="mt-4 text-center text-sm" data-svelte-h="svelte-nutdse">Don&#39;t have an account?
        <a href="##" class="underline">Sign up</a></div>`;
        }
      })}`;
    }
  })}</div>`;
});
export {
  Page as default
};
