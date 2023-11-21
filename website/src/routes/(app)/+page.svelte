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
		seasons: {
			season: number;
			entries: {
				season: number;
				episode: number;
				uid: string;
			}[];
		}[];
	}[] = [];
	function orderMedia() {
		console.log(medias);

		for (let i = 0; i < medias.length; i++) {
			if (medias[i].subType === 'MOVIE') {
				movies.push(medias[i]);
			} else if (medias[i].subType === 'SERIES') {
				let res = /([\w ]*)S([0-9]{2}) - S[0-9]{2}E([0-9]{2})/g.exec(medias[i].title);
				if (!res) {
					res = /([\w& ]*) - S([0-9]{2})E([0-9]{2})/g.exec(medias[i].title);
				}
				if (!res) {
					res = /([\w& ]*)S([0-9]{2})E([0-9]{2})/g.exec(medias[i].title);
				}

				if (!res) continue;

				let title = res[1].trim();
				let season = parseInt(res[2]);
				let episode = parseInt(res[3]);

				let seriesIndex = series.findIndex((s) => s.title === title);

				if (seriesIndex === -1) {
					series.push({
						title,
						seasons: [
							{
								season,
								entries: [
									{
										uid: medias[i].uid,
										season,
										episode
									}
								]
							}
						]
					});
				} else {
					let seasonIndex = series[seriesIndex].seasons.findIndex((s) => s.season === season);

					if (seasonIndex === -1) {
						series[seriesIndex].seasons.push({
							season,
							entries: [
								{
									uid: medias[i].uid,
									season,
									episode
								}
							]
						});
					} else {
						series[seriesIndex].seasons[seasonIndex].entries.push({
							uid: medias[i].uid,
							season,
							episode
						});
					}
				}
			}
		}

		for (let i = 0; i < series.length; i++) {
			const serie = series[i];

			serie.seasons.sort((a, b) => a.season - b.season);

			for (let j = 0; j < serie.seasons.length; j++) {
				const season = serie.seasons[j];

				season.entries.sort((a, b) => a.episode - b.episode);
			}
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
<div class="md:hidden">
	<a class="hero aspect-[21/9]" href="/watch/{highlightedMedia?.uid}">
		{#if highlightedMedia}
			<Thumbnail postUid={highlightedMedia.uid} className="hero-image object-cover aspect-[21/9]" />
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
	<h1 class="text-2xl md:text-4xl font-bold mt-8">Movies</h1>
	<div
		class="grid grid-rows-1 grid-flow-col gap-2 overflow-x-scroll min-h-[10rem] md:min-h-[16rem] p-2"
	>
		{#each movies as movie}
			<Preview post={movie} />
		{/each}
	</div>

	<h1 class="text-2xl md:text-4xl font-bold mt-8">Series</h1>
	<div class="flex flex-col">
		{#each series as serie}
			<h2 class="text-lg md:text-2xl font-semibold mt-2 mb-1">{serie.title}</h2>
			{#each serie.seasons as season}
				<h3 class="text-md font-semibold mt-1 mb-1">Season {season.season}</h3>
				<div class="flex flex-row overflow-x-auto overflow-y-clip relative h-40 md:h-64 rounded-lg">
					<Thumbnail
						postUid={season.entries[0].uid}
						className="h-40 md:h-64 z-10 rounded-xl aspect-video"
					/>
					<Thumbnail
						postUid={season.entries[0].uid}
						className="absolute z-0 object-center blur-2xl h-40 md:h-64 w-full object-cover"
					/>
					<div class="grid grid-rows-2 grid-flow-col gap-4 items-center p-4 z-10">
						{#each season.entries as entry}
							<a class="btn btn-ghost w-36" href="/watch/{entry.uid}">
								S{entry.season} Episode {entry.episode}
							</a>
						{/each}
					</div>
				</div>
			{/each}
		{/each}
	</div>
</div>
