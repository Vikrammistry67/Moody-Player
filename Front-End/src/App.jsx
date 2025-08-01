import { useState } from "react";
import "./App.css"
import FaceExpressionDetector from "./components/FaceExpressionDetector"
import Songs from "./components/Songs"
const App = () => {
  const [songs, setSongs] = useState([]);
  console.log("songs ---> ", songs)
  return (
    <div className="w-screen  gap-2 flex flex-col items-center justify-center py-5 bg-zinc-900">
      <FaceExpressionDetector setSongs={setSongs} />
      <Songs songs={songs} />
    </div>
  )
}

export default App