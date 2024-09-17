import { BrowserRouter, Routes, Route } from "react-router-dom";
import Console from "./Components/Console";
import Now from "./Components/Now";
import { useEffect, useState } from "react";
import History from "./Components/History";
import styles from "./App.module.css";

async function fetchData() {
  try {
    const response = await fetch("http://localhost:5000/now", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    console.log(e.message);
  }
}

function App() {
  const [now, setNow] = useState("");
  useEffect(() => {
    async function getdata() {
      const data = await fetchData();
      setNow(data);
    }
    getdata();

    const intervalo_att = setInterval(getdata, 5000);

    return () => clearInterval(intervalo_att);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Console />
        <div className={styles.container}>
          <Routes>
            <Route path="/" element={<Now now={now} />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}
export default App;
