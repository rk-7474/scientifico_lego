<script lang="ts">
    import FilterBar from "./FilterBar.svelte";
    export let selected_categories: string[];
    export let categories_data: {[key: string]: string[]}[];

    let categories: string[][] = [[], [], []];

    $: console.log(selected_categories);

    $: {
        categories = [[], [], []];
        for (const [cat, _] of Object.entries(categories_data[0])) {
            categories[0].push(cat)
        }

        if (selected_categories[0]) for (const cat of categories_data[0][selected_categories[0]]) {
            categories[1].push(cat)
        }

        if (selected_categories[1]) for (const cat of categories_data[1][selected_categories[1]]) {
            categories[2].push(cat)
        }
    }
</script>

<FilterBar categories={categories[0]} bind:selected={selected_categories[0]}/>
{#if selected_categories[0]}
    <FilterBar categories={categories_data[1]} bind:selected={selected_categories[1]}/>
{/if}
{#if selected_categories[1]}
    <FilterBar categories={categories_data[2]} bind:selected={selected_categories[2]}/>
{/if}