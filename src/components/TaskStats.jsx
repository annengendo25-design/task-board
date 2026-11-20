export default function TaskStats({tasks}){
    const total=tasks.length
    const completed=tasks.filter((task)=>task.status === 'completed').length
    const pending=total-completed
    return(
        <dl className="task-stats" aria-label="Task summary">
            <div>
                <dt>Total</dt>
                <dd>{total}</dd>
            </div>
            <div>
                <dt>Pending</dt>
                <dd>{pending}</dd>
            </div>
            <div>
                <dt>Completed</dt>
                <dd>{completed}</dd>
            </div>
        </dl>
    )
}