import { c as create_ssr_component, f as add_attribute } from "./index3.js";
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
  return `${isOpen ? `<div class="modal modal-open cursor-pointer grow"${add_attribute("this", container, 0)}><div class="modal-box flex flex-col max-w-6xl">${slots.default ? slots.default({}) : ``}</div></div>` : ``}`;
});
export {
  Modal as M
};
