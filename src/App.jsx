import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import CatalogList from './components/CatalogList'
import DegreeFilters from './components/DegreeFilters'
import DSCertificateFilters from './components/DSCertificateFilters'
import TopicFilters from './components/TopicFilters'

function App() {
  // State data for course catalog from JSON file
  const [catalog, setCatalog] = useState([])
  // When the page loads, pull the data into the catalog state data from the JSON file
  useEffect(() => {
    axios.get("/infocatalog.json").then((res) => {setCatalog(res.data.catalog);});
  }, []);

  // State data for MIMS degree requirement filter -- 'all Info courses' by default
  const [degReq, setDegReq] = useState('all')
  // Function to toggle active degree requirement filter according to which filter button is clicked
  const handleReqFilter = (category) => {
    if (degReq !== category) {
      setDegReq(category);
    } else {
      setDegReq('all');
    }
  }

  // State data for DS certificate course filter -- 'all Info courses' by default
  const [DScert, setDSCert] = useState('all')
  // Function to toggle active DS certificate course type according to which button is clicked
  const handleDSCertFilter = (category) => {
    if (DScert !== category) {
      setDSCert(category);
    } else {
      setDSCert('all');
    }
  }

  // State data for course topics to filter on -- empty by default
  const [topics, setTopics] = useState([])
  // Function to add or delete corresponding topic to/from topic filter list when topic button is clicked
  const toggleTopic = (topic) => {
    if (!topics.includes(topic)) {
      setTopics([...topics, topic]);
    } else {
      setTopics(topics.filter(t => t !== topic));
    }
  }

  // Derived state for filtered catalog, based on degree requirement, DS certificate, and topics filters
  // Filtering order doesn't matter since the resulting set of courses will be the same :) 
  const filteredCatalog = catalog.filter((course) => {
    // Degree requirements filter
    if (degReq === 'tech') return (course.requirements === "Technology");
    if (degReq === 'ssp') return (course.requirements === "Social Science and Policy");
    return true;
  }).filter((course) => {
    // DS certificate filter
    if (DScert === 'DScert') return (course.DScertification !== null);
    if (DScert === 'intro') return (course.DScertification === "Introductory Data Science Course");
    if (DScert === 'amt') return (course.DScertification === "Analytical Methods and Techniques of Data Science Course");
    if (DScert === 'elective') return (course.DScertification === "Elective");
    return true;
  }).filter((course) => {
    // Course topics filter
    if (topics.length === 0) {
      return true;
    } else {
      return topics.some(t => course.topics.includes(t));
    }
  })

  return (
    <>
    <h1 className="catalog-title">UC Berkeley Information Course Catalog</h1>
    <p className="catalog-details">Welcome to the School of Information course catalog! This is a repository of all 
      graduate courses from the 2024-2025 and 2025-2026 academic years that are available for MIMS students to take.</p>
    <p className="catalog-details">Feel free to filter this course list based on MIMS degree requirements, Applied Data 
      Science certificate eligibility, or even your topics of interest. Core courses, which are required to obtain the 
      MIMS degree, are marked with 🌟.</p>
    <DegreeFilters degReq={degReq} onClick={handleReqFilter}/>
    <DSCertificateFilters DScert={DScert} onClick={handleDSCertFilter}/>
    <TopicFilters catalog={catalog} topics={topics} onClick={toggleTopic}/>
    <CatalogList catalog={filteredCatalog}/>
    </>
  )
}

export default App