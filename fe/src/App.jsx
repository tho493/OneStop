import "./App.css"
import useRouterElements from "./hooks/useRouterElements";

function App() {
  const routerElements = useRouterElements();
  return (
    <div className="h-screen overflow-x-hidden overflow-y-auto">
      {routerElements}
    </div>
  )
}

export default App