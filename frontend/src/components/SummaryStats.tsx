import styles from "./SummaryStats.module.css";

function countWords(value: string) {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

type Props = { original: string; summary: string };

export default function SummaryStats({ original, summary }: Props) {
  const originalWords = countWords(original);
  const summaryWords = countWords(summary);
  const reduction = originalWords ? Math.max(0, Math.round((1 - summaryWords / originalWords) * 100)) : 0;
  return (
    <div className={styles.stats}>
      <span>{originalWords} → {summaryWords} palavras</span>
      <span>{original.length} → {summary.length} caracteres</span>
      <strong>{reduction}% menor</strong>
    </div>
  );
}
