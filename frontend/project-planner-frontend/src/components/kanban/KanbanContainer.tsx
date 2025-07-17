import "../../assets/styles/Kanban.css";
import useCurrentProjectStore from "../../stores/useCurrentProjectStore";
import useKanbanData from "../../hooks/useKanbanData";
import KanbanColumn from "./KanbanColumn";

export default function KanbanContainer() {
  const projectId = useCurrentProjectStore((state) => state.projectId);
  const { columns, tasksByColumn, loading, error } = useKanbanData(projectId);

  if (!projectId) return <div className="select-project-text">Select a project</div>;

  return (
    <div className="kanban-container">
      <div className="kanban-column-container">
        {loading && <p>Loading columns and tasks...</p>}
        {error && <p>Error: {error}</p>}
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
    </div>
  );
}
