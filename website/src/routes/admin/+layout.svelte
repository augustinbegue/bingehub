<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="container mx-auto flex flex-row h-full">
	<ul class="menu bg-base-100 w-56 p-2 rounded-box font-medium">
		<li class:bordered={$page.url.pathname.endsWith('requests')}>
			<a href="/admin/requests"> requests </a>
		</li>
		<li class:bordered={$page.url.pathname.endsWith('media')}>
			<a href="/admin/media"> media </a>
		</li>
		<li class:bordered={$page.url.pathname.endsWith('jobs')}>
			<a href="/admin/jobs"> jobs </a>
		</li>
		<li class:bordered={$page.url.pathname.endsWith('users')}>
			<a href="/admin/users"> users </a>
		</li>
		<li class:bordered={$page.url.pathname.endsWith('roles')}>
			<a href="/admin/roles"> roles </a>
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
