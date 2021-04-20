<script>
	import {tick} from 'svelte';
	import Index from './Index.svelte';
	import ListView from './ListView.svelte';
	import TileView from './TileView.svelte';
	import ProfileView from './ProfileView.svelte';

	import { onMount } from 'svelte';

	/* Splash Code Logic */

	//const views = [Index, ListView, TileView, ProfileView];
	let currentView = Index;

	const code = "asterisk";
	let codeHolder = "";
	async function handleKeydown(e) {

		if (code.includes(e.key)) {
			e.preventDefault();

			codeHolder += e.key;

			if(codeHolder == code){
				currentView = ListView;
			}
			else if(codeHolder !== code.substring(0, codeHolder.length)) {
				codeHolder = "";
			}
		} else {
			codeHolder = "";
		}

		console.log(codeHolder);
	}

</script>

<svelte:window on:keydown={handleKeydown}/>

<svelte:component this={currentView}/>


<style>


</style>

