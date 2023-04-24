<script lang="ts">
	import type { Post, Media } from '@prisma/client';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;

	let highlightedMedia: Post & {
		media: Media | null;
	};

	onMount(() => {
		console.log(data);

		highlightedMedia = data.medias.pop()!;
	});
</script>

<div
	class="hero"
	style="background-image: url(https://picsum.photos/2560/1440); object-fit: contain;"
>
	<div class="hero-overlay bg-opacity-60" />
	<div class="hero-content text-neutral-content my-32">
		<div>
			<h1 class="mb-5 text-5xl font-bold">{highlightedMedia?.title}</h1>
			<a class="btn btn-primary" href="/watch/{highlightedMedia?.uid}">Watch</a>
		</div>
	</div>
</div>

<div class="container mx-auto grid grid-cols-3">
	{#each data.medias as media}
		<div class="card">
			<div class="card-body">
				<h2 class="card-title">{media.title}</h2>
				<p class="card-text">{media.content}</p>
				<a class="btn btn-primary" href="/watch/{media.uid}">Watch</a>
			</div>
		</div>
	{/each}
</div>
