(function() {
  const webglEl = $('webgl')
  if (!Detector.webgl) {
    Detector.addGetWebGLMessage(webglEl)
    return
  }

  var radius = 0.5
  var segments = 32
  var rotation = 6


  const renderer = new THREE.WebGLRenderer()
  const width = window.innerWidth
  const height = window.innerHeight
  const scene = new THREE.Scene()
  var camera = new THREE.PerspectiveCamera(45, width / height, 0.01, 1000)


  camera.position.z = 1.5
  renderer.setSize(width, height)
  scene.add(new THREE.AmbientLight(0x333333))

  var light = new THREE.DirectionalLight(0xfffff, 1)
  light.position.set(5, 3, 5)
  scene.add(light)

  new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshPhongMaterial({
      map: THREE.ImageUtils.loadTexture('images/2_no_clouds_8k.jpg'),
      bumpMap: THREE.ImageUtils.loadTexture('images/elev_bump_8k.jpg'),
      bumpScale: 0.005,
      specularMap: THREE.ImageUtils.loadTexture('images/water_8k.png'),
      specular: new THREE.Color('grey')
    })
  )

  new THREE.Mesh(
    new THREE.SphereGeometry(90, 64, 64),
    new THREE.MeshBasicMaterial({
      map: THREE.ImageUtils.loadTexture('images/starfield.jpg'),
      side: THREE.Backside
    })
  )

  var sphere = createSphere(radius, segments);
  sphere.rotation.y = rotation;
  scene.add(sphere)

  var clouds = createClouds(radius, segments);
  clouds.rotation.y = rotation;
  scene.add(clouds)

  var stars = createStars(90, 64);
  scene.add(stars);


  var controls = new THREE.TrackballControls(camera)

  render()

  function render() {
    controls.update()
    sphere.rotation.y += 0.0005
    clouds.rotation.y += 0.0005
    requestAnimationFrame(render)
    renderer.render(scene, camera)
  }

  function createSphere(radius, segments) {
    return new THREE.Mesh(
      new THREE.SphereGeometry(radius, segments, segments),
      new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('./images/2_no_clouds_8k.jpg'),
        bumpMap: THREE.ImageUtils.loadTexture('images/elev_bump_8k.jpg'),
        bumpScale: 0.005,
        specularMap: THREE.ImageUtils.loadTexture('images/water_8k.png'),
        specular: new THREE.Color('grey')
      })
    );
  }

  function createClouds(radius, segments) {
    return new THREE.Mesh(
      new THREE.SphereGeometry(radius + 0.003, segments, segments),
      new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('images/fair_clouds_8k.jpg'),
        transparent: true
      })
    );
  }

  function createStars(radius, segments) {
    return new THREE.Mesh(
      new THREE.SphereGeometry(radius, segments, segments),
      new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture('images/starfield.jpg'),
        side: THREE.BackSide
      })
    );
  }



})()
