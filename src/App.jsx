import { useEffect, useState } from "react";
import Layout from "./Layout/Layout";
import Router from "./routes/Router";

function App() {
  const [category, setCategory] = useState(JSON.parse(localStorage.getItem('category'))||"all");
  useEffect(() => {
    localStorage.setItem("category", JSON.stringify(category));
  }, [category]);

  return (
    <div className="wrapper">
      <Layout category={category}>
        <Router setCategory={setCategory} category={category}/>
      </Layout>
    </div>
  );
}

export default App;
