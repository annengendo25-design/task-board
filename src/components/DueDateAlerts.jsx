import { useSelector } from "react-redux";
import { getDueDateCounts } from "../utils/dueDateAlerts";

export default function DueDateAlerts() {
  const tasks = useSelector((state) => state.tasks);
  const { dueTodayCount, overdueCount } = getDueDateCounts(tasks);

    return (
    <section className="due-alerts" aria-label="Due date alerts">
      <div className="due-alert-badge due-today">
        <span>Due today</span>
        <strong>{dueTodayCount}</strong>
      </div>
      <div className="due-alert-badge overdue">
        <span>Overdue</span>
        <strong>{overdueCount}</strong>
      </div>
    </section>
  );
}