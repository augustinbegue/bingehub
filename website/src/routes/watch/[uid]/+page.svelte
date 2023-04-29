<script lang="ts">
	import { dev } from '$app/environment';
	import type { PageData } from './$types';
	import VideoPlayer from 'svelte-video-player';

	export let data: PageData;

	// let source = dev
	// 	? [`http://localhost:3000/api/media/${data.media.uid}/stream`]
	// 	: [`/api/media/${data.media.uid}/stream`];

	let source = [`/api/media/${data.media.uid}/stream`];
</script>

<div class="container mx-auto p-8">
	<VideoPlayer {source} color={'#f28c18'} />
	<div class="mt-4">
		<h1 class="text-3xl font-bold">{data.media.title}</h1>
		<p class="text-gray-500 mt-2">{data.media.content}</p>
	</div>
</div>
