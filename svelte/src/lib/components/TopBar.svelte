<script lang="ts">
	import AlwaysOnTopButton from '$lib/components/AlwaysOnTopButton.svelte';
	function exit(): void {
		api.exit();
	}
</script>

<div class="bar flex w-full h-full">
	<div class="w-48 p-2 drop-shadow-lg">
		<img src="logo.png" alt="Logo" class="w-full h-full object-contain" />
	</div>
	<div class="flex flex-row flex-1 justify-end items-center hover:drop-shadow-2xl">
		<!-- <div class:active={isOnTop} class="flex text-xl mr-10 rounded-lg overflow-hidden h-[50%] ">
			<button on:click={toggleAlwaysOnTop} class="px-2">Set always on top</button>
		</div> -->
		<AlwaysOnTopButton />

		<!-- svelte-ignore missing-declaration -->
		<button class="w-20 h-full flex justify-center" on:click|once={exit}>
			<img src="svgs/solid/xmark.svg" alt="close-svg" class="object-contain h-full" />
		</button>
	</div>
</div>

<style>
	.bar {
		-webkit-app-region: drag;
	}
	button {
		-webkit-app-region: no-drag;
	}
</style>
