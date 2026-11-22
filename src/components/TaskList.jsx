import TaskItem from "./TaskItem";
export default function TaskList({tasks,onUpdate,onDelete}){
    return(
        <section aria-label="Tasks">{tasks.map((task)=>(<TaskItem key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete}/>
        ))}
        </section>
    )
}