<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let hashes: string[] = [];

	onMount(() => {
		for (const key in data.torrents) {
			hashes = [...hashes, key];
		}
	});
</script>

<div class="flex flex-col">
	<div class="overflow-x-auto">
		<table class="table table-zebra w-full">
			<thead>
				<tr>
					<th>File</th>
					<th>Completed</th>
				</tr>
			</thead>
			<tbody>
				{#each hashes as hash}
					{@const torrent = data.torrents[hash]}
					{#if torrent.tags.includes('bingehub-managed')}
						<tr>
							<td>
								{torrent.directory}/{torrent.name}
							</td>
							<td>
								{torrent.status.includes('complete')
									? '✅'
									: `❌ ${torrent.status}: ${torrent.downRate}`}
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	</div>
</div>
