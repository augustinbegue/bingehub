<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import LoginForm from '$lib/components/inputs/LoginForm.svelte';
	import { currentUser } from '$lib/modules/auth';
	import { onMount } from 'svelte';

	function onLogin(result: string) {
		switch (result) {
			case 'success':
				if (redirectUrl) {
					goto(redirectUrl);
				} else {
					goto('/');
				}
				break;
			case 'error':
				break;
			default:
				break;
		}
	}

	let redirectUrl: string | null;
	onMount(() => {
		redirectUrl = $page.url.searchParams.get('redirect');
		if ($currentUser) {
			goto(redirectUrl || '/');
		}
	});
</script>

<div class="hero h-full grow">
	<div class="hero-content flex-col lg:flex-row-reverse">
		<LoginForm {onLogin} />
	</div>
</div>
