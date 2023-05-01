<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="container mx-auto p-8">
	<h1 class="text-2xl font-bold font-mono">
		{$page.status} - {$page.error?.message}
	</h1>
	<p>Mais c'était sur en fait</p>
</div>
