import { MathJaxContext } from "better-react-mathjax"
import { HomeView } from "./Components/Views/HomeView/HomeView"


function App() {
  return (
    <MathJaxContext>
      <HomeView />
    </MathJaxContext>
  )
}

export default App
