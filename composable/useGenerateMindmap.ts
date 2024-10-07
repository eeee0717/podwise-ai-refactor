export default async function useGenerateMindmap(content: string) {
  const mindmap = await fetchMindmap(content)
  return mindmap
}

export async function fetchMindmap(content: string) {
  return await $fetch('/api/ai/generateMindmap', {
    method: 'POST',
    body: JSON.stringify({ content }),
  })
}
