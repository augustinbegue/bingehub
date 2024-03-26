<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Player from '$lib/components/media/Player.svelte';
	import { isAndroidDevice, isIOSDevice } from '$lib/utils/deviceCheck';
	import type { PageData } from './$types';

	export let data: PageData;

	let source = [`/api/medias/${data.media.uid}/stream`];

	const background =
		data.media.artworks.find((artwork) => artwork.type === 'BACKGROUND')?.dataUrl || '';
</script>

<div class="flex max-h-[75vh] bg-black">
	{#if source.length > 0 && data.media.media && data.media.media.url.endsWith('.mpd')}
		<Player {source} poster={background} />
	{:else}
		<video autoplay controls class="grow w-auto" poster={background}>
			<source src={`/api/medias/${data.media.uid}/static`} type="video/mp4" />
		</video>
	{/if}
</div>
<div class="container mx-auto p-8">
	<div class="mt-4">
		<h1 class="text-3xl font-bold">{data.media.title}</h1>
		<p class="text-gray-100">{data.media.content}</p>
		<p class="text-gray-500 mt-2">
			<button
				class="btn btn-sm btn-primary gap-2"
				on:click={() => {
					navigator.clipboard.writeText(`${$page.url.origin}/api/medias/${data.media.uid}/static`);
				}}
			>
				<i class="fa-solid fa-copy" /> Copy stream link
			</button>

			<!-- Open in VLC Button IOS -->
			{#if browser && isIOSDevice()}
				<button
					class="btn btn-sm btn-primary gap-2"
					on:click={() => {
						window.open(
							`vlc-x-callback://x-callback-url/stream?url=${encodeURIComponent(
								`${$page.url.origin}/api/medias/${data.media.uid}/static`
							)}`
						);
					}}
				>
					<i class="fa-solid fa-external-link" /> Open in VLC
				</button>
			{/if}
			<!-- Open in VLC Button Android -->
			{#if browser && isAndroidDevice()}
				<button
					class="btn btn-sm btn-primary gap-2"
					on:click={() => {
						window.open(`vlc://${$page.url.origin}/api/medias/${data.media.uid}/static`);
					}}
				>
					<i class="fa-solid fa-external-link" /> Open in VLC
				</button>
			{/if}
			<br />
			The stream link can be opened in VLC or any other media player. Use this if the video player above
			doesn't work.
		</p>
	</div>
</div>
