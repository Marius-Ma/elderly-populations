import dayjs from 'dayjs'

export const formatDate = (inputDate) => {
  if (!inputDate) return 'Invalid Date'

  // 如果 inputDate 是 Firestore Timestamp 对象
  if (typeof inputDate.toDate === 'function') {
    return dayjs(inputDate.toDate()).format('DD/MM/YYYY')
  }

  // 尝试解析 ISO 格式字符串或普通字符串
  const parsedDate = dayjs(inputDate, ['DD/MM/YYYY', 'YYYY-MM-DD', 'D MMMM YYYY'], true)
  if (parsedDate.isValid()) {
    return parsedDate.format('DD/MM/YYYY')
  }

  return 'Invalid Date'
}
