import { Route, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Layout from "./components/Layout";
import "./custom.css";

function App() {
  return (
    <Layout>
      <Routes>
        {AppRoutes.map((route, index) => {
          return <Route key={index} {...route} />;
        })}
      </Routes>
    </Layout>
  );
}
export default App;
