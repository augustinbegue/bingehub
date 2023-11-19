<script lang="ts">
	import { currentUser } from '$lib/modules/auth';
	import { hasRole } from '$lib/modules/auth/utils';
	import { browser } from '$app/environment';

	let isAdmin = false;
	$: $currentUser,
		(() => {
			isAdmin = hasRole('admin');
		})();

	async function logout() {
		await fetch('/api/auth/logout', {
			method: 'POST'
		});

		$currentUser = undefined;

		if (browser) {
			window.location.reload();
		}
	}
</script>

<header class="navbar bg-base-300 shrink-0">
	<div class="navbar-start">
		<a class="btn btn-ghost font-bold text-lg normal-case" href="/admin">
			<span class="mr-1">Binge</span>
			<span class="px-1 py-1/2 bg-primary rounded-md text-black">hub</span>
			<span class="ml-1 text-primary"> Admin </span>
		</a>
	</div>
	<div class="navbar-end">
		{#if $currentUser != null}
			<div class="dropdown dropdown-end">
				<button tabindex="0" class="btn lowercase">
					<span class="text-base">@{$currentUser.username}</span>
				</button>
				<ul class="menu bg-base-200 dropdown-content p-2 shadow rounded-box w-52 mt-4">
					<li>
						<a href="/settings">
							<i class="fa-solid fa-cog" />
							settings
						</a>
					</li>
					{#if isAdmin}
						<li>
							<a href="/">
								<i class="fa-solid fa-arrow-up-right-from-square" />
								app
							</a>
						</li>
					{/if}

					<div class="divider my-0 py-0" />
					<li>
						<button
							on:click={async () => {
								await logout();
							}}
						>
							logout
						</button>
					</li>
				</ul>
			</div>
		{:else}
			<a class="btn btn-ghost lowercase text-base font-bold" href="/auth/login">login</a>
		{/if}
	</div>
</header>
