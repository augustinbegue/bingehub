import { c as create_ssr_component, d as escape } from "./index3.js";
const Pagination = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { pagination } = $$props;
  let { url } = $$props;
  if ($$props.pagination === void 0 && $$bindings.pagination && pagination !== void 0)
    $$bindings.pagination(pagination);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0)
    $$bindings.url(url);
  return `<div class="btn-group border border-base-200 rounded-lg"><button class="btn btn-ghost" ${pagination.current === 1 ? "disabled" : ""}><i class="fa-solid fa-chevron-left"></i></button>
	<button class="btn btn-ghost">Page ${escape(pagination.current)}/${escape(pagination.total)}</button>
	<button class="btn btn-ghost" ${pagination.current === pagination.total ? "disabled" : ""}><i class="fa-solid fa-chevron-right"></i></button></div>`;
});
export {
  Pagination as P
};
