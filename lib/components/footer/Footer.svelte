<script lang="ts">
	export let url: URL;
</script>

<footer class="hidden md:flex footer h-16 p-2 bg-base-300 flex-row items-center shrink-0">
	<a class="footer-title link link-hover m-0" href="https://begue.cc">Augustin BÉGUÉ</a>
</footer>

<div class="p-6 md:hidden" />

<div class="z-50 btm-nav flex btm-nav-sm md:hidden">
	<a href="/search" class:active={url?.toString().indexOf('/search') != -1}>
		<i class="fa-solid fa-magnifying-glass" />
	</a>
	<a
		href="/"
		class:active={url?.toString().indexOf('/search') === -1 &&
			url?.toString().indexOf('/requests') === -1}
	>
		<i class="fa-solid fa-play" />
	</a>
	<a href="/requests" class:active={url?.toString().indexOf('/requests') != -1}>
		<i class="fa-solid fa-code-pull-request" />
	</a>
</div>
