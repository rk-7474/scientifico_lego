<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
	export let form: any;

	let editors_list: any = data?.editors || [];
	let search_results: {username: string, id: string}[] = [];

	const room_id = data.room.id;

	const removeEditor = async (user_id: string) => {
		await fetch(`/api/editors/remove`, { 
			method: "POST",
			body: JSON.stringify({
				user_id, room_id
			})
		});
		editors_list = editors_list.filter(function( elem: any ) {
			return elem.user_id != user_id;
		});
	}
	
	$: {
		search_results = form?.results.filter(
			(elem: any) => !(elem.username === data.username || editors_list.some((editor: any) => editor.username === elem.username))
		) || [];
	}

	const addEditor = async (user_id: string, username: string) => {
		await fetch(`/api/editors/add`, { 
			method: "POST",
			body: JSON.stringify({
				user_id, room_id, username
			})
		});
		editors_list = [...editors_list, { user_id, username }];
		form.results = [];
	}
</script>

<svelte:head>
    <title>Space 4 Art - Room</title>
</svelte:head>

<h3>Editors</h3>
{#each editors_list as {username, user_id} }
	<button on:click={() => removeEditor(user_id)}>{username}</button><br>
{/each}
<hr>
<form action="?/search" method="post" use:enhance>
	<input type="text" name="q" class="border-gray-500 border">
	<button>Search</button>
</form>
{#each search_results as {username, id} }
	<button on:click={() => addEditor(id, username)}>{username}</button><br>
{/each}
<hr>
<h3>Settings</h3>
<h2>Room visibility</h2>
<form action="?/save" method="post" use:enhance>
	<input type="hidden" name="room_id" value={room_id} class="hidden">
	<input type="radio" name="visibility" id="public" value="public" checked={data?.room?.state == "public"} required>
	<label for="public">Public</label><br>
	<input type="radio" name="visibility" id="private" value="private" checked={data?.room?.state  == "private"} required>
	<label for="private">Private</label><br>
	<input type="radio" name="visibility" id="reserved" value="reserved" checked={data?.room?.state  == "reserved"} required>
	<label for="reserved">Reserved</label><br>
	<button type="submit">Save</button>
</form>

