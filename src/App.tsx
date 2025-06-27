import { MathJaxContext } from "better-react-mathjax"
import { AppRoutes } from "./Router/routes"
import { ErrorBoundary } from "./Components/ErrorBoundary/ErrorBoundary"
import { ErrorView } from "./Views/ErrorView/ErrorView"

function App() {
  return (
    <MathJaxContext>
      <ErrorBoundary fallback={<ErrorView />}>
        <AppRoutes />
      </ErrorBoundary>
    </MathJaxContext>
  )
}

export default App
