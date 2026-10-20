import { annotations, type SectionId } from '@/config/annotations';

// Native disclosures make each layer accessible without client state.
export function SectionNote({ section }: { section: SectionId }) {
  const note = annotations[section];
  return (
    <details className="section-note" name="section-notes">
      <summary><span>{note.label}</span><span className="disclosure-mark" aria-hidden="true">+</span></summary>
      <div className="note-content">
        <p>{note.purpose}</p>
        <p className="note-outcome">{note.change}</p>
        <details className="code-note">
          <summary>Show code details <span aria-hidden="true">↗</span></summary>
          <dl>
            <dt>Change the content</dt>
            <dd><code>{note.file}</code><span>Edit <code>{note.field}</code>.</span></dd>
            <dt>Change the layout</dt>
            <dd><code>{note.layout}</code></dd>
            <dt>Change the look</dt>
            <dd><code>src/app/globals.css</code><span>Adjust colors, spacing, and type.</span></dd>
          </dl>
        </details>
      </div>
    </details>
  );
}
