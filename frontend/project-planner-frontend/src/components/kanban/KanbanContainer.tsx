import { useEffect, useState } from "react";
import "../../assets/styles/Kanban.css";
import useCurrentProjectStore from "../../stores/useCurrentProjectStore";
import KanbanColumn from "./KanbanColumn";

interface Column {
  _id: string;
  projectId: string;
  title: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Task {
  _id: string;
  projectId: string;
  columnId: string;
  title: string;
  description?: string;
  dueDate?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function KanbanContainer() {
  const projectId = useCurrentProjectStore((state) => state.projectId);
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasksByColumn, setTasksByColumn] = useState<Record<string, Task[]>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!projectId) {
      setColumns([]);
      setTasksByColumn({});
      return;
    }

    setLoading(true);
    setError(null);

    fetch(`http://localhost:5001/columns/project/${projectId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch columns");
        return res.json();
      })
      .then((data) => {
        setColumns(data.data);

        return Promise.all(
          data.data.map((col: Column) =>
            fetch(`http://localhost:5001/tasks/project/${projectId}/column/${col._id}`)
              .then((res) => {
                if (!res.ok) throw new Error(`Failed to fetch tasks for column ${col._id}`);
                return res.json();
              })
              .then((taskData) => ({ columnId: col._id, tasks: taskData.data }))
          )
        );
      })
      .then((tasksArray) => {
        const tasksMap: Record<string, Task[]> = {};
        tasksArray.forEach(({ columnId, tasks }) => {
          tasksMap[columnId] = tasks;
        });
        setTasksByColumn(tasksMap);
      })
      .catch((err) => {
        setError(err.message || "Unknown error");
        setColumns([]);
        setTasksByColumn({});
      })
      .finally(() => setLoading(false));
  }, [projectId]);

  return (
    <div className="kanban-container">
      {!projectId && <div className="select-project-text">Select a project</div>}

      {projectId && (
        <div className="kanban-column-container">
          {loading && <p>Loading columns and tasks...</p>}

          {error && <p>Error loading columns or tasks: {error}</p>}

          {!loading && !error && columns.length === 0 && (
            <p>No columns found for this project.</p>
          )}

          {!loading &&
            !error &&
            columns.map((col) => (
              <KanbanColumn
                key={col._id}
                columnName={col.title}
                tasks={tasksByColumn[col._id] || []}
              />
            ))}
        </div>
      )}
    </div>
  );
}
