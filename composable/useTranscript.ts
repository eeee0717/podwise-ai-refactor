import { type Episode, TaskStatus } from '~/types'

export async function useTranscript(taskId: number, episode: Ref<Episode>, taskStatus: Ref<TaskStatus>) {
  console.warn('useTranscript...', taskId)
  await new Promise((resolve, reject) => {
    $fetch('/api/tencent/get', {
      method: 'POST',
      body: JSON.stringify({ taskId }),
    }).then((res) => {
      taskStatus.value = res.status
      if (res.status === TaskStatus.Failed) {
        reject(res)
      }
      else if (res.status === TaskStatus.Finish) {
        episode.value.transcript = res.result
        resolve(res)
      }
      // avoid status === TaskStatus.Processing cannot resolve
      else {
        resolve(res)
      }
    })
  })
}
