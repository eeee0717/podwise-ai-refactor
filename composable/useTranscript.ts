import { TaskStatus } from '~/types'

export async function useTranscript(taskId: number) {
  let status = TaskStatus.Waiting
  let result = ''
  await new Promise((resolve, reject) => {
    $fetch('/api/tencent/get', {
      method: 'POST',
      body: JSON.stringify({ taskId }),
    }).then((res) => {
      status = res.status
      result = res.result
      if (res.status === TaskStatus.Failed) {
        reject(res)
      }
      else if (res.status === TaskStatus.Finish) {
        resolve(res)
      }
    })
  })
  return { status, result }
}
