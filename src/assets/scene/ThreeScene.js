import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import holywoodImg from "../img/holywood.jpg";
global.THREE = require("three");
const THREE = global.THREE;
const createGeometry = require('three-bmfont-text')
const loadFont = require('load-bmfont')

// Font assets
// const fontFile = require("../fonts/Lato-Black.fnt");
// const fontAtlas = require("../fonts/Lato-Black.png");


const vertexShaderRaw = require("raw-loader!glslify-loader!./glsl/vertex.glsl");
const fragmentShaderRaw = require("raw-loader!glslify-loader!./glsl/fragment.glsl");
const vertexShader = vertexShaderRaw.default;
const fragmentShader = fragmentShaderRaw.default;
const MSDFShader = require('three-bmfont-text/shaders/msdf');
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
        this.points = null;
        this.mouse = new THREE.Vector2();
        this.prevMouse = new THREE.Vector2();
        this.middleScreenW = window.innerWidth / 2;
        this.middleScreenH = window.innerHeight / 2;

        this.render = this.render.bind(this);
        this.init = this.init.bind(this);
        this.resizeCanvas = this.resizeCanvas.bind(this);
        this.createMesh = this.createMesh.bind(this);
        this.createFont = this.createFont.bind(this);
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
        {
            const color = 0xFFFFFF;  // white
            const near = 1;
            const far = 2;
            this.scene.fog = new THREE.Fog(color, near, far);
        }
        this.camera = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.camera.position.set(0, 0, 1);
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);

        gsap.ticker.add(this.render);
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
    createMesh(posX) {
        const geometry = new THREE.PlaneGeometry(0.7, 0.5, 32, 32);
        const textureLoader = new THREE.TextureLoader();
        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                uTime: { value: 0.0 },
                progress: { value: 0 },
                uRes: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                PR: { value: window.devicePixelRatio.toFixed(1) },
                uTexture: { value: null },
                uMouse: { value: this.mouse },
                speed: { value: this.targetSpeed },
            },
        });

        textureLoader.load(
            holywoodImg,
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
    }

    createFont(x, y, z, text) {
        loadFont('fonts/Lato-Black.fnt', (err, font) => {

            const geometry = createGeometry({
                font: font,
                text: text,
                align: 'center'
            })

            const textureLoader = new THREE.TextureLoader();
            textureLoader.load('fonts/Lato-Black.png', (texture) => {
                const material = new THREE.RawShaderMaterial(
                    MSDFShader({
                        map: texture,
                        color: 0x000000,
                        side: THREE.DoubleSide,
                        transparent: true,
                        negate: false
                    })
                );

                const mesh = new THREE.Mesh(geometry, material)
                mesh.position.set(x, y, z);
                mesh.rotation.set(Math.PI, 0, 0);
                mesh.scale.y = 0;
                this.scene.add(mesh)
            })
        })
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
        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(this.mouse, this.camera);

        var intersects = raycaster.intersectObjects(this.scene.children);
        for (var i = 0; i < intersects.length; i++) {
            gsap.to(intersects[0].object.material.uniforms.progress, {
                value: 1,
                duration: 1,
                ease: "power4.inOut",
            });
            gsap.to(this.camera.position, {
                x: -3,
                duration: 1,
                delay: .3,
                ease: "power4.inOut",
            });
        }
    }
}

export default new ThreeScene();
