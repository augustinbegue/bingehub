<script lang="ts">
	import { page } from '$app/stores';
	import Modal from '$lib/components/modals/Modal.svelte';
	import Pagination from '$lib/components/pagination/pagination.svelte';
	import { alerts } from '$lib/modules/interaction/alerter';
	import type { PageData } from './$types';

	let createRoleModal: Modal;

	export let data: PageData;

	let newRole = {
		name: ''
	};
	async function createRole() {
		let res = await fetch('/api/roles/create', {
			method: 'POST',
			body: JSON.stringify(newRole)
		});

		if (res.ok) {
			alerts.update((alerts) => [...alerts, { type: 'success', message: 'Role created' }]);
			createRoleModal.close();
		} else {
			alerts.update((alerts) => [...alerts, { type: 'error', message: 'Failed to create role' }]);
		}
	}
</script>

<div class="overflow-x-auto flex flex-col">
	<div class="flex flex-row mb-4">
		<button class="btn btn-primary" on:click={createRoleModal.open}> Create </button>
	</div>

	<Pagination pagination={data.pagination} url={$page.url.href} />

	<table class="table table-zebra w-full">
		<thead>
			<tr>
				<th />
				<th>Name</th>
				<th>Users</th>
				<th>Created @</th>
				<th>Updated @</th>
				<th>Active</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each data.roles as role, i}
				<tr>
					<td>{i + 1}</td>
					<td>{role.name}</td>
					<td>{role._count.users}</td>
					<td>{role.createdAt.toLocaleString()}</td>
					<td>{role.updatedAt.toLocaleString()}</td>
					<td>
						<input class="toggle toggle-primary" type="checkbox" bind:checked={role.isActive} />
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

<Modal bind:this={createRoleModal}>
	<div class="card-body">
		<h1 class="text-2xl">New role</h1>
		<div class="form-control">
			<label class="label">
				<span class="label-text">name</span>
			</label>
			<input
				type="text"
				placeholder="name"
				class="input input-bordered"
				bind:value={newRole.name}
			/>
		</div>
		<div class="form-control mt-6">
			<button class="btn btn-primary" on:click={createRole}>Create</button>
		</div>
	</div>
</Modal>
