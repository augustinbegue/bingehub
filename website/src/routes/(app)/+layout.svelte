<script lang="ts">
	import Header from '$lib/components/header/Header.svelte';
	import Footer from '$lib/components/footer/Footer.svelte';
	import { page } from '$app/stores';
</script>

<svelte:head>
	<title>BingeHub</title>
</svelte:head>
<Header />
<main class="flex flex-col grow">
	<slot />
</main>
<Footer url={$page.url} />
