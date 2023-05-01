import { c as create_ssr_component, f as add_attribute, e as each, a as subscribe, v as validate_component, d as escape } from "../../../../chunks/index3.js";
import { p as page } from "../../../../chunks/stores.js";
import "shaka-player/dist/shaka-player.ui.js";
const Player_svelte_svelte_type_style_lang = "";
const css = {
  code: "@import 'shaka-player/dist/controls.css';",
  map: null
};
const Player = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let videoContainer;
  let video;
  let { source = [] } = $$props;
  let { poster = "" } = $$props;
  let { shakaPlayer } = $$props;
  let { shakaUi } = $$props;
  let { onError = (error) => {
    console.log(source, poster.length);
    console.error(error);
  } } = $$props;
  if ($$props.source === void 0 && $$bindings.source && source !== void 0)
    $$bindings.source(source);
  if ($$props.poster === void 0 && $$bindings.poster && poster !== void 0)
    $$bindings.poster(poster);
  if ($$props.shakaPlayer === void 0 && $$bindings.shakaPlayer && shakaPlayer !== void 0)
    $$bindings.shakaPlayer(shakaPlayer);
  if ($$props.shakaUi === void 0 && $$bindings.shakaUi && shakaUi !== void 0)
    $$bindings.shakaUi(shakaUi);
  if ($$props.onError === void 0 && $$bindings.onError && onError !== void 0)
    $$bindings.onError(onError);
  $$result.css.add(css);
  return `<div class="w-full h-full"${add_attribute("this", videoContainer, 0)}><video${add_attribute("poster", poster, 0)}${add_attribute("this", video, 0)}>${each(source, (src) => {
    return `<source${add_attribute("src", src, 0)}>`;
  })}</video>
</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let { data } = $$props;
  let source = [`/api/medias/${data.media.uid}/stream`];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$unsubscribe_page();
  return `<div class="container mx-auto p-8">${source.length > 0 && data.media.media ? `${validate_component(Player, "Player").$$render(
    $$result,
    {
      source,
      poster: data.media.media?.thumbnailDataUrl
    },
    {},
    {}
  )}` : `<div class="bg-gray-900 w-full h-full flex items-center justify-center"><img${add_attribute("src", data.media.media?.thumbnailDataUrl, 0)} class="w-full h-full object-contain"${add_attribute("alt", data.media.title, 0)}></div>`}

	<div class="mt-4"><h1 class="text-3xl font-bold">${escape(data.media.title)}</h1>
		<p class="text-gray-500 mt-2"><button class="btn btn-sm btn-primary gap-2"><i class="fa-solid fa-copy"></i> Copy stream link
			</button>

			The stream link can be opened in VLC or any other media player. Use this if the video player
			above doesn&#39;t work.
		</p></div></div>`;
});
export {
  Page as default
};
