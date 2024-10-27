import { s as subscribe } from "../../../../chunks/utils.js";
import { c as create_ssr_component, v as validate_component, f as add_attribute, j as escape } from "../../../../chunks/ssr.js";
import { A as AuthCheck } from "../../../../chunks/AuthCheck.js";
import { a as user, u as userData } from "../../../../chunks/firebase.js";
import "firebase/firestore";
import "firebase/storage";
import { I as Input } from "../../../../chunks/input.js";
import { t as buttonVariants } from "../../../../chunks/index3.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_description, d as Card_content } from "../../../../chunks/card-title.js";
import { C as Card_footer } from "../../../../chunks/card-footer.js";
import { L as Label } from "../../../../chunks/label.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $user, $$unsubscribe_user;
  let $userData, $$unsubscribe_userData;
  $$unsubscribe_user = subscribe(user, (value) => $user = value);
  $$unsubscribe_userData = subscribe(userData, (value) => $userData = value);
  $$unsubscribe_user();
  $$unsubscribe_userData();
  return `${validate_component(AuthCheck, "AuthCheck").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Card, "Card.Root").$$render($$result, { class: "w-full" }, {}, {
        default: () => {
          return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Card_title, "Card.Title").$$render($$result, { class: "text-xl" }, {}, {
                default: () => {
                  return `Profile Picture`;
                }
              })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
                default: () => {
                  return `Upload a profile picture for your account.`;
                }
              })}`;
            }
          })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
            default: () => {
              return `<form class="max-w-screen-md w-full mx-auto"><div class="form-control w-full max-w-xs mx-auto text-center"><img${add_attribute("src", $userData?.photoURL ?? "/user.jpeg", 0)} alt="photoURL" width="128" height="128" class="mx-auto rounded-lg mb-8"> ${validate_component(Label, "Label").$$render($$result, { for: "photoURL" }, {}, {
                default: () => {
                  return `Picture`;
                }
              })} ${validate_component(Input, "Input").$$render(
                $$result,
                {
                  name: "photoURL",
                  type: "file",
                  class: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                  accept: "image/png, image/jpeg, image/gif, image/webp"
                },
                {},
                {}
              )} ${``}</div></form>`;
            }
          })} ${validate_component(Card_footer, "Card.Footer").$$render(
            $$result,
            {
              class: "border-t px-6 py-4 flex justify-between"
            },
            {},
            {
              default: () => {
                return `<a href="/signup/username"${add_attribute("class", buttonVariants({ variant: "outline" }), 0)}>Back</a> <button class="${[
                  escape(buttonVariants({ variant: "outline" }), true),
                  !$user ? "btn-disabled" : ""
                ].join(" ").trim()}">Finish</button>`;
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
