<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Modal from '$lib/components/modals/Modal.svelte';
	import { addAlert } from '$lib/modules/interaction/alerter';
	import type { PageData } from './$types';
	import { RequestType } from '@prisma/client';

	export let data: PageData;

	let newRequestModal: Modal;
	let newRequestType: RequestType;
	let newRequestTitle: string;
	let newRequestContent: string;
	let newRequestLoading = false;

	const createRequest = async () => {
		if (newRequestLoading) return;

		newRequestLoading = true;

		const res = await fetch('/api/requests/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: newRequestTitle,
				content: newRequestContent,
				type: newRequestType
			})
		});

		if (res.ok) {
			newRequestModal.close();
			newRequestTitle = '';
			newRequestContent = '';

			addAlert({
				type: 'success',
				message: 'Request created'
			});

			invalidateAll();

			newRequestLoading = false;
		} else {
			addAlert({
				type: 'error',
				message: 'Failed to create request'
			});
			newRequestLoading = false;
		}
	};
</script>

<div class="container mx-auto">
	<div class="flex flex-row justify-between items-center p-4">
		<h1 class="text-3xl font-bold">Requests</h1>
		<button
			class="btn btn-primary"
			on:click={() => {
				newRequestModal.open();
			}}
		>
			New
		</button>
	</div>

	{#each data.requests as request}
		<div
			class="flex flex-row items-center justify-between p-4 m-4 rounded-md shadow-md border"
			class:cursor-pointer={request.status === 'FULLFILLED'}
			class:border-green-500={request.status === 'FULLFILLED'}
			class:border-yellow-500={request.status === 'ACCEPTED'}
			class:border-gray-500={request.status === 'PENDING'}
			class:border-red-500={request.status === 'REJECTED'}
		>
			<div class="flex flex-row items-center">
				<span class="mr-4">
					{#if request.status === 'FULLFILLED'}
						<span class="text-green-500">
							<i class="fa-solid fa-film" />
						</span>
					{:else if request.status === 'ACCEPTED'}
						<span class="text-yellow-500">
							<i class="fa-solid fa-cloud-arrow-down" />
						</span>
					{:else if request.status === 'PENDING'}
						<span class="text-gray-500">
							<i class="fa-solid fa-hourglass-half" />
						</span>
					{:else if request.status === 'REJECTED'}
						<span class="text-red-500">
							<i class="fa-solid fa-xmark" />
						</span>
					{/if}
				</span>
				<code>{request.type}</code>
				&nbsp;- {request.title}
			</div>
			<div class="flex flex-row items-center justify-between gap-2">
				<span>
					<span class="font-semibold">{request.author.username}</span>
				</span>
				<span class="text-sm text-gray-500">
					{new Date(request.createdAt).toLocaleDateString()}
				</span>
			</div>
		</div>
	{/each}
</div>

<!-- New Request Modal -->
<Modal bind:this={newRequestModal}>
	<h1 class="text-2xl font-bold pb-4">New Request</h1>
	<div class="flex flex-col pb-2">
		<label for="title" class="text-sm font-bold">Title</label>
		<input type="text" id="title" class="input input-bordered" bind:value={newRequestTitle} />
	</div>

	<div class="flex flex-col pb-2">
		<label for="type" class="text-sm font-bold">Type</label>
		<select id="type" class="input input-bordered" bind:value={newRequestType}>
			{#each Object.values(RequestType) as type}
				<option value={type}>{type}</option>
			{/each}
		</select>
	</div>

	<div class="flex flex-col pb-2">
		<label for="description" class="text-sm font-bold">Content</label>
		<p class="italic text-sm">
			Include links to the exact content you want on a torrent tracker or to IMBD/AlloCine
		</p>
		<textarea
			id="description"
			class="input input-bordered min-h-[10vh]"
			bind:value={newRequestContent}
		/>
	</div>
	<button
		class="btn btn-success"
		on:click={() => {
			createRequest();
		}}
		class:loading={newRequestLoading}>Submit</button
	>
</Modal>
