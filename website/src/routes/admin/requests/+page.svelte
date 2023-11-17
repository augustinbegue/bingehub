<script lang="ts">
	import Pagination from '$lib/components/pagination/pagination.svelte';
	import type { PageData } from './$types';

	import { page } from '$app/stores';
	import type { RequestEditBody, RequestEditResponse } from '../../api/requests/[uid]/edit/+server';
	import { invalidateAll } from '$app/navigation';
	import Modal from '$lib/components/modals/Modal.svelte';
	import { alerts } from '$lib/modules/interaction/alerter';
	import type { AddTorrentBody, AddTorrentResponse } from '../../api/torrents/add/+server';

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

	let torrentFile: string = '';
	let requestUid: string;
	let torrentUrl: string = '';
	function onFileAdd(e: Event & { currentTarget: HTMLInputElement }) {
		if (!e.currentTarget.files) return;

		const file = e.currentTarget.files[0];

		if (file) {
			return new Promise<void>((resolve) => {
				const reader = new FileReader();
				reader.onload = () => {
					if (reader.result != null && typeof reader.result === 'string') {
						torrentFile = reader.result.split('base64,')[1];
						resolve();
					}
				};
				reader.readAsDataURL(file);
			});
		}
	}

	async function fulfillRequest() {
		const body: AddTorrentBody = {
			urls: torrentUrl.length > 0 ? [torrentUrl] : [],
			files: torrentFile.length > 0 ? [torrentFile] : []
		};

		const res = await fetch(`/api/torrents/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});

		if (res.ok) {
			const resData = (await res.json()) as AddTorrentResponse;

			if (resData.length > 0) {
				await updateRequest(requestUid, { status: 'FULLFILLED', torrent: resData[0] });
				fullfillRequestModal.close();
				alerts.update((m) => [...m, { type: 'success', message: 'Request fulfilled' }]);
			}
		}
	}

	let fullfillRequestModal: Modal;
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
								{#if request.status === 'FULLFILLED'}
									<a href={`/torrents/${request.torrent}`} class="btn btn-primary btn-sm">
										View Torrent
									</a>
								{:else}
									<button
										class="btn btn-error btn-sm"
										on:click={() => updateRequest(request.uid, { status: 'REJECTED' })}
									>
										Reject
									</button>

									<button
										class="btn btn-success btn-sm"
										on:click={() => updateRequest(request.uid, { status: 'ACCEPTED' })}
									>
										Accept
									</button>

									<button
										class="btn btn-primary btn-sm"
										on:click={() => {
											requestUid = request.uid;
											fullfillRequestModal.open();
										}}
									>
										Fulfill
									</button>
								{/if}
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<Modal bind:this={fullfillRequestModal}>
	{@const request = data.requests.find((request) => request.uid === requestUid)}
	<h3 class="text-2xl pb-2">Fulfill Request</h3>
	<p class="font-bold">{request?.title}</p>
	<p>{request?.content}</p>
	<form>
		<div class="form-control">
			<label class="label" for="torrent">
				<span class="label-text">Add Torrent</span>
			</label>
			<input
				type="text"
				name="torrent"
				placeholder="magnet link"
				class="input input-bordered"
				bind:value={torrentUrl}
			/>
			<div class="divider">OR</div>
			<input
				type="file"
				name="torrent"
				placeholder="torrent file"
				class="file-input file-input-bordered"
				on:change={onFileAdd}
			/>
		</div>
		<div class="form-control flex flex-row justify-between mt-6">
			<button
				class="btn btn-primary"
				on:click={() => {
					fulfillRequest();
				}}>Fulfill</button
			>
			<button class="btn" on:click={() => fullfillRequestModal.close()}> Cancel </button>
		</div>
	</form>
</Modal>
