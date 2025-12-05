import { useState, useEffect } from 'react'
import './App.css'
import jsonData from './data/infocatalog.json'
import Navbar from './components/Navbar'
import FilterSidebar from './components/FilterSidebar'
import Breadcrumbs from './components/Breadcrumbs'
import CatalogList from './components/CatalogList'
import CourseAddForm from './components/CourseAddForm'
import { LuArrowUpToLine } from "react-icons/lu"



function App() {
  // State data for course catalog from JSON file -- use catalog data from localStorage if it's there, or use
  // the data in the JSON file
  const [catalog, setCatalog] = useState(
    JSON.parse(localStorage.getItem("info-catalog")) ||
    jsonData.catalog
  )



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

  // Function to clear ALL applied filters and return to default state (showing all Info courses)
  const clearAllFilters = () => {
    setDegReq('all')
    setDSCert('all')
    setTopics([])
  }

  // Create variable to determine if breadcrumb component should exist (only if at least one filter has been applied)
  const noBreadcrumbs = (degReq === 'all' && DScert === 'all' && topics.length === 0)



  // Derived state for filtered and sorted catalog, based on degree requirement, DS certificate, and topics filters
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
    // Course topics filter -- allows multi-select! A course is displayed if it matches at least one filtered topic
    if (topics.length === 0) {
      return true;
    } else {
      return topics.some(t => course.topics.includes(t));
    }
  }).sort((a, b) =>
    // Finally, sort the filtered catalog array in ascending order by course ID and then course title :)
    String(a.id).localeCompare(String(b.id)) || String(a.title).localeCompare(String(b.title))
  )



  // Function to smoothly scroll to a section when the link is clicked, without reloading the page :)
  const handleLinkClick = (e) => {
    e.preventDefault()
    const targetID = e.currentTarget.getAttribute('href')
    const targetSection = document.querySelector(targetID)
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  

  // Function to add course data from course addition form component to catalog! 
  const addCourse = (formData) => {
    // Handle 0 or multiple instructors
    if (!formData.instructor) {
      formData.instructor = "Staff"
    } else if (formData.instructor.includes(',')) {
      const instructorList = formData.instructor.split(', ')
      formData.instructor = instructorList
    }
    // Handle empty values for optional course attributes
    if (!formData.timeslot) {
      formData.timeslot = null
    }
    if (!formData.location) {
      formData.location = null
    }
    if (!formData.requirements) {
      formData.requirements = null
    }
    if (!formData.DScertification) {
      formData.DScertification = null
    }
    if (!formData.other) {
      formData.other = null
    }
    // Parse topics list -- always needs to be in list format
    const topicsList = formData.topics.split(', ')
    formData.topics = topicsList
    // Update the catalog with the new course! :) new additions will always be at the end of the JSON file
    // But the catalog will be sorted by course ID and title!
    setCatalog([...catalog, formData])
  }

  // Function to update course in catalog with new data from editable course component!
  const editCourse = (formData) => {
    // Handle 0 or multiple instructors
    if (!formData.instructor) {
      formData.instructor = "Staff"
    } else if (formData.instructor.includes('~')) {
      const instructorList = formData.instructor.split('~ ')
      formData.instructor = instructorList
    }
    // Handle empty or list values for various course attributes
    if (formData.semester.includes('~')) {
      const semesterList = formData.semester.split('~ ')
      formData.semester = semesterList
    }
    if (!formData.timeslot) {
      formData.timeslot = null
    } else if (formData.timeslot.includes('~')) {
      const timeslotList = formData.timeslot.split('~ ')
      formData.timeslot = timeslotList
    }
    if (!formData.location) {
      formData.location = null
    } else if (formData.location.includes('~')) {
      const locationList = formData.location.split('~ ')
      formData.location = locationList
    }
    if (!formData.requirements) {
      formData.requirements = null
    }
    if (!formData.DScertification) {
      formData.DScertification = null
    }
    // Parse topics list
    console.log(formData.topics)
    const topicsList = formData.topics.split(', ')
    formData.topics = topicsList
    // Finally, update the catalog with the new course information -- first a direct state mutation, then updating
    // catalog state data to trigger the localStorage update effect :)))
    catalog.forEach(course => {
      if (course.index === formData.index) {
        course.id = formData.id;
        course.title = formData.title;
        course.units = formData.units;
        course.instructor = formData.instructor;
        course.description = formData.description;
        course.semester = formData.semester;
        course.timeslot = formData.timeslot;
        course.location = formData.location;
        course.type = formData.type;
        course.requirements = formData.requirements;
        course.DScertification = formData.DScertification;
        course.topics = formData.topics;
        course.other = formData.other;
    }})
    setCatalog([...catalog])
  }

  // Since I don't have a database to store the JSON file in, I'll use localStorage to keep track of the user's added 
  // and edited courses, which triggers every time the catalog state data changes
  // The existing JSON catalog file in the data folder will serve as a foundation for the catalog :)
  useEffect(() => {
    localStorage.setItem("info-catalog", JSON.stringify(catalog));
  }, [catalog])



  // Added styling for "return to top of page" icon :)
  const iconStyleRTT = {color: "#060081", height: "30px", width: "30px"}



  return (
    <>
    <Navbar degReq={degReq} handleReqFilter={handleReqFilter} DScert={DScert} handleDSCertFilter={handleDSCertFilter}
      catalog={catalog} topics={topics} toggleTopic={toggleTopic} clearAllFilters={clearAllFilters}/>
    <div className="header-section">
      <h1 className="catalog-title">UC Berkeley Information Course Catalog</h1>
      <p className="catalog-details">Welcome to the School of Information course catalog! This is a repository of all 
        graduate courses from the 2024-2025 and 2025-2026 academic years that are available for MIMS students to take.</p>
      <p className="catalog-details">Feel free to filter this course list based on MIMS degree requirements, Applied Data 
        Science certificate eligibility, or even your topics of interest. Core courses, which are required to obtain the 
        MIMS degree, are marked with 🌟.</p>
      <a className="add-form-shortcut" href="#course-add-section" onClick={handleLinkClick}>Add a New Course</a>
    </div>
    <FilterSidebar degReq={degReq} handleReqFilter={handleReqFilter} DScert={DScert} handleDSCertFilter={handleDSCertFilter}
      catalog={catalog} topics={topics} toggleTopic={toggleTopic} clearAllFilters={clearAllFilters}/>
    <div className="main-content">
      {!noBreadcrumbs && 
      <Breadcrumbs degReq={degReq} removeReq={handleReqFilter} DScert={DScert} removeDSCert={handleDSCertFilter} 
        topics={topics} removeTopic={toggleTopic}/>
      }
      <CatalogList catalog={filteredCatalog} onEditCourse={editCourse}/>
      <CourseAddForm catalog={catalog} onAddCourse={addCourse}/>
      <a className="page-top-shortcut" href="#root" onClick={handleLinkClick}>
        {/* Using a React icon for this page hyperlink :) */}
        <LuArrowUpToLine style={iconStyleRTT}/>
      </a>
    </div>
    </>
  )
}

export default App