import styles from "./FormatSelector.module.css";

export type SummaryFormat = "topics" | "paragraph" | "tldr";

const formats: Array<{ value: SummaryFormat; label: string }> = [
  { value: "topics", label: "Tópicos" },
  { value: "paragraph", label: "Parágrafo" },
  { value: "tldr", label: "Uma frase (TL;DR)" },
];

type Props = { value: SummaryFormat; onChange: (format: SummaryFormat) => void };

export default function FormatSelector({ value, onChange }: Props) {
  return (
    <fieldset className={styles.fieldset}>
      <legend>Formato do resumo</legend>
      <div className={styles.options}>
        {formats.map((format) => (
          <label key={format.value} className={`${styles.option} ${value === format.value ? styles.selected : ""}`}>
            <input type="radio" name="summary-format" value={format.value} checked={value === format.value} onChange={() => onChange(format.value)} />
            {format.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
