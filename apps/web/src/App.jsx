import { useCallback, useEffect, useState } from 'react'
import NewProjectForm from './components/NewProjectForm.jsx'
import ProjectList from './components/ProjectList.jsx'
import { createProject, deleteProject, listProjects } from './lib/api.js'

export default function App() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      setProjects(await listProjects())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function handleCreate(project) {
    const created = await createProject(project)
    setProjects((current) => [created, ...current])
  }

  async function handleDelete(id) {
    await deleteProject(id)
    setProjects((current) => current.filter((project) => project.id !== id))
  }

  return (
    <div className="page">
      <header className="masthead">
        <h1>Projectsforme</h1>
        <p className="lede">Keep the projects you are working on in one short list.</p>
      </header>

      <NewProjectForm onCreate={handleCreate} />

      {loading && <p className="muted">Loading projects…</p>}
      {error && (
        <p className="notice" role="alert">
          {error}
        </p>
      )}
      {!loading && !error && <ProjectList projects={projects} onDelete={handleDelete} />}
    </div>
  )
}
