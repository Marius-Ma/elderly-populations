<template>
  <Navigator />
  <div class="manage-users container">
    <h1>Manage Users</h1>
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
      v-if="users.length"
      :value="users"
      :rows="10"
      :paginator="true"
      :rowsPerPageOptions="[5, 10, 20]"
      v-model:selection="selectedRecipients"
      dataKey="email"
      responsiveLayout="scroll"
      ref="dt"
    >
      <Column selectionMode="multiple" headerStyle="width: 3em" />
      <Column field="username" header="Username" sortable />
      <Column field="email" header="Email" sortable />
      <Column field="role" header="Role" sortable />
    </DataTable>

    <div class="text-end pb-4">
      <Button
        icon="pi pi-trash"
        label="Delete Selected"
        class="p-button-danger"
        @click="deleteSelectedUsers"
        :disabled="!selectedRecipients.length"
      />
    </div>

    <!-- Email Form -->
    <div class="email-form">
      <h2>Send Bulk Email to Selected Users</h2>
      <form @submit.prevent="sendBulkEmail">
        <div class="form-group">
          <label for="to">To</label>
          <MultiSelect
            v-model="selectedRecipients"
            :options="recipientOptions"
            optionLabel="email"
            multiple
            filter
            placeholder="Select recipients"
            id="to"
          />
        </div>
        <div class="form-group">
          <label for="subject">Subject</label>
          <input v-model="emailSubject" type="text" id="subject" required />
        </div>
        <div class="form-group">
          <label for="message">Message</label>
          <textarea v-model="emailMessage" id="message" rows="5" required></textarea>
        </div>
        <div class="form-group">
          <label for="attachment">Attachment</label>
          <input type="file" @change="handleFileUpload" />
        </div>
        <button type="submit" class="btn">Send Bulk Email</button>
      </form>
    </div>

    <Footer />
  </div>
</template>

<script setup>
import Navigator from '@/components/Navigator.vue'
import Footer from '@/components/Footer.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'
import MultiSelect from 'primevue/multiselect'
import { jsPDF } from 'jspdf'
import 'jspdf-autotable'

// Variables to store data
const users = ref([])
const selectedRecipients = ref([])
const emailSubject = ref('')
const emailMessage = ref('')
const attachment = ref(null)
const dt = ref()
const recipientOptions = ref([])
const selectedFormat = ref(null)

const exportFormats = ref([
  { label: 'CSV', value: 'csv' },
  { label: 'PDF', value: 'pdf' }
])

// Fetch users from Cloud Function
const fetchUsers = async () => {
  try {
    const response = await axios.get('https://getusers-whyplqneva-uc.a.run.app')
    users.value = response.data
    recipientOptions.value = response.data // Fill options for email selection
  } catch (error) {
    console.error('Error fetching users:', error)
  }
}

// Export DataTable to CSV
const exportCSV = () => {
  dt.value.exportCSV()
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

console.log('Selected format:', selectedFormat.value)
const handleFormatChange = (event) => {
  // Assuming the structure of the event as shown in your logs
  selectedFormat.value = event.value.value
  console.log('New selected format:', selectedFormat.value)
}

const handleExport = () => {
  console.log('Export function triggered')
  console.log('Exporting as:', selectedFormat.value) // To check what format is being used at export time

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

// Handle file upload
const handleFileUpload = (event) => {
  attachment.value = event.target.files[0]
}

// Send bulk email
const sendBulkEmail = async () => {
  if (!selectedRecipients.value.length) {
    alert('Please select at least one recipient.')
    return
  }

  const recipientsEmails = selectedRecipients.value.map((user) => user.email) // Get email addresses
  const formData = new FormData()
  formData.append('subject', emailSubject.value)
  formData.append('message', emailMessage.value)
  formData.append('recipients', JSON.stringify(recipientsEmails))

  if (attachment.value) {
    formData.append('attachment', attachment.value)
  }

  try {
    const response = await axios.post(
      'https://send-email-worker.my429542819.workers.dev/send-bulk-email',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
    )
    if (response.status === 200) {
      alert('Bulk email sent successfully!')
    } else {
      alert('Failed to send bulk email.')
    }
  } catch (error) {
    console.error('Error sending bulk email:', error)
    alert('Error sending bulk email.')
  }
}

// Delete selected users logic
const deleteSelectedUsers = async () => {
  if (!selectedRecipients.value.length) {
    alert('Please select at least one user to delete.')
    return
  }

  try {
    for (const user of selectedRecipients.value) {
      await axios.delete('https://deleteuser-whyplqneva-uc.a.run.app', {
        data: { userId: user.id } // 通过请求体发送 userId
      })
    }
    alert('Selected users deleted successfully!')
    fetchUsers() // 删除后刷新用户列表
  } catch (error) {
    console.error('Error deleting users:', error)
    alert('Error deleting selected users.')
  }
}

// Fetch users on component mount
onMounted(() => {
  fetchUsers()
})
</script>

<style scoped>
.manage-users {
  padding: 40px 20px;
  background-color: var(--bg-light);
  text-align: center;
}

.email-form {
  margin-top: 20px;
  text-align: left;
  background-color: #f5e0d3;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.email-form .form-group {
  margin-bottom: 15px;
}

.email-form input,
.email-form textarea {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #d1a3a4;
}

.btn {
  background-color: #8c5543;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.btn:hover {
  background-color: #7a4a38;
}
</style>
