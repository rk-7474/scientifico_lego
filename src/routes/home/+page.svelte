<img class="sfondo" alt="sfondo" src="$lib/assets/sfondo.png">
<div class="page">
    <img src="$lib/assets/astronauta.png" alt="astronauta" class="astronauta">
    <img src="$lib/assets/pianeta1.png" alt="pianeta1" class="pianeta1">
    <img src="$lib/assets/pianeta2.png" alt="pianeta2" class="pianeta2">
    <h1 class="title">SPACE 4 ART</h1>
    <!-- <div class="just" on:>

    </div> -->
</div>
<!-- <div class="search">
    <form>
        <div class="search-container">
          <input type="text" placeholder="Search user or use # for find topics" spellcheck="false">
          <button type="submit">
            <span id="search-icon" class="material-symbols-outlined">
                search
            </span>
          </button>
          <a class="add_button" href="/create/">
            <img src="$lib/assets/add_FILL0_wght400_GRAD0_opsz24.svg" alt="svg" class="add">
          </a>
        </div>
    </form> 
    <div id="filter">
      <div class="list" onmouseover="visibile('pittura')" onmouseout="nascosto('pittura')">
        <button>Pittura</button>
        <div class="line"></div>
        <ul class="" id="pittura">
          <li>
              <div class="sub_title">Barocco</div>
            
          </li>
          <li>
            <div class="sub_title">Rinascimento</div>
            
          </li>
          <li>
            <div class="sub_title">Impressionismo</div>
            <div onclick="window.location.href = '/rooms/index.php?id=65bbf6de5f041';" class="room content" style="background-image: url(https://www.lafficheillustree.com/wp-content/uploads/2020/03/090244-Monet-Le-Ninfee120-x-60.jpg);">
              <h2>Claude Monet</h2>
              <p>Stanza dedicata al pittore impressionista francesce del fine ottocento.</p>
              <p style="color: lightblue">#giardino #ninfee #garden #signora #londra</p>
            </div>
          </li>
          <li>
            <div class="sub_title">Moderno</div>
            <div onclick="window.location.href = '/rooms/index.php?id=65bc179ccc791';" class="room content" style="background-image: url(https://soligonadia.altervista.org/wp-content/uploads/2022/11/01.jpg);">
              <h2>Nadia Soligo</h2>
              <p>Stanza della pittrice Nadia Soligo</p>
              <p style="color: lightblue">#treviso #sile #casa #palazzo</p>
            </div>
          </li>
        </ul>
      </div>

      <div class="list" onmouseover="visibile('musica')" onmouseout="nascosto('musica')">
        <button>Musica</button>
        <ul class="hidden" id="musica">
          <li>
            <div class="sub_title">Anni '60</div>
            <div onclick="window.location.href = '/rooms/index.php?id=${id}';" class="room content" style="background-image: url(${image});">
              <img src="$lib/assets/add_FILL0_wght400_GRAD0_opsz24.svg" class="add">
            </div>
          </li>
          <li>
            <div class="sub_title">Anni '90</div>
            
            
          </li>
          <li>
            <div class="sub_title">Anni 2000</div>
            
            
          </li>
        </ul>
      </div>

      <!-- <div class="list" onmouseover="visibile('teatro')" onmouseout="nascosto('teatro')">
        <button>Teatro</button>
        <ul class="hidden" id="teatro">
          <li>
            <div class="sub_title">Commedia</div>
            
            
          </li>
          <li>
            <div class="sub_title">Dramma</div>
          </li>
          <li>
            <div class="sub_title">Musical</div>
            
            
          </li>
        </ul>
      </div>

      <div class="list">
        <button class="disabled">Scultura</button>
        <ul class="hidden" id="scultura">
          <li>
            <div class="sub_title">Greca</div>
          </li>
          <li>
            <div class="sub_title">Romana</div>
          </li>
        </ul>
      </div>
    </div> 
    <div class="container" id="rooms">
    <!-- </div>
</div> -->

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

    html{
        scroll-behavior: smooth;
    }
    
    body{
        margin: 0;
        user-select: none;
        -webkit-user-drag: none;
    }
    
    .sfondo{
        background-color: rgb(23, 10, 49);
    
        height: 100vh;
        width: 100vw;
        position: fixed;
        transform: scale(1.2);
        margin: 0;
    }
    
    .page {
        position: fixed;
        pointer-events: none;
    }
    
    .search, .page {
        width: 100%;
        height: 100vh;
    }
    
    .search {
        padding-top: 100%;
    }
    
    
    .container {
        display: flex;
        margin: 5%;
        justify-content: space-between;
        align-items: center;
        background-color: rgba(47, 79, 79, 0.5);
        max-width: 90%;
        padding-bottom: 20%;
        margin-top: 0;
        flex-wrap: wrap;
    }
    
    .room {
        font-family: 'Inter', sans-serif;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-align: center;
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0.7;
        max-width: 350px;
        height: 350px;
        cursor: pointer;
        margin: 15px;
        margin-top:30px;
        box-sizing: border-box;
    }
    
    .room:hover {
        transition: .5s ease;
        opacity: 1;
        transform: scale(1.025);
    }
    
    
    .astronauta{
        position: fixed;
        width: 27%;
        height: auto;
        top: 23.5%;
        left: 7.25%;  
        filter: drop-shadow(0 0 0.75rem rgba(255, 255, 255, 0.7));
    }
    
    .pianeta1{
        position: fixed;
    
        width: 10%;
        height: auto;
    
        top: 10%;
        left: 35%;
    
        filter: drop-shadow(0 0 0.75rem rgba(107, 107, 179, 0.7));
    }
    
    .pianeta2{
        position: fixed;
    
        width: 15%;
        height: auto;
    
        top: 70%;
        right: 15%;
        filter: drop-shadow(0 0 0.75rem rgba(105, 143, 171, 0.7));
    }
    
    h1{
        font-family: "Inter", sans-serif;
        font-weight: 300;
        font-size: 100px;
        letter-spacing: 5px;
        word-spacing: 10px;
    
        color: white;
        position: absolute;
    
        top: 35%;
        left: 45%;
        z-index: 2;
        /* text-shadow: 0.5px 0.5px 0.5px rgb(23, 10, 49), 0 0 25px rgb(23, 10, 49), 0 0 5px lightblue; */
        /* text-shadow: 4px 4px 0px rgba(0,0,0,1); */
        filter: drop-shadow(1rem 0 0.75rem rgb(23, 10, 49));
        animation: fade-in 3s;
    }
    
    /* .pianeti, .astronauta {
        position: relative;
        transition: s ease;
      } */
    
    
    .bambino{
        position: absolute;
        width: 50%;
        height: auto;
        
        padding-top: 10%;
        right: -3%;
    }
    
    
    
    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    
    .material-symbols-outlined {
       color: white;
       position: fixed;
    
       transform: scale(2);
    
       bottom: 3%;
       left: 50%;
    }
    
    
    .search-container {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 25%;
        z-index: 1;
    }
    
    #search-icon {
        position: static; 
        color: black;
        font-size: 16px;
    }
      
    input[type=text] {
        border-radius: 25px;
        color: white;
        padding: 13px;
        width: 30%;
        height: 25px;
        outline: none;
        border: none;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        background-color: rgb(55, 54, 54);
    }
      
    button[type=submit] {
        border-radius: 25px;
        width: 38px;
        height: 38px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        margin-top: 0;
        margin-left: -45px;
        border: none;
        background-color: #D67BFF;
        color: white;
        cursor: pointer;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        transition: .15s ease;
    }
    
    .room {
        border-radius: 10px;
        background-position: center;
        color: white;
        text-shadow: 0px 0px 9px rgba(0,0,0,0.5);
    }
    
    ::-webkit-scrollbar {
        width: 10px;
    }
    
    ::-webkit-scrollbar-track {
        background: #303030; 
    }
    
    ::-webkit-scrollbar-thumb {
        background: #888; 
        border-radius: 10px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }
      
    button[type=submit]:hover {
        background-color: #a25ad0;
    }
    
    .add_button{
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        width: 50px;
        height: 50px;
        border-radius: 60%;
        background-color: #D67BFF;
        color: white;
        padding: 0.5%;
        text-decoration: none;
        margin-left: 3%;
        transition: .15s ease;
    }
    
    .add_button:hover {
        background-color: #a25ad0;
    }
    
    .add{
        width: 40px;
        height: auto;
    }
    
    .new{
        width: 1.2em; 
        height: auto;
    }
    
    button {
        font-size: 1.2em;
        transition: .3s ease;
        outline: none;
        cursor: pointer;
        display: block;
        justify-content: center;
        align-items: center;
        
        margin-top: 20px;
        padding: 15px;
        
        caret-color: transparent;
        text-align: center;
        color: white;
        border: 2px solid white;
        border-radius: 15px;
            
        background: transparent;
        width: 12em;
    
    }
    
    ul{
        list-style-type: none;
        padding-left:0;
        margin-left: 1.2em;
        border-radius: 4px 0px 0px 0px;
        border-left: 4px solid white;
    }
    li{
        margin-bottom: 50px;
    }
    .list{
        font-size: 1.5em;
        outline: none;; 
        border-radius: 2px;    
        color: white;
        text-shadow: 0px 0px 9px rgba(0,0,0,0.5);
        
    }
    #filter > .list{
        margin: 30px;
    }
    
    #filter {
        position: relative;
        display: grid;
        grid-template-columns: auto auto auto auto;
        justify-content: center;
        align-items: top;
        z-index: 2;
        margin-top: 100px;
    }
    
    /* .period{
        display: flex;
        align-items: center;
    }
    .add_period{
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        width: 30px;
        height: 30px;
        border-radius: 60%;
        background-color: white;
        color: white;
        padding: 0.5%;
        text-decoration: none;
        margin-left: 3%;
    } */
    
    .title{
        text-align: center;
        padding: 5px;
    }
    
    .sub_title{
        width: 10em;
        text-align: center;
        font-family: "Inter", sans-serif;
        color: white;
        padding: 5px;
        border: 3px solid white;
        border-left:none;
        border-radius: 0px 10px 10px 0px;
    }
    .content{
        justify-content: center;
        align-items: center;
    }
    
    button:not(.disabled):hover {
        color: black;
        background-color: white;
        filter: drop-shadow(0 0 0.75rem rgba(255, 255, 255, 0.7));
    }
    
    .disabled {
        background-color: rgb(102, 102, 102, 0.700);
        border: 2px solid gray;
        color: gray;
    }
    
    .hidden{
      visibility: hidden;
    }
    </style>