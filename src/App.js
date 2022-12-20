import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import GroupsPage from "./pages/GroupsPage";

export default function App() {
  return (
    <div className="App container-lg">
      <Routes>
        <Route path="/">
          <Route index element={<SignInPage />} />
          <Route path="groups" element={<GroupsPage />} />
        </Route>
      </Routes>
    </div>
  );
}
