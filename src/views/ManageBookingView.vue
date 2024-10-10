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
import { formatDate } from '@/utils/dateUtils'
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
  let rows = users.value.map((user) => [user.username, user.email, user.role])
  doc.autoTable({
    head: [['Username', 'Email', 'Role']],
    body: rows
  })
  doc.save('users.pdf')
}

const handleExport = () => {
  console.log('Export function triggered')
  console.log('Exporting as:', selectedFormat.value)

  if (!selectedFormat.value) {
    alert('Please select an export format.')
    return
  }

  if (selectedFormat.value === 'csv') {
    exportCSV()
  } else if (selectedFormat.value === 'pdf') {
    exportPDF()
  }
}

const fetchBookings = async () => {
  try {
    const response = await axios.get('https://getbookings-whyplqneva-uc.a.run.app')
    console.log('API Response:', response.data)

    bookings.value = response.data.map((booking) => {
      const formattedDate = formatDate(booking.bookingDetails.date)
      const formattedTimestamp = formatDate(booking.timestamp)

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
