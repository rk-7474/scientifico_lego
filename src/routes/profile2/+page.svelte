<script lang="ts">
	import backgroundImage from '$lib/assets/sfondo.png';
    // import defaultImage from '$lib/assets/880210_images_512x512.png';
	import { enhance } from '$app/forms';
	import { getRoom } from '$lib/rooms/index.js';

	export let data;
	export let form: any;

	let editors_list: {username: string, id: string}[] = [];
	let search_results: {username: string, id: string}[] = [];

    let room_id: any;

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

    let searchQuery: string;

	const addEditor = async (user_id: string, username: string) => {
		await fetch(`/api/editors/add`, { 
			method: "POST",
			body: JSON.stringify({
				user_id, room_id, username
			})
		});
        editors_list.push({ id: user_id, username });
		form.results = [];
	}

    const getRoomData = async (id: number) => {
        room_id = id;
        searchQuery = "";
        await fetch(`/api/rooms/get_data?uuid=${id}`);
    }

    $: console.log(editors_list)
</script>

<svelte:head>
    <title>Space 4 Art - Room</title>
</svelte:head>
<!-- 
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
 -->

<div class="flex flex-col items-left w-full h-full justify-beetwen bg-cover bg-no-repeat pt-10 bg-colorato" style="background-image: url('{backgroundImage}');">
    <a class="btn btn-ghost text-white text-3xl ml-96 mr-96">Space 4 Art</a>  <!--linkare la home page-->
    <div class=" bg-transparent avatar placeholder pl-10 pt-10">
        <div class="bg-neutral text-neutral-content rounded-full w-32">
            <span class="text-4xl bg">T</span>
        </div>
        <h2 class="flex text-white text-2xl justify-center ml-10 mt-12">tomm lazza</h2>
    </div>
    <div class="grid grid-cols-4 m-4">
        {#each data.rooms as room}
            <div class="card card-compact w-80 bg-base-200 shadow-2xl mt-20 ml-10">
                <!-- <figure><img src="{defaultImage}" alt="img_stanza" style="width: 50%; height: auto;" /></figure> -->
                <div class="card-body">
                    <h2 class="card-title">{room.name}</h2>
                    <p>{room.description}</p>
                    <div class="card-actions justify-end">
                        <button class="btn bg-transparent border-transparent" on:click={() => getRoomData(room.id)} onclick="my_modal_1.showModal()"><span class="material-symbols-outlined">settings</span></button>
                        <button class="btn btn-primary"><span class="material-symbols-outlined">arrow_forward</span></button>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>

<dialog id="my_modal_1" class="modal">
    <div class="modal-box justify-center">
      <h3 class="font-bold text-center text-lg">Permessi</h3>
      <div class="flex flex-col items-center">
        <form action="?/search" method="post" use:enhance>
            <input type="text" name="q" bind:value={searchQuery} class="border-gray-500 border">
            <button>Search</button>
        </form>
        {#each search_results as {username, id} }
            <button on:click={() => addEditor(id, username)}>{username}</button><br>
        {/each}
        <hr>
        <h3 class="card-title">Editors</h3>
        {#each editors_list as {username, id} }
            <button on:click={() => removeEditor(id)}>{username}</button><br>
        {/each}
        <form class="align-middle mt-6" action="?/save" method="post" use:enhance>
          <input class="m-2 hidden" type="hidden" name="room_id">
          <input class="m-2" type="radio" name="visibility" id="public" value="public" required>
          <label class="m-2" for="public">Public</label><br>
          <input class="m-2" type="radio" name="visibility" id="private" value="private" required>
          <label class="m-2" for="private">Private</label><br>
          <input class="m-2" type="radio" name="visibility" id="reserved" value="reserved" required>
          <label class="m-2" for="reserved">Reserved</label><br>
          <button class="m-2" type="submit">Save</button>
        </form>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn">Close</button>
        </form>
      </div>
    </div>
</dialog>

<style>
    .bg-colorato {
        background-color: rgb(23, 10, 49);
    }
</style>

