import { useState } from "react";
import styles from "./SummaryBar.module.css";

function SummaryBar({ summary }: { summary: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <h2 className={styles.title}>Resumo Gerado</h2>
        <button className={styles.copyBtn} onClick={handleCopy}>
          {copied ? "Copiado ✓" : "Copiar"}
        </button>
      </div>
      <hr className={styles.divider} />
      <p className={styles.text}>{summary}</p>
    </div>
  );
}

export default SummaryBar;