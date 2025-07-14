import "../assets/styles/StatusPicker.css";
import useStatusStore from "../stores/projectStatusStore";

export default function StatusPicker() {
  const { active, finished, archived, setActive, setFinished, setArchived } = useStatusStore();

  return (
    <div className="status-button-container">
      <button
        className={active ? "status-button-active" : "status-button-inactive"}
        onClick={setActive}
      >
        active
      </button>

      <button
        className={finished ? "status-button-active" : "status-button-inactive"}
        onClick={setFinished}
      >
        finished
      </button>

      <button
        className={archived ? "status-button-active" : "status-button-inactive"}
        onClick={setArchived}
      >
        archived
      </button>
    </div>
  );
}
