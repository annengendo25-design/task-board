import { useSelector } from "react-redux";
import { getDueDateCounts } from "../utils/dueDateAlerts";

export default function DueDateAlerts() {
  const tasks = useSelector((state) => state.tasks);
  const { dueTodayCount, overdueCount } = getDueDateCounts(tasks);
