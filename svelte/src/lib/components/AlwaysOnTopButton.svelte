<script>
	let isOnTop = false;

	function toggleAlwaysOnTop() {
		isOnTop = api.toggleAlwaysOnTop(!isOnTop);
	}
</script>

<button
	class="custom-btn btn-3 w-32 h-10 border-2 border-black transition-all"
	class:active={isOnTop}
	on:click={toggleAlwaysOnTop}>Always on top</button
>

<style>
	button {
		margin: 20px;
		outline: none;
		-webkit-app-region: no-drag;
	}
	.active {
		color: white;
		background-color: black;
	}
</style>
