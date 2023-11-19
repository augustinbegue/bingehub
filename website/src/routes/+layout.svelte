<script lang="ts">
	import { navigating, page } from '$app/stores';
	import Alerter from '$lib/components/Alerter.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import Header from '$lib/components/header/Header.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import type { LayoutData } from './$types';
	import { currentUser } from '$lib/modules/auth';
	import 'nprogress/nprogress.css';
	import NProgress from 'nprogress';

	export let data: LayoutData;

	NProgress.configure({
		minimum: 0.16,
		showSpinner: false
	});

	$: {
		if ($navigating) {
			NProgress.start();
		} else {
			NProgress.done();
		}
	}

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

<style>
	#nprogress .bar {
		background: #ffbb00 !important;
		padding: 0 10px !important;
		height: 6px !important;
	}

	#nprogress .spinner .spinner-icon {
		border-top-color: #ffbb00 !important;
		border-left-color: #ffbb00 !important;
	}
</style>
