<script lang="ts">
	import { currentUser } from '$lib/modules/auth';
	import type { IStoredUser } from '$lib/types';
	import type { User } from '@prisma/client';
	import { onMount } from 'svelte';

	let username: string;
	let password: string;
	let passwordError: string;
	let usernameError: string;
	let loading = false;
	async function loginWithUsernameAndPassword(e: Event) {
		e.preventDefault();

		usernameError = '';
		passwordError = '';

		if (!username) {
			usernameError = 'Username is required.';
			return;
		}

		if (!password) {
			passwordError = 'Password is required.';
			return;
		}

		loading = true;
		const response = await fetch('/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				username,
				password
			})
		});

		if (response.status === 401) {
			passwordError = 'Invalid username or password.';
			onLogin('error');
			loading = false;
			return;
		}

		if (response.status === 403) {
			passwordError = 'Your account is inactive.';
			onLogin('inactive');
			loading = false;
			return;
		}

		if (response.status !== 200) {
			passwordError = 'Something went wrong.';
			onLogin('error');
			loading = false;
			return;
		}

		const { user }: { user?: IStoredUser } = await response.json();
		if (user) {
			currentUser.set(user);

			onLogin('success');
			loading = false;
		}
	}

	export let onLogin: (result: string) => void;

	onMount(() => {
		usernameError = '';
		passwordError = '';
		loading = false;
	});
</script>

<div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-200">
	<div class="card-body">
		<form>
			<div class="form-control">
				<label class="label" for="username">
					<span class="label-text">Username</span>
				</label>
				<input
					bind:value={username}
					id="username"
					type="username"
					placeholder="username"
					class="input input-bordered"
					class:input-error={usernameError}
				/>
				<label for="username" class="label">
					{#if usernameError}
						<span class="label-text-alt text-error">{usernameError}</span>
					{/if}
				</label>
			</div>
			<div class="form-control">
				<label class="label" for="password">
					<span class="label-text">Password</span>
				</label>
				<input
					bind:value={password}
					id="password"
					type="password"
					placeholder="password"
					class="input input-bordered"
					class:input-error={passwordError}
				/>
				<label for="password" class="label">
					{#if passwordError}
						<span class="label-text-alt text-error">{passwordError}</span>
					{/if}
				</label>
			</div>
			<div class="form-control mt-6">
				<button
					class="btn btn-primary"
					on:click={loginWithUsernameAndPassword}
					class:loading
					disabled={loading}
				>
					Login
				</button>
				<label class="label" for="submit">
					<a href="#" class="label-text-alt link link-hover">Forgot password?</a>
				</label>
			</div>
		</form>
	</div>
</div>
