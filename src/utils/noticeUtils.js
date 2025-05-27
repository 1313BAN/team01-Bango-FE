export const applyStatus = (notice) => {
  const begin = new Date(notice.beginDate)
  const end = new Date(notice.endDate)
  const today = new Date()

  if (!notice.beginDate || !notice.endDate) return '정보없음'
  if (today < begin) return '모집예정'
  if (today >= begin && today <= end) return '모집중'
  if (today > end) return '모집완료'
  return '정보없음'
}

export const statusColorClass = (notice) => {
  const status = applyStatus(notice)
  const colorMap = {
    '모집예정': 'bg-yellow-100 text-yellow-800',
    '모집중': 'bg-red-100 text-red-800',
    '모집완료': 'bg-green-100 text-green-800',
    '정보없음': 'bg-gray-100 text-gray-600'
  }
  return colorMap[status] || 'bg-gray-100 text-gray-600'
}