<script lang="ts">
	import type { Post, Media } from '@prisma/client';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import Thumbnail from '$lib/components/media/Thumbnail.svelte';
	import Poster from '$lib/components/media/Poster.svelte';
	import Preview from '$lib/components/media/Preview.svelte';

	export let data: PageData;
	let page: number = 1;

	let medias: (Post & {
		media: Media | null;
	})[] = [];

	let loading = false;
	async function fetchMedia() {
		const res = await fetch(`/api/medias`);
		const json = await res.json();
		return json as {
			medias: (Post & {
				media: Media | null;
			})[];
			pagination: {
				current: number;
				total: number;
			};
		};
	}

	let highlightedMedia: Post;
	function orderMedia() {
		highlightedMedia = medias[0];
		medias.shift();
		// Svelte update
		medias = [...medias];
	}

	onMount(async () => {
		loading = true;
		medias = (await fetchMedia()).medias;
		orderMedia();
		loading = false;
	});
</script>

<!-- Highlighted Movie -->
<div class="hidden md:hero bg-black aspect-[21/9] w-full">
	{#if highlightedMedia}
		<Thumbnail postUid={highlightedMedia.uid} className="object-cover aspect-[21/9] w-full" />
		<div class="hero-overlay bg-opacity-80" />
		<div class="hero-content text-neutral-content my-32">
			<Poster postUid={highlightedMedia.uid} className="w-64 rounded-xl" />
			<div>
				<h1 class="mb-2 text-5xl font-bold">{highlightedMedia?.title}</h1>
				<p class="mb-5">{highlightedMedia.content}</p>
				{#if highlightedMedia?.subType === 'MOVIE'}
					<a class="btn btn-primary" href="/watch/{highlightedMedia?.uid}">Watch</a>
				{:else}
					<a class="btn btn-primary" href="/series/{highlightedMedia?.slug}">Watch</a>
				{/if}
			</div>
		</div>
	{:else}
		<Spinner />
	{/if}
</div>
<div class="md:hidden">
	<a class="hero aspect-[21/9]" href="/watch/{highlightedMedia?.uid}">
		{#if highlightedMedia}
			<Thumbnail postUid={highlightedMedia.uid} className="object-cover aspect-[21/9] w-full" />
			<div class="hero-overlay bg-opacity-60" />
			<div class="hero-content text-neutral-content">
				<div>
					<h2 class="text-2xl font-bold">{highlightedMedia?.title}</h2>
				</div>
			</div>
		{/if}
	</a>
</div>

<div class="container mx-auto p-4">
	<!-- Movie List -->
	<h1 class="text-2xl md:text-4xl font-bold mt-8">🍿 Latest Additions</h1>
	<div
		class="grid grid-rows-1 grid-flow-col gap-2 overflow-x-scroll min-h-[10rem] md:min-h-[16rem] p-2"
	>
		{#each medias as media}
			<Preview post={media} />
		{/each}
	</div>
</div>
