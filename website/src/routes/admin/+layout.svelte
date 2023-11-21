<script lang="ts">
	import { page } from '$app/stores';
	import AdminHeader from '$lib/components/header/AdminHeader.svelte';
</script>

<svelte:head>
	<title>BingeHub | Admin</title>
</svelte:head>

<AdminHeader />
<main class="flex flex-col grow">
	<div class="w-full flex flex-row h-full">
		<ul class="menu bg-base-100 w-[10rem] p-2 rounded-box font-medium min-w-[10rem]">
			<li class:bordered={$page.url.pathname.endsWith('users')}>
				<a href="/admin/users"> users </a>
			</li>
			<li class:bordered={$page.url.pathname.endsWith('roles')}>
				<a href="/admin/roles"> roles </a>
			</li>
			<li class:bordered={$page.url.pathname.endsWith('events')}>
				<a href="/admin/events"> events </a>
			</li>
			<li class:bordered={$page.url.pathname.endsWith('requests')}>
				<a href="/admin/requests"> requests </a>
			</li>
			<li class:bordered={$page.url.pathname.endsWith('torrents')}>
				<a href="/admin/torrents"> torrents </a>
			</li>
			<li class:bordered={$page.url.pathname.endsWith('media')}>
				<a href="/admin/media"> media </a>
			</li>
			<li class:bordered={$page.url.pathname.endsWith('jobs')}>
				<a href="/admin/jobs"> jobs </a>
			</li>
		</ul>
		<div class="h-full w-full py-2">
			<div class="card bg-base-200 w-full h-full">
				<div class="card-body">
					<slot />
				</div>
			</div>
		</div>
	</div>
</main>
