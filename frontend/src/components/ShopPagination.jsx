import React, { Fragment } from "react";
import Pagination from "react-js-pagination";

const ShopPagination = ({
  currentPage,
  resPerPage,
  productsCount,
  setCurrentPageNo,
}) => {
  return (
    <Fragment>
      <div className="col-12">
        <nav aria-label="navigation">
          <div className="pagination justify-content-end mt-50">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              hideNavigation={true}
              hideFirstLastPages={true}
              itemClass="page-item"
              linkClass="page-link"
            />
          </div>
        </nav>
      </div>
    </Fragment>
  );
};

export default ShopPagination;
