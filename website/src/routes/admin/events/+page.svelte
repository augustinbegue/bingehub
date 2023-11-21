<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import Pagination from '$lib/components/pagination/pagination.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col">
	<div class="flex flex-row justify-between items-baseline">
		<Pagination pagination={data.pagination} url={$page.url.href} />

		<button
			class="btn btn-ghost"
			on:click={() => {
				invalidateAll();
			}}
		>
			<i class="fa-solid fa-refresh" />
		</button>
	</div>

	<div class="overflow-x-auto">
		<table class="table table-zebra w-full">
			<thead>
				<tr>
					<th />
					<th>Type</th>
					<th>Date</th>
					<th>User</th>
					<th>Data</th>
				</tr>
			</thead>
			<tbody>
				{#each data.events as event, i}
					<tr>
						<td>{i + 1}</td>
						<td>{event.type}</td>
						<td>{new Date(event.createdAt).toLocaleString()}</td>
						<td>{event.user.username}</td>
						<td>
							<code>
								{event.data}
							</code>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
