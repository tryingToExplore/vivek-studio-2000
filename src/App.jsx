import Portfolio3D from "./components/Portfolio3D";
import { Analytics } from "@vercel/analytics/next";
function App() {
  return (
    <>
      <Portfolio3D />
      <Analytics />
    </>
  );
}

export default App;
