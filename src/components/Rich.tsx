/** Renders a string with **bold** spans. Keeps content.ts readable without pulling in a markdown lib. */
const Rich = ({ text }: { text: string }) => (
  <>
    {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className="font-semibold text-ink">
          {part}
        </strong>
      ) : (
        part
      ),
    )}
  </>
)

export default Rich
