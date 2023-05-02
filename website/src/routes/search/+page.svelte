<script lang="ts">
	import type { Media, Post } from '@prisma/client';

	let query = '';
	let results: (Post & {
		media: Media;
	})[] = [];

	$: {
		if (query.length > 2) {
			console.log(query);

			search();
		}
	}

	async function search() {
		const res = await fetch(`/api/medias/search?q=${query}`);
		const data = await res.json();

		results = data.results as (Post & {
			media: Media;
		})[];
	}
</script>

<input class="input input-primary m-8" type="text" placeholder="Search" bind:value={query} />

<div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
	{#each results as res}
		<div class="card shadow-xl image-full">
			<figure><img src={res.media?.thumbnailDataUrl} alt={res.title} /></figure>
			<div class="card-body justify-end">
				<h2 class="card-title">{res.title}</h2>
				<a class="btn btn-primary" href="/watch/{res.uid}">Watch</a>
			</div>
		</div>
	{/each}
</div>
