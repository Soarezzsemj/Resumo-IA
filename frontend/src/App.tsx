import { useState } from "react";
import InputBar from "./components/InputBar";
import SummaryBar from "./components/SummaryBar";
import "./App.css";

function App() {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const enviarTexto = async (texto: string) => {
    try {
      setLoading(true);
      setSummary(""); // limpa o resumo anterior

      const response = await fetch("https://resumo-ia.onrender.com/api/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: texto })
      });

      const data = await response.json();

      setSummary(data.summary);
    } catch (err) {
      console.error("Erro ao enviar:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      <div className="left">
        <InputBar onSend={enviarTexto} />

        {loading && (
          <div className="loading-icon">
            <div className="spinner"></div>
          </div>
        )}
      </div>

      <div className="right">
        {!loading && summary && <SummaryBar summary={summary} />}
      </div>
    </div>
  );
}

export default App;
