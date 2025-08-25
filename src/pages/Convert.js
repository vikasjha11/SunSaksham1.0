import './convert.css'
import React, { useState, useEffect, useRef } from "react";
import Slider from 'react-input-slider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

import xbot from '../Models/xbot/xbot.glb';
import ybot from '../Models/ybot/ybot.glb';
import xbotPic from '../Models/xbot/xbot.png';
import ybotPic from '../Models/ybot/ybot.png';

import * as words from '../Animations/words';
import * as alphabets from '../Animations/alphabets';
import { defaultPose } from '../Animations/defaultPose';

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Convert() {
  const [text, setText] = useState("");
  const [bot, setBot] = useState(ybot);
  const [speed, setSpeed] = useState(0.1);
  const [pause, setPause] = useState(800);

  const componentRef = useRef({});
  const { current: ref } = componentRef;

  const textFromAudio = useRef();
  const textFromInput = useRef();

  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  // Initialize Three.js scene
  useEffect(() => {
    ref.flag = false;
    ref.pending = false;
    ref.animations = [];
    ref.characters = [];

    // Scene
    ref.scene = new THREE.Scene();
    ref.scene.background = new THREE.Color(0xdddddd);

    // Light
    const spotLight = new THREE.SpotLight(0xffffff, 2);
    spotLight.position.set(0, 5, 5);
    ref.scene.add(spotLight);

    // Renderer
    ref.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    ref.renderer.setPixelRatio(window.devicePixelRatio);
    ref.renderer.setSize(ref.container.clientWidth, ref.container.clientHeight);

    // Camera
    ref.camera = new THREE.PerspectiveCamera(
      30,
      ref.container.clientWidth / ref.container.clientHeight,
      0.1,
      1000
    );
    ref.camera.position.z = 1.6;
    ref.camera.position.y = 1.4;

    // Attach renderer to container
    ref.container.innerHTML = "";
    ref.container.appendChild(ref.renderer.domElement);

    // Make canvas ignore pointer events so UI is clickable
    ref.renderer.domElement.style.pointerEvents = "none";

    // Load bot
    const loader = new GLTFLoader();
    loader.load(
      bot,
      (gltf) => {
        gltf.scene.traverse((child) => {
          if (child.type === 'SkinnedMesh') child.frustumCulled = false;
        });
        ref.avatar = gltf.scene;
        ref.scene.add(ref.avatar);
        defaultPose(ref);

        // Start animation loop
        ref.animate();
      },
      (xhr) => console.log(xhr)
    );

    // Handle window resize
    const handleResize = () => {
      ref.camera.aspect = ref.container.clientWidth / ref.container.clientHeight;
      ref.camera.updateProjectionMatrix();
      ref.renderer.setSize(ref.container.clientWidth, ref.container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [bot, ref]);

  // Animation loop
  ref.animate = () => {
    if (ref.animations.length === 0) {
      ref.pending = false;
      return;
    }
    requestAnimationFrame(ref.animate);

    if (ref.animations[0].length) {
      if (!ref.flag) {
        if (ref.animations[0][0] === 'add-text') {
          setText(text + ref.animations[0][1]);
          ref.animations.shift();
        } else {
          for (let i = 0; i < ref.animations[0].length;) {
            let [boneName, action, axis, limit, sign] = ref.animations[0][i];
            if (sign === "+" && ref.avatar.getObjectByName(boneName)[action][axis] < limit) {
              ref.avatar.getObjectByName(boneName)[action][axis] += speed;
              ref.avatar.getObjectByName(boneName)[action][axis] = Math.min(ref.avatar.getObjectByName(boneName)[action][axis], limit);
              i++;
            } else if (sign === "-" && ref.avatar.getObjectByName(boneName)[action][axis] > limit) {
              ref.avatar.getObjectByName(boneName)[action][axis] -= speed;
              ref.avatar.getObjectByName(boneName)[action][axis] = Math.max(ref.avatar.getObjectByName(boneName)[action][axis], limit);
              i++;
            } else {
              ref.animations[0].splice(i, 1);
            }
          }
        }
      }
    } else {
      ref.flag = true;
      setTimeout(() => { ref.flag = false }, pause);
      ref.animations.shift();
    }

    ref.renderer.render(ref.scene, ref.camera);
  };

  // Process text to animations
  const sign = (inputRef) => {
    const str = inputRef.current.value.toUpperCase();
    const strWords = str.split(' ');
    setText('');

    for (let word of strWords) {
      if (words[word]) {
        ref.animations.push(['add-text', word + ' ']);
        words[word](ref);
      } else {
        for (const [index, ch] of word.split('').entries()) {
          if (index === word.length - 1) ref.animations.push(['add-text', ch + ' ']);
          else ref.animations.push(['add-text', ch]);
          alphabets[ch](ref);
        }
      }
    }
  };

  const startListening = () => SpeechRecognition.startListening({ continuous: true });
  const stopListening = () => SpeechRecognition.stopListening();

  return (
    <div className='container-fluid'>
      <div className='row'>
        {/* Left Panel */}
        <div className='col-12 col-md-3 mb-3'>
          <label className='label-style'>Processed Text</label>
          <textarea rows={3} value={text} className='w-100 input-style' readOnly />

          <label className='label-style'>Speech Recognition: {listening ? 'on' : 'off'}</label>
          <div className='d-flex justify-content-between mb-2'>
            <button className="btn btn-primary btn-style" onClick={startListening}>
              Mic On <i className="fa fa-microphone"/>
            </button>
            <button className="btn btn-primary btn-style" onClick={stopListening}>
              Mic Off <i className="fa fa-microphone-slash"/>
            </button>
            <button className="btn btn-primary btn-style" onClick={resetTranscript}>
              Clear
            </button>
          </div>
          <textarea rows={3} ref={textFromAudio} value={transcript} placeholder='Speech input ...' className='w-100 input-style' />
          <button onClick={() => sign(textFromAudio)} className='btn btn-primary w-100 btn-style btn-start mb-2'>
            Start Animations
          </button>

          <label className='label-style'>Text Input</label>
          <textarea rows={3} ref={textFromInput} placeholder='Text input ...' className='w-100 input-style' />
          <button onClick={() => sign(textFromInput)} className='btn btn-primary w-100 btn-style btn-start'>
            Start Animations
          </button>
        </div>

        {/* Canvas */}
        <div className='col-12 col-md-7 mb-3'>
          <div id='canvas' ref={(el) => ref.container = el} style={{ width: '100%', height: '60vh', position: 'relative' }} />
        </div>

        {/* Right Panel */}
        <div className='col-12 col-md-2 mb-3'>
          <p className='bot-label'>Select Avatar</p>
          <img src={xbotPic} className='bot-image mb-2' onClick={() => setBot(xbot)} alt='Avatar 1: XBOT'/>
          <img src={ybotPic} className='bot-image mb-2' onClick={() => setBot(ybot)} alt='Avatar 2: YBOT'/>

          <p className='label-style'>Animation Speed: {Math.round(speed * 100) / 100}</p>
          <Slider axis="x" xmin={0.05} xmax={0.50} xstep={0.01} x={speed} onChange={({ x }) => setSpeed(x)} className='w-100 mb-3' />

          <p className='label-style'>Pause time: {pause} ms</p>
          <Slider axis="x" xmin={0} xmax={2000} xstep={100} x={pause} onChange={({ x }) => setPause(x)} className='w-100' />
        </div>
      </div>
    </div>
  );
}

export default Convert;
