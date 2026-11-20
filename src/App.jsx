import './App.css'
import TaskList from './components/TaskList';
const sampleTasks=[
  {
  id:'1',
  title:'Send stems to the mix engineer',
  description:'Export labeled WAV tracks and share the folder.',
  status:'pending',
},
{
  id:'2',
  title:'Approve cover art',
  description:'Check the final artwork and confirm the release title.',
  status:'completed'
},
]

function App() {
return(
  <main>
    <h1>Release Board</h1>
   <TaskList tasks={sampleTasks}/>
  </main>
)
}

export default App
