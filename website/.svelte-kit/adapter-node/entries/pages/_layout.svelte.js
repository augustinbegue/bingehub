import { c as create_ssr_component, a as subscribe, e as each, b as add_classes, d as escape, v as validate_component } from "../../chunks/index3.js";
import { p as page } from "../../chunks/stores.js";
import { w as writable } from "../../chunks/index2.js";
import { c as currentUser } from "../../chunks/index5.js";
import { h as hasRole } from "../../chunks/utils.js";
const alerts = writable([]);
const Alerter = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $alerts, $$unsubscribe_alerts;
  $$unsubscribe_alerts = subscribe(alerts, (value) => $alerts = value);
  $$unsubscribe_alerts();
  return `<div class="absolute bottom-0 p-4 w-full z-[1000]"><div class="container mx-auto">${each($alerts, (alert, i) => {
    return `<div class="${[
      "alert shadow-lg m-2",
      (alert.type === "info" ? "alert-info" : "") + " " + (alert.type === "success" ? "alert-success" : "") + " " + (alert.type === "warning" ? "alert-warning" : "") + " " + (alert.type === "error" ? "alert-error" : "")
    ].join(" ").trim()}"><div>${alert.type === "info" ? `<i class="fas fa-info-circle"></i>` : ``}
					${alert.type === "success" ? `<i class="fas fa-check-circle"></i>` : ``}
					${alert.type === "warning" ? `<i class="fas fa-exclamation-circle"></i>` : ``}
					${alert.type === "error" ? `<i class="fas fa-exclamation-triangle"></i>` : ``}
					<span><!-- HTML_TAG_START -->${alert.message}<!-- HTML_TAG_END --></span></div>
				<div class="flex-none"><button class="btn btn-sm btn-ghost btn-primary"><i class="fas fa-times"></i>
					</button></div>
			</div>`;
  })}</div></div>`;
});
const Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { url } = $$props;
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  return `<footer class="hidden md:flex footer h-16 p-2 bg-base-300 flex-row items-center shrink-0"><a class="footer-title link link-hover m-0" href="https://begue.cc">Augustin BÉGUÉ</a></footer>

<div class="p-6 md:hidden"></div>

<div class="z-50 btm-nav flex btm-nav-sm md:hidden"><a href="/new"${add_classes((url?.toString().indexOf("/new") != -1 ? "active" : "").trim())}><span class="material-icons-outlined">add </span></a>
	<a href="/"${add_classes((url?.toString().indexOf("/search") === -1 && url?.toString().indexOf("/new") === -1 ? "active" : "").trim())}><span class="material-icons-outlined">home </span></a>
	<a href="/search"${add_classes((url?.toString().indexOf("/search") != -1 ? "active" : "").trim())}><span class="material-icons-outlined">search </span></a></div>`;
});
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $currentUser, $$unsubscribe_currentUser;
  $$unsubscribe_currentUser = subscribe(currentUser, (value) => $currentUser = value);
  let isAdmin = false;
  {
    (() => {
      isAdmin = hasRole("admin");
    })();
  }
  $$unsubscribe_currentUser();
  return `<header class="navbar bg-base-300 shrink-0"><div class="navbar-start"><a class="btn btn-ghost lowercase font-bold text-lg" href="/"><span class="mr-1">binge</span>
			<span class="px-2 py-1 bg-primary rounded-md">hub</span></a></div>
	<div class="hidden md:flex navbar-center"><ul class="menu menu-horizontal px-1"><li><a href="/search">search</a></li>
			<li><a href="/requests">requests</a></li></ul></div>
	<div class="navbar-end">${$currentUser != null ? `<div class="dropdown dropdown-end"><button tabindex="0" class="btn lowercase"><span class="text-base">@${escape($currentUser.username)}</span></button>
				<ul class="menu bg-base-200 dropdown-content p-2 shadow rounded-box w-52 mt-4"><li><a href="/settings">settings</a></li>
					${isAdmin ? `<li><a href="/admin">admin settings</a></li>` : ``}

					<div class="divider my-0 py-0"></div>
					<li><button>logout
						</button></li></ul></div>` : `<a class="btn btn-ghost lowercase text-base font-bold" href="/auth/login">login</a>`}</div></header>`;
});
const app = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_currentUser;
  let $page, $$unsubscribe_page;
  $$unsubscribe_currentUser = subscribe(currentUser, (value) => value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_currentUser();
  $$unsubscribe_page();
  return `${validate_component(Alerter, "Alerter").$$render($$result, {}, {}, {})}
<div class="min-h-screen flex flex-col justify-between">${validate_component(Header, "Header").$$render($$result, {}, {}, {})}

	<main class="flex flex-col grow">${slots.default ? slots.default({}) : ``}</main>

	${validate_component(Footer, "Footer").$$render($$result, { url: $page.url }, {}, {})}</div>`;
});
export {
  Layout as default
};
