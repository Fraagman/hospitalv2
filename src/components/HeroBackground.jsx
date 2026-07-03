import { useEffect, useRef } from 'react';
import * as THREE from 'three/webgpu';
import {
  pass,
  vec2,
  vec3,
  float,
  sub,
  mul,
  add,
  min,
  mix,
  dot,
  sin,
  cos,
  uv,
  texture,
  Fn,
  fract,
  floor,
  clamp,
  screenUV,
  time,
  pow,
  positionLocal,
  normalView,
  positionViewDirection,
  smoothstep,
} from 'three/tsl';
import { MeshBasicNodeMaterial, MeshStandardNodeMaterial } from 'three/webgpu';
import { mx_noise_float } from 'three/tsl';
import { bloom } from 'three/addons/tsl/display/BloomNode.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { easing } from 'maath';

// ─── FBM noise (ported from code/three-skull-main/src/utils/fbm.js) ──────────

const rand = Fn(([n]) => {
  const dp = dot(n, vec2(12.9898, 4.1414));
  return fract(mul(sin(dp), 43758.5453));
});

const noise = Fn(([p]) => {
  const ip = floor(p);
  const u = fract(p);
  const uu = mul(mul(u, u), sub(float(3.0), mul(u, 2.0)));
  const res = mix(
    mix(rand(ip), rand(add(ip, vec2(1.0, 0.0))), uu.x),
    mix(rand(add(ip, vec2(0.0, 1.0))), rand(add(ip, vec2(1.0, 1.0))), uu.x),
    uu.y,
  );
  return mul(res, res);
});

const fbm = Fn(([x, numOctaves]) => {
  const v = float(0.0).toVar();
  const a = float(0.5).toVar();
  const shift = vec2(100);
  const angle = float(0.5);
  const c = cos(angle);
  const s = sin(angle);
  const xx = x.toVar();

  v.assign(add(v, mul(a, noise(xx))));
  xx.assign(add(mul(vec2(sub(mul(xx.x, c), mul(xx.y, s)), add(mul(xx.x, s), mul(xx.y, c))), 2.0), shift));
  a.assign(mul(a, 0.5));

  v.assign(add(v, mul(a, noise(xx))));
  xx.assign(add(mul(vec2(sub(mul(xx.x, c), mul(xx.y, s)), add(mul(xx.x, s), mul(xx.y, c))), 2.0), shift));
  a.assign(mul(a, 0.5));

  v.assign(add(v, mul(a, noise(xx))));
  xx.assign(add(mul(vec2(sub(mul(xx.x, c), mul(xx.y, s)), add(mul(xx.x, s), mul(xx.y, c))), 2.0), shift));
  a.assign(mul(a, 0.5));

  v.assign(add(v, mul(a, noise(xx))));
  return v;
});

// ─── Fresnel material (ported from code/three-skull-main/src/materials) ──────

function createFresnelMaterial({
  heightMax = 1.0,
  roughness: matRoughness = 1.0,
  color = vec3(0.2, 0.6, 1.0),
  emissiveIntensity = 0.75,
}) {
  const material = new MeshStandardNodeMaterial({
    metalness: 0,
    roughness: matRoughness,
  });

  const fresnel = pow(
    sub(float(1.0), normalView.dot(positionViewDirection.negate())),
    float(1.0),
  );

  const coreColor = vec3(0.0, 0.05, 0.1);
  const fresnelColor = mix(coreColor, color, fresnel);
  const heightFade = smoothstep(0.5, heightMax, positionLocal.y);
  const finalColor = fresnelColor.mul(heightFade);

  material.colorNode = finalColor;
  material.emissiveNode = finalColor.mul(emissiveIntensity);
  return material;
}

// ─── GLTF loader setup ──────────────────────────────────────────────────────

const gltfLoader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
gltfLoader.setDRACOLoader(dracoLoader);

function loadGltf(url) {
  return new Promise((resolve, reject) => {
    gltfLoader.load(url, (gltf) => resolve(gltf.scene), undefined, reject);
  });
}

// ─── MouseTrail (ported from code/three-skull-main/src/utils/MouseTrail.js) ──

class MouseTrail {
  constructor(width, height) {
    this.currentX = null;
    this.currentY = null;
    this.lastX = null;
    this.lastY = null;
    this.opacity = 0;
    this.lerpSpeed = 0.075;
    this.fadeInSpeed = 0.1;
    this.fadeOutSpeed = 0.1;
    this.moveThreshold = 0.5;

    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');
    this.lineWidth = Math.max(width * 0.2, 100);
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(0, 0, width, height);

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.generateMipmaps = false;
  }

  update(mouseX, mouseY) {
    const targetX = mouseX * this.canvas.width;
    const targetY = (1 - mouseY) * this.canvas.height;

    if (this.currentX === null) {
      this.currentX = targetX;
      this.currentY = targetY;
      this.lastX = targetX;
      this.lastY = targetY;
      return;
    }

    this.currentX += (targetX - this.currentX) * this.lerpSpeed;
    this.currentY += (targetY - this.currentY) * this.lerpSpeed;

    const dx = this.currentX - this.lastX;
    const dy = this.currentY - this.lastY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > this.moveThreshold) {
      this.opacity = Math.min(1, this.opacity + this.fadeInSpeed);
    } else {
      this.opacity = Math.max(0, this.opacity - this.fadeOutSpeed);
    }

    const { canvas, ctx, lineWidth } = this;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (this.opacity > 0.01) {
      ctx.beginPath();
      ctx.moveTo(this.lastX, this.lastY);
      ctx.lineTo(this.currentX, this.currentY);
      ctx.lineCap = 'round';
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = `rgba(0, 0, 0, ${this.opacity})`;
      ctx.stroke();
    }

    this.lastX = this.currentX;
    this.lastY = this.currentY;
    this.texture.needsUpdate = true;
  }

  dispose() {
    this.texture.dispose();
  }
}

// ─── CameraRig (ported from code/three-skull-main/src/utils/CameraRig.js) ────

class CameraRig {
  constructor(camera, containerEl) {
    this.camera = camera;
    this.containerEl = containerEl;

    this.basePos = new THREE.Vector3(1.5, 1.5, 0.55);
    this.lookAt = new THREE.Vector3(-0.52, 0.45, -0.45);
    this.camera.position.copy(this.basePos);
    this.camera.lookAt(this.lookAt);

    this.mouseNormalized = { x: 0.5, y: 0.5 };
    this.pointer = { x: 0, y: 0 };
    this.smoothTime = 0.25;
    this.touchTime = 0;

    this.isTouch =
      window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    this.isMobile = window.innerWidth < 768;

    this._targetPos = [0, 0, 0];

    this._onMouseMove = (e) => {
      const rect = this.containerEl.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width;
      const relY = (e.clientY - rect.top) / rect.height;
      this.mouseNormalized.x = Math.max(0, Math.min(1, relX));
      this.mouseNormalized.y = 1 - Math.max(0, Math.min(1, relY));
      this.pointer.x = relX * 2 - 1;
      this.pointer.y = -(relY * 2 - 1);
    };

    if (!this.isTouch) {
      window.addEventListener('mousemove', this._onMouseMove);
    }
  }

  update(delta, elapsed) {
    let pointerX, pointerY;

    if (this.isTouch) {
      this.touchTime += delta * 0.5;
      pointerX = Math.sin(this.touchTime);
      pointerY = Math.sin(this.touchTime * 0.7) * 0.5;
      const trailT = elapsed * 1.3;
      const tx = Math.sin(trailT);
      const ty = Math.sin(trailT * 2.0);
      this.mouseNormalized.x = 0.5 + tx * 0.5;
      this.mouseNormalized.y = 0.5 + ty * 0.5;
    } else {
      pointerX = this.pointer.x;
      pointerY = this.pointer.y;
    }

    const zoom = this.isMobile ? 1.2 : 1;

    this._targetPos[0] =
      this.lookAt.x + (this.basePos.x - this.lookAt.x) * zoom + pointerX * 0.125;
    this._targetPos[1] =
      this.lookAt.y + (this.basePos.y - this.lookAt.y) * zoom + pointerY * 0.075;
    this._targetPos[2] =
      this.lookAt.z + (this.basePos.z - this.lookAt.z) * zoom;

    easing.damp3(this.camera.position, this._targetPos, this.smoothTime, delta);
    this.camera.lookAt(this.lookAt);
  }

  dispose() {
    window.removeEventListener('mousemove', this._onMouseMove);
  }
}

// ─── FluidSim (ported from code/three-skull-main/src/postprocessing) ─────────

class FluidSim {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    const opts = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
    };
    this.targetA = new THREE.RenderTarget(width, height, opts);
    this.targetB = new THREE.RenderTarget(width, height, opts);
    this.prevNode = texture(this.targetA.texture);
    this.maskNode = texture(this.targetA.texture);

    this.fboScene = new THREE.Scene();
    this.fboCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, -1, 1);
    this.inputNode = texture(new THREE.Texture());

    const material = new MeshBasicNodeMaterial();
    material.colorNode = this._createFluidShader();

    const geo = new THREE.PlaneGeometry(2, 2);
    const uvAttr = geo.attributes.uv;
    for (let i = 0; i < uvAttr.count; i++) {
      uvAttr.setY(i, 1.0 - uvAttr.getY(i));
    }
    this.fboQuad = new THREE.Mesh(geo, material);
    this.fboScene.add(this.fboQuad);
  }

  _createFluidShader() {
    const blendDarken = Fn(([base, blend]) => min(blend, base));

    const aspect = this.height / this.width;
    const aspectVec =
      this.width < this.height
        ? vec2(1.0, 1.0 / aspect)
        : vec2(aspect, 1.0);

    const prevNode = this.prevNode;
    const inputNode = this.inputNode;

    return Fn(() => {
      const uvCoord = uv();
      const disp = mul(mul(fbm(mul(uvCoord, 20.0), float(4)), aspectVec), 0.01);

      const texel = prevNode.sample(uvCoord);
      const texel2 = prevNode.sample(vec2(add(uvCoord.x, disp.x), uvCoord.y));
      const texel3 = prevNode.sample(vec2(sub(uvCoord.x, disp.x), uvCoord.y));
      const texel4 = prevNode.sample(vec2(uvCoord.x, add(uvCoord.y, disp.y)));
      const texel5 = prevNode.sample(vec2(uvCoord.x, sub(uvCoord.y, disp.y)));

      const floodcolor = texel.rgb.toVar();
      floodcolor.assign(blendDarken(floodcolor, texel2.rgb));
      floodcolor.assign(blendDarken(floodcolor, texel3.rgb));
      floodcolor.assign(blendDarken(floodcolor, texel4.rgb));
      floodcolor.assign(blendDarken(floodcolor, texel5.rgb));

      const flippedUV = vec2(uvCoord.x, sub(float(1.0), uvCoord.y));
      const input = inputNode.sample(flippedUV);
      const combined = blendDarken(floodcolor, input.rgb);

      return min(vec3(1.0), add(combined, vec3(0.015)));
    })();
  }

  get texture() {
    return this.maskNode;
  }

  update(renderer, trailTexture) {
    this.prevNode.value = this.targetA.texture;
    this.inputNode.value = trailTexture;

    renderer.setRenderTarget(this.targetB);
    renderer.render(this.fboScene, this.fboCamera);
    renderer.setRenderTarget(null);

    this.maskNode.value = this.targetB.texture;

    const temp = this.targetA;
    this.targetA = this.targetB;
    this.targetB = temp;
  }

  onResize(width, height) {
    this.width = width;
    this.height = height;
    this.targetA.setSize(width, height);
    this.targetB.setSize(width, height);
  }

  dispose() {
    this.targetA.dispose();
    this.targetB.dispose();
    this.fboQuad.material.dispose();
    this.fboQuad.geometry.dispose();
  }
}

// ─── PostProcessing (ported from code/three-skull-main/src/postprocessing) ────

class PostProcessingPipeline {
  constructor(renderer, solidScene, wireScene, camera, fluidMaskNode) {
    this.pipeline = new THREE.RenderPipeline(renderer);
    this.solidScene = solidScene;
    this.wireScene = wireScene;
    this.camera = camera;
    this.fluidMaskNode = fluidMaskNode;
    this._compose();
  }

  _compose() {
    const solidPass = pass(this.solidScene, this.camera);
    const solidColor = solidPass.getTextureNode('output');

    const wirePass = pass(this.wireScene, this.camera);
    const wireColor = wirePass.getTextureNode('output');

    const bloomPass = bloom(solidColor.sample(screenUV), 0.4, 0.05);

    const scanRaw = sin(mul(screenUV.y, float(1250.0)));
    const scanDarken = clamp(scanRaw, -1.0, 0.0).mul(-0.15);
    const scanLines = sub(float(1.0), scanDarken);
    const bloomWithScanLines = bloomPass.mul(scanLines);

    const fluidMask = sub(float(1.0), this.fluidMaskNode.sample(screenUV).r);
    const blended = mix(bloomWithScanLines, wireColor.sample(screenUV), fluidMask);

    const noiseVal = mx_noise_float(
      vec3(screenUV.mul(2000.0), time.mul(20.0)),
    ).mul(0.015);

    const withEffects = blended.sub(noiseVal);

    const luminance = dot(withEffects, vec3(0.299, 0.587, 0.114));
    const desaturated = mix(
      vec3(luminance, luminance, luminance),
      withEffects,
      float(0.985),
    );

    const lowContrast = mix(vec3(0.0, 0.0, 0.2), desaturated, float(0.9));
    this.pipeline.outputNode = lowContrast;
  }

  render() {
    this.pipeline.render();
  }

  dispose() {
    this.pipeline.dispose();
  }
}

// ─── Instanced model loader ─────────────────────────────────────────────────

async function createInstancedModel(scene, { url, meshName, heightMax, roughness, count = 12, spacing = 0.65 }) {
  const model = await loadGltf(url);
  let geometry = null;
  model.traverse((child) => {
    if (child.isMesh && (!meshName || child.name === meshName)) {
      if (!geometry) geometry = child.geometry;
    }
  });

  if (!geometry) {
    throw new Error(`Mesh "${meshName}" not found in ${url}`);
  }

  const material = createFresnelMaterial({ heightMax, roughness });
  const mesh = new THREE.InstancedMesh(geometry, material, count);

  const gridSize = Math.ceil(Math.sqrt(count));
  const halfSize = ((gridSize - 1) * spacing) / 2;
  const spacingZ = spacing * 0.65;
  const halfSizeZ = ((gridSize - 1) * spacingZ) / 2;
  const dummy = new THREE.Object3D();

  for (let i = 0; i < count; i++) {
    const x = i % gridSize;
    const z = Math.floor(i / gridSize);
    const xOffset = z % 2 === 1 ? spacing / 2 : 0;
    dummy.position.set(
      x * spacing - halfSize + xOffset,
      0,
      z * spacingZ - halfSizeZ,
    );
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
  }
  mesh.instanceMatrix.needsUpdate = true;
  scene.add(mesh);
}

// ─── Main init function ─────────────────────────────────────────────────────

async function initHeroBackground(container) {
  // Create canvas inside the container
  const canvas = document.createElement('canvas');
  canvas.style.position = 'absolute';
  canvas.style.left = '0';
  canvas.style.top = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '0';
  canvas.style.pointerEvents = 'auto';
  container.appendChild(canvas);

  const width = container.offsetWidth;
  const height = container.offsetHeight;
  const pr = Math.min(window.devicePixelRatio, 2.0);

  // Renderer
  const renderer = new THREE.WebGPURenderer({ canvas, antialias: false });
  await renderer.init();
  renderer.setSize(width, height);
  renderer.setPixelRatio(pr);
  renderer.shadowMap.enabled = false;
  renderer.autoClear = false;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  // Environment
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const envMap = pmremGenerator.fromScene(new RoomEnvironment()).texture;
  pmremGenerator.dispose();

  // Create scenes
  function makeScene() {
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 1, 3);
    scene.background = new THREE.Color(0x000000);
    scene.environment = envMap;
    scene.environmentIntensity = 0.1;
    const light = new THREE.PointLight(0xffffff, 0.75);
    light.position.set(1, 2, 1);
    scene.add(light);
    return scene;
  }

  const solidScene = makeScene();
  const wireScene = makeScene();

  // Camera
  const camera = new THREE.PerspectiveCamera(17, width / height, 0.1, 100);
  const cameraRig = new CameraRig(camera, container);

  // Load models
  const basePath = import.meta.env.BASE_URL || '/';
  const solidReady = createInstancedModel(solidScene, {
    url: `${basePath}man_comp-transformed.glb`,
    meshName: 'body',
    heightMax: 1.0,
    roughness: 1.0,
  });
  const wireReady = createInstancedModel(wireScene, {
    url: `${basePath}skeleton_comp-transformed.glb`,
    meshName: 'skeleton',
    heightMax: 0.9,
    roughness: 0.9,
  });

  // Mouse trail & fluid sim
  const mouseTrail = new MouseTrail(width * pr, height * pr);
  const fluidSim = new FluidSim(width * pr, height * pr);

  // Post processing
  const postProcessing = new PostProcessingPipeline(
    renderer,
    solidScene,
    wireScene,
    camera,
    fluidSim.texture,
  );

  // Wait for models to load
  await Promise.all([solidReady, wireReady]);

  // Animation loop
  const clock = new THREE.Clock();
  let animFrameId = 0;
  let disposed = false;

  function animate() {
    if (disposed) return;
    const delta = clock.getDelta();
    cameraRig.update(delta, clock.elapsedTime);
    mouseTrail.update(cameraRig.mouseNormalized.x, cameraRig.mouseNormalized.y);
    fluidSim.update(renderer, mouseTrail.texture);
    postProcessing.render();
    animFrameId = requestAnimationFrame(animate);
  }

  animate();

  // Resize handler
  function onResize() {
    if (disposed) return;
    const w = container.offsetWidth;
    const h = container.offsetHeight;
    const currentPr = Math.min(window.devicePixelRatio, 2);
    renderer.setSize(w, h);
    renderer.setPixelRatio(currentPr);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    fluidSim.onResize(w * currentPr, h * currentPr);
  }

  window.addEventListener('resize', onResize);

  // Return cleanup function
  return () => {
    disposed = true;
    cancelAnimationFrame(animFrameId);
    window.removeEventListener('resize', onResize);
    cameraRig.dispose();
    mouseTrail.dispose();
    fluidSim.dispose();
    postProcessing.dispose();
    renderer.dispose();
    if (canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  };
}

// ─── React Component ────────────────────────────────────────────────────────

export default function HeroBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cleanup = null;
    let cancelled = false;

    initHeroBackground(container)
      .then((dispose) => {
        if (cancelled) {
          dispose();
        } else {
          cleanup = dispose;
        }
      })
      .catch((err) => {
        console.warn('HeroBackground: WebGPU init failed, falling back to CSS.', err);
      });

    return () => {
      cancelled = true;
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #000511 0%, #001a33 50%, #00274d 100%)',
      }}
      aria-hidden="true"
    />
  );
}
