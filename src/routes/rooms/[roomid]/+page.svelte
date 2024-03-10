<script lang="ts">
	import { onMount } from "svelte";
	import { tagInput, descInput, titleInput, urlInput, loadingTotal, state, showCursor, showResize, showUrlInput, showInfoInput, innerHeight, innerWidth, devicePixelRatio, loadingBar, frameImg } from "$lib/rooms/stores.js";
	import {createScene} from "$lib/rooms/index";
	import {sendUpdate, handleResize, confirmResizer} from "$lib/rooms/frames";
	import { gamepadOff } from "$lib/rooms/gamepad.js";
	import { onKeyDown, onKeyUp, onMouseDown } from "$lib/rooms/movement.js" 
	import { enhance } from "$app/forms";

	export let data;
	export let form;

	let three_scene: HTMLElement;

	$: {
		sendUpdate(form);
		console.log(form)
		if (form?.done == "info") $showInfoInput = false;
		if (form?.done == "info") $showInfoInput = false;
	}

	onMount(async () => {
		if (data && data.room) {
			$state = "loading";
			await createScene(data.id, data.room, data.frames, three_scene, false, data.perms);
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
			<form method="post" action="?/info" class="container" id="info" use:enhance>
				<input value="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsfondo.info%2Fi%2Foriginal%2F5%2F0%2Fe%2F12051.jpg&f=1&nofb=1&ipt=b690017e4bc2b8d5c48ad32ad0635894d1eda00e4dcf7d49645591b9620024eb&ipo=images" autocomplete="off" name="url" type="text" placeholder="Inserisci URL immagine o video">
				<input value="ciao" autocomplete="off" name="title" type="text" placeholder="Inserisci titolo opera...">
				<input value="ciao" autocomplete="off" name="desc" type="text" placeholder="Inserisci descrizione opera...">
				<input value="ciao" autocomplete="off" name="tags" type="text" placeholder="Inserisci tag...">
				<button type="submit" class="confirm">Conferma</button>
			</form>
		{/if}
		{#if $showResize}
			<div class="resizercontainer">
				<h2>Modifica dimensione frame</h2>
				<input on:change={handleResize} type="range" min="10" max="300" value="100" class="slider">
				<button on:click={confirmResizer} class="confirm">Conferma</button>
			</div>
		{/if}
		{#if $frameImg.show === true}
			<div class="frame">
				<img src={$frameImg.content}/>
				<div class="frameinfo">
					<h1>{$frameImg.title}</h1>
					<p>{$frameImg.desc}</p>
				</div>
			</div>
		{/if}
	</div>
{/if}

<canvas bind:this={three_scene}></canvas>
<svelte:window 
	bind:innerHeight={$innerHeight}
	bind:innerWidth={$innerWidth}
	bind:devicePixelRatio={$devicePixelRatio}
	on:gamepaddisconnected={gamepadOff}
	on:keydown={onKeyDown}
	on:keyup|preventDefault={onKeyUp}
	on:mousedown={onMouseDown}
/>

<style>
	@import './style.css';
</style>