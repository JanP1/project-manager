import "../../assets/styles/Kanban.css";
import KanbanCard from "./KanbanCard";

interface Task {
  _id: string;
  title: string;
  description?: string;
}

interface KanbanColumnProps {
  columnName: string;
  tasks: Task[];
}

export default function KanbanColumn({ columnName, tasks }: KanbanColumnProps) {
  return (
    <div className="kanban-column">
      <div className="kanban-column-name">{columnName}</div>
      <div className="column-task-container">
        {tasks.length === 0 && <div className="no-tasks-info">No tasks</div>}
        {tasks.map((task) => (
          <KanbanCard key={task._id} title={task.title} description={task.description} />
        ))}
      </div>
    </div>
  );
}
