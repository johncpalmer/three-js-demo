import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
var ColladaLoader = require('three-collada-loader');

export default class App extends Component {
  componentDidMount() {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xffffff );
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    this.mount.appendChild( renderer.domElement );
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );
    var model = new THREE.Mesh(geometry, material);
    var loader = new ColladaLoader();

    var setMaterial = (node, material) => {
      node.material = material;
      if (node.children) {
        for (var i = 0; i < node.children.length; i++) {
          setMaterial(node.children[i], material);
        }
      }
    }

    loader.load("tetrahedron.dae", function (result) {
        model = result.scene;
        setMaterial(model, new THREE.MeshBasicMaterial({color: 0xacacac}));
        model.position.x = 0;
        model.position.y = 0;
        model.scale.set(.1,.1,.1);
        model.rotation.x = Math.PI / 2;
        scene.add(model);
    });
    camera.position.z = 5;

    var animate = function () {
      requestAnimationFrame( animate );
      model.rotation.x += 0.01;
      model.rotation.y += 0.005;

      renderer.render( scene, camera );
    };
    animate();
  }

  render() {
    return (
      <div ref={ref => (this.mount = ref)} />
    )
  }
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);