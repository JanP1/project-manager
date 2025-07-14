import './App.css'
import KanbanContainer from './components/kanban/KanbanContainer'
import ProjectBar from './components/ProjectBar'

function App() {

  return (
    <>
    <div className='spa-layout-container'>
      <div className='main-grid-container'>

        <ProjectBar/>
        <KanbanContainer/>

          


      </div>
    </div>
    </>
  )
}

export default App
