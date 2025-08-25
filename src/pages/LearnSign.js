import React, { useState, useEffect, useRef } from "react";
import Slider from "react-input-slider";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import xbot from "../Models/xbot/xbot.glb";
import ybot from "../Models/ybot/ybot.glb";
import xbotPic from "../Models/xbot/xbot.png";
import ybotPic from "../Models/ybot/ybot.png";

import * as words from "../Animations/words";
import * as alphabets from "../Animations/alphabets";
import { defaultPose } from "../Animations/defaultPose";

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import "./LearnSign.css";

function LearnSign() {
  const [bot, setBot] = useState(ybot);
  const [speed, setSpeed] = useState(0.1);
  const [pause, setPause] = useState(800);

  const componentRef = useRef({});
  const { current: ref } = componentRef;

  useEffect(() => {
    ref.flag = false;
    ref.pending = false;
    ref.animations = [];
    ref.characters = [];

    ref.scene = new THREE.Scene();
    ref.scene.background = new THREE.Color(0xf8fafc);

    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(0, 5, 5);
    ref.scene.add(spotLight);

    ref.camera = new THREE.PerspectiveCamera(
      30,
      (window.innerWidth * 0.57) / (window.innerHeight - 70),
      0.1,
      1000
    );

    ref.renderer = new THREE.WebGLRenderer({ antialias: true });
    ref.renderer.setSize(window.innerWidth * 0.57, window.innerHeight - 70);
    document.getElementById("canvas").innerHTML = "";
    document.getElementById("canvas").appendChild(ref.renderer.domElement);

    ref.camera.position.z = 1.6;
    ref.camera.position.y = 1.4;

    const loader = new GLTFLoader();
    loader.load(bot, (gltf) => {
      gltf.scene.traverse((child) => {
        if (child.type === "SkinnedMesh") {
          child.frustumCulled = false;
        }
      });
      ref.avatar = gltf.scene;
      ref.scene.add(ref.avatar);
      defaultPose(ref);
    });
  }, [ref, bot]);

  ref.animate = () => {
    if (ref.animations.length === 0) {
      ref.pending = false;
      return;
    }
    requestAnimationFrame(ref.animate);
    if (ref.animations[0].length) {
      if (!ref.flag) {
        for (let i = 0; i < ref.animations[0].length; ) {
          let [boneName, action, axis, limit, sign] = ref.animations[0][i];
          if (
            sign === "+" &&
            ref.avatar.getObjectByName(boneName)[action][axis] < limit
          ) {
            ref.avatar.getObjectByName(boneName)[action][axis] += speed;
            ref.avatar.getObjectByName(boneName)[action][axis] = Math.min(
              ref.avatar.getObjectByName(boneName)[action][axis],
              limit
            );
            i++;
          } else if (
            sign === "-" &&
            ref.avatar.getObjectByName(boneName)[action][axis] > limit
          ) {
            ref.avatar.getObjectByName(boneName)[action][axis] -= speed;
            ref.avatar.getObjectByName(boneName)[action][axis] = Math.max(
              ref.avatar.getObjectByName(boneName)[action][axis],
              limit
            );
            i++;
          } else {
            ref.animations[0].splice(i, 1);
          }
        }
      }
    } else {
      ref.flag = true;
      setTimeout(() => {
        ref.flag = false;
      }, pause);
      ref.animations.shift();
    }
    ref.renderer.render(ref.scene, ref.camera);
  };

  let alphaButtons = [];
  for (let i = 0; i < 26; i++) {
    alphaButtons.push(
      <div className="p-0" key={i}>
        <button
          className="signs rounded fw-semibold"
          onClick={() => {
            if (ref.animations.length === 0) {
              alphabets[String.fromCharCode(i + 65)](ref);
            }
          }}
          title={String.fromCharCode(i + 65)}
        >
          {String.fromCharCode(i + 65)}
        </button>
      </div>
    );
  }

  let wordButtons = [];
  for (let i = 0; i < words.wordList.length; i++) {
    wordButtons.push(
      <div className="col-md-4 p-1" key={i}>
        <button
          className="signs w-100 rounded-pill fw-semibold"
          onClick={() => {
            if (ref.animations.length === 0) {
              words[words.wordList[i]](ref);
            }
          }}
        >
          {words.wordList[i]}
        </button>
      </div>
    );
  }

  return (
    <div className="container-fluid learn-sign p-4">
      <div className="row g-4">
        {/* Left Panel */}
        <div className="col-md-3">
          <div className="card alphabet-card shadow-lg rounded-4 mb-4">
            <h2 className="heading text-center">Alphabets</h2>
            <div className="row">{alphaButtons}</div>
          </div>
          {/* Removed words block from here */}
        </div>
        {/* Canvas */}
        <div className="col-md-7 d-flex justify-content-center align-items-center">
          <div id="canvas" className="canvas-box"></div>
        </div>
        {/* Right Panel */}
        <div className="col-md-2 d-flex flex-column align-items-center">
          <div className="card shadow-lg p-4 rounded-4 mb-3 w-100">
            <p className="bot-label">Select Avatar</p>
            <div
              className="avatar-container"
              tabIndex={0}
              onClick={() => setBot(xbot)}
              aria-label="Select avatar XBOT"
            >
              <img src={xbotPic} alt="Avatar 1: XBOT" className="bot-image" />
            </div>
            <div
              className="avatar-container"
              tabIndex={0}
              onClick={() => setBot(ybot)}
              aria-label="Select avatar YBOT"
            >
              <img src={ybotPic} alt="Avatar 2: YBOT" className="bot-image" />
            </div>
          </div>

          <div className="card words-card shadow-lg p-3 rounded-4 w-100 mt-auto">
            <h2 className="heading text-center mb-3">Words</h2>
            <div className="row">{wordButtons}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnSign;