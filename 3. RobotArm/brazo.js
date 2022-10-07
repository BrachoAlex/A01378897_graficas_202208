"use strict";
import * as THREE from "../libs/three.js/three.module.js"
import { BaseScene } from "../common/baseScene.js"
import { GUI } from "../libs/three.js/libs/dat.gui.module.js"
let renderer = null,
    scene = null,
    camera = null,
    hombro = null,
    brazo = null,
    codo = null,
    antebrazo = null,
    muneca = null,
    mano = null,
    hombroGroup = null,
    brazoGroup = null,
    codoGroup = null,
    antebrazoGroup = null,
    munecaGroup = null,
    manoGroup = null;
let settings = null;

function main() {
    const canvas = document.getElementById("webglcanvas");
    scene_setup(canvas);
    crear_brazo(canvas);
    createPanel();
    update();
}

function createPanel() {
    const panel = new GUI({ width: 300 });
    settings = {
        'hombro X': 0,
        'hombro Z': 0,
        'codo X': 0,
        'antebrazo Y': 0,
        'muneca X': 0,
        'mano X': 0,
        'mano Z': 0
    }
    panel.add(settings, 'hombro X', -1.5, 1.5, 0.001).onChange((delta) => {
        hombroGroup.rotation.x = delta;
    })
    panel.add(settings, 'hombro Z', -1.5, 1.5, 0.001).onChange((delta) => {
        hombroGroup.rotation.z = delta;
    })
    panel.add(settings, 'codo X', -1, 0, 0.001).onChange((delta) => {
        codoGroup.rotation.x = delta;
    })
    panel.add(settings, 'antebrazo Y', -.5, .5, 0.001).onChange((delta) => {
        antebrazoGroup.rotation.y = delta;
    })
    panel.add(settings, 'muneca X', -0.40, 0.40, 0.001).onChange((delta) => {
        munecaGroup.rotation.x = delta;
    })
    panel.add(settings, 'mano X', -.35, .35, 0.001).onChange((delta) => {
        manoGroup.rotation.x = delta;
    })
    panel.add(settings, 'mano Z', -.25, .25, 0.001).onChange((delta) => {
        manoGroup.rotation.z = delta;
    })
}
function animate() {
}
function update() {
    requestAnimationFrame(() => update());
    renderer.render(scene, camera);
    animate();
}

function scene_setup(canvas) {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(canvas.width, canvas.height);

    scene = new THREE.Scene();
    scene.background = new THREE.Color("black");
    camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 40);
    scene.add(camera);
    const light = new THREE.DirectionalLight("white", 1.0);
    light.position.set(-.5, .2, 1);
    light.target.position.set(0, -2, 0);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight("orange", 0.2);
    scene.add(ambientLight);
}

function crear_brazo(canvas) {
    const geometry = new THREE.BoxGeometry(.5, .5, .5);
    const geometry2 = new THREE.BoxGeometry(1, 2, 1);
    const geometry3 = new THREE.BoxGeometry(.8, .5, .5);

    const colors = [];
    for (let i = 0; i < 6; i++) {
        const red = Math.random();
        const green = Math.random();
        const blue = Math.random();

        for (let j = 0; j < 4; j++) {
            colors.push(red, green, blue);
        }
    }

    const colorsAttr = new THREE.Float32BufferAttribute(colors, 3);

    geometry.setAttribute('color', colorsAttr);
    geometry2.setAttribute('color', colorsAttr);
    geometry3.setAttribute('color', colorsAttr);

    const material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors });

    hombro = new THREE.Mesh(geometry, material);
    brazo = new THREE.Mesh(geometry2, material);
    codo = new THREE.Mesh(geometry, material);
    antebrazo = new THREE.Mesh(geometry2, material);
    muneca = new THREE.Mesh(geometry, material);
    mano = new THREE.Mesh(geometry3, material);

    hombroGroup = new THREE.Object3D;
    brazoGroup = new THREE.Object3D;
    codoGroup = new THREE.Object3D;
    antebrazoGroup = new THREE.Object3D;
    munecaGroup = new THREE.Object3D;
    manoGroup = new THREE.Object3D;

    // hombro
    hombroGroup.add(hombro);
    hombroGroup.add(brazoGroup);
    hombroGroup.position.set(0, 2.8, -8);
    // brazo
    brazoGroup.add(brazo);
    brazoGroup.add(codoGroup);
    brazoGroup.position.set(0, -1.25, 0);
    // codo
    codoGroup.add(codo);
    codoGroup.add(antebrazoGroup);
    codoGroup.position.set(0, -1.2, 0)
    //antebrazo
    antebrazoGroup.add(antebrazo);
    antebrazoGroup.add(munecaGroup);
    antebrazoGroup.position.set(0, -1.2, 0);
    //muñeca
    munecaGroup.add(muneca);
    munecaGroup.add(manoGroup);
    munecaGroup.position.set(0, -1.3, 0);
    //mano
    manoGroup.add(mano);
    manoGroup.position.set(0, -.5, 0);

    // Añadimos el grupo de hombro a la escena
    scene.add(hombroGroup);
}

main();