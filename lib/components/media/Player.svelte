<script lang="ts">
	import { onMount } from 'svelte';
	import shaka from 'shaka-player/dist/shaka-player.ui';

	let videoContainer: HTMLDivElement;
	let video: HTMLVideoElement;

	export let source: string[] = [];
	export let poster: string = '';

	export let shakaPlayer: shaka.Player;
	export let shakaUi: shaka.ui.Overlay;

	let dashFailed = false;

	export let onError: (error: shaka.util.Error) => void = (error) => {
		const { severity, category, code } = error;

		console.error(
			`Shaka Player Error: ${
				Object.entries(shaka.util.Error.Severity).find(([, value]) => value === severity)[0]
			} ${Object.entries(shaka.util.Error.Category).find(([, value]) => value === category)[0]} ${
				Object.entries(shaka.util.Error.Code).find(([, value]) => value === code)[0]
			}`
		);
	};

	async function loadSource(index = 0) {
		console.log(`Loading source ${index}`);

		try {
			await shakaPlayer.load(source[index]);
		} catch (error) {
			dashFailed = true;

			if (index < source.length - 1) {
				loadSource(index + 1);
			} else {
				onError(error);
			}
		}
	}

	onMount(async () => {
		document.addEventListener('shaka-ui-loaded', () => {
			console.log('UI loaded');
		});

		if (source.length === 0) {
			onError(
				new shaka.util.Error(
					shaka.util.Error.Severity.CRITICAL,
					shaka.util.Error.Category.PLAYER,
					shaka.util.Error.Code.MEDIA_SOURCE_OPERATION_FAILED
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

			await loadSource();
		} else {
			// This browser does not have the minimum set of APIs we need.
			alert('Browser not supported!');
		}
	});
</script>

<div class="w-full h-full" bind:this={videoContainer}>
	<!-- svelte-ignore a11y-media-has-caption -->
	<video bind:this={video} {poster} />
</div>

<style>
	@import 'shaka-player/dist/controls.css';
</style>
