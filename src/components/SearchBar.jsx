import Form from "react-bootstrap/Form";

export function SearchBar({ onSearch, placeholder }) {
  return (
    <Form.Control
      type="text"
      className="mb-3"
      id="searchBarControl"
      placeholder={placeholder}
      onChange={(e) => onSearch(e)}
    />
  );
}
