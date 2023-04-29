import { c as create_ssr_component, f as add_attribute, d as escape } from "./index3.js";
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let container;
  let isOpen = false;
  const open = () => {
    isOpen = true;
  };
  const close = () => {
    isOpen = false;
  };
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.close === void 0 && $$bindings.close && close !== void 0)
    $$bindings.close(close);
  return `${isOpen ? `<div class="modal modal-open cursor-pointer"${add_attribute("this", container, 0)}><div class="modal-box flex items-center justify-center cursor-auto w-fit">${slots.default ? slots.default({}) : ``}</div></div>` : ``}`;
});
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
  Modal as M,
  Pagination as P
};
