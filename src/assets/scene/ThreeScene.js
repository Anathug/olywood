import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from 'three'

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
        this.imgLoaded = false;
        this.particles = null;
        this.particle = null;
        this.olywood = false;
        this.points = null;
        this.mouse = new THREE.Vector2();
        this.prevMouse = new THREE.Vector2();
        this.middleScreenW = window.innerWidth / 2;
        this.middleScreenH = window.innerHeight / 2;

        this.render = this.render.bind(this);
        this.init = this.init.bind(this);
        this.resizeCanvas = this.resizeCanvas.bind(this);
        this.createMesh = this.createMesh.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this)
        this.createParticles = this.createParticles.bind(this);
        this.onMouseScroll = this.onMouseScroll.bind(this);
        this.slideCameraRight = this.slideCameraRight.bind(this);

        this.init();
        this.render();
    }
    init() {
        this.renderer = new THREE.WebGL1Renderer({
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
            10000
        );

        this.camera.position.set(0, 0, 1);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        window.addEventListener("resize", this.resizeCanvas);
        window.addEventListener("mousemove", (e) => {
            this.onMouseMove(e);
        });
        window.addEventListener("click", () => {
            this.isMouseOver();
        });
    }

    onMouseScroll(e) {
        gsap.to(this.camera.position, 0.5, {
            z: "+=" + e.deltaY
        });
    }

    createParticles() {

        const particleCount = 2000;
        this.particles = new THREE.Geometry();
        this.material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 3,
            transparent: true,
            blending: THREE.AdditiveBlending
        });

        for (var i = 0; i < particleCount; i++) {
            var px = Math.random() * 2000 - 1000;
            var py = Math.random() * 2000 - 1000;
            var pz = Math.random() * 4000 - 3000;
            this.particle = new THREE.Vector3(px, py, pz);
            this.particle.velocity = new THREE.Vector3(0, Math.random(), 0);
            this.particles.vertices.push(this.particle);
            this.points = new THREE.Points(this.particles, this.material);
            this.points.sortParticles = true;
            this.scene.add(this.points);
        }
    }

    onMouseMove(e) {
        gsap.to(this.mouse, 0.5, {
            // x: e.clientX / window.innerWidth,
            // y: 1 - e.clientY / window.innerHeight,
            x: (e.clientX / window.innerWidth) * 2 - 1,
            y: -(e.clientY / window.innerHeight) * 2 + 1,
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
    createMesh(posX, img) {
        const geometry = new THREE.PlaneGeometry(0.7, 0.5, 32, 32);
        const textureLoader = new THREE.TextureLoader();
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0.0 },
                progress: { value: 0 },
                progress2: { value: 0 },
                uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                PR: { value: window.devicePixelRatio || 1 },
                uTexture: { value: null },
                uMouse: { value: this.mouse },
                speed: { value: this.targetSpeed },
            },
        });

        textureLoader.load(
            img,
            (texture) => {
                this.imgLoaded = true
                material.uniforms.uTexture.value = texture
            },
            undefined,
            (err) => {
                console.error('An error happened.');
            }
        );


        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = posX;
        this.meshes.push(mesh);
        this.scene.add(mesh);

        return mesh
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
        // var raycaster = new THREE.Raycaster();
        // raycaster.setFromCamera(this.mouse, this.camera);

        // var intersects = raycaster.intersectObjects(this.scene.children);
        // for (var i = 0; i < intersects.length; i++) {
        //     console.log('test')
        //     gsap.to(intersects[0].object.material.uniforms.progress, {
        //         value: 1,
        //         duration: 1,
        //         ease: "power4.inOut",
        //     });
        //     gsap.to(this.camera.position, {
        //         x: -3,
        //         duration: 1,
        //         delay: .3,
        //         ease: "power4.inOut",
        //     });
        // }
    }
}

export default new ThreeScene();
