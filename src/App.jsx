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
          <p className="course-id">ID: {course.id}</p>
          <p className="course-text">{course.text}</p>
        </li>
    ))}
    </ul>
    </>
  )
}

export default App

// TO-DO:
// 1. create the JSON course catalog
//    a. add all courses
//    b. add "topics" metadata to all courses (as list)
// 2. build catalog page CSS
// 3. add form for course addition to catalog
// 4. enable course item editing (ideally in place rather than sending to form at bottom...)
// 5. 800+ word writeup :)
// 6. host live demo on Netlify or something similar
// 7. add all code to Github!