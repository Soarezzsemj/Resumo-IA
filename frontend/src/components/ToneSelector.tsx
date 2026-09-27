import styles from "./FormatSelector.module.css";

export type SummaryTone = "formal" | "casual" | "technical";
const tones: Array<{ value: SummaryTone; label: string }> = [
  { value: "formal", label: "Formal" },
  { value: "casual", label: "Casual" },
  { value: "technical", label: "Técnico" },
];

export default function ToneSelector({ value, onChange }: { value: SummaryTone; onChange: (value: SummaryTone) => void }) {
  return <fieldset className={styles.fieldset}><legend>Tom do resumo</legend><div className={styles.options}>
    {tones.map((tone) => <label key={tone.value} className={`${styles.option} ${value === tone.value ? styles.selected : ""}`}>
      <input type="radio" name="summary-tone" checked={value === tone.value} onChange={() => onChange(tone.value)} />{tone.label}
    </label>)}
  </div></fieldset>;
}
