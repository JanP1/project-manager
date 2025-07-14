import "../../assets/styles/Kanban.css";

interface KanbanCardProps {
  title: string;
  description?: string;
}

export default function KanbanCard({ title, description }: KanbanCardProps) {
  return (
    <div className="card">
      <div className="card-content">
        <h4>{title}</h4>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}
