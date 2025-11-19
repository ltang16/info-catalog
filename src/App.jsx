import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import CatalogList from './components/CatalogList'

function App() {
  // State data for course catalog from JSON file
  const [catalog, setCatalog] = useState([])
  
  // When the page loads, pull the data into the catalog state data from the JSON file
  useEffect(() => {
    axios.get("/infocatalog.json").then((res) => {setCatalog(res.data.catalog);});
  }, []);

  return (
    <>
    <h1 className="catalog-title">UC Berkeley Information Course Catalog, 2025-2026 Academic Year</h1>
    <p className="catalog-details">Welcome to the course catalog! This is a repository of all graduate courses in the 2025-2026 academic year that are available for MIMS students to take.</p>
    <p className="catalog-details">Feel free to filter on the MIMS degree requirements, Applied Data Science certificate eligibility, or even your topics of interest. Core courses, which are required to obtain the MIMS degree, are marked with 🌟.</p>
    <CatalogList catalog={catalog}/>
    </>
  )
}

export default App