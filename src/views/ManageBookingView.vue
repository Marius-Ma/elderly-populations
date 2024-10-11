<template>
  <Navigator />
  <div class="manage-booking container">
    <h1>Manage Bookings</h1>
    <div class="text-end pb-4">
      <Dropdown
        v-model="selectedFormat"
        :options="exportFormats"
        placeholder="Select format"
        @change="handleFormatChange"
      />

      <Button icon="pi pi-external-link" label="Export" @click="handleExport" />
    </div>
    <DataTable
      v-if="bookings.length"
      :value="bookings"
      :rows="10"
      :paginator="true"
      :rowsPerPageOptions="[5, 10, 20]"
      :sortMode="'multiple'"
      responsiveLayout="scroll"
      ref="dt"
    >
      <Column field="serviceName" header="Service" sortable />
      <Column field="bookingDetails.date" header="Date" sortable />
      <Column field="bookingDetails.time" header="Time" sortable />
      <Column field="userEmail" header="User Email" sortable />
      <Column field="timestamp" header="Booking Timestamp" sortable />
    </DataTable>
    <p v-else>No bookings found</p>
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navigator from '@/components/Navigator.vue'
import Footer from '@/components/Footer.vue'
import axios from 'axios'
import dayjs from 'dayjs'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
const bookings = ref([])
const dt = ref()
const selectedFormat = ref(null)

const exportFormats = ref([
  { label: 'CSV', value: 'csv' },
  { label: 'PDF', value: 'pdf' }
])

const exportCSV = () => {
  dt.value.exportCSV() // Export the data table to CSV
}
const exportPDF = () => {
  const doc = new jsPDF()

  let rows = bookings.value.map((booking) => [
    booking.serviceName,
    booking.bookingDetails.date,
    booking.bookingDetails.time,
    booking.userEmail,
    booking.timestamp
  ])

  doc.autoTable({
    head: [['Service', 'Date', 'Time', 'User Email', 'Booking Timestamp']],
    body: rows
  })

  doc.save('bookings.pdf')
}

const handleExport = () => {
  console.log('Export function triggered')
  console.log('Exporting as:', selectedFormat.value ? selectedFormat.value.value : null)

  if (!selectedFormat.value) {
    alert('Please select an export format.')
    return
  }

  if (selectedFormat.value.value === 'csv') {
    exportCSV()
  } else if (selectedFormat.value.value === 'pdf') {
    exportPDF()
  }
}

const fetchBookings = async () => {
  try {
    const response = await axios.get('https://getbookings-whyplqneva-uc.a.run.app')
    console.log('API Response:', response.data)

    bookings.value = response.data.map((booking) => {
      // 处理 bookingDetails.date，确保其为 Date 对象
      let validDate
      if (booking.bookingDetails.date && booking.bookingDetails.date._seconds) {
        validDate = new Date(booking.bookingDetails.date._seconds * 1000)
      } else if (typeof booking.bookingDetails.date === 'string') {
        validDate = new Date(booking.bookingDetails.date)
      } else {
        validDate = booking.bookingDetails.date
      }

      // 使用 dayjs 格式化日期
      const formattedDate = dayjs(validDate).isValid()
        ? dayjs(validDate).format('YYYY-MM-DD')
        : 'Invalid Date'

      // 处理时间戳
      let validTimestamp
      if (booking.timestamp && booking.timestamp._seconds) {
        validTimestamp = new Date(booking.timestamp._seconds * 1000)
      } else if (typeof booking.timestamp === 'string') {
        validTimestamp = new Date(booking.timestamp)
      } else {
        validTimestamp = booking.timestamp
      }

      const formattedTimestamp = dayjs(validTimestamp).isValid()
        ? dayjs(validTimestamp).format('YYYY-MM-DD HH:mm:ss')
        : 'Invalid Date'

      return {
        ...booking,
        bookingDetails: {
          ...booking.bookingDetails,
          date: formattedDate
        },
        timestamp: formattedTimestamp
      }
    })

    console.log('Formatted Bookings:', bookings.value)
  } catch (error) {
    console.error('Error fetching bookings:', error)
  }
}

onMounted(() => {
  fetchBookings()
})
</script>

<style scoped>
.manage-booking {
  padding: 40px 20px;
  background-color: var(--bg-light);
  text-align: center;
}

h1 {
  color: #8c5543;
}
</style>
