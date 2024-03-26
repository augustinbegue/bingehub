<script lang="ts">
	import type { Post, Media } from '@prisma/client';
	import Poster from './Poster.svelte';

	export let post: Post;
</script>

<a class="rounded-xl w-32 lg:w-64" href="/watch/{post.uid}">
	<Poster postUid={post.uid} className="rounded-xl" />

	<div class="p-2">
		<h2 class="text-lg font-bold">{post.title}</h2>
	</div>

	<!-- <figure>
		<Poster postUid={post.uid} />
	</figure>
	<div class="card-body justify-end">
		<h2 class="card-title">{post.title}</h2>
	</div> -->
</a>
