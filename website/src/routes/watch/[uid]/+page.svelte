<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Player from '$lib/components/media/Player.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let source = [`/api/medias/${data.media.uid}/stream`];
</script>

<div class="container mx-auto p-8">
	{#if source.length > 0 && data.media.media}
		<Player {source} poster={data.media.media?.thumbnailDataUrl} />
	{:else}
		<div class="bg-gray-900 w-full h-full flex items-center justify-center">
			<img
				src={data.media.media?.thumbnailDataUrl}
				class="w-full h-full object-contain"
				alt={data.media.title}
			/>
		</div>
	{/if}

	<div class="mt-4">
		<h1 class="text-3xl font-bold">{data.media.title}</h1>
		<p class="text-gray-500 mt-2">
			<button
				class="btn btn-sm btn-primary gap-2"
				on:click={() => {
					navigator.clipboard.writeText(`${$page.url.origin}${source[0]}`);
				}}
			>
				<i class="fa-solid fa-copy" /> Copy stream link
			</button>

			The stream link can be opened in VLC or any other media player. Use this if the video player
			above doesn't work.
		</p>
	</div>
</div>
