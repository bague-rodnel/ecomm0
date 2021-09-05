import React, { useState } from 'react';

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/products');
    }
  }

  return (
    <form onSubmit={ searchHandler }>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          className="form-control"
          placeholder="Enter Product Name ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-light z-0">
            <i className="fa fa-search" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </form>
  )
}

export default Search
