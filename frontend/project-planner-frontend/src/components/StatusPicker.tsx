import "../assets/styles/StatusPicker.css"

export default function StatusPicker() {
  return (
    <div className="status-button-container">
      <button className="status-button-inactive">active</button>
      <button className="status-button-inactive">finished</button>
      <button className="status-button-inactive">archived</button>

    </div>
  )
}

