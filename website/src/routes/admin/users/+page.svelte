<script lang="ts">
	import { page } from '$app/stores';
	import Modal from '$lib/components/modals/Modal.svelte';
	import Pagination from '$lib/components/pagination/pagination.svelte';
	import { alerts } from '$lib/modules/interaction/alerter';
	import type { PageData } from './$types';

	let createUserModal: Modal;
	let editUserModal: Modal;
	let modalUser: {
		uid: string;
		username: string;
		createdAt: Date;
		updatedAt: Date;
		isActive: boolean;
		roles: {
			uid: string;
		}[];
	};

	export let data: PageData;

	let newUser = {
		username: '',
		password: '',
		confirmPassword: ''
	};
	async function createUser() {
		if (newUser.password !== newUser.confirmPassword) {
			alerts.update((alerts) => [...alerts, { type: 'error', message: 'Passwords do not match' }]);
			return;
		}

		let res = await fetch('/api/users/create', {
			method: 'POST',
			body: JSON.stringify(newUser)
		});

		if (res.ok) {
			console.log(await res.json());

			alerts.update((alerts) => [...alerts, { type: 'success', message: 'User created' }]);
			createUserModal.close();
		} else {
			alerts.update((alerts) => [...alerts, { type: 'error', message: 'Failed to create user' }]);
		}
	}

	async function editUser() {
		let res = await fetch('/api/users/edit', {
			method: 'PATCH',
			body: JSON.stringify(modalUser)
		});

		if (res.ok) {
			console.log(await res.json());

			alerts.update((alerts) => [...alerts, { type: 'success', message: 'User updated' }]);
			editUserModal.close();
		} else {
			alerts.update((alerts) => [...alerts, { type: 'error', message: 'Failed to update user' }]);
		}
	}
</script>

<div class="overflow-x-auto flex flex-col">
	<div class="flex flex-row mb-4">
		<button class="btn btn-primary" on:click={createUserModal.open}> Create </button>
	</div>

	<Pagination pagination={data.pagination} url={$page.url.href} />

	<table class="table table-zebra w-full">
		<thead>
			<tr>
				<th />
				<th>Username</th>
				<th>Created @</th>
				<th>Updated @</th>
				<th>Active</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each data.users as user, i}
				<tr>
					<td>{i + 1}</td>
					<td>{user.username}</td>
					<td>{user.createdAt.toLocaleString()}</td>
					<td>{user.updatedAt.toLocaleString()}</td>
					<td>
						<input class="toggle" type="checkbox" bind:checked={user.isActive} />
					</td>
					<td>
						<button
							class="btn btn-sm btn-primary"
							on:click={() => {
								modalUser = user;
								editUserModal.open();
							}}
						>
							Edit
						</button>
						<button class="btn btn-sm btn-error">Delete</button>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<Modal bind:this={createUserModal}>
	<div class="card-body">
		<h1 class="text-2xl">New user</h1>
		<div class="form-control">
			<label class="label">
				<span class="label-text">username</span>
			</label>
			<input
				type="text"
				placeholder="username"
				class="input input-bordered"
				bind:value={newUser.username}
			/>
		</div>
		<div class="form-control">
			<label class="label">
				<span class="label-text">password</span>
			</label>
			<input
				type="password"
				placeholder="password"
				class="input input-bordered"
				bind:value={newUser.password}
			/>
		</div>
		<div class="form-control">
			<label class="label">
				<span class="label-text">confirm password</span>
			</label>
			<input
				type="password"
				placeholder="confirm password"
				class="input input-bordered"
				bind:value={newUser.confirmPassword}
			/>
		</div>
		<div class="form-control mt-6">
			<button class="btn btn-primary" on:click={createUser}>Create</button>
		</div>
	</div>
</Modal>

<Modal bind:this={editUserModal}>
	<div class="card-body">
		<h1 class="text-2xl">Edit User @{modalUser.username}</h1>
		<div class="form-control">
			<label class="label">
				<span class="label-text">username</span>
			</label>
			<input
				type="text"
				placeholder="username"
				class="input input-bordered"
				bind:value={modalUser.username}
			/>
		</div>
		<div class="form-controls">
			<label class="label">
				<span class="label-text">Roles</span>
			</label>
			<div class="flex flex-col flex-wrap">
				{#each data.roles as role}
					<label class="label cursor-pointer">
						<span class="label-text">{role.name}</span>
						<input
							type="checkbox"
							class="checkbox"
							on:change={() => {
								if (!!modalUser.roles.find((r) => r.uid === role.uid)) {
									modalUser.roles = modalUser.roles.filter((r) => r.uid !== role.uid);
								} else {
									modalUser.roles = [
										...modalUser.roles,
										{
											uid: role.uid
										}
									];
								}

								console.log(modalUser.roles);
							}}
							checked={!!modalUser.roles.find((r) => r.uid === role.uid)}
						/>
					</label>
				{/each}
			</div>
			<div class="form-control mt-6">
				<button class="btn btn-primary" on:click={editUser}>Save</button>
			</div>
		</div>
	</div></Modal
>
