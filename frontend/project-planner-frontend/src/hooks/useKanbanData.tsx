import { useEffect, useState } from "react";

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

export default function useKanbanData(projectId: string | null ) {
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

    let isCancelled = false;

    const fetchColumnsAndTasks = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch columns
        const colRes = await fetch(`http://localhost:5001/columns/project/${projectId}`);
        if (!colRes.ok) throw new Error("Failed to fetch columns");
        const colData = await colRes.json();
        if (isCancelled) return;

        setColumns(colData.data);

        // Fetch tasks per column in parallel
        const taskFetches = colData.data.map((col: Column) =>
          fetch(`http://localhost:5001/tasks/project/${projectId}/column/${col._id}`)
            .then((res) => {
              if (!res.ok) throw new Error(`Failed to fetch tasks for column ${col._id}`);
              return res.json();
            })
            .then((taskData) => ({ columnId: col._id, tasks: taskData.data }))
        );

        const tasksArray = await Promise.all(taskFetches);
        if (isCancelled) return;

        const taskMap: Record<string, Task[]> = {};
        tasksArray.forEach(({ columnId, tasks }) => {
          taskMap[columnId] = tasks;
        });

        setTasksByColumn(taskMap);
      } catch (err: any) {
        if (isCancelled) return;
        setError(err.message || "Unknown error");
        setColumns([]);
        setTasksByColumn({});
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchColumnsAndTasks();

    return () => {
      isCancelled = true;
    };
  }, [projectId]);

  return { columns, tasksByColumn, loading, error };

}

