<script lang="ts">
	import { onMount } from "svelte";
	import { tagInput, descInput, titleInput, urlInput, loadingTotal, state, showCursor, showResize, showUrlInput, showInfoInput, innerHeight, innerWidth, devicePixelRatio, loadingBar } from "$lib/rooms/stores.js";
	import {createScene} from "$lib/rooms/index";
	import {sendUpdate} from "$lib/rooms/frames";
	import { gamepadOff } from "$lib/rooms/gamepad.js";

	export let data;
	export let form;

	let three_scene: HTMLElement;

	$: sendUpdate(form);

	onMount(async () => {
		if (data.room) {
			$state = "loading";
			await createScene(data.id, data.room, data.frames, three_scene, false);
			$state = "done";
		} else
			$state = "error";
	});
</script>

<svelte:head>
    <title>Space 4 Art - Room</title>
	<script src="https://www.youtube.com/iframe_api"></script>
</svelte:head>

{#if $state == "error"}
	<div>
		<h1>We couldn't find the room you are looking for.<br>:(</h1>
		<p>The room at this url might have been deleted or made private.<p>
	</div>
{:else if $state == "loading"}
	<div>
		<h1>Entering room...</h1>
		<div> 
			<div id="loadingbar" style="width: {$loadingBar / $loadingTotal * 300}px"></div>
		</div>
	</div>
{:else if $state == "done"}
	<div class="center">
		{#if $showCursor}
			<img src="$lib/assets/cursor.png" alt="cursor" id="cursor" width="15">
		{/if}
		{#if $showInfoInput}
			<form method="post" action="/info" class="container" id="info">
				<input autocomplete="off" type="text" placeholder="Inserisci URL immagine o video">
				<input autocomplete="off" id="title" type="text" placeholder="Inserisci titolo opera...">
				<input autocomplete="off" id="desc" type="text" placeholder="Inserisci descrizione opera...">
				<input autocomplete="off" id="tag" type="text" placeholder="Inserisci tag...">
				<button type="submit" class="confirm">Conferma</button>
			</form>
		{/if}
	</div>
	<div class="resizercontainer">
		{#if $showResize}
			<form method="post" action="/resize" id="resizer">
				<h2>Modifica dimensione frame</h2>
				<input type="range" min="0" max="300" value="100" class="slider">
				<button class="confirm">Conferma</button>
			</form>
		{/if}
	</div>
{/if}

<canvas bind:this={three_scene}></canvas>
<svelte:window 
	bind:innerHeight={$innerHeight}
	bind:innerWidth={$innerWidth}
	bind:devicePixelRatio={$devicePixelRatio}
	on:gamepaddisconnected={gamepadOff}
	
/>