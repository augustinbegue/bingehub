<script lang="ts">
	import { navigating, page } from '$app/stores';
	import { onMount } from 'svelte';
	import '../app.css';
	import type { LayoutData } from './$types';
	import { currentUser } from '$lib/modules/auth';
	import 'nprogress/nprogress.css';
	import NProgress from 'nprogress';
	import Alerter from '$lib/components/Alerter.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';

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

<svelte:head>
	<title>BingeHub</title>
</svelte:head>

<Alerter />
<div class="min-h-screen flex flex-col justify-between">
	<slot />
</div>
