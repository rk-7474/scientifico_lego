<?php
	include "../libs/sql/db.php";

	$room = $_GET["id"];
?>

<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Rooms</title>
		<link rel="stylesheet" href="css/style.css">
	</head>
	
	<body>
		<?php if(exists($room)): ?>

		<div class="loading">
			<h1>Entering room...</h1>
			<div> 
				<div id="loadingbar"></div>
			</div>
		</div>
		<div class="center">
			<img src="assets/cursor.png" id="cursor" width="15">
			<div class="container" id="url">
				<input autocomplete="off" autofocus type="text" placeholder="Inserisci URL immagine o video">
				<button class="confirm">Conferma</button>
			</div>
			<div class="container" id="info">
				<input autocomplete="off" autofocus id="title" type="text" placeholder="Inserisci titolo opera...">
				<input autocomplete="off" id="desc" type="text" placeholder="Inserisci descrizione opera...">
				<input autocomplete="off" id="tag" type="text" placeholder="Inserisci tag...">
				<button class="confirm">Conferma</button>
			</div>
		</div>
		<div class="resizercontainer">
			<div id="resizer">
				<h2>Modifica dimensione frame</h2>
				<input type="range" min="0" max="300" value="100" class="slider">
				<button class="confirm">Conferma</button>
			</div>
		</div>
		<script type="importmap">
			{
				"imports": {
					"three": "https://unpkg.com/three@0.160.0/build/three.module.js",
					"three/addons/": "https://unpkg.com/three@0.160.0/examples/jsm/",
					"jquery": "https://code.jquery.com/jquery-3.7.1.min.js",
					"uuid": "https://cdnjs.cloudflare.com/ajax/libs/uuid/8.3.2/uuid.min.js"
				}
			}
		</script>
		<script src="https://www.youtube.com/iframe_api"></script>
		<script type="module" src="scripts/index.js"></script>

		<?php else: ?>

		<div class="loading">
			<h1>We couldn't find the room you are looking for.<br>:(</h1>
			<p>The room at this url might have been deleted or made private.<p>
		</div>

		<?php endif; ?>

	</body>
	
</html>
