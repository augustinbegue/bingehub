<script lang="ts">
	import type { Post, Media } from '@prisma/client';
	import Poster from './Poster.svelte';
	import Thumbnail from './Thumbnail.svelte';

	export let post: Post;
</script>

{#if post.subType === 'MOVIE'}
	<a class="rounded-xl w-32 lg:w-64" href="/watch/{post.uid}">
		<Poster postUid={post.uid} className="rounded-xl" />
	</a>
{:else if post.subType === 'SERIES'}
	<a class="rounded-xl w-32 lg:w-64" href="/series/{post.slug}">
		<Poster postUid={post.uid} className="rounded-xl" />
	</a>
{:else}
	<a class="rounded-xl h-16 lg:h-32 flex flex-row gap-2" href="/watch/{post.uid}">
		<Thumbnail postUid={post.uid} className="rounded-xl h-full" />
		<div class="flex flex-col">
			<p class="font-bold text-xl">{post.title}</p>
			<p class="opacity-60 text-sm">{post.slug.split('-').pop().toUpperCase()}</p>
			<p class="hidden md:block">{post.content}</p>
		</div>
	</a>
{/if}
