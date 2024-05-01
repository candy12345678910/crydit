import Nav from "./component/Nav"
import { Routes, Route } from "react-router-dom"
import Home from "./component/Home"
import Details from "./component/Details"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Nav/>}>
          <Route index element={<Home/>}/>
          <Route path="details/:id" element={<Details/>} />
        </Route>
      </Routes>
    </>
  )
}

export default App
