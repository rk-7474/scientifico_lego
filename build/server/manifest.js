const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png","files/04d897d5-6865-4f50-8584-f394956630ac/license.txt","files/04d897d5-6865-4f50-8584-f394956630ac/scene.bin","files/04d897d5-6865-4f50-8584-f394956630ac/scene.glb","files/04d897d5-6865-4f50-8584-f394956630ac/scene.gltf","files/04d897d5-6865-4f50-8584-f394956630ac/textures/BedFrame_baseColor.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/BedFrame_normal.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/Carpet_baseColor.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/Carpet_metallicRoughness.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/Carpet_normal.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/Chair_baseColor.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/Chair_metallicRoughness.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/Chair_normal.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/Duvet_baseColor.jpeg","files/04d897d5-6865-4f50-8584-f394956630ac/textures/Duvet_normal.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/EndLamps_baseColor.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/EndLamps_metallicRoughness.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/EndLamps_normal.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/EndTables_baseColor.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/EndTables_metallicRoughness.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/EndTables_normal.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/Meshes_baseColor.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/Meshes_normal.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/Painting_baseColor.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/Painting_metallicRoughness.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/Painting_normal.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/Pillows_baseColor.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/Pillows_metallicRoughness.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/Pillows_normal.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/Structure_baseColor.png","files/04d897d5-6865-4f50-8584-f394956630ac/textures/Structure_normal.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/license.txt","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/scene.bin","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/scene.glb","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/scene.gltf","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/BedFrame_baseColor.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/BedFrame_normal.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/Carpet_baseColor.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/Carpet_metallicRoughness.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/Carpet_normal.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/Chair_baseColor.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/Chair_metallicRoughness.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/Chair_normal.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/Duvet_baseColor.jpeg","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/Duvet_normal.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/EndLamps_baseColor.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/EndLamps_metallicRoughness.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/EndLamps_normal.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/EndTables_baseColor.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/EndTables_metallicRoughness.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/EndTables_normal.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/Meshes_baseColor.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/Meshes_normal.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/Painting_baseColor.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/Painting_metallicRoughness.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/Painting_normal.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/Pillows_baseColor.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/Pillows_metallicRoughness.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/Pillows_normal.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/Structure_baseColor.png","files/1461f7a5-c7d7-4897-88ab-400e4ecc32aa/textures/Structure_normal.png","files/6f89cddb-b527-404f-8067-cf270d26873e/license.txt","files/6f89cddb-b527-404f-8067-cf270d26873e/scene.bin","files/6f89cddb-b527-404f-8067-cf270d26873e/scene.glb","files/6f89cddb-b527-404f-8067-cf270d26873e/scene.gltf","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/BedFrame_baseColor.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/BedFrame_normal.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/Carpet_baseColor.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/Carpet_metallicRoughness.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/Carpet_normal.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/Chair_baseColor.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/Chair_metallicRoughness.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/Chair_normal.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/Duvet_baseColor.jpeg","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/Duvet_normal.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/EndLamps_baseColor.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/EndLamps_metallicRoughness.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/EndLamps_normal.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/EndTables_baseColor.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/EndTables_metallicRoughness.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/EndTables_normal.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/Meshes_baseColor.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/Meshes_normal.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/Painting_baseColor.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/Painting_metallicRoughness.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/Painting_normal.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/Pillows_baseColor.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/Pillows_metallicRoughness.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/Pillows_normal.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/Structure_baseColor.png","files/6f89cddb-b527-404f-8067-cf270d26873e/textures/Structure_normal.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/license.txt","files/814fe569-1bce-4c38-9396-f3136b4c5323/scene.bin","files/814fe569-1bce-4c38-9396-f3136b4c5323/scene.glb","files/814fe569-1bce-4c38-9396-f3136b4c5323/scene.gltf","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/BedFrame_baseColor.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/BedFrame_normal.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/Carpet_baseColor.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/Carpet_metallicRoughness.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/Carpet_normal.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/Chair_baseColor.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/Chair_metallicRoughness.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/Chair_normal.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/Duvet_baseColor.jpeg","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/Duvet_normal.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/EndLamps_baseColor.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/EndLamps_metallicRoughness.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/EndLamps_normal.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/EndTables_baseColor.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/EndTables_metallicRoughness.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/EndTables_normal.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/Meshes_baseColor.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/Meshes_normal.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/Painting_baseColor.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/Painting_metallicRoughness.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/Painting_normal.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/Pillows_baseColor.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/Pillows_metallicRoughness.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/Pillows_normal.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/Structure_baseColor.png","files/814fe569-1bce-4c38-9396-f3136b4c5323/textures/Structure_normal.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/license.txt","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/scene.bin","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/scene.glb","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/scene.gltf","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/BedFrame_baseColor.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/BedFrame_normal.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/Carpet_baseColor.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/Carpet_metallicRoughness.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/Carpet_normal.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/Chair_baseColor.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/Chair_metallicRoughness.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/Chair_normal.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/Duvet_baseColor.jpeg","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/Duvet_normal.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/EndLamps_baseColor.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/EndLamps_metallicRoughness.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/EndLamps_normal.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/EndTables_baseColor.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/EndTables_metallicRoughness.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/EndTables_normal.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/Meshes_baseColor.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/Meshes_normal.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/Painting_baseColor.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/Painting_metallicRoughness.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/Painting_normal.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/Pillows_baseColor.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/Pillows_metallicRoughness.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/Pillows_normal.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/Structure_baseColor.png","files/96d66dc7-ff1a-48dd-bc0e-9c9213a9e697/textures/Structure_normal.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/license.txt","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/scene.bin","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/scene.glb","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/scene.gltf","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/BedFrame_baseColor.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/BedFrame_normal.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/Carpet_baseColor.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/Carpet_metallicRoughness.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/Carpet_normal.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/Chair_baseColor.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/Chair_metallicRoughness.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/Chair_normal.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/Duvet_baseColor.jpeg","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/Duvet_normal.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/EndLamps_baseColor.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/EndLamps_metallicRoughness.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/EndLamps_normal.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/EndTables_baseColor.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/EndTables_metallicRoughness.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/EndTables_normal.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/Meshes_baseColor.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/Meshes_normal.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/Painting_baseColor.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/Painting_metallicRoughness.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/Painting_normal.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/Pillows_baseColor.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/Pillows_metallicRoughness.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/Pillows_normal.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/Structure_baseColor.png","files/b42b9afb-fb9a-4ceb-acad-d664a97bdb7b/textures/Structure_normal.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/license.txt","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/scene.bin","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/scene.glb","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/scene.gltf","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/BedFrame_baseColor.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/BedFrame_normal.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/Carpet_baseColor.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/Carpet_metallicRoughness.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/Carpet_normal.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/Chair_baseColor.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/Chair_metallicRoughness.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/Chair_normal.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/Duvet_baseColor.jpeg","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/Duvet_normal.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/EndLamps_baseColor.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/EndLamps_metallicRoughness.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/EndLamps_normal.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/EndTables_baseColor.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/EndTables_metallicRoughness.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/EndTables_normal.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/Meshes_baseColor.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/Meshes_normal.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/Painting_baseColor.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/Painting_metallicRoughness.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/Painting_normal.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/Pillows_baseColor.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/Pillows_metallicRoughness.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/Pillows_normal.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/Structure_baseColor.png","files/d5aceba9-9f2c-4223-9e99-df7ccc6091a6/textures/Structure_normal.png","files/d6e33401-5205-4409-91e5-d037863dd311/license.txt","files/d6e33401-5205-4409-91e5-d037863dd311/scene.bin","files/d6e33401-5205-4409-91e5-d037863dd311/scene.glb","files/d6e33401-5205-4409-91e5-d037863dd311/scene.gltf","files/d6e33401-5205-4409-91e5-d037863dd311/textures/BedFrame_baseColor.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/BedFrame_normal.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/Carpet_baseColor.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/Carpet_metallicRoughness.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/Carpet_normal.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/Chair_baseColor.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/Chair_metallicRoughness.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/Chair_normal.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/Duvet_baseColor.jpeg","files/d6e33401-5205-4409-91e5-d037863dd311/textures/Duvet_normal.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/EndLamps_baseColor.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/EndLamps_metallicRoughness.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/EndLamps_normal.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/EndTables_baseColor.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/EndTables_metallicRoughness.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/EndTables_normal.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/Meshes_baseColor.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/Meshes_normal.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/Painting_baseColor.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/Painting_metallicRoughness.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/Painting_normal.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/Pillows_baseColor.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/Pillows_metallicRoughness.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/Pillows_normal.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/Structure_baseColor.png","files/d6e33401-5205-4409-91e5-d037863dd311/textures/Structure_normal.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/license.txt","files/ea40fd28-9779-49fb-b060-015dbab0fb53/scene.bin","files/ea40fd28-9779-49fb-b060-015dbab0fb53/scene.glb","files/ea40fd28-9779-49fb-b060-015dbab0fb53/scene.gltf","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/BedFrame_baseColor.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/BedFrame_normal.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/Carpet_baseColor.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/Carpet_metallicRoughness.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/Carpet_normal.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/Chair_baseColor.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/Chair_metallicRoughness.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/Chair_normal.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/Duvet_baseColor.jpeg","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/Duvet_normal.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/EndLamps_baseColor.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/EndLamps_metallicRoughness.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/EndLamps_normal.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/EndTables_baseColor.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/EndTables_metallicRoughness.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/EndTables_normal.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/Meshes_baseColor.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/Meshes_normal.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/Painting_baseColor.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/Painting_metallicRoughness.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/Painting_normal.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/Pillows_baseColor.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/Pillows_metallicRoughness.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/Pillows_normal.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/Structure_baseColor.png","files/ea40fd28-9779-49fb-b060-015dbab0fb53/textures/Structure_normal.png","templates/Stanza 1/license.txt","templates/Stanza 1/scene.bin","templates/Stanza 1/scene.glb","templates/Stanza 1/scene.gltf","templates/Stanza 1/textures/BedFrame_baseColor.png","templates/Stanza 1/textures/BedFrame_normal.png","templates/Stanza 1/textures/Carpet_baseColor.png","templates/Stanza 1/textures/Carpet_metallicRoughness.png","templates/Stanza 1/textures/Carpet_normal.png","templates/Stanza 1/textures/Chair_baseColor.png","templates/Stanza 1/textures/Chair_metallicRoughness.png","templates/Stanza 1/textures/Chair_normal.png","templates/Stanza 1/textures/Duvet_baseColor.jpeg","templates/Stanza 1/textures/Duvet_normal.png","templates/Stanza 1/textures/EndLamps_baseColor.png","templates/Stanza 1/textures/EndLamps_metallicRoughness.png","templates/Stanza 1/textures/EndLamps_normal.png","templates/Stanza 1/textures/EndTables_baseColor.png","templates/Stanza 1/textures/EndTables_metallicRoughness.png","templates/Stanza 1/textures/EndTables_normal.png","templates/Stanza 1/textures/Meshes_baseColor.png","templates/Stanza 1/textures/Meshes_normal.png","templates/Stanza 1/textures/Painting_baseColor.png","templates/Stanza 1/textures/Painting_metallicRoughness.png","templates/Stanza 1/textures/Painting_normal.png","templates/Stanza 1/textures/Pillows_baseColor.png","templates/Stanza 1/textures/Pillows_metallicRoughness.png","templates/Stanza 1/textures/Pillows_normal.png","templates/Stanza 1/textures/Structure_baseColor.png","templates/Stanza 1/textures/Structure_normal.png"]),
	mimeTypes: {".png":"image/png",".txt":"text/plain",".bin":"application/octet-stream",".glb":"model/gltf-binary",".gltf":"model/gltf+json",".jpeg":"image/jpeg"},
	_: {
		client: {"start":"_app/immutable/entry/start.0bcDLZl9.js","app":"_app/immutable/entry/app.g9z7bCUK.js","imports":["_app/immutable/entry/start.0bcDLZl9.js","_app/immutable/chunks/entry.HojOTUtx.js","_app/immutable/chunks/2.0OfY4fVd.js","_app/immutable/entry/app.g9z7bCUK.js","_app/immutable/chunks/2.0OfY4fVd.js","_app/immutable/chunks/index.rEPfTm2O.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('./chunks/0-Q3qxTB1E.js')),
			__memo(() => import('./chunks/1-NgbIh0MC.js')),
			__memo(() => import('./chunks/2-LXwCI_CB.js')),
			__memo(() => import('./chunks/3-ax5lIzoW.js')),
			__memo(() => import('./chunks/4-oSJfMTce.js')),
			__memo(() => import('./chunks/5-e94oMFvb.js')),
			__memo(() => import('./chunks/6-n0w5dwHU.js')),
			__memo(() => import('./chunks/7-JAyVjqyQ.js')),
			__memo(() => import('./chunks/8-InlWCE2-.js')),
			__memo(() => import('./chunks/9-cDU9oVK7.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/editors/add",
				pattern: /^\/api\/editors\/add\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-5y1b47YW.js'))
			},
			{
				id: "/api/editors/remove",
				pattern: /^\/api\/editors\/remove\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-uRwD8JkJ.js'))
			},
			{
				id: "/api/editors/search",
				pattern: /^\/api\/editors\/search\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-sBWcf1b6.js'))
			},
			{
				id: "/api/image",
				pattern: /^\/api\/image\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-3armsMNr.js'))
			},
			{
				id: "/api/rooms/scenes",
				pattern: /^\/api\/rooms\/scenes\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-MVSOoESD.js'))
			},
			{
				id: "/api/rooms/update",
				pattern: /^\/api\/rooms\/update\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-BO9cKcCK.js'))
			},
			{
				id: "/create",
				pattern: /^\/create\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/home",
				pattern: /^\/home\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/login",
				pattern: /^\/login\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/manage/[roomid]",
				pattern: /^\/manage\/([^/]+?)\/?$/,
				params: [{"name":"roomid","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/profile",
				pattern: /^\/profile\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/rooms/[roomid]",
				pattern: /^\/rooms\/([^/]+?)\/?$/,
				params: [{"name":"roomid","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/signup",
				pattern: /^\/signup\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
