<script lang="ts">
	import Preview from '$lib/components/media/Preview.svelte';
	import type { Media, Post } from '@prisma/client';

	let query = '';
	let results: Post[] = [];

	$: {
		if (query.length > 2) {
			console.log(query);
			search();
		}
	}

	async function search() {
		const res = await fetch(`/api/medias/search?q=${query}`);
		const data = await res.json();

		results = data.results as Post[];

		console.log(results);

		results = results.sort((a, b) => {
			if (a.title > b.title) return 1;
			if (a.title < b.title) return -1;
			return 0;
		});
	}
</script>

<input class="input input-primary m-8" type="text" placeholder="Search" bind:value={query} />

<div
	class="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mt-8 items-center justify-center"
>
	{#each results as res}
		<Preview post={res} />
	{/each}
	<div class="p-8" />
</div>
