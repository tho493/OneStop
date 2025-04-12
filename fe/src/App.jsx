import "./App.css"
import useRouterElements from "./hooks/useRouterElements";

function App() {
  const routerElements = useRouterElements();
  return (
    <div className="h-screen">
      {routerElements}
    </div>
  )
}

export default App