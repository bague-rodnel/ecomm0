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
    setKeyword('');
  }

  return (
    <form onSubmit={ searchHandler }>
      <div className="input-group">
        <input
          type="text"
          id="search_field"
          value={keyword}
          className="form-control rounded-left z-1"
          placeholder="Enter product keyword..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <div className="input-group-append">

          <button className="btn btn-outline-light z-0 rounded-right">
            <i className="fa fa-search" aria-hidden="true"></i>

          </button>
        </div>
      </div>
    </form>
  )
}

export default Search
