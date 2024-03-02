<script>
    export let categories;
    export let selected;
</script>

<div class="bg-slate-600 p-2 rounded-lg text-xl font-bold m-10 w-full flex justify-center">
    {#each categories || [] as name}
        <button on:click={() => selected = name} class="{selected == name ? "opacity-100" : "opacity-35"} cursor-pointer mx-5 hover:opacity-80 transition">{name}</button>
    {/each}
</div>