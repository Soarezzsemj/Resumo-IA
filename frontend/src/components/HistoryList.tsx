import styles from "./HistoryList.module.css";

export type HistoryItem = { id: number; original: string; summary: string; model: string; fallback: boolean };
type Props = { items: HistoryItem[]; onSelect: (item: HistoryItem) => void };

export default function HistoryList({ items, onSelect }: Props) {
  if (!items.length) return null;
  return (
    <section className={styles.history} aria-label="Histórico da sessão">
      <h3>Histórico recente</h3>
      {items.map((item) => (
        <button type="button" key={item.id} className={styles.item} onClick={() => onSelect(item)}>
          <span>{item.summary.replace(/\s+/g, " ").slice(0, 92)}{item.summary.length > 92 ? "…" : ""}</span>
          <small>{item.model}</small>
        </button>
      ))}
    </section>
  );
}
