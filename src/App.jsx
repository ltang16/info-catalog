import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import CatalogList from './components/CatalogList'
import DegreeFilters from './components/DegreeFilters'
import DSCertificateFilters from './components/DSCertificateFilters'

function App() {
  // State data for course catalog from JSON file
  const [catalog, setCatalog] = useState([])
  // When the page loads, pull the data into the catalog state data from the JSON file
  useEffect(() => {
    axios.get("/infocatalog.json").then((res) => {setCatalog(res.data.catalog);});
  }, []);

  // State data for currently-active MIMS degree requirement filter -- 'all Info courses' by default
  const [degReq, setDegReq] = useState('all')
  // Function to toggle active degree requirement filter according to which filter button is clicked
  const handleReqFilter = (category) => {
    if (degReq !== category) {
      setDegReq(category);
    } else {
      setDegReq('all');
    }
  }

  // State data for currently-active DS certificate course filter -- 'all Info courses' by default
  const [DScert, setDSCert] = useState('all')
  // Function to toggle active DS certificate course type according to which button is clicked
  const handleDSCertFilter = (category) => {
    if (DScert !== category) {
      setDSCert(category);
    } else {
      setDSCert('all');
    }
  }

  // Derived state for filtered catalog, based on degree requirement, DS certificate, and topics filters
  const filteredCatalog = catalog.filter((course) => {
    if (degReq === 'tech') return (course.requirements === "Technology");
    if (degReq === 'ssp') return (course.requirements === "Social Science and Policy");
    return true;
  }).filter((course) => {
    if (DScert === 'DScert') return (course.DScertification !== null);
    if (DScert === 'intro') return (course.DScertification === "Introductory Data Science Course");
    if (DScert === 'amt') return (course.DScertification === "Analytical Methods and Techniques of Data Science Course");
    if (DScert === 'elective') return (course.DScertification === "Elective");
    return true;
  })
  
  
  // THINK ABOUT FILTERING ORDER -- SHOULD BE ABLE TO DO IT IN ANY ORDER RIGHT?

  return (
    <>
    <h1 className="catalog-title">UC Berkeley Information Course Catalog, 2025-2026 Academic Year</h1>
    <p className="catalog-details">Welcome to the School of Information course catalog! This is a repository of all graduate courses in the 2025-2026 academic year that are available for MIMS students to take.</p>
    <p className="catalog-details">Feel free to filter on the MIMS degree requirements, Applied Data Science certificate eligibility, or even your topics of interest. Core courses, which are required to obtain the MIMS degree, are marked with 🌟.</p>
    <DegreeFilters degReq={degReq} onClick={handleReqFilter}/>
    <DSCertificateFilters DScert={DScert} onClick={handleDSCertFilter}/>
    <CatalogList catalog={filteredCatalog}/>
    </>
  )
}

export default App