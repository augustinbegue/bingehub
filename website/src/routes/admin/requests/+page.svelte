<script lang="ts">
	import Pagination from '$lib/components/pagination/pagination.svelte';
	import type { PageData } from './$types';

	import { page } from '$app/stores';
	import type { RequestEditBody, RequestEditResponse } from '../../api/requests/[uid]/edit/+server';
	import { invalidateAll } from '$app/navigation';

	export let data: PageData;

	async function updateRequest(uid: string, body: RequestEditBody) {
		const res = await fetch(`/api/requests/${uid}/edit`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});

		if (res.ok) {
			const resData = (await res.json()) as RequestEditResponse;

			if (resData.success && resData.updated != null) {
				data.requests = data.requests.map((request) => {
					if (request.uid === uid && resData.updated != null) {
						return resData.updated;
					}

					return request;
				});
			}
		}
	}
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
					<th>Type</th>
					<th>Title</th>
					<th>Author</th>
					<th>Status</th>
					<th>Created @</th>
					<th>Updated @</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.requests as request}
					<tr>
						<td>
							{request.type}
						</td>
						<td>
							{request.title}
						</td>
						<td>
							{request.author.username}
						</td>
						<td>
							{request.status}
						</td>
						<td>
							{new Date(request.createdAt).toLocaleDateString()}
						</td>
						<td>
							{new Date(request.updatedAt).toLocaleDateString()}
						</td>
						<td>
							<div class="btn-group">
								<button
									class="btn btn-error btn-sm"
									on:click={() => updateRequest(request.uid, { status: 'REJECTED' })}
								>
									Reject
								</button>
								<!-- {#if request.status === 'PENDING'} -->
								<button
									class="btn btn-success btn-sm"
									on:click={() => updateRequest(request.uid, { status: 'ACCEPTED' })}
								>
									Accept
								</button>
								<!-- {:else if request.status === 'ACCEPTED'} -->
								<button
									class="btn btn-primary btn-sm"
									on:click={() => updateRequest(request.uid, { status: 'FULLFILLED' })}
								>
									Fulfill
								</button>
								<!-- {/if} -->
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
