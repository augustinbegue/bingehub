import { c as create_ssr_component, a as subscribe, b as add_classes } from "../../../chunks/index3.js";
import { p as page } from "../../../chunks/stores.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<div class="container mx-auto flex flex-row h-full"><ul class="menu bg-base-100 w-56 p-2 rounded-box font-medium"><li${add_classes(($page.url.pathname.endsWith("requests") ? "bordered" : "").trim())}><a href="/admin/requests">requests </a></li>
		<li${add_classes(($page.url.pathname.endsWith("media") ? "bordered" : "").trim())}><a href="/admin/media">media </a></li>
		<li${add_classes(($page.url.pathname.endsWith("jobs") ? "bordered" : "").trim())}><a href="/admin/jobs">jobs </a></li>
		<li${add_classes(($page.url.pathname.endsWith("users") ? "bordered" : "").trim())}><a href="/admin/users">users </a></li>
		<li${add_classes(($page.url.pathname.endsWith("roles") ? "bordered" : "").trim())}><a href="/admin/roles">roles </a></li></ul>
	<div class="h-full w-full py-2"><div class="card bg-base-200 w-full h-full"><div class="card-body">${slots.default ? slots.default({}) : ``}</div></div></div></div>`;
});
export {
  Layout as default
};
