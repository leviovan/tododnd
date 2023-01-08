import "./App.css";
import Project from "./components/project/project";
import { Route, Routes } from "react-router-dom";
import Workspace from "./components/workspace/workspace";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Project />} />
        <Route path="/:id" element={<Workspace />} />
        <Route path="/*" element={<div> error</div>} />
      </Routes>
    </div>
  );
}

export default App;
