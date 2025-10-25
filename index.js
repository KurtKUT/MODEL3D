import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'


//Сцена
const scene = new THREE.Scene()

//Свет
const ambientLight = new THREE.AmbientLight('white', 1.5)
scene.add(ambientLight)

const dirLight = new THREE.DirectionalLight('white', 2)
dirLight.position.set(5, 5, 5)
scene.add(dirLight)

// const pointLight = new THREE.PointLight('white', 10, 100)
// pointLight.position.set(0.5, 1, 1)
// scene.add(pointLight)

//Камера
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight, 
    0.1,
    100
)

camera.position.z = 5

//Рендер
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

//Вращение/отдаление камеры
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true;
controls.enableFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 2;
controls.maxDistance = 10;

//Создание геометрии
// const geometry =  new THREE.BoxGeometry()

// const material = new THREE.MeshStandardMaterial({ color: 'purple'})

// const cube = new THREE.Mesh(geometry, material)
// cube.position.set(0,0,0)
// scene.add(cube)

// const raycaster = new THREE.Raycaster()
// const mouse = new THREE.Vector2()

// Подгрузка 3D

const loader = new GLTFLoader()

loader.load(
    'models/Lego/TEst.gltf',
    (gltf) => {
        const model = gltf.scene
        model.scale.set(1, 1, 1)
        model.position.set(0, 0, 0)
        scene.add(model)
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + "% loaded")
    },
    (error) => {
        console.error('Error:' + error)
    }
)

//Функция для постоянного рендера и анимации
function animate() {
    requestAnimationFrame(animate)

    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
    
    controls.update()
    renderer.render(scene, camera)
}

animate()