<script lang="ts">
    export let label: string;
    export let password = false;
    export let name: string;
</script>

<label class="text-white px-2" for="username">{label}</label>
<input class="my-2 outline-none rounded shadow-lg p-1" name={name} type={password ? "password" : "text"} id={name} />