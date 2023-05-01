import { c as create_ssr_component, e as each, v as validate_component, f as add_attribute, d as escape } from "../../chunks/index3.js";
const InfiniteScroll = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { horizontal = false } = $$props;
  let { threshold = 200 } = $$props;
  let { loadMore } = $$props;
  if ($$props.horizontal === void 0 && $$bindings.horizontal && horizontal !== void 0)
    $$bindings.horizontal(horizontal);
  if ($$props.threshold === void 0 && $$bindings.threshold && threshold !== void 0)
    $$bindings.threshold(threshold);
  if ($$props.loadMore === void 0 && $$bindings.loadMore && loadMore !== void 0)
    $$bindings.loadMore(loadMore);
  return `<div></div>`;
});
const Spinner_svelte_svelte_type_style_lang = "";
const css = {
  code: ".spinner.svelte-1pn6z57.svelte-1pn6z57{animation:svelte-1pn6z57-rotate 2s linear infinite;z-index:2;position:absolute;margin:-25px 0 0 -25px;width:50px;height:50px}.spinner.svelte-1pn6z57 .path.svelte-1pn6z57{stroke:hsl(var(--p));stroke-linecap:round;animation:svelte-1pn6z57-dash 1.5s ease-in-out infinite}@keyframes svelte-1pn6z57-rotate{100%{transform:rotate(360deg)}}@keyframes svelte-1pn6z57-dash{0%{stroke-dasharray:1, 150;stroke-dashoffset:0}50%{stroke-dasharray:90, 150;stroke-dashoffset:-35}100%{stroke-dasharray:90, 150;stroke-dashoffset:-124}}",
  map: null
};
const Spinner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<svg class="spinner svelte-1pn6z57" viewBox="0 0 50 50"><circle class="path svelte-1pn6z57" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle></svg>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let page = 1;
  let medias = [];
  let loading = false;
  async function fetchMedia(count = 9) {
    loading = true;
    const res = await fetch(`/api/medias?page=${page}&count=${count}`);
    const json = await res.json();
    loading = false;
    return json;
  }
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${``}

<div class="container mx-auto grid grid-cols-3 gap-8 mt-8">${each(medias, (media, i) => {
    return `<div class="card shadow-xl image-full"><figure><img${add_attribute("src", media.media?.thumbnailDataUrl, 0)}${add_attribute("alt", media.title, 0)}></figure>
			<div class="card-body justify-end"><h2 class="card-title">${escape(media.title)}</h2>
				<a class="btn btn-primary" href="${"/watch/" + escape(media.uid, true)}">Watch</a></div>
		</div>`;
  })}</div>
<div class="container mx-auto flex flex-row justify-center p-32">${validate_component(InfiniteScroll, "InfiniteScroll").$$render(
    $$result,
    {
      loadMore: async () => {
        if (!loading) {
          page++;
          let res = await fetchMedia(9);
          medias = [...medias, ...res.medias];
        }
      }
    },
    {},
    {}
  )}
	${loading ? `${validate_component(Spinner, "Spinner").$$render($$result, {}, {}, {})}` : ``}</div>`;
});
export {
  Page as default
};
