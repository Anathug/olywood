import * as THREE from "three";
import gsap from "gsap";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import holywoodImg from "../img/holywood.jpg";

const vertexShaderRaw = require("raw-loader!glslify-loader!./glsl/vertex.glsl");
const fragmentShaderRaw = require("raw-loader!glslify-loader!./glsl/fragment.glsl");
const vertexShader = vertexShaderRaw.default;
const fragmentShader = fragmentShaderRaw.default;
class ThreeScene {
    constructor() {
        // BASIC SCENE
        this.camera = null;
        this.scene = null;
        this.renderer = null;
        this.clock = null;
        this.speed = null;
        this.targetSpeed = null;
        this.meshes = [];
        this.mouse = new THREE.Vector2();
        this.prevMouse = new THREE.Vector2();
        this.middleScreenW = window.innerWidth / 2;
        this.middleScreenH = window.innerHeight / 2;

        this.render = this.render.bind(this);
        this.init = this.init.bind(this);
        this.resizeCanvas = this.resizeCanvas.bind(this);
        this.createMesh = this.createMesh.bind(this);
        this.slideCameraRight = this.slideCameraRight.bind(this);

        this.init();
        this.render();
    }
    init() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.debug.checkShaderErrors = true;
        document.body.appendChild(this.renderer.domElement);
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            100
        );

        this.camera.position.set(0, 0, 1);
        gsap.ticker.add(this.render);
        window.addEventListener("resize", this.resizeCanvas);
        window.addEventListener("mousemove", (e) => {
            this.onMouseMove(e);
        });
        window.addEventListener("click", () => {
            this.isMouseOver();
        });
    }

    onMouseMove(e) {
        gsap.to(this.mouse, 0.5, {
            x: e.clientX / window.innerWidth,
            y: 1 - e.clientY / window.innerHeight,
        });
    }

    getSpeed() {
        this.speed = Math.sqrt(
            (this.prevMouse.x - this.mouse.x) ** 2 +
            (this.prevMouse.y - this.mouse.y) ** 2
        );
        this.prevMouse.x = this.mouse.x;
        this.prevMouse.y = this.mouse.y;
        this.targetSpeed += 0.1 * (this.speed - this.targetSpeed);
    }
    createMesh(posX) {
        const geometry = new THREE.PlaneGeometry(0.7, 0.5, 32, 32);
        const manager = new THREE.LoadingManager();
        const textureLoader = new THREE.TextureLoader(manager);
        const texture = textureLoader.load(holywoodImg);

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0.0 },
                progress: { value: 0 },
                uTexture: { value: texture },
                resolution: { value: new THREE.Vector4() },
                uMouse: { value: this.mouse },
                speed: { value: this.targetSpeed },
            },
        });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = posX;
        this.meshes.push(mesh);
        this.scene.add(mesh);
        console.log(this.meshes)
    }
    render() {
        this.meshes.forEach((mesh) => {
            mesh.material.uniforms.speed.value = this.targetSpeed
            mesh.material.uniforms.uTime.value += 0.01;
        })
        this.getSpeed();
        this.renderer.clear();
        this.renderer.render(this.scene, this.camera);
    }

    resizeCanvas() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
    }
    slideCameraRight(options = {}) {
        gsap.to(this.camera.position, {
            x: 3,
            duration: 2,
            ease: "power4.inOut",
            ...options
        });
    }
    slideCameraLeft(options = {}) {
        gsap.to(this.camera.position, {
            x: 0,
            duration: 2,
            ease: "power4.inOut",
            ...options
        });
    }
    isMouseOver() {
        const mouse = new THREE.Vector2();
        mouse.x = this.mouse.x * 2 - 1;
        mouse.y = this.mouse.y * 2 - 1;
        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, this.camera);

        var intersects = raycaster.intersectObjects(this.scene.children);
        for (var i = 0; i < intersects.length; i++) {
            gsap.to(this.material.uniforms.progress, {
                value: 1,
                duration: 1,
                ease: "power4.inOut",
            });
        }
    }
}

export default new ThreeScene();
