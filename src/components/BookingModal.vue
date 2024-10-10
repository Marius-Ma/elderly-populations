<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <h2>Book {{ serviceName }}</h2>
      <div class="form-group">
        <label for="date">Select a date:</label>
        <Datepicker
          v-model="selectedDate"
          :input-class="'datepicker-input'"
          :min-date="new Date()"
        />
      </div>
      <div class="form-group">
        <label for="time">Select a time:</label>
        <select v-model="selectedTime" class="time-picker">
          <option disabled value="">Choose time</option>
          <option v-for="time in availableTimes" :key="time" :value="time">{{ time }}</option>
        </select>
      </div>
      <div class="modal-actions">
        <button class="btn" @click="submitBooking">Submit</button>
        <button class="btn" @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
  serviceName: String,
  isOpen: Boolean
})

const emit = defineEmits(['close', 'submit'])

const selectedDate = ref(null)
const selectedTime = ref('')
const availableTimes = ref([])

const closeModal = () => {
  emit('close')
}

const submitBooking = () => {
  if (selectedDate.value && selectedTime.value) {
    const validDate =
      selectedDate.value instanceof Date && !isNaN(selectedDate.value.getTime())
        ? selectedDate.value
        : null

    if (!validDate) {
      alert('Invalid date selected.')
      return
    }

    const bookingDetails = {
      service: props.serviceName,
      date: validDate,
      time: selectedTime.value,
      createdAt: new Date()
    }

    console.log('Selected date value:', selectedDate.value, 'Type:', typeof selectedDate.value)
    console.log('Booking details:', bookingDetails)

    emit('submit', bookingDetails)
    closeModal()
  } else {
    alert('Please select both a date and time.')
  }
}

onMounted(() => {
  availableTimes.value = ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM']
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  z-index: 9999;
}

.modal {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  display: block;
}

.form-group {
  margin-bottom: 15px;
}

.datepicker-input,
.time-picker {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
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
