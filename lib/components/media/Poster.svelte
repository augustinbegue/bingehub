<script lang="ts">
	import Spinner from '$lib/components/Spinner.svelte';

	export let postUid: string;
	export let className: string = '';
	async function fetchPoster(uid: string) {
		const res = await fetch(`/api/medias/${uid}/poster`);

		if (!res.ok) {
			throw new Error('Failed to fetch poster');
		}

		return await res.text();
	}
</script>

{#await fetchPoster(postUid)}
	<div class="w-full h-full flex flex-col items-center justify-center">
		<Spinner />
	</div>
{:then poster}
	{#if poster.length > 0}
		<img src={poster} class={className} alt="poster" />
	{:else}
		<img src="/images/placeholder.jpg" class={className} alt="poster" />
	{/if}
{:catch error}
	<img src="/images/placeholder.jpg" alt="poster" />
{/await}
