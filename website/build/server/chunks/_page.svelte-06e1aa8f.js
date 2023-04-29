import { c as create_ssr_component, a as subscribe, v as validate_component, f as add_attribute } from './index3-84056cf6.js';
import { g as goto } from './navigation-483aa8de.js';
import { p as page } from './stores-d43666c0.js';
import { c as currentUser } from './index5-493b4a72.js';
import './index2-ea984e2e.js';

const LoginForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let username;
  let password;
  let { onLogin } = $$props;
  if ($$props.onLogin === void 0 && $$bindings.onLogin && onLogin !== void 0)
    $$bindings.onLogin(onLogin);
  return `<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200"><div class="card-body"><form><div class="form-control"><label class="label" for="username"><span class="label-text">Username</span></label>
				<input id="username" type="username" placeholder="username" class="${["input input-bordered", ""].join(" ").trim()}"${add_attribute("value", username, 0)}>
				<label for="username" class="label">${``}</label></div>
			<div class="form-control"><label class="label" for="password"><span class="label-text">Password</span></label>
				<input id="password" type="password" placeholder="password" class="${["input input-bordered", ""].join(" ").trim()}"${add_attribute("value", password, 0)}>
				<label for="password" class="label">${``}</label></div>
			<div class="form-control mt-6"><input type="submit" class="${["btn btn-primary", ""].join(" ").trim()}" value="Login">
				<label class="label" for="submit"><a href="#" class="label-text-alt link link-hover">Forgot password?</a></label></div></form></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_currentUser;
  let $$unsubscribe_page;
  $$unsubscribe_currentUser = subscribe(currentUser, (value) => value);
  $$unsubscribe_page = subscribe(page, (value) => value);
  function onLogin(result) {
    switch (result) {
      case "success":
        {
          goto("/");
        }
        break;
    }
  }
  $$unsubscribe_currentUser();
  $$unsubscribe_page();
  return `<div class="hero h-full grow"><div class="hero-content flex-col lg:flex-row-reverse">${validate_component(LoginForm, "LoginForm").$$render($$result, { onLogin }, {}, {})}</div></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-06e1aa8f.js.map
