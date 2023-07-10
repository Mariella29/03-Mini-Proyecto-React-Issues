import React, { useState } from 'react'

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = event => {
    const searchTerm = event.target.value
    setSearchTerm(searchTerm)
    onSearch(searchTerm)
  }

  return (
    <input
      type='text'
      placeholder='Search'
      value={searchTerm}
      onChange={handleSearch}
    />
  )
}

export default Search
