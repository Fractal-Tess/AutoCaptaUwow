<script>
	import '../app.css';
	import TopBar from '$lib/components/TopBar.svelte';
	import SideNav from '$lib/components/SideNav.svelte';
</script>

<div class="main w-scren h-screen flex flex-col rounded-2xl overflow-hidden">
	<div class="top-bar w-full h-16 bg-slate-100 drop-shadow-lg">
		<TopBar />
	</div>
	<div class="content-and-navbar flex w-full h-full ">
		<div class="side-nav h-full bg-slate-50 min-w-[12rem] drop-shadow-md">
			<SideNav />
		</div>
		<div class="content flex-1 bg-slate-200"><slot /></div>
	</div>
</div>
