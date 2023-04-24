<script lang="ts">
	import { goto } from '$app/navigation';
	import type { IPagination } from '$lib/types';

	export let pagination: IPagination;
	export let url: string;

	const nextPage = () => {
		if (pagination.current < pagination.total) {
			if (url.includes('page=')) {
				url = url.replace(/page=\d+/, `page=${pagination.current + 1}`);
				goto(url);
			} else if (url.includes('?')) {
				goto(url + `&page=${pagination.current + 1}`);
			} else {
				goto(url + `?page=${pagination.current + 1}`);
			}
		}
	};

	const previousPage = () => {
		if (pagination.current > 1) {
			if (url.includes('page=')) {
				url = url.replace(/page=\d+/, `page=${pagination.current - 1}`);
				goto(url);
			} else if (url.includes('?')) {
				goto(url + `&page=${pagination.current - 1}`);
			} else {
				goto(url + `?page=${pagination.current - 1}`);
			}
		}
	};
</script>

<div class="btn-group border border-base-200 rounded-lg">
	<button class="btn btn-ghost" disabled={pagination.current === 1} on:click={previousPage}>
		<i class="fa-solid fa-chevron-left" />
	</button>
	<button class="btn btn-ghost">Page {pagination.current}/{pagination.total}</button>
	<button
		class="btn btn-ghost"
		disabled={pagination.current === pagination.total}
		on:click={nextPage}
	>
		<i class="fa-solid fa-chevron-right" />
	</button>
</div>
