import React, { useState, useEffect } from 'react'
import './App.css'
import Search from './Components/Search.jsx'

const App = () => {
  const [issues, setIssues] = useState([])
  const [filteredIssues, setFilteredIssues] = useState([])

  useEffect(() => {
    fetch('https://api.github.com/repos/facebook/react/issues')
      .then(response => response.json())
      .then(data => {
        setIssues(data)
        setFilteredIssues(data)
      })
      .catch(error => {
        console.error('Error fetching issues:', error)
      })
  }, [])

  const handleSearch = searchTerm => {
    const filteredIssues = issues.filter(issue => {
      const { title, user } = issue
      const issueTitle = title.toLowerCase()
      const userName = user.login.toLowerCase()

      return issueTitle.includes(searchTerm.toLowerCase()) || userName.includes(searchTerm.toLowerCase())
    })

    setFilteredIssues(filteredIssues)
  }

  return (
    <div>
      <h1>React Issues</h1>
      <Search onSearch={handleSearch} />
      <ul>
        {filteredIssues.map(issue => (
          <li key={issue.id}>
            <a href={issue.html_url} target='_blank' rel='noopener noreferrer'>
              #{issue.id} - {issue.title}
            </a>
            <p>Opened by: {issue.user.login}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
