export async function transcribe(url?: string) {
  if (!url) {
    console.error('url is empty')
    return { taskId: -1 }
  }
  const { taskId } = await $fetch('/api/tencent/transcribe', {
    method: 'POST',
    body: JSON.stringify({ url }),
  })
  console.warn('taskId', taskId)
  return { taskId }
}

export async function getTranscript(taskId: number) {
  const { status, result } = await $fetch('/api/tencent/get', {
    method: 'POST',
    body: JSON.stringify({ taskId }),
  })
  return { status, result }
}
