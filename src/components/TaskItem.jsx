import { memo, useState } from 'react'

function TaskItem({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const isCompleted = task.status === 'completed'

  function startEditing() {
    setTitle(task.title)
    setDescription(task.description)
    setIsEditing(true)
  }

  function saveChanges(event) {
    event.preventDefault()

    const cleanTitle = title.trim()
    if (!cleanTitle) return

    onUpdate(task.id, {
      title: cleanTitle,
      description: description.trim(),
    })
    setIsEditing(false)
  }

  return (
    <article className="task-card">
      {isEditing ? (
        <form className="task-form" onSubmit={saveChanges}>
          <label>
            Task title
            <input
              required
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>
          <label>
            Description (optional)
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </label>
          <button type="submit">Save changes</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h2>{task.title}</h2>
          {task.description && <p>{task.description}</p>}
          <span className="task-status">{task.status}</span>

          <div className="task-actions">
            <button type="button" onClick={startEditing}>Edit</button>
            <button
              type="button"
              onClick={() => onUpdate(task.id, {
                status: isCompleted ? 'pending' : 'completed',
              })}
            >
              {isCompleted ? 'Mark pending' : 'Mark completed'}
            </button>
            <button type="button" onClick={() => onDelete(task.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </article>
  )
}

export default memo(TaskItem)