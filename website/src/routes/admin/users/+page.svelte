<script lang="ts">
	import { page } from '$app/stores';
	import Modal from '$lib/components/modals/Modal.svelte';
	import Pagination from '$lib/components/pagination/pagination.svelte';
	import { alerts } from '$lib/modules/interaction/alerter';
	import type { Subscription } from '@prisma/client';
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

	let generatePassword = false;
	let newUser = {
		username: '',
		password: '',
		confirmPassword: ''
	};
	async function createUser() {
		if (!generatePassword) {
			if (newUser.password !== newUser.confirmPassword) {
				alerts.update((alerts) => [
					...alerts,
					{ type: 'error', message: 'Passwords do not match' }
				]);
				return;
			}
		} else {
			newUser.password = Math.random().toString(36).slice(-8);
			newUser.confirmPassword = newUser.password;
		}

		let res = await fetch('/api/users/create', {
			method: 'POST',
			body: JSON.stringify(newUser)
		});

		if (res.ok) {
			console.log(await res.json());

			alerts.update((alerts) => [...alerts, { type: 'success', message: 'User created' }]);
			createUserModal.close();
			window.open(
				`/api/users/onboarding?username=${newUser.username}&password=${newUser.password}`,
				'_blank'
			);
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

	let subscriptionModal: Modal;
	let subscription: Subscription;
	async function editSubscription() {
		let res;
		if (subscription.uid && subscription.uid.length > 0) {
			res = await fetch(`/api/subscription/${subscription.uid}/edit`, {
				method: 'PATCH',
				body: JSON.stringify(subscription)
			});
		} else {
			res = await fetch('/api/subscription/create', {
				method: 'POST',
				body: JSON.stringify(subscription)
			});
		}

		if (res.ok) {
			alerts.update((alerts) => [...alerts, { type: 'success', message: 'Subscription updated' }]);
			subscription = await res.json();
			data.users.map((user) => {
				if (user.uid === modalUser.uid) {
					user.subscription = subscription;
				}
				return user;
			});
			subscriptionModal.close();
		} else {
			alerts.update((alerts) => [
				...alerts,
				{ type: 'error', message: 'Failed to update subscription' }
			]);
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
				<th>Subscription</th>
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
						{#if user.subscription}
							{#if user.subscription.isActive}
								Valid Until: {user.subscription.expiresAt.toLocaleDateString()}
							{:else}
								Expired
							{/if}
						{:else}
							None
						{/if}
					</td><td>
						<button
							class="btn btn-sm btn-primary"
							on:click={() => {
								modalUser = user;
								editUserModal.open();
							}}
						>
							Edit
						</button>
						<button
							class="btn btn-sm btn-success"
							on:click={() => {
								modalUser = user;
								if (user.subscription) {
									subscription = user.subscription;
								} else {
									subscription = {
										uid: '',
										createdAt: new Date(),
										expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
										userId: user.uid,
										updatedAt: new Date(),
										isActive: true,
										deletedAt: null,
										isDeleted: false
									};
								}
								console.log(subscription);

								subscriptionModal.open();
							}}>Subscription</button
						>
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
			<label class="label" for="username">
				<span class="label-text">username</span>
			</label>
			<input
				name="username"
				type="text"
				placeholder="username"
				class="input input-bordered"
				bind:value={newUser.username}
			/>
		</div>
		<div class="form-control">
			<label for="generatePassword" class="label">
				<span class="label-text"> Generate password </span>
			</label>
			<input
				name="generatePassword"
				type="checkbox"
				class="toggle"
				bind:checked={generatePassword}
			/>
		</div>
		<div class="form-control">
			<label class="label" for="password">
				<span class="label-text">password</span>
			</label>
			<input
				name="password"
				type="password"
				placeholder="password"
				class="input input-bordered"
				bind:value={newUser.password}
				disabled={generatePassword}
			/>
		</div>
		<div class="form-control">
			<label class="label" for="confirm">
				<span class="label-text">confirm password</span>
			</label>
			<input
				name="confirm"
				type="password"
				placeholder="confirm password"
				class="input input-bordered"
				bind:value={newUser.confirmPassword}
				disabled={generatePassword}
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
			<label class="label" for="username">
				<span class="label-text">username</span>
			</label>
			<input
				name="username"
				type="text"
				placeholder="username"
				class="input input-bordered"
				bind:value={modalUser.username}
			/>
		</div>
		<div class="form-control">
			<label for="active" class="label">
				<span class="label-text">Active</span>
			</label>
			<input name="active" type="checkbox" class="toggle" bind:checked={modalUser.isActive} />
		</div>
		<div class="form-controls">
			<span class="label">
				<span class="label-text">Roles</span>
			</span>
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

<Modal bind:this={subscriptionModal}>
	<div class="card-body">
		<h1 class="text-2xl">
			Subscription for @{modalUser.username}
		</h1>

		<div class="form-control">
			<label for="expiresAt" class="label">
				<span class="label-text"> Expires At </span>
			</label>
			<input
				name="expiresAt"
				type="datetime-local"
				class="input input-bordered"
				value={subscription.expiresAt.toISOString().slice(0, 16)}
				on:change={(e) => {
					subscription.expiresAt = new Date(e.currentTarget.value);
				}}
			/>
		</div>

		<div class="form-control">
			<label for="isActive" class="label">
				<span class="label-text"> Active </span>
			</label>
			<input name="isActive" type="checkbox" class="toggle" bind:checked={subscription.isActive} />
		</div>

		<div class="form-control">
			<button class="btn btn-primary" on:click={editSubscription}>Save</button>
		</div>
	</div>
</Modal>
