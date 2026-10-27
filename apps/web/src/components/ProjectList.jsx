export default function ProjectList({ projects, onDelete }) {
  if (projects.length === 0) {
    return <p className="muted">No projects yet — add the first one above.</p>
  }

  return (
    <ul className="list">
      {projects.map((project) => (
        <li key={project.id} className="card project">
          <div>
            <h2>{project.name}</h2>
            {project.description && <p>{project.description}</p>}
            <time dateTime={project.created_at}>
              Added {new Date(project.created_at).toLocaleDateString()}
            </time>
          </div>
          <button type="button" className="ghost" onClick={() => onDelete(project.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}
