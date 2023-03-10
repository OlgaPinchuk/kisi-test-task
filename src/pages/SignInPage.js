import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../client";

export default function SignInPage() {
  const [domain, setDomain] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.logIn(domain, email, password);
      navigate("/groups");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div>
      <h3 className="mt-4 mb-4">Sign In for Kisi Test Task</h3>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="formDomain" className="form-label">
            Organization Domain
          </label>
          <input
            id="formDomain"
            className="form-control"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formEmail" className="form-label">
            Email address
          </label>
          <input
            id="formEmail"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="formPassword" className="form-label">
            Password
          </label>
          <input
            id="formPassword"
            className="form-control"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <div className="mb-3">
            <div className="alert alert-danger" role="alert">
              Incorrect email or password!
            </div>
          </div>
        )}
        <div className="mb-3">
          <button className="btn btn-primary">Sign In</button>
        </div>
      </form>
    </div>
  );
}
