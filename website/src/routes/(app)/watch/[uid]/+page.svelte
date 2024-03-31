<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import Player from '$lib/components/media/Player.svelte';
	import { isAndroidDevice, isIOSDevice } from '$lib/utils/deviceCheck';
	import type { PageData } from './$types';

	export let data: PageData;

	let source = [`/api/medias/${data.post.uid}/dash`, `/api/medias/${data.post.uid}/hls`];

	$: background = data.post.artworks[0].dataUrl || '/images/placeholder.jpg';
</script>

{#key data.post.uid}
	<div class="flex max-h-[75vh] bg-black">
		{#if source.length > 0 && data.post.media && data.post.media.url.endsWith('.mpd')}
			<Player {source} poster={background} />
		{:else}
			<video controls class="grow w-auto" poster={background}>
				<source src={`/api/medias/${data.post.uid}/static`} type="video/mp4" />
			</video>
		{/if}
	</div>
{/key}

<div class="container mx-auto pt-4 pb-16 px-4">
	<div class="">
		<h1 class="text-3xl font-bold">{data.post.title}</h1>
		{#if data.post.parent}
			<p class="text-gray-500 mb-2">
				<a href={`/series/${data.post.parent.slug}`}
					>{data.post.parent.title} - {data.post.slug.split('-').pop()?.toUpperCase()}</a
				>
			</p>
		{/if}
		<p class="text-gray-100">{data.post.content}</p>
		<div class="flex flex-row mt-4">
			{#if data.previousPost}
				<a href={`/watch/${data.previousPost.uid}`} class="btn btn-sm btn-ghost mr-2 gap-2">
					<i class="fa-solid fa-arrow-left" /> Previous
				</a>
			{/if}
			{#if data.nextPost}
				<a href={`/watch/${data.nextPost.uid}`} class="btn btn-sm btn-ghost gap-2">
					Next <i class="fa-solid fa-arrow-right" />
				</a>
			{/if}
		</div>
	</div>

	<div class="mt-4">
		<div class="flex flex-row gap-4 mb-4">
			<button
				class="btn btn-sm btn-primary gap-2"
				on:click={() => {
					navigator.clipboard.writeText(`${$page.url.origin}/api/medias/${data.post.uid}/static`);
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
								`${$page.url.origin}/api/medias/${data.post.uid}/static`
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
						window.open(`vlc://${$page.url.origin}/api/medias/${data.post.uid}/static`);
					}}
				>
					<i class="fa-solid fa-external-link" /> Open in VLC
				</button>
			{/if}
		</div>
		<p class="text-gray-500">
			The stream link can be opened in VLC or any other media player. Use this if the video player
			above doesn't work.
		</p>
	</div>
</div>
