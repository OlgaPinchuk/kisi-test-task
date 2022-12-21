export default function GroupsList({ groups, onDelete }) {
  if (!groups.length) return null;

  return (
    <ul className="list-group">
      {groups.map((item) => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between"
        >
          <div>{item.name}</div>
          <button className="btn btn-outline-danger" onClick={onDelete}>
            <i className="bi bi-trash"></i>
          </button>
        </li>
      ))}
    </ul>
  );
}
