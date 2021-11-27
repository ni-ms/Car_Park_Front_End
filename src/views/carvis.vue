<template>
  <v-container>
    <div
      @click="onClick"
      @mousemove="onMouseMove"
      id="menu3D"
      style="background-color: transparent; position: fixed; left: 20px; width:15%; height:100%;">
    </div>
    <v-row class="text-center">

      <v-col
        class="mb-5"
        cols="12"
      >
        <h2 class="headline font-weight-bold mb-3">
          Accueil
        </h2>

        <v-row justify="center">

          <p>
            Client: {{ JSON.stringify(client)}}
          </p>
          <p>
            Mouse: {{ JSON.stringify(mouse)}}
          </p>
          <p>
            Container: {{ JSON.stringify(container)}}
          </p>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import * as Three from 'three';

export default {
  name: 'Carvis',
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.createScene();
      this.createCamera();
      this.userData.formes.forEach((x) => this.createShape(x));
      this.addSpotlight(16777215);
      this.addAmbientLight();
      this.animate();
      window.addEventListener('resize', this.onResize);
    },
    onResize() {
      const container = document.getElementById('menu3D');
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();
    },
    createScene() {
      this.renderer = new Three.WebGLRenderer({
        antialias: true,
        alpha: true,
      });
      const container = document.getElementById('menu3D');
      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setClearColor(0xffffff, 0);
      container.appendChild(this.renderer.domElement);
    },

    createCamera() {
      const container = document.getElementById('menu3D');
      this.camera = new Three.PerspectiveCamera(50,
        container.clientWidth / container.clientHeight, 0.01, 1000);
      this.camera.position.set(0, 5, 20);
      this.camera.zoom = 1;
    },

    createShape(shape) {
      const material = new Three.MeshStandardMaterial({
        color: '#0000ff',
        roughness: 1,
        metalness: 0.5,
        emissive: 0,
        depthFunc: 3,
        depthTest: true,
        depthWrite: true,
        stencilWrite: false,
        stencilWriteMask: 255,
        stencilFunc: 519,
        stencilRef: 0,
        stencilFuncMask: 255,
        stencilFail: 7680,
        stencilZFail: 7680,
        stencilZPass: 7680,
      });
      switch (shape.nom) {
        case 'Box': {
          this.geometry = new Three.BoxBufferGeometry(1.8, 1.8, 1.8);
          break;
        }
        case 'Sphere': {
          this.geometry = new Three.SphereBufferGeometry(1, 8, 6, 0, 6.283185, 0, 3.141593);
          break;
        }
        case 'Dodecahedron': {
          this.geometry = new Three.DodecahedronBufferGeometry(1.2, 0);
          break;
        }
        case 'Icosahedron': {
          this.geometry = new Three.IcosahedronBufferGeometry(1.5, 0);
          break;
        }
        default: {
          return false;
        }
      }
      this.mesh = new Three.Mesh(this.geometry, material);
      this.mesh.name = shape.nom;
      this.mesh.userData = shape.userData;
      this.mesh.receiveShadow = true;
      this.mesh.castShadow = true;
      this.mesh.position.set(0, shape.userData.position.y, 0);
      this.scene.add(this.mesh);
      return true;
    },

    addSpotlight(color) {
      const light = new Three.SpotLight(color, 2, 1000);
      light.position.set(0, 0, 30);
      this.scene.add(light);
    },

    addAmbientLight() {
      const light = new Three.AmbientLight('#fff', 0.5);
      this.scene.add(light);
    },

    verifForme(e) {
      const t = this;
      const elt = t.scene.getObjectByName(e);
      t.intersects = t.raycaster.intersectObject(elt);
      if (t.intersects.length !== 0) {
        // s'il ne figure pas dans le tableau, on le met en premier
        if (t.userData.souris.indexOf(e) < 0) {
          t.userData.souris.unshift(e);
          console.log(`${t.userData.souris[0]} survolé!`);
        }
        if (t.userData.souris[0] === e) {
          const obj = t.intersects[0].object;
          obj.material.color.set(`#${elt.userData.couleurs[1]}`);
          obj.scale.set(obj.scale.x < 1.4
            ? obj.scale.x + t.VITESSE_ZOOM
            : obj.scale.x, obj.scale.y < 1.4
            ? obj.scale.y + t.VITESSE_ZOOM
            : obj.scale.y, obj.scale.z < 1.4
            ? obj.scale.z + t.VITESSE_ZOOM
            : obj.scale.z);
          obj.rotation.y += t.VITESSE_ROTATION / t.RALENTISSEMENT;
          t.replacer(obj, obj.userData.position.y + obj.userData.decalage);
        } else {
          t.retrecir(e, elt);
        }
      } else {
        if (t.userData.souris.indexOf(e) >= 0) {
          t.userData.souris = t.userData.souris.filter((forme) => forme !== e);
        }
        t.retrecir(e, elt);
      }
    },

    onClick(event) {
      event.preventDefault();
      if (this.userData.souris.length > 0) {
        console.log(`${this.userData.souris[0]} cliqué!`);
      } else {
        console.log('clic dans le vide!');
      }
    },

    onMouseMove(event) {
      const container = document.getElementById('menu3D');
      this.mouse.x = (event.offsetX / container.clientWidth) * 2 - 1;
      this.mouse.y = -(event.offsetY / container.clientHeight) * 2 + 1;
      this.client.clientX = event.clientX;
      this.client.clientY = event.clientY;
      this.container.width = container.clientWidth;
      this.container.height = container.clientHeight;
      // console.log(JSON.stringify(this.mouse))
    },

    replacer(e, py) {
      // la ligne suivante est pour éviter les tremblements
      if (Math.abs(e.position.y - py) < 0.05) { return true; }
      let rhesus = 10 * this.VITESSE_DEPLACEMENT;
      if (this.userData.souris[0] !== e.name) { rhesus *= 3; }
      // console.log(e.name+': '+this.userData.souris[0]+' - '+rhesus)
      if (e.position.y > py) { rhesus = -1; }
      e.position.set(0, Math.trunc(10 * e.position.y + rhesus) / 10, 0);
      return true;
    },

    retrecir(n, e) {
      // on vérifie si le truc cliqué est dessus
      let dec = 0;
      const elt = this;
      if ((elt.userData.souris.length > 0)
        && (elt.userData.formes.map((x) => x.nom).indexOf(n)
        < elt.userData.formes.map((x) => x.nom).indexOf(elt.userData.souris[0]))) {
        dec = Math.trunc(10
          * e.parent.getObjectByName(elt.userData.souris[0]).userData.decalage
          * 2.1) / 10;
      }
      e.material.color.set(`#${e.userData.couleurs[0]}`);
      e.rotation.y += elt.VITESSE_ROTATION;
      e.scale.set(e.scale.x > 1
        ? e.scale.x - elt.VITESSE_ZOOM : e.scale.x,
      e.scale.y > 1
        ? e.scale.y - elt.VITESSE_ZOOM : e.scale.y,
      e.scale.z > 1
        ? e.scale.z - elt.VITESSE_ZOOM : e.scale.z);
      const newY = e.userData.position.y + dec;
      if (e.position.y !== newY) {
        elt.replacer(e, newY);
      }
    },

    animate() {
      const elt = this;
      requestAnimationFrame(this.animate);
      this.raycaster.setFromCamera(this.mouse, this.camera);
      this.userData.formes.map((x) => x.nom).forEach((x) => elt.verifForme(x));
      if (this.userData.souris.length > 0) {
        document.body.style.cursor = 'pointer';
      } else { document.body.style.cursor = 'default'; }
      this.camera.updateProjectionMatrix();
      this.renderer.render(this.scene, this.camera);
    },
  },
  data: () => ({
    container: { height: 0, width: 0 },
    client: { clientX: 0, clientY: 0 },

    scene: new Three.Scene(),
    camera: null,
    renderer: Three.WebGLRenderer,
    mesh: new Three.Mesh(),
    factor: 0,
    mouse: new Three.Vector2(1, 1),
    raycaster: new Three.Raycaster(),
    intersects: [],
    VITESSE_ROTATION: 0.05,
    VITESSE_DEPLACEMENT: 0.1,
    VITESSE_ZOOM: 0.05,
    RALENTISSEMENT: 3,
    userData: {
      souris: [],
      formes: [
        {
          nom: 'Box',
          userData: {
            position: {
              x: 0,
              y: 7.8,
              z: 0,
            },
            couleurs: [
              'aaaaaa',
              '095256',
            ],
            decalage: 0.5,
          },
        },
        {
          nom: 'Icosahedron',
          userData: {
            position: {
              x: 0,
              y: 5.5,
              z: 0,
            },
            couleurs: [
              'aaaaaa',
              '087F8C',
            ],
            decalage: 0.5,
          },
        },
        {
          nom: 'Dodecahedron',
          userData: {
            position: {
              x: 0,
              y: 3.1,
              z: 0,
            },
            couleurs: [
              'aaaaaa',
              '5AAA95',
            ],
            decalage: 0.4,
          },
        },
        {
          nom: 'Sphere',
          userData: {
            position: {
              x: 0,
              y: 1,
              z: 0,
            },
            couleurs: [
              'aaaaaa',
              '86A873',
            ],
            decalage: 0.2,
          },
        },
      ],
    },
  }),
};
</script>