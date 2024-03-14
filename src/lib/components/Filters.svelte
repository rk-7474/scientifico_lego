<script lang="ts">
    import FilterBar from "./FilterBar.svelte";
    export let selected_categories: string[];
    export let categories_data: {[key: string]: string[]}[];

    const defined_hashtags = {
        "Arts": "art",
    }

    let categories: string[][] = [[], [], []];

    $: {
        categories = [[], [], []];
        for (const [cat, _] of Object.entries(categories_data[0])) {
            categories[0].push(cat)
        }

        if (selected_categories[0]) for (const cat of categories_data[0][selected_categories[0]]) {
            categories[1].push(cat)
        }

        if (selected_categories[1]) for (const cat of categories_data[1][selected_categories[1]] || []) {
            categories[2].push(cat)
        }
    }

</script>

<div class="w-full">
    <FilterBar categories={categories[0]} bind:selected={selected_categories[0]}/>
    {#if selected_categories[0] && categories[1].length > 0}
        <FilterBar categories={categories[1]} bind:selected={selected_categories[1]}/>
    {/if}
    {#if selected_categories[1] && categories[2].length > 0}
        <FilterBar categories={categories[2]} bind:selected={selected_categories[2]}/>
    {/if}
</div>
