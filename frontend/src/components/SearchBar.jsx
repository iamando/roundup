import React, { Fragment, useState } from "react";

const SearchBar = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/product/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Fragment>
      <div
        className="search-wrapper section-padding-100"
        style={{ position: "absolute", top: "0" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="search-content">
                <form onSubmit={handleSearch}>
                  <input
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Type your keyword..."
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                  <button type="submit">
                    <img src="/img/core-img/search.png" alt="" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SearchBar;
