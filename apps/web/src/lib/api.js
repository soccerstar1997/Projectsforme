async function request(path, options) {
  const response = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.error || `Request failed (${response.status})`)
  }

  return response.status === 204 ? null : response.json()
}

export function listProjects() {
  return request('/api/projects')
}

export function createProject(project) {
  return request('/api/projects', { method: 'POST', body: JSON.stringify(project) })
}

export function deleteProject(id) {
  return request(`/api/projects/${id}`, { method: 'DELETE' })
}
