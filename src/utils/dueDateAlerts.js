export function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getDueDateCounts(tasks = [], todayStr = getLocalDateString()) {
  let dueTodayCount = 0;
  let overdueCount = 0;

  for (const task of tasks) {
    if (!task || task.status === "completed" || !task.dueDate) {
      continue;
    }

    if (task.dueDate === todayStr) {
      dueTodayCount += 1;
    } else if (task.dueDate < todayStr) {
      overdueCount += 1;
    }
  }

  return { dueTodayCount, overdueCount };
}