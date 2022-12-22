export function SearchBar({ onSearch, placeholder }) {
  return (
    <input
      type="text"
      className="form-control mb-3"
      id="exampleFormControlInput1"
      placeholder={placeholder}
      onChange={(e) => onSearch(e)}
    />
  );
}
