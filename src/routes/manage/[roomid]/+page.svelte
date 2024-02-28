<script lang="ts">
	export let data;
</script>

<svelte:head>
    <title>Space 4 Art - Room</title>
</svelte:head>

<h3>Editors</h3>
{#each data?.editors || [] as editor }
	<p>{editor.name}</p>
{/each}
<hr>
<h3>Settings</h3>
<h2>Room visibility</h2>
<form action="/save" method="post">
	<input type="radio" name="visibility" id="public" value="public" checked={data?.room?.state == "public"}>
	<label for="public">Public</label><br>
	<input type="radio" name="visibility" id="private" value="private" checked={data?.room?.state  == "private"}>
	<label for="private">Private</label><br>
	<input type="radio" name="visibility" id="hidden" value="hidden" checked={data?.room?.state  == "reserved"}>
	<label for="hidden">Hidden</label><br>
	<button type="submit">Save</button>
</form>

