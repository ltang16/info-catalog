import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  // State data for course catalog from JSON file
  const [catalog, setCatalog] = useState([])
  
  // When the page loads, pull the data into the catalog state data from the JSON file
  useEffect(() => {
    axios.get("/infocatalog.json").then((res) => {setCatalog(res.data.catalog);});
  }, []);

  return (
    <>
    <h1>UC Berkeley Information Course Catalog, 2025-2026 Academic Year</h1>
    <ul className="course-list">
      {catalog && catalog.map((course) => (
        <li className="course-item">
          <p className="course-id">Info {course.id}</p>
          <p className="course-title">{course.title}</p>
        </li>
      ))}
    </ul>
    </>
  )
}

export default App