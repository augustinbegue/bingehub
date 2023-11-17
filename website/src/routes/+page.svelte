<script lang="ts">
	import type { Post, Media } from '@prisma/client';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import InfiniteScroll from '$lib/components/pagination/InfiniteScroll.svelte';
	import Spinner from '$lib/components/Spinner.svelte';

	export let data: PageData;
	let page: number = 1;

	let medias: (Post & {
		media: Media | null;
	})[] = [];
	let highlightedMedia: Post & {
		media: Media | null;
	};

	let loading = false;
	async function fetchMedia(count: number = 9) {
		loading = true;
		const res = await fetch(`/api/medias?page=${page}&count=${count}`);
		const json = await res.json();
		loading = false;
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

	onMount(async () => {
		let res = await fetchMedia(10);

		highlightedMedia = res.medias[0];
		res.medias.shift();
		medias = res.medias;
	});
</script>

{#if highlightedMedia}
	<div class="hero bg-black">
		<img
			class="hero-image max-h-[75vh] w-full object-fill"
			src={highlightedMedia?.media?.thumbnailDataUrl}
			alt={highlightedMedia?.title}
		/>
		<div class="hero-overlay bg-opacity-80" />
		<div class="hero-content text-neutral-content my-32">
			<div>
				<h1 class="mb-5 text-5xl font-bold">{highlightedMedia?.title}</h1>
				<a class="btn btn-primary" href="/watch/{highlightedMedia?.uid}">Watch</a>
			</div>
		</div>
	</div>
{/if}

<div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
	{#each medias as media, i}
		<div class="card shadow-xl image-full">
			<figure><img src={media.media?.thumbnailDataUrl} alt={media.title} /></figure>
			<div class="card-body justify-end">
				<h2 class="card-title">{media.title}</h2>
				<a class="btn btn-primary" href="/watch/{media.uid}">Watch</a>
			</div>
		</div>
	{/each}
</div>
<div class="container mx-auto flex flex-row justify-center p-32">
	<InfiniteScroll
		loadMore={async () => {
			if (!loading) {
				page++;
				let res = await fetchMedia(9);
				medias = [...medias, ...res.medias];
			}
		}}
	/>
	{#if loading}
		<Spinner />
	{/if}
</div>
