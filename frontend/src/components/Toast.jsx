export default function Toast({ msg, isErr }) {
  return (
    <div
      className="toast"
      style={{ background: isErr ? 'var(--danger)' : 'var(--text)' }}
    >
      {msg}
    </div>
  )
}
