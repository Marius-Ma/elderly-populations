<template>
  <Navigator />
  <div class="get-involved container">
    <div class="header">
      <h1>Get Involved with SilverWell</h1>
      <p>
        Together, we can create lasting change. At SilverWell, your support helps improve the lives
        of elderly members in our community. Join hands with us to provide essential services,
        organize events, and build a compassionate, connected future.
      </p>
    </div>

    <!-- Feature Explanation Section -->
    <section class="feature-section">
      <h2>How You Can Help</h2>
      <div class="feature-list">
        <div class="feature-item">
          <h3>Find Local Charities and Donation Drives</h3>
          <p>
            Use our map-based feature to search for nearby community centers, support services, or
            charity events. Your contributions can go directly to where they're most needed.
          </p>
        </div>
        <div class="feature-item">
          <h3>Navigate and Support</h3>
          <p>
            Get directions to donation centers or charity events, making it easier than ever to get
            involved. Together, let's turn compassion into action.
          </p>
        </div>
      </div>
    </section>

    <!-- Map Section with Controls -->
    <section class="map-section">
      <h2>Explore Opportunities Near You</h2>

      <!-- Category Controls -->
      <div class="category-controls">
        <button @click="showCharityEvents" class="btn">Charity Events</button>
        <button @click="showSupportCenters" class="btn">Support Centers</button>
        <button @click="showFoodBanks" class="btn">Food Banks</button>
      </div>

      <!-- Geocoder and Directions Controls -->
      <div class="map-controls">
        <div id="geocoder" class="geocoder-container"></div>
        <div id="directions" class="directions-container"></div>
      </div>

      <!-- Map Container -->
      <div id="map" class="map-container"></div>
    </section>

    <Footer />
  </div>
</template>

<script setup>
import Navigator from '@/components/Navigator.vue'
import Footer from '@/components/Footer.vue'
import { onMounted, ref } from 'vue'
import mapboxgl from 'mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken =
  'pk.eyJ1IjoiZG9uZzAwIiwiYSI6ImNtMjF0dzJkeDAwNGEyam9iM3lyNGdiZHIifQ.aQGdSxaCM9YBwvt5HOFAWQ'

const map = ref(null)
let markers = []

// 定义不同类别的位置数据
const supportCenters = [
  { name: 'Support Center 1', coordinates: [144.9779, -37.8181] },
  { name: 'Support Center 2', coordinates: [144.9513, -37.8073] }
]

const foodBanks = [
  { name: 'Food Bank 1', coordinates: [144.985, -37.8102] },
  { name: 'Food Bank 2', coordinates: [144.96, -37.8054] }
]

const charityEvents = [
  { name: 'Charity Event 1', coordinates: [144.9631, -37.8136] },
  { name: 'Charity Event 2', coordinates: [144.9707, -37.8201] }
]

// 添加标记的函数
const addMarkers = (locations, color) => {
  locations.forEach((location) => {
    const marker = new mapboxgl.Marker({ color })
      .setLngLat(location.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setText(location.name) // 添加弹窗
      )
      .addTo(map.value)

    markers.push(marker)
  })
}

// 清除所有标记
const clearAllMarkers = () => {
  markers.forEach((marker) => marker.remove())
  markers = []
}

// 显示不同类别的标记
const showCharityEvents = () => {
  clearAllMarkers()
  addMarkers(charityEvents, 'red')
}

const showSupportCenters = () => {
  clearAllMarkers()
  addMarkers(supportCenters, 'blue')
}

const showFoodBanks = () => {
  clearAllMarkers()
  addMarkers(foodBanks, 'green')
}

onMounted(() => {
  map.value = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [144.9631, -37.8136],
    zoom: 13,
    maxBounds: [
      [144.85, -37.85], // Southwest corner
      [145.1, -37.75] // Northeast corner
    ] // 设置地图的最大边界
  })

  // 添加导航控制按钮
  map.value.addControl(
    new mapboxgl.NavigationControl({
      showZoom: true, // 确保显示缩放按钮
      showCompass: true // 显示指南针
    })
  )

  // 添加搜索控制
  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    placeholder: 'Search for places...',
    marker: false // 不在搜索结果添加标记
  })
  document.getElementById('geocoder').appendChild(geocoder.onAdd(map.value))

  // 添加路线规划控制
  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/driving'
  })
  document.getElementById('directions').appendChild(directions.onAdd(map.value))

  // 获取用户当前的位置
  navigator.geolocation.getCurrentPosition((position) => {
    const userLocation = [position.coords.longitude, position.coords.latitude]
    directions.setOrigin(userLocation)
  })

  // 限制地图放大缩小操作
  const mapContainer = document.getElementById('map')
  mapContainer.addEventListener('mouseleave', () => {
    map.value.scrollZoom.disable()
    map.value.dragPan.disable()
  })

  mapContainer.addEventListener('mouseenter', () => {
    map.value.scrollZoom.enable()
    map.value.dragPan.enable()
  })
})
</script>

<style scoped>
.get-involved {
  padding: 40px 20px;
  background-color: var(--bg-light);
  text-align: center;
}

.header {
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  color: #8c5543;
}

.header p {
  font-size: 1.2rem;
  color: #4d4d4d;
}

.feature-section {
  margin-bottom: 40px;
}

.feature-section h2 {
  font-size: 2rem;
  color: #8c5543;
  margin-bottom: 20px;
}

.feature-list {
  display: flex;
  justify-content: space-around;
  gap: 20px;
}

.feature-item {
  flex: 1;
  background-color: #f5c6c6;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
}

.feature-item h3 {
  font-size: 1.5rem;
  color: #4d4d4d;
  margin-bottom: 10px;
}

.feature-item p {
  font-size: 1rem;
  color: #4d4d4d;
}

.map-section {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}

.map-controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.category-controls {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

#map {
  width: 100%;
  height: 500px;
  position: relative;
  z-index: 1;
  margin-bottom: 20px;
}

.btn {
  padding: 10px 20px;
  background-color: #8c5543;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn:hover {
  background-color: #7a4a38;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
}

.btn[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
