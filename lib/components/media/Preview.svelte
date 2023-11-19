<script lang="ts">
	import type { Post, Media } from '@prisma/client';
	import Thumbnail from './Thumbnail.svelte';

	export let post: Post;
</script>

<a
	class="card shadow-xl image-full w-64 h-36 md:w-96 md:h-56 aspect-video"
	href="/watch/{post.uid}"
>
	<figure>
		<Thumbnail postUid={post.uid} />
	</figure>
	<div class="card-body justify-end">
		<h2 class="card-title">{post.title}</h2>
	</div>
</a>
