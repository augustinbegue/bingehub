<script lang="ts">
	import { alerts } from '$lib/modules/interaction/alerter';
	import { onMount } from 'svelte';
</script>

<div class="fixed top-0 p-4 w-full z-[1000]">
	<div class=" container mx-auto">
		{#each $alerts as alert, i}
			<div
				class="py-4 px-6 rounded-full shadow-lg m-2 flex flex-row justify-between items-center"
				class:alert-info={alert.type === 'info'}
				class:alert-success={alert.type === 'success'}
				class:alert-warning={alert.type === 'warning'}
				class:alert-error={alert.type === 'error'}
			>
				<div>
					{#if alert.type === 'info'}
						<i class="fas fa-info-circle" />
					{/if}
					{#if alert.type === 'success'}
						<i class="fas fa-check-circle" />
					{/if}
					{#if alert.type === 'warning'}
						<i class="fas fa-exclamation-circle" />
					{/if}
					{#if alert.type === 'error'}
						<i class="fas fa-exclamation-triangle" />
					{/if}
					<span>{@html alert.message}</span>
				</div>

				<button
					class="btn btn-sm h-full btn-ghost btn-primary my-auto"
					on:click={() => {
						alerts.update((alerts) => {
							return alerts.filter((a, j) => j !== i);
						});
					}}
				>
					<i class="fas fa-times" />
				</button>
			</div>
		{/each}
	</div>
</div>
