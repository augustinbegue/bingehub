<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Player from '$lib/components/media/Player.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let source = [`/api/medias/${data.media.uid}/stream`];
</script>

<div class="container mx-auto p-8">
	{#if source.length > 0 && data.media.media && data.media.media.url.endsWith('.mpd')}
		<Player {source} poster={data.media.media?.thumbnailDataUrl} />
	{:else}
		<video autoplay controls class="w-full" poster={data.media.media?.thumbnailDataUrl}>
			<source src={`/api/medias/${data.media.uid}/static`} type="video/mp4" />
		</video>
	{/if}

	<div class="mt-4">
		<h1 class="text-3xl font-bold">{data.media.title}</h1>
		<p class="text-gray-500 mt-2">
			<button
				class="btn btn-sm btn-primary gap-2"
				on:click={() => {
					navigator.clipboard.writeText(`${$page.url.origin}/api/medias/${data.media.uid}/static`);
				}}
			>
				<i class="fa-solid fa-copy" /> Copy stream link
			</button>

			The stream link can be opened in VLC or any other media player. Use this if the video player
			above doesn't work.
		</p>
	</div>
</div>
