import { useEffect, useContext, useRef } from "react";
import { debounce } from "lodash";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  AddGroup,
  GroupsList,
  PaginationComponent,
  SearchBar,
} from "../components";

import { GroupsContext } from "../context";

export default function GroupsPage() {
  // State
  const groupsData = useContext(GroupsContext);
  const { groups, pagination, loading, errorMessage } = groupsData;

  const debouncedSearch = useRef(
    debounce(async (query) => {
      await groupsData.searchGroups(query);
    }, 500)
  ).current;

  useEffect(() => {
    groupsData.fetchGroups();
  }, []);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Methods
  function handleSearch(e) {
    debouncedSearch(e.target.value);
  }

  async function handleDelete(id) {
    await groupsData.deleteGroup(id);
  }

  if (
    errorMessage === "The endpoint does not exist, please check your request."
  ) {
    return (
      <div className="d-flex p-2 justify-content-center m-5 alert alert-danger">
        <h2>Oops! We got an error. Please try again later</h2>
      </div>
    );
  }

  return (
    <Container className="m-4" fluid="SM">
      <h4 className="mb-3">Groups</h4>
      <Row>
        <Col>
          <SearchBar placeholder="Search Group" onSearch={handleSearch} />
        </Col>
        <Col md="auto">
          <AddGroup />
        </Col>
      </Row>

      {loading ? (
        <div className="d-flex p-2 justify-content-center m-5 ">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <GroupsList groups={groups} onDelete={handleDelete} />
          <PaginationComponent
            total={pagination.count}
            itemsPerPage={pagination.limit}
          />
        </>
      )}
    </Container>
  );
}
