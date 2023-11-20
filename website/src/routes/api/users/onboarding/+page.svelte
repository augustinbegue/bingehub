<script lang="ts">
	import { page } from '$app/stores';

	let username = $page.url.searchParams.get('username');
	let password = $page.url.searchParams.get('password');
</script>

<svelte:head>
	<title>BingeHub</title>
</svelte:head>
<div class="container mx-auto flex flex-col items-center p-16">
	<span class="font-bold text-4xl normal-case">
		<span class="mr-1/2">Binge</span>
		<span class="px-2 py-1/2 bg-primary rounded-xl text-black">hub</span>
	</span>
	<h1>Welcome onboard!</h1>
	<p>Your account has just been created. Use the credentials below to login:</p>
	<br />
	<p>
		<span class="text-xl">username:</span> <span class="font-bold">{username}</span>
	</p>
	<p>
		<span class="text-xl">password:</span> <span class="font-bold">{password}</span>
	</p>
	<br />
	<a class="btn btn-ghost mb-2" href="/auth/login">Login</a>
	<h2>Next steps</h2>
	<p>Once you've logged in, we advise you to change your password by heading to the settings.</p>
	<p>Enjoy the moutain of content you've just gained access to!</p>
	<h2>Tips</h2>
	<p>
		Install <a href="https://www.videolan.org/" target="_blank">VLC</a> on your computer/phone to enjoy
		the videos in the highest quality.
	</p>
</div>

<style lang="postcss">
	.container {
		height: 100vh;
		@apply text-center;
	}

	a {
		@apply text-primary underline;
	}

	h1 {
		@apply text-4xl font-bold mt-8 mb-4;
	}

	h2 {
		@apply text-2xl font-bold mt-6 mb-2;
	}

	p {
		@apply text-xl mb-1;
	}
</style>
