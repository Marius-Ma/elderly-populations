<template>
  <div>
    <Navigator />
    <div class="health-resources container">
      <h1>Health Resources</h1>
      <p>Explore our range of health services dedicated to supporting seniors in the community.</p>

      <table class="resource-table">
        <thead>
          <tr>
            <th>Resource Name</th>
            <th>Description</th>
            <th>Contact Information</th>
            <th>Availability</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="resource in resources" :key="resource.id">
            <td>{{ resource.name }}</td>
            <td>{{ resource.description }}</td>
            <td>{{ resource.contact }}</td>
            <td>{{ resource.availability }}</td>
            <td>
              <button :disabled="!canBook" @click="openBooking(resource)">Book</button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- FullCalendar for booking -->
      <div v-if="selectedResource">
        <FullCalendar :options="calendarOptions" />
        <button v-if="selectedDate" @click="confirmBooking">Confirm Booking</button>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from '@/main'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import Navigator from '@/components/Navigator.vue'
import Footer from '@/components/Footer.vue'
import { useStore } from 'vuex'

const resources = ref([])
const calendarEvents = ref([])
const selectedResource = ref(null)
const selectedDate = ref(null)
const availableDates = ref([])

const store = useStore()
const isLoggedIn = computed(() => store.getters.isUserLoggedIn)
const isAdminUser = computed(() => store.getters.isAdmin)
const canBook = computed(() => isLoggedIn.value && !isAdminUser.value)

// 定义从 Firestore 获取数据的函数
const fetchResources = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'healthResources'))
    resources.value = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        ...data
      }
    })
    console.log('Resources fetched:', resources.value)
  } catch (error) {
    console.error('Error fetching resources:', error)
  }
}

onMounted(() => {
  fetchResources()
})

const openBooking = (resource) => {
  selectedResource.value = resource
  calendarEvents.value = []
  availableDates.value = []

  const availabilitySlots = parseAvailability(resource.availability)
  availabilitySlots.forEach((slot) => {
    calendarEvents.value.push({
      title: `${resource.name} - Available Slot`,
      start: slot.start,
      end: slot.end,
      allDay: true
    })
    // 更新 availableDates，确保存储的是正确的日期格式
    availableDates.value.push(slot.start)
  })

  // 强制 FullCalendar 重绘
  calendarOptions.value = { ...calendarOptions.value }
}

const parseAvailability = (availability) => {
  const daysMap = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0 }
  let days = []

  // 清理字符串，去除数字、时间引用、短横线和空格
  let cleanAvailability = availability.replace(/[0-9]|AM|PM/g, '').replace(/\s+/g, '')

  // Split the string by commas to get individual days or ranges
  cleanAvailability.split(',').forEach((part) => {
    if (part.includes('-')) {
      // 处理短横线分割的日期范围 (例如: "Mon-Fri")
      const [startDay, endDay] = part.split('-').map((day) => day.trim())
      if (!daysMap.hasOwnProperty(startDay) || !daysMap.hasOwnProperty(endDay)) {
        console.error('Invalid days in range:', part)
        return
      }

      let currentIndex = daysMap[startDay]
      const endIndex = daysMap[endDay]

      // 包含范围内的所有天数
      while (currentIndex !== (endIndex + 1) % 7) {
        if (!days.includes(currentIndex)) {
          days.push(currentIndex)
        }
        currentIndex = (currentIndex + 1) % 7
      }
    } else {
      // 处理逗号分隔的单个日期 (例如: "Mon", "Wed")
      const dayIndex = daysMap[part.trim()]
      if (dayIndex !== undefined && !days.includes(dayIndex)) {
        days.push(dayIndex)
      }
    }
  })

  // 生成日历事件基于解析出来的天数
  const events = []
  const currentDate = new Date()
  for (let i = 0; i < 30; i++) {
    // 未来30天内寻找符合条件的日期
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + i
    )
    if (days.includes(date.getDay())) {
      const dateStr = date.toISOString().slice(0, 10)
      events.push({
        title: 'Available',
        start: dateStr,
        end: dateStr,
        allDay: true
      })
    }
  }

  return events
}

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  events: calendarEvents.value,
  validRange: {
    start: new Date()
  },
  selectable: true,
  selectAllow: (selectInfo) => {
    const selectedDateStr = selectInfo.startStr.slice(0, 10)
    return availableDates.value.some((date) => date === selectedDateStr)
  },
  dateClick: (arg) => {
    const selectedDateStr = arg.dateStr
    if (availableDates.value.includes(selectedDateStr)) {
      selectedDate.value = selectedDateStr
      console.log(`Selected date: ${selectedDateStr}`)
    } else {
      alert('This date is not available for booking.')
    }
  }
})

// 监听 calendarEvents 的变化，更新 FullCalendar
watch(calendarEvents, (newEvents) => {
  calendarOptions.value.events = newEvents
})

const confirmBooking = async () => {
  if (!selectedDate.value || !selectedResource.value) {
    console.error('No selected date or resource.')
    return
  }
  try {
    await addDoc(collection(db, 'healthResourcesBookings'), {
      serviceName: selectedResource.value.name,
      bookedDate: selectedDate.value,
      bookedAt: new Date()
    })
    console.log('Booking confirmed successfully!')
    alert('Booking confirmed!')
    selectedResource.value = null
    selectedDate.value = null
    calendarEvents.value = []
    availableDates.value = []
  } catch (error) {
    console.error('Error confirming booking:', error)
  }
}
</script>

<style scoped>
.container {
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #8c5543;
}

.resource-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.resource-table th,
.resource-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.resource-table th {
  background-color: #f5c6c6;
  color: #4d4d4d;
}

.resource-table td {
  font-size: 1rem;
  color: #333;
}

button {
  background-color: #8c5543;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button[disabled] {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover {
  background-color: #7a4a38;
}

button[disabled]:hover {
  background-color: #ccc;
}
</style>
