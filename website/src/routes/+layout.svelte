<script lang="ts">
	import { page } from '$app/stores';
	import Alerter from '$lib/components/Alerter.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import type { LayoutData } from './$types';
	import { currentUser } from '$lib/modules/auth';

	export let data: LayoutData;

	onMount(() => {
		$currentUser = data.user;
	});
</script>

<Alerter />
<div class="min-h-screen flex flex-col justify-between">
	<Header />

	<main class="flex flex-col grow">
		<slot />
	</main>

	<Footer url={$page.url} />
</div>
