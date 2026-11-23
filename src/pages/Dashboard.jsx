import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, updateTask } from "../features/tasks/tasksSlice";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import TaskStats from "../components/TaskStats.jsx";
import Navbar from "../components/Navbar.jsx";

export default function Dashboard() {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("earliest");
  const visibleTasks = useMemo(() => {
    const filteredTasks = tasks.filter((task) => {
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

      const query = searchQuery.trim().toLowerCase();

      const matchesSearch =
        (task.title ?? "").toLowerCase().includes(query) ||
        (task.description ?? "").toLowerCase().includes(query);

      return matchesStatus && matchesSearch;
    });
    const sortedTasks = [...filteredTasks].sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;

      if (sortOrder === "earliest") {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }

      return new Date(b.dueDate) - new Date(a.dueDate);
    });

    return sortedTasks;
  }, [tasks, statusFilter, searchQuery, sortOrder]);
  const handleUpdate = useCallback(
    (id, changes) => {
      dispatch(updateTask({ id, changes }));
    },
    [dispatch],
  );
  const handleDelete = useCallback(
    (id) => {
      dispatch(deleteTask(id));
    },
    [dispatch],
  );
  return (
    <main className="dashboard">
      <Navbar></Navbar>
      <TaskStats tasks={tasks} />
      <div className="board-layout">
        <section className="board-panel">
          <h2>Add a task</h2>
          <TaskForm />
        </section>
        <section className="board-panel">
          <div className="board-toolbar">
            <h2>Release tasks</h2>
            <label className="search-filter">
              Search tasks
              <input
                type="search"
                placeholder="Search by title or description..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
              />
            </label>
            <label className="status-filter">
              Filter by status
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="all">All tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </label>
            <label className="status-filter">
              Sort tasks
              <select
                value={sortOrder}
                onChange={(event) => setSortOrder(event.target.value)}
              >
                <option value="earliest">Nearest due date</option>
                <option value="latest">Farthest due date</option>
              </select>
            </label>
          </div>
          {visibleTasks.length === 0 ? (
            <p>
              {tasks.length === 0
                ? "No tasks added yet. Add your first task to get started."
                : searchQuery.trim()
                  ? "No tasks match your search."
                  : "No tasks match this filter."}
            </p>
          ) : (
            <TaskList
              tasks={visibleTasks}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          )}
        </section>
      </div>
    </main>
  );
}
