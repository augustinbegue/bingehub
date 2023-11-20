<script lang="ts">
	export let url: URL;
</script>

<footer class="hidden md:flex footer h-16 p-2 bg-base-300 flex-row items-center shrink-0">
	<a class="footer-title link link-hover m-0" href="https://begue.cc">Augustin BÉGUÉ</a>
</footer>

<div class="filler md:hidden" />

<div class="bg-base-300">
	<div class="z-50 btm-nav md:hidden">
		<a
			href="/search"
			class:active={url?.toString().indexOf('/search') != -1}
			class="border-base-300 border-t"
		>
			<i class="fa-solid fa-magnifying-glass" />
			<span class="text-xs"> Search </span>
		</a>
		<a
			href="/"
			class:active={url?.toString().indexOf('/search') === -1 &&
				url?.toString().indexOf('/requests') === -1}
			class="border-base-300 border-t"
		>
			<i class="fa-solid fa-play" />
			<span class="text-xs"> Watch </span>
		</a>
		<a
			href="/requests"
			class:active={url?.toString().indexOf('/requests') != -1}
			class="border-base-300 border-t"
		>
			<i class="fa-solid fa-code-pull-request" />
			<span class="text-xs"> Requests </span>
		</a>
	</div>
</div>

<style lang="postcss">
	.filler {
		height: 4rem;
	}
	.active i {
		@apply text-primary;
	}
	.active span {
		@apply text-primary;
	}

	@supports (-webkit-touch-callout: none) {
		/* CSS specific to iOS devices */
		.btm-nav {
			height: 5.5rem;
			@apply pb-[1rem];
		}

		.filler {
			height: 5.5rem;
		}
	}
</style>
