<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import Thumbnail from '$lib/components/media/Thumbnail.svelte';
	import Poster from '$lib/components/media/Poster.svelte';
	import Preview from '$lib/components/media/Preview.svelte';
	import type { Post } from '@prisma/client';

	export let data: PageData;

	const seasons: {
		episodes: Post[];
	}[] = [];
	let episodes: Post[] = [];

	onMount(() => {
		(data.series.childs as Post[]).forEach((episode) => {
			const season =
				parseInt(
					episode.slug
						.split('-')
						.pop()
						?.match(/s(\d{2})/)![1] ?? '0'
				) - 1;
			console.log(season);

			if (!seasons[season]) {
				seasons[season] = {
					episodes: []
				};
			}
			seasons[season].episodes.push(episode);
		});
		episodes = seasons[0].episodes;
	});
</script>

<div class="hidden md:hero bg-black aspect-[21/9] w-full">
	<Thumbnail postUid={data.series.uid} className="object-cover aspect-[21/9] w-full" />
	<div class="hero-overlay bg-opacity-80" />
	<div class="hero-content text-neutral-content my-32">
		<Poster postUid={data.series.uid} className="w-64 rounded-xl" />
		<div>
			<h1 class="mb-2 text-5xl font-bold">{data.series?.title}</h1>
			<p class="mb-5">{data.series.content}</p>
		</div>
	</div>
</div>

<div class="container mx-auto py-8">
	<select
		class="select mb-4"
		on:change={(e) => {
			episodes = seasons[parseInt(e.target.value)].episodes;
		}}
	>
		{#each seasons as season, i}
			<option value={i}>{`Season ${i + 1}`}</option>
		{/each}
	</select>

	<div class="flex flex-col gap-4">
		{#each episodes as episode}
			<Preview post={episode} />
		{/each}
	</div>
</div>
