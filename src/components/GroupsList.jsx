export default function GroupsList({ groups, onDelete }) {
  if (!groups.length) return null;

  const GroupItem = ({ item }) => {
    const { name } = item;
    return (
      <>
        <div>{name}</div>
        <button className="btn btn-outline-danger" onClick={onDelete}>
          <i className="bi bi-trash"></i>
        </button>
      </>
    );
  };

  return (
    <ul className="list-group">
      {groups.map((item) => (
        <li
          key={item.id}
          className="list-group-item d-flex justify-content-between"
        >
          <GroupItem item={item} />
        </li>
      ))}
    </ul>
  );
}
