import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
var ColladaLoader = require('three-collada-loader');

export default class App extends Component {
  componentDidMount() {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

    var renderer = new THREE.WebGLRenderer({ antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize( window.innerWidth, window.innerHeight );
    // trying to get shadows to work
    renderer.shadowMap.enabled=true;
    renderer.shadowMap.type = THREE.BasicShadowMap;
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild( renderer.domElement );
    // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // var material = new THREE.MeshBasicMaterial( { color: 0x393939 } );
    // var cube = new THREE.Mesh( geometry, material );
    // var mesh = new THREE.Mesh(
    //   new THREE.BoxGeometry(1,1,1),
    //   new THREE.MeshPhongMaterial({color: 0xff4444, wireframe: false})
    // );
    // scene.add(mesh);
    // scene.add( cube );
    // const model = new THREE.Mesh(geometry, material);
    var loader = new ColladaLoader();

    var light = new THREE.PointLight( 0xffffff, 1.2, 18 );
    light.position.set( -3, 6, -3 );
    light.castShadow = true;
    light.shadow.camera.near = 0.1;
    light.shadow.camera.far = 25;
    scene.add( light );

    var setAllMaterial = (node, material) => {
      node.material = material;
      if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
          setAllMaterial(node.children[i], material);
        }
      }
    }

    const SHININESS = 130
    var setTetraMaterial = (node) => {
      // node.material = material;
      setAllMaterial(node.children[0].children[0], new THREE.MeshPhongMaterial( { color: 0x59C197, shininess: SHININESS } ));
      setAllMaterial(node.children[0].children[1], new THREE.MeshPhongMaterial( { color: 0xFFD580, shininess: SHININESS } ));
      setAllMaterial(node.children[0].children[2], new THREE.MeshPhongMaterial( { color: 0x83B5DB, shininess: SHININESS } ));
      setAllMaterial(node.children[0].children[3], new THREE.MeshPhongMaterial( { color: 0xF6C0A4, shininess: SHININESS } ));
      setAllMaterial(node.children[0].children[4], new THREE.MeshPhongMaterial( { color: 0xE08073, shininess: SHININESS } ));
      setAllMaterial(node.children[0].children[5], new THREE.MeshPhongMaterial( { color: 0x59C197, shininess: SHININESS } ));
    }

    var starmodel

    loader.load("tetrahedron2.dae", function (result) {
        starmodel = result.scene;
        setTetraMaterial(starmodel);
        starmodel.position.x = 0;
        starmodel.position.y = 0;
        // model.scale.set(.1,.1,.1);
        starmodel.rotation.x = Math.PI / 2;
        scene.add(starmodel);

        starmodel.castShadow = true;
        starmodel.recievesShadow = true;

        camera.position.z = 4;
        camera.position.y = 2.5;
        camera.lookAt(0, 0, 0)

        var animate = function () {
          requestAnimationFrame( animate );
          // mesh.rotation.x += 0.01;
          // mesh.rotation.y += 0.005;
          // model.rotation.x += 0.01;
          // model.rotation.y += 0.005;
          starmodel.rotation.z += 0.0008;
          
          renderer.render( scene, camera );
        };
        animate();

    });
    

  }

  render() {
    return (
      <div ref={ref => (this.mount = ref)} />
    )
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);