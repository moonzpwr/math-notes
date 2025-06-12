import { MathJaxContext } from "better-react-mathjax"
import { HomeView } from "./Views/HomeView/HomeView"


function App() {
  return (
    <MathJaxContext>
      <HomeView />
    </MathJaxContext>
  )
}

export default App
