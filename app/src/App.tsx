import './App.css'
import NTLMap from './components/NTLMap'
import data from '../data/NTLMap_data.json'

function App() {
  return (
    <>
    <NTLMap points={data}/>
    </>
  )
}

export default App
