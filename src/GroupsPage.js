import { useEffect, useState } from "react";

import client from "./client";

export default function GroupsPage() {
  return (
    <div className="m-4">
      <h4 className="mb-3">Groups</h4>
      <div className="d-flex justify-content-between mb-3">
        <div className="col-9">
          <input
            type="email"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Search Group"
          />
        </div>
        <div>
          <button className="btn btn-secondary">Add Group</button>
        </div>
      </div>
      <ul className="list-group">
        <li className="list-group-item d-flex justify-content-between">
          <div>Group Name 1</div>
          <button className="btn btn-outline-danger">
            <i className="bi bi-trash"></i>
          </button>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <div>Group Name 2</div>
          <button className="btn btn-outline-danger">
            <i className="bi bi-trash"></i>
          </button>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <div>Group Name 3</div>
          <button className="btn btn-outline-danger">
            <i className="bi bi-trash"></i>
          </button>
        </li>
      </ul>
      <nav className="mt-3" aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <button className="page-link">Previous</button>
          </li>
          <li className="page-item">
            <div className="page-link">1</div>
          </li>
          <li className="page-item">
            <button className="page-link">Next</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
