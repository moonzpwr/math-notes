import { MathJaxContext } from "better-react-mathjax"
import { AppRoutes } from "./Router/routes"

//TODO Add Error Boundary
function App() {
  return (
    <MathJaxContext>
      <AppRoutes />
    </MathJaxContext>
  )
}

export default App
