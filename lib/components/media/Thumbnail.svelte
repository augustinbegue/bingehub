<script lang="ts">
	import Spinner from '$lib/components/Spinner.svelte';

	export let postUid: string;
	export let className: string = '';
	async function fetchThumbnail(uid: string) {
		const res = await fetch(`/api/medias/${uid}/thumbnail`);

		if (!res.ok) {
			throw new Error('Failed to fetch thumbnail');
		}

		return await res.text();
	}
</script>

{#await fetchThumbnail(postUid)}
	<div class="w-full h-full flex flex-col items-center justify-center">
		<Spinner />
	</div>
{:then thumbnail}
	{#if thumbnail.length > 0}
		<img src={thumbnail} class={className} alt="Thumbnail" />
	{:else}
		<img src="/images/placeholder.jpg" class={className} alt="Thumbnail" />
	{/if}
{:catch error}
	<img src="/images/placeholder.jpg" alt="Thumbnail" />
{/await}
