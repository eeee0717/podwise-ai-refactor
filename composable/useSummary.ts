export default async function useSummary(content: string) {
  const summary = await fetchSummary(content)
  return summary
}

export async function fetchSummary(content: string) {
  return await $fetch('/api/ai/summary', {
    method: 'POST',
    body: JSON.stringify({ content }),
  })
}
