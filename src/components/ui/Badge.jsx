export default function Badge({ type, text }) {
  const badgeClass = `badge badge-${type.toLowerCase()}`;
  return <span className={badgeClass}>{text}</span>;
}
