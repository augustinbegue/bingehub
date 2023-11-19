<script lang="ts">
	import type { Post, Media } from '@prisma/client';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import Spinner from '$lib/components/Spinner.svelte';
	import Thumbnail from '$lib/components/media/Thumbnail.svelte';
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
	let movies: Post[] = [];
	let series: {
		title: string;
		entries: {
			season: number;
			episode: number;
			uid: string;
		}[];
	}[] = [];
	function orderMedia() {
		for (let i = 0; i < medias.length; i++) {
			if (medias[i].subType === 'MOVIE') {
				movies.push(medias[i]);
			} else if (medias[i].subType === 'SERIES') {
				let res = /([\w ]*)S([0-9]{2}) - S[0-9]{2}E([0-9]{2})/g.exec(medias[i].title);
				if (!res) continue;
				let title = res[1].trim();
				let season = parseInt(res[2]);
				let episode = parseInt(res[3]);

				let seriesIndex = series.findIndex((s) => s.title === title);

				if (seriesIndex === -1) {
					series.push({
						title,
						entries: [
							{
								season,
								episode,
								uid: medias[i].uid
							}
						]
					});
				} else {
					series[seriesIndex].entries.push({
						season,
						episode,
						uid: medias[i].uid
					});
				}
			}
		}

		for (let i = 0; i < series.length; i++) {
			series[i].entries.sort((a, b) => {
				if (a.season === b.season) {
					return a.episode - b.episode;
				} else {
					return a.season - b.season;
				}
			});
		}

		highlightedMedia = movies[0];
		movies.shift();
		// Svelte update
		series = series;
		movies = movies;
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
		<Thumbnail postUid={highlightedMedia.uid} className="hero-image object-cover aspect-[21/9]" />
		<div class="hero-overlay bg-opacity-80" />
		<div class="hero-content text-neutral-content my-32">
			<div>
				<h1 class="mb-5 text-5xl font-bold">{highlightedMedia?.title}</h1>
				<a class="btn btn-primary" href="/watch/{highlightedMedia?.uid}">Watch</a>
			</div>
		</div>
	{:else}
		<Spinner />
	{/if}
</div>
<div class="mx-2 mt-8 md:hidden">
	<div class="card shadow-xl image-full">
		{#if highlightedMedia}
			<figure class="aspect-video">
				<Thumbnail postUid={highlightedMedia.uid} />
			</figure>
			<div class="card-body justify-end">
				<h2 class="card-title">{highlightedMedia?.title}</h2>
				<a class="btn btn-primary" href="/watch/{highlightedMedia?.uid}">Watch</a>
			</div>
		{/if}
	</div>
</div>

<div class="container mx-auto p-4">
	<!-- Movie List -->
	<h1 class="text-3xl md:text-4xl font-bold mt-8">Movies</h1>
	<div
		class="grid grid-rows-1 grid-flow-col gap-2 overflow-x-scroll min-h-[10rem] md:min-h-[16rem] p-2"
	>
		{#each movies as movie}
			<Preview post={movie} />
		{/each}
	</div>

	<h1 class="text-3xl md:text-4xl font-bold mt-8">Series</h1>
	<div class="flex flex-col">
		{#each series as serie}
			<h2 class="text-2xl font-semibold">{serie.title}</h2>
			<div class="flex flex-row overflow-x-scroll overflow-y-clip relative h-40 md:h-64 rounded-lg">
				<Thumbnail postUid={serie.entries[0].uid} className="h-40 md:h-64 z-10 rounded-xl" />
				<Thumbnail
					postUid={serie.entries[0].uid}
					className="absolute z-0 object-center blur-2xl h-40 md:h-64 w-full object-cover"
				/>
				<div class="grid grid-rows-2 grid-flow-col gap-4 items-center p-4 z-10">
					{#each serie.entries as entry}
						<a class="btn btn-ghost" href="/watch/{entry.uid}">
							S{entry.season} Episode {entry.episode}
						</a>
					{/each}
				</div>
			</div>
		{/each}
	</div>
</div>
