import React from "react";
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
  MDBBtn,
} from "mdb-react-ui-kit";

const Pagination = ({
  currentPage,
  pageLimit,
  loadBlogsData,
  data,
  totalBlogs,
}) => {
  const renderPagination = () => {
    if (currentPage === 0) {
      return (
        <MDBPagination center className="mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink>1</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBBtn rounded onClick={() => loadBlogsData()}>
              Next
            </MDBBtn>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
      return (
        <MDBPagination center className="mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink>
              <MDBBtn rounded onClick={() => loadBlogsData()}>
                Prev
              </MDBBtn>
            </MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage + 1}</MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>
              <MDBBtn rounded onClick={() => loadBlogsData()}>
                Next
              </MDBBtn>
            </MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
    } else {
      return (
        <MDBPagination center className="mb-0">
          <MDBPaginationItem>
            <MDBPaginationLink>
              <MDBBtn rounded onClick={() => loadBlogsData()}>
                Prev
              </MDBBtn>
            </MDBPaginationLink>
          </MDBPaginationItem>
          <MDBPaginationItem>
            <MDBPaginationLink>{currentPage - 1}</MDBPaginationLink>
          </MDBPaginationItem>
        </MDBPagination>
      );
    }
  };
  return <div>{renderPagination}</div>;
};
export default Pagination;
