import { c as create_ssr_component, d as escape } from "../../../../chunks/index3.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="container mx-auto"><video><source src="${"/api/media/" + escape(data.media.uid, true) + "/stream"}" type="video/mp4"></video></div>`;
});
export {
  Page as default
};
