<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { slide, fade } from 'svelte/transition';
</script>

<svelte:head>
	<title>Testing</title>
</svelte:head>

<section in:slide out:fade={{ duration: 0, delay: 0 }}>
	<h1 class="text-red-600 border-emerald-900 ">Hello world</h1>
</section>
