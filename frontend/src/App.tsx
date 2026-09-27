import { useEffect, useState } from "react";
import InputBar from "./components/InputBar";
import SummaryBar from "./components/SummaryBar";
import Header from "./components/Header";
import EmptyState from "./components/EmptyState";
import HistoryList, { HistoryItem } from "./components/HistoryList";
import { SummaryFormat } from "./components/FormatSelector";
import { SummaryTone } from "./components/ToneSelector";
import { SummaryLanguage } from "./components/LanguageSelector";
import SummarySkeleton from "./components/SummarySkeleton";
import "./App.css";

function App() {
  const [summary, setSummary] = useState("");
  const [originalText, setOriginalText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [modelInfo, setModelInfo] = useState<{ model: string; fallback: boolean }>();
  const apiUrl = process.env.REACT_APP_API_URL || "https://resumo-ia.onrender.com/api";

  useEffect(() => {
    fetch(`${apiUrl}/model-info`)
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then(setModelInfo).catch(() => undefined);
  }, [apiUrl]);

  const enviarTexto = async (texto: string, format: SummaryFormat, tone: SummaryTone, language: SummaryLanguage, url?: string): Promise<void> => {
    let timeout: number | undefined;
    try {
      setLoading(true);
      setError("");
      setSummary("");
      const controller = new AbortController();
      timeout = window.setTimeout(() => controller.abort(), 35_000);
      const response = await fetch(`${apiUrl}/summary`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: texto, format, tone, language, url }),
        signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.code || "AI_ERROR");
      setSummary(data.summary);
      setOriginalText(data.sourceText || texto);
      setModelInfo({ model: data.model, fallback: data.fallback });
      setHistory((current) => [
        { id: Date.now(), original: data.sourceText || texto, summary: data.summary, model: data.model, fallback: data.fallback },
        ...current,
      ].slice(0, 5));
    } catch (err) {
      setError((err as Error).name === "AbortError"
        ? "A geração demorou demais. Tente novamente."
        : err instanceof Error && err.message === "INVALID_TEXT"
          ? "Confira o tamanho do texto informado."
          : err instanceof Error && err.message === "MODEL_UNAVAILABLE"
            ? "O modelo de resumo está temporariamente indisponível."
            : err instanceof Error && err.message === "RATE_LIMIT"
              ? "O serviço está ocupado. Aguarde alguns instantes."
              : "Não foi possível gerar o resumo. Verifique sua conexão e tente novamente.");
    } finally {
      if (timeout) window.clearTimeout(timeout);
      setLoading(false);
    }
  };

  const clearCurrent = () => {
    setSummary("");
    setOriginalText("");
    setError("");
  };

  const selectHistory = (item: HistoryItem) => {
    setOriginalText(item.original);
    setSummary(item.summary);
    setModelInfo({ model: item.model, fallback: item.fallback });
    setError("");
  };

  return (
    <>
      <Header />
      <div className="hero">
        <span className="badge">✦ Powered by AI</span>
        <p className="descricao">Cole qualquer texto abaixo e receba um resumo claro e objetivo, gerado por inteligência artificial — rápido e automaticamente.</p>
      </div>
      <div className="layout">
        <div className="left">
          <InputBar onSend={enviarTexto} onClear={clearCurrent} loading={loading} apiUrl={apiUrl} />
        </div>
        <div className="right">
          {error && <p className="error-message" role="alert">{error}</p>}
          {loading ? <SummarySkeleton /> : (summary ? (
            <>
              <SummaryBar summary={summary} original={originalText} />
              {modelInfo && <span className="model-info">Gerado por {modelInfo.model}{modelInfo.fallback ? " (fallback)" : ""}</span>}
            </>
          ) : <EmptyState />)}
          <HistoryList items={history} onSelect={selectHistory} />
        </div>
      </div>
      <footer className="footer">Resume AI © 2026 — Resumos inteligentes em segundos</footer>
    </>
  );
}

export default App;
