import { s as subscribe } from "./utils.js";
import { c as create_ssr_component, v as validate_component } from "./ssr.js";
import { u as userData, a as user } from "./firebase.js";
import "firebase/auth";
import "./index3.js";
import { B as Button } from "./button.js";
const SignInWithGoogle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_userData;
  let $$unsubscribe_user;
  $$unsubscribe_userData = subscribe(userData, (value) => value);
  $$unsubscribe_user = subscribe(user, (value) => value);
  let { goTo = "" } = $$props;
  if ($$props.goTo === void 0 && $$bindings.goTo && goTo !== void 0)
    $$bindings.goTo(goTo);
  $$unsubscribe_userData();
  $$unsubscribe_user();
  return `${validate_component(Button, "Button").$$render($$result, { variant: "outline" }, {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
export {
  SignInWithGoogle as S
};
