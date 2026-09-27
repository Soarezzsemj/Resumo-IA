import { useState } from "react";
import styles from "./InputBar.module.css";
import ExampleChips from "./ExampleChips";
import FormatSelector, { SummaryFormat } from "./FormatSelector";
import ToneSelector, { SummaryTone } from "./ToneSelector";
import LanguageSelector, { SummaryLanguage } from "./LanguageSelector";

const MAX_TEXT_LENGTH = 10000;
const MAX_WORDS = 2500;

function InputBar({ onSend, loading, onClear, apiUrl }: { onSend: (texto: string, format: SummaryFormat, tone: SummaryTone, language: SummaryLanguage, url?: string) => Promise<void>; loading: boolean; onClear: () => void; apiUrl: string }) {
    const [texto, setTexto] = useState("");
    const [url, setUrl] = useState("");
    const [format, setFormat] = useState<SummaryFormat>("paragraph");
    const [tone, setTone] = useState<SummaryTone>("formal");
    const [language, setLanguage] = useState<SummaryLanguage>("pt-BR");
    const [fileError, setFileError] = useState("");
    const wordCount = texto.trim() ? texto.trim().split(/\s+/).length : 0;
    const invalid = texto.length > MAX_TEXT_LENGTH || wordCount > MAX_WORDS;
    const canSubmit = Boolean(texto.trim() || url.trim()) && !invalid && !loading;

    const extractFile = async (file: File) => {
        setFileError("");
        const data = new FormData();
        data.append("file", file);
        try {
            const response = await fetch(`${apiUrl}/extract-file`, { method: "POST", body: data });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error);
            setTexto(result.text);
        } catch (error) {
            setFileError(error instanceof Error ? error.message : "Não foi possível ler o arquivo.");
        }
    };

    return (
        <div className={styles["main"]}>
            <ExampleChips onSelect={setTexto} />
            <div className={styles.sourceRow}>
                <label className={styles.urlLabel}>Ou cole um link de artigo
                    <input className={styles.urlInput} type="url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://exemplo.com/artigo" />
                </label>
                <label className={styles.fileDrop} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); const file = event.dataTransfer.files[0]; if (file) void extractFile(file); }}>Arraste ou selecione .txt/.pdf
                    <input type="file" accept=".txt,.pdf,text/plain,application/pdf" onChange={(event) => event.target.files?.[0] && void extractFile(event.target.files[0])} />
                </label>
            </div>
            <div className={styles["Box-input"]}> 
                <textarea
                    className={styles.textarea}
                    placeholder="Digite seu texto aqui..."
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Escape") { setTexto(""); setUrl(""); onClear(); }
                        if ((event.ctrlKey || event.metaKey) && event.key === "Enter" && canSubmit) {
                            event.preventDefault();
                            void onSend(texto, format, tone, language, url || undefined);
                        }
                    }}
                />
                <span className={`${styles.counter} ${invalid ? styles.invalid : ""}`}>
                    {texto.length.toLocaleString("pt-BR")}/{MAX_TEXT_LENGTH.toLocaleString("pt-BR")} caracteres
                </span>
            </div>
            <FormatSelector value={format} onChange={setFormat} />
            <div className={styles.secondaryControls}><ToneSelector value={tone} onChange={setTone} /><LanguageSelector value={language} onChange={setLanguage} /></div>
            {fileError && <span className={styles.fileError}>{fileError}</span>}
            <div className={styles.actions}>
            <button className={styles["submit-button"]} disabled={!canSubmit} onClick={() => void onSend(texto, format, tone, language, url || undefined)}>
                        {loading ? "Gerando resumo..." : "ENVIAR"}
            </button>
            <button type="button" className={styles.clearButton} disabled={loading && !texto} onClick={() => { setTexto(""); setUrl(""); onClear(); }}>Limpar</button>
            </div>
        </div>
    );
}

export default InputBar;