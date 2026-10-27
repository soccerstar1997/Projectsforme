import { useState } from 'react'

export default function NewProjectForm({ onCreate }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    if (!name.trim()) {
      setError('Give the project a name.')
      return
    }

    try {
      setSaving(true)
      setError('')
      await onCreate({ name: name.trim(), description: description.trim() })
      setName('')
      setDescription('')
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="project-name">Project name</label>
        <input
          id="project-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Website redesign"
        />
      </div>

      <div className="field">
        <label htmlFor="project-description">Description</label>
        <textarea
          id="project-description"
          rows={2}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="What is this project about?"
        />
      </div>

      {error && <p className="notice" role="alert">{error}</p>}

      <button type="submit" disabled={saving}>
        {saving ? 'Adding…' : 'Add project'}
      </button>
    </form>
  )
}
