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

<div class="container mx-auto">
	<VideoPlayer {source} color={'#f28c18'} />
</div>
