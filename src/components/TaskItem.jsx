export default function TaskItem({task}){
    return(
        <article className="task-card">
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <span className="task-status">{task.status}</span>
        </article>
    )
}