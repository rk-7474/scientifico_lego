<script lang="ts">
    import backgroundImage from '$lib/assets/art hub.png';

    let room_type = true;

    const switch_type = () => room_type = !room_type;

</script>

<svelte:head>
    <title>Space 4 Art - Creation page</title>
</svelte:head>

<img class="sfondo" alt="sfondo" src="$lib/assets/sfondo.png">
<div class="container">
    <a href="/home/">
        <span id="back" class="material-symbols-outlined">
        arrow_back
        </span>
    </a>
</div>
<div class="page">
    <datalist id="browsers">
        <option selected value="Stanza 1">
        <option value="Stanza 2">
    </datalist>
    <form enctype="multipart/form-data" method="POST" class="create_form">
        {#if room_type}
            <input type="button" value="Choose from files..." on:click={switch_type}>
            <input name="template" list="browsers">
            <input class="hidden" name="using_template" value="1">
        {:else}
            <input autocomplete="off" type="button" value="Choose from templates..." on:click={switch_type}>
            <input autocomplete="off" type="file" name="file" class="file">
            <input class="hidden" name="using_template" value="0">
        {/if}

        <input autocomplete="off" type="text" name="label" placeholder="Label">
        <input autocomplete="off" type="text" name="img" placeholder="Immagine">
        <input autocomplete="off" type="text" name="desc" placeholder="Descrizione">
        <input autocomplete="off" type="submit" value="Create">
    </form>
    <img class="bambino" alt="bambino" src="$lib/assets/bambino_senza_filo.png">
</div>

<style>
      /* body{
        margin: 0;
        background-color: rgb(23, 10, 49);
        overflow: hidden;
        background-image: url("/home/img/sfondo.png");
        background-size: cover;
    } */

    .page{
        overflow: hidden;
        width: 100%;
        height: 90vh;
    }

    .sfondo{
        overflow: hidden;
        position: absolute;
        background-color: rgb(23, 10, 49);

        height: 100vh;
        width: 100vw;
        position: fixed;
        transform: scale(1.2);
        margin: 0;

        z-index: -1;
    }

    form{
        position: absolute;
        top: 35%;
        left: 35%;
    }

    form input{
        display: block;
        justify-content: center;
        align-items: center;
        margin: 0;
        margin-top: 10px;
        padding: 10px;

        caret-color: transparent;
        text-align: center;
        color: white;
        border: 2px solid white;
        border-radius: 15px;

        background: transparent;
    }



    input {
        transition: .3s ease;
        outline: none;
        cursor: pointer;
    }

    .hidden {
        display: none;
    }

    #back {
        transition: .5s ease;
        cursor: pointer;
    }

    #back:hover {
        transform: scale(1.2);
    }

    input:hover::placeholder{
        color: black;
    }

    input::placeholder{
        color: white;
    }

    input::placeholder:hover{
        color: black;
    }

    form input:hover{
        color: black;
        background-color: white;
        filter: drop-shadow(0 0 0.75rem rgba(255, 255, 255, 0.7));
    }

    input[type=file]::file-selector-button {
        margin-right: 20px;
        border: none;
        color: white;
        background: transparent;
        padding: 10px 20px;
        border-radius: 10px;
    }

    input[type=file]:hover::file-selector-button {
        background: transparent;
        color: black;
    }

    .bambino{
        width: 30%;
        height: auto;
        position: relative;
        top: 25%;
        left: 60%;
    }

    a {
        display: flex;
        position:sticky;
        padding: 5%;
    }

    a::after{
        text-decoration: none;
    }
    


    input:focus::placeholder {
        color: transparent;
    }

    input:hover:focus::placeholder{
        color: transparent;
    }
</style>