export default function ErrorMessage({ message, queryLength }) {
  return (
    <p className="error">
      {queryLength > 3 ? <span>⛔</span> : <span>📽️</span>} {message}
    </p>
  );
}
