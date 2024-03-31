<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import type { IPagination } from '$lib/types';

	export let pagination: IPagination;
	export let url: URL;

	const nextPage = () => {
		if (pagination.current < pagination.total) {
			url.searchParams.set('page', `${pagination.current + 1}`);
			console.log(url.href);
			goto(url.href, {
				invalidateAll: true
			});
		}
	};

	const previousPage = () => {
		if (pagination.current > 1) {
			url.searchParams.set('page', `${pagination.current - 1}`);
			console.log(url.href);
			goto(url.href, {
				invalidateAll: true
			});
		}
	};
</script>

<div class="btn-group border border-base-200 rounded-lg">
	<button class="btn btn-ghost" disabled={pagination.current === 1} on:click={previousPage}>
		<i class="fa-solid fa-chevron-left" />
	</button>
	<div class="btn btn-disabled text-base-content">Page {pagination.current}/{pagination.total}</div>
	<button
		class="btn btn-ghost"
		disabled={pagination.current === pagination.total}
		on:click={nextPage}
	>
		<i class="fa-solid fa-chevron-right" />
	</button>
</div>
