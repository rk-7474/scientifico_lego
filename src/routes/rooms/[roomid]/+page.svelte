<script lang="ts">
	import {createScene} from "$lib/rooms/index";
	import { onMount } from "svelte";

	export let data;
	let state: "error" | "loading" | "done";

	onMount(() => {
		if (data.room) {
			state = "loading";
			createScene(data.id);
			state = "done";
		} else
			state = "error";
	});
</script>

<svelte:head>
	<script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>

{#if state == "error"}
	<div class="loading">
		<h1>We couldn't find the room you are looking for.<br>:(</h1>
		<p>The room at this url might have been deleted or made private.<p>
	</div>
{:else if state == "loading"}
	<div class="loading">
		<h1>Entering room...</h1>
		<div> 
			<div id="loadingbar"></div>
		</div>
	</div>
{:else if state == "done"}
	<div class="center">
		<img src="assets/cursor.png" alt="cursor" id="cursor" width="15">
		<div class="container" id="url">
			<input autocomplete="off" type="text" placeholder="Inserisci URL immagine o video">
			<button class="confirm">Conferma</button>
		</div>
		<div class="container" id="info">
			<input autocomplete="off" id="title" type="text" placeholder="Inserisci titolo opera...">
			<input autocomplete="off" id="desc" type="text" placeholder="Inserisci descrizione opera...">
			<input autocomplete="off" id="tag" type="text" placeholder="Inserisci tag...">
			<button class="confirm">Conferma</button>
		</div>
	</div>
	<div class="resizercontainer">
		<div id="resizer">
			<h2>Modifica dimensione frame</h2>
			<input type="range" min="0" max="300" value="100" class="slider">
			<button class="confirm">Conferma</button>
		</div>
	</div>
{/if}
