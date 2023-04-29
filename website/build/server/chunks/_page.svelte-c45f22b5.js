import { c as create_ssr_component, d as escape, e as each } from './index3-84056cf6.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let highlightedMedia;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="hero" style="background-image: url(https://picsum.photos/2560/1440); object-fit: contain;"><div class="hero-overlay bg-opacity-60"></div>
	<div class="hero-content text-neutral-content my-32"><div><h1 class="mb-5 text-5xl font-bold">${escape(highlightedMedia?.title)}</h1>
			<a class="btn btn-primary" href="${"/watch/" + escape(highlightedMedia?.uid, true)}">Watch</a></div></div></div>

${each(data.medias, (media) => {
    return ``;
  })}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-c45f22b5.js.map
