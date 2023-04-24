<script lang="ts">
	import { page } from '$app/stores';
	import Modal from '$lib/components/modals/Modal.svelte';
	import Pagination from '$lib/components/pagination/pagination.svelte';
	import { alerts } from '$lib/modules/interaction/alerter';
	import type { PageData } from './$types';
	import { MediaType, PostSubType, PostType } from '@prisma/client';

	let createUserModal: Modal;

	export let data: PageData;

	let newMedia = {
		title: '',
		content: '',
		type: 'MEDIA',
		subType: '',
		mediaType: '',
		mediaUrl: ''
	};
	async function createMedia() {
		let res = await fetch('/api/media/create', {
			method: 'POST',
			body: JSON.stringify(newMedia)
		});

		if (res.ok) {
			alerts.update((alerts) => [...alerts, { type: 'success', message: 'Media created' }]);
			createUserModal.close();
		} else {
			alerts.update((alerts) => [...alerts, { type: 'error', message: 'Failed to create media' }]);
		}
	}
</script>

<div class="flex flex-col">
	<div class="flex flex-row mb-4">
		<button class="btn btn-primary" on:click={createUserModal.open}> Create </button>
	</div>

	<Pagination pagination={data.pagination} url={$page.url.href} />

	<div class="overflow-x-auto">
		<table class="table table-zebra w-full">
			<thead>
				<tr>
					<th />
					<th>Title</th>
					<th>Created @</th>
					<th>Updated @</th>
					<th>Active</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.posts as post, i}
					<tr>
						<td>{i}</td>
						<td>{post.title}</td>
						<td>{post.media?.url}</td>
						<td>{post.createdAt.toLocaleString()}</td>
						<td>{post.updatedAt.toLocaleString()}</td>
						<td>
							<input class="toggle" type="checkbox" bind:checked={post.isActive} />
						</td>
						<td>
							<button class="btn btn-sm btn-primary">Edit</button>
							<button class="btn btn-sm btn-error">Delete</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<Modal bind:this={createUserModal}>
	<div class="card-body w-96">
		<h1 class="text-2xl">New media</h1>
		<div class="form-control mt-6">
			<label class="label">
				<span class="label-text">Title</span>
			</label>
			<input class="input input-bordered" type="text" bind:value={newMedia.title} />
		</div>
		<div class="form-control mt-6">
			<label class="label">
				<span class="label-text">Content</span>
			</label>
			<textarea class="textarea textarea-bordered" bind:value={newMedia.content} />
		</div>
		<div class="form-control mt-6">
			<label class="label">
				<span class="label-text">Sub type</span>
			</label>
			<select class="select select-bordered" bind:value={newMedia.subType}>
				{#each Object.keys(PostSubType) as type}
					<option value={type}>{type}</option>
				{/each}
			</select>
		</div>
		<div class="form-control mt-6">
			<label class="label">
				<span class="label-text">Media type</span>
			</label>
			<select class="select select-bordered" bind:value={newMedia.mediaType}>
				{#each Object.keys(MediaType) as type}
					<option value={type}>{type}</option>
				{/each}
			</select>
		</div>
		<div class="form-control mt-6">
			<label class="label">
				<span class="label-text">Media url</span>
			</label>
			<input class="input input-bordered" type="text" bind:value={newMedia.mediaUrl} />
		</div>
		<div class="form-control mt-6">
			<button class="btn btn-primary" on:click={createMedia}>Create</button>
		</div>
	</div>
</Modal>
