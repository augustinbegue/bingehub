<script lang="ts">
	import { fade } from 'svelte/transition';

	let container: HTMLElement;
	let isOpen = false;
	export const open = () => {
		isOpen = true;
	};
	export const close = () => {
		isOpen = false;
	};
</script>

{#if isOpen}
	<div
		bind:this={container}
		class="modal modal-open cursor-pointer grow"
		transition:fade={{ duration: 50 }}
		on:click={close}
	>
		<div
			class="modal-box flex flex-col max-w-6xl"
			on:click={(e) => {
				e.stopPropagation();
			}}
		>
			<slot />
		</div>
	</div>
{/if}
