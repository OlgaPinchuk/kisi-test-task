export default function SearchBar({ onSearch, placeholder }) {
  return (
    <div className="d-flex justify-content-between mb-3">
      <div className="col-9">
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder={placeholder}
          onChange={(e) => onSearch(e)}
        />
      </div>
    </div>
  );
}
