<script lang="ts">
	import { enhance } from "$app/forms";

    export let data;
</script>

<form method="post" use:enhance>
    <button>Sign out</button>
    {#each data.rooms as room}
        <p>{room.name}</p>
        <p>{room.state}</p>
        <p>{room.description}</p>
        <a href="/manage/{room.uuid}">manage</a>
        <hr> 
    {/each}
</form>