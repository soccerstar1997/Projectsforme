import express from 'express'
import { migrate, query } from './db.js'

const app = express()
app.use(express.json())

const COLUMNS = 'id, name, description, created_at'

app.get('/api/projects', async (_req, res, next) => {
  try {
    const { rows } = await query(`SELECT ${COLUMNS} FROM projects ORDER BY created_at DESC, id DESC`)
    res.json(rows)
  } catch (error) {
    next(error)
  }
})

app.post('/api/projects', async (req, res, next) => {
  try {
    const name = String(req.body?.name ?? '').trim()
    const description = String(req.body?.description ?? '').trim()

    if (!name) {
      res.status(400).json({ error: 'A project name is required.' })
      return
    }

    const { rows } = await query(
      `INSERT INTO projects (name, description) VALUES ($1, $2) RETURNING ${COLUMNS}`,
      [name, description],
    )
    res.status(201).json(rows[0])
  } catch (error) {
    next(error)
  }
})

app.delete('/api/projects/:id', async (req, res, next) => {
  try {
    const id = Number(req.params.id)
    if (!Number.isInteger(id)) {
      res.status(400).json({ error: 'Invalid project id.' })
      return
    }

    const { rowCount } = await query('DELETE FROM projects WHERE id = $1', [id])
    if (rowCount === 0) {
      res.status(404).json({ error: 'Project not found.' })
      return
    }

    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

app.use((error, _req, res, _next) => {
  console.error(error)
  res.status(500).json({ error: 'Something went wrong.' })
})

const port = Number(process.env.PORT ?? 8000)

migrate()
  .then(() => {
    app.listen(port, '0.0.0.0', () => console.log(`API listening on http://0.0.0.0:${port}`))
  })
  .catch((error) => {
    console.error('Could not prepare the database:', error)
    process.exit(1)
  })
