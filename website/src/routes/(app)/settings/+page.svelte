<script lang="ts">
	import { alerts } from '$lib/modules/interaction/alerter';
	import type { PageData } from './$types';

	export let data: PageData;

	let oldPassword: string;
	let newPassword: string;
	let confirmNewPassword: string;
	async function updatePassword() {
		if (newPassword !== confirmNewPassword) {
			alerts.update((a) => [
				...a,
				{
					type: 'error',
					message: 'New passwords do not match'
				}
			]);
		}

		const res = await fetch(`/api/users/edit/password`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ oldPassword, newPassword })
		});

		if (!res.ok) {
			alerts.update((a) => [
				...a,
				{
					type: 'error',
					message: 'Failed to update password'
				}
			]);

			return;
		}

		alerts.update((a) => [
			...a,
			{
				type: 'success',
				message: 'Password updated'
			}
		]);
	}
</script>

<div class="container mx-auto px-4 py-8 settings">
	<h1>Settings</h1>
	<span class="divider" />
	<h2>Security</h2>

	<h3>Username</h3>
	<div class="form-control gap-2">
		<input
			type="text"
			placeholder="Username"
			class="input input-bordered"
			value={data.user?.username}
			disabled
		/>
	</div>

	<h3>Change Password</h3>
	<div class="form-control gap-2">
		<input
			type="password"
			placeholder="Old Password"
			class="input input-bordered"
			bind:value={oldPassword}
		/>

		<input
			type="password"
			placeholder="New Password"
			class="input input-bordered"
			bind:value={newPassword}
		/>

		<input
			type="password"
			placeholder="Confirm New Password"
			class="input input-bordered"
			bind:value={confirmNewPassword}
		/>

		<button class="btn btn-primary w-max" on:click={() => updatePassword()}>Change Password</button>
	</div>
</div>

<style lang="postcss">
	.settings h1 {
		@apply text-3xl font-medium mb-4;
	}

	.settings h2 {
		@apply text-2xl font-medium mb-3;
	}

	.settings h3 {
		@apply text-xl font-medium mb-2;
	}

	.settings .form-control {
		@apply mb-4;
	}
</style>
