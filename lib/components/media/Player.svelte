<script lang="ts">
	import { onMount } from 'svelte';
	import shaka from 'shaka-player/dist/shaka-player.ui';

	let videoContainer: HTMLDivElement;
	let video: HTMLVideoElement;

	export let source: string[] = [];
	export let poster: string = '';

	export let shakaPlayer: shaka.Player;
	export let shakaUi: shaka.ui.Overlay;

	export let onError: (error: shaka.util.Error) => void = (error) => {
		console.log(source, poster.length);

		console.error(error);
	};

	onMount(() => {
		document.addEventListener('shaka-ui-loaded', () => {
			console.log('UI loaded');
		});

		if (source.length === 0) {
			onError(
				new shaka.util.Error(
					shaka.util.Error.Severity.CRITICAL,
					shaka.util.Error.Category.PLAYER,
					shaka.util.Error.Code.INVALID_STREAMS_OBJECT
				)
			);
		}

		shaka.polyfill.installAll();

		if (shaka.Player.isBrowserSupported()) {
			// Everything looks good!
			shakaPlayer = new shaka.Player(video);
			shakaUi = new shaka.ui.Overlay(shakaPlayer, videoContainer, video);

			shakaPlayer.addEventListener('error', (event) => {
				// Extract the shaka.util.Error object from the event.
				onError(event.detail);
			});

			shakaPlayer
				.load(source[0])
				.then(() => {
					// This runs if the asynchronous load is successful.
				})
				.catch(onError);
		} else {
			// This browser does not have the minimum set of APIs we need.
			alert('Browser not supported!');
		}
	});
</script>

<div bind:this={videoContainer}>
	<video class="w-full h-full" bind:this={video} {poster}>
		{#each source as src}
			<source {src} />
		{/each}
	</video>
</div>

<style>
	@import 'shaka-player/dist/controls.css';
</style>
