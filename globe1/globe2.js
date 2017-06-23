$(() => {
  var geometry = new THREE.SphereGeometry(0.5, 32, 32)
  var material = new THREE.MeshPhongMaterial()
  var earthMesh = new THREE.Mesh(geometry, material)
  scene.add(earthMesh)

})
