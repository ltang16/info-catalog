import { useEffect, useState } from 'react'



// This (very long) component produces the form at the bottom of the webpage that allows the user to add a course to the 
// catalog. It notifies the user if there are missing required inputs, and then appends the provided course data to the 
// end of the catalog data, with all changes stored in localStorage! 

function CourseAddForm({ catalog, onAddCourse, setNeedScroll }) {
    
  // State for form data, with default values for instructor, timeslot, location, requirements, DS certification, and other
  const [formData, setFormData] = useState({
    index: catalog.length + 1,
    id: '',
    title: '',
    units: '',
    instructor: '',
    description: '',
    semester: '',
    timeslot: '',
    location: '',
    type: '',
    requirements: '',
    DScertification: '',
    topics: '',
    other: ''
  })

  // Effect to correctly update the future course's index when the catalog updates after being pulled from JSON file
  useEffect(() => {
    setFormData(prev => ({
        ...prev,
        index: catalog.length + 1
    }))
  }, [catalog])

  // Error state data for error handling -- object with attributes for each formData field
  const [errors, setErrors] = useState({})

  // State data for success message
  const [successMessage, setSuccessMessage] = useState('')



  // Make changes to formData object when form input changes
  const handleChange = (e) => {
    const {name, value} = e.target
    // Update the form data
    setFormData(prev => ({
        ...prev,
        [name]: value
    }))
    // Clear error for this form field
    if (errors[name]) {
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }))
    }
  }

  // Change formData object when course type selection is made
  const handleTypeClick = (category) => {
    // Update the form data
    if (formData.type !== category) {
        setFormData(prev => ({
            ...prev,
            type: category
        }))
    } else {
        setFormData(prev => ({
            ...prev,
            type: null
        }))
    } 
    // Clear error for this field if it exists
    if (errors.type) {
        setErrors(prev => ({
            ...prev,
            type: ''
        }))
    }
  }

  // Change formData object when degree requirements selection is made
  const handleReqClick = (category) => {
    // Update the form data
    if (formData.requirements !== category) {
        setFormData(prev => ({
            ...prev,
            requirements: category
        }))
    } else {
        setFormData(prev => ({
            ...prev,
            requirements: null
        }))
    }
  }

  // Change formData object when DS certificate eligibility type is chosen
  const handleDSClick = (category) => {
    if (formData.DScertification !== category) {
        setFormData(prev => ({
            ...prev,
            DScertification: category
        }))
    } else {
        setFormData(prev => ({
            ...prev,
            DScertification: null
        }))
    }
  }



  // Handle form submission -- error validation, submission, adding to catalog :)
  const handleSubmit = (e) => {
    // Prevent page from reloading on submission
    e.preventDefault()

    // Validate all form fields
    const newErrors = {}
    if (!formData.id) {
        newErrors.id = "ID is required."
    } else if (parseInt(formData.id.split('').map(char => {return /[0-9]/.test(char) ? char : '';}).join('')) < 200) {
        newErrors.id = "ID must be at least 200 for graduate-level courses."
    } else if (!formData.id.split('').map(char => {return /[0-9]/.test(char)}).includes(true)) {
        newErrors.id = "ID must be have a numeric component."
    }
    if (!formData.title) {
        newErrors.title = "Title is required."
    }
    if (!formData.units) {
        newErrors.units = "Unit count is required."   
    } else if (formData.units.length === 1) {
        if (isNaN(parseInt(formData.units))) {
            newErrors.units = "Unit count must be a numeric value."
        } else if (parseInt(formData.units) > 4 || parseInt(formData.units) <= 0) {
            newErrors.units = "Unit count must be between 1 and 4."
        }
    } else if (!isNaN(parseInt(formData.units)) && parseInt(formData.units) < 0) {
        newErrors.units = "Unit count must be between 1 and 4."
    } else if (formData.units.length > 1) {
        const unitsAlphCheck = formData.units.split('').map(c => {return /[a-zA-Z]/.test(c)})
        if (unitsAlphCheck.includes(true)) {
            newErrors.units = "Unit count must be a numeric value only."
        }
        const unitsNumCheck = formData.units.split(' - ').map(n => (parseInt(n) >= 1 && parseInt(n) <= 4))
        if (unitsNumCheck.includes(false)) {
            newErrors.units = "Unit count must be a numeric value between 1 and 4."
        }
        if (formData.units.trim().split('-').includes('') || formData.units.trim().split('-').includes(' ')) {
            newErrors.units = "Incomplete unit range provided."
        }
    }
    if (!formData.description.trim() || !formData.description) {
        newErrors.description = "Description is required."
    }
    if (!formData.semester) {
        newErrors.semester = "Semester is required."
    }
    if (!formData.type) {
        newErrors.type = "Type is required."
    }
    if (!formData.topics) {
        newErrors.topics = "All courses must have at least 1 assigned topic."
    }

    // If there are errors, set them and don't submit the form!
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors)
        return
    }

    // Otherwise, the form is valid and we can submit it :) show a success message, then clear the form after a few seconds
    // Also jump to where the new course has been added to the catalog after the wait time
    const courseIndex = `i${formData.index}`
    setSuccessMessage('The course has been added to the catalog. Thank you for your submission!')
    onAddCourse(formData)
    setFormData({
        index: catalog.length + 1,
        id: '',
        title: '',
        units: '',
        instructor: '',
        description: '',
        semester: '',
        timeslot: '',
        location: '',
        type: '',
        requirements: '',
        DScertification: '',
        topics: '',
        other: ''
    })
    setTimeout(() => {
        setSuccessMessage('')
        setNeedScroll(courseIndex)
    }, 5000)
  }


  
  return (
    <div id="course-add-section">
        <h2 className="course-add-header">Add a New Course to the Catalog</h2>
        {successMessage ? <p className="success-message">{successMessage}</p> : 
        <form className="course-add-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-label" htmlFor="id">Course ID:</label>
                <input type="text" name="id" value={formData.id} onChange={handleChange}
                    className={`form-input ${errors.id ? 'error': ''}`}
                    placeholder="Ex: '201' for Info 201"/>      
                {errors.id && <p className="error-message">{errors.id}</p>}
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="title">Title:</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange}
                    className={`form-input ${errors.title ? 'error': ''}`}
                    placeholder="Ex: 'Information Law and Policy' for Info 205"/>      
                {errors.title && <p className="error-message">{errors.title}</p>}
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="units">Unit Count:</label>
                <input type="text" name="units" value={formData.units} onChange={handleChange}
                    className={`form-input ${errors.units ? 'error': ''}`}
                    placeholder="Enter a value between 1 and 4"/>      
                {errors.units && <p className="error-message">{errors.units}</p>}
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="instructor">Instructor Name(s):</label>
                <input type="text" name="instructor" value={formData.instructor} onChange={handleChange}
                    className="form-input"
                    placeholder="For multiple instructors, separate the names with a comma"/>
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="description">Course Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="4"
                    className={`form-input-description ${errors.description ? 'error': ''}`}
                    placeholder="Please provide a detailed description of the course"
                ></textarea> 
                {errors.description && <p className="error-message">{errors.description}</p>}
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="semester">Semester Offered:</label>
                <input type="text" name="semester" value={formData.semester} onChange={handleChange}
                    className={`form-input ${errors.semester ? 'error': ''}`}
                    placeholder="Ex: 'Fall 2025' or 'Spring 2026'"/>      
                {errors.semester && <p className="error-message">{errors.semester}</p>}
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="timeslot">Timeslot Offered:</label>
                <input type="text" name="timeslot" value={formData.timeslot} onChange={handleChange}
                    className="form-input"
                    placeholder="Ex: 'Thursday & Thursday, 11:00am - 12:30pm'"/>
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="location">Location:</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange}
                    className="form-input"
                    placeholder="Provide the building name followed by the room number"/>
            </div>
            <div className="form-group">
                <p className="form-btn-header">Course Type: </p>
                <div className="form-group-btn">
                    <label className="form-btn-label">
                        <input 
                            type="checkbox"
                            className={`form-btn ${formData.type === "Core" ? 'active' : ''}`}
                            onChange={() => handleTypeClick("Core")}
                            checked={formData.type === "Core"}
                        />
                        Core
                    </label>    
                    <label className="form-btn-label">
                        <input 
                            type="checkbox"
                            className={`form-btn ${formData.type === "Non-Core" ? 'active' : ''}`}
                            onChange={() => handleTypeClick("Non-Core")}
                            checked={formData.type === "Non-Core"}
                        />
                        Non-Core
                    </label>
                </div>    
                {errors.type && <p className="error-message">{errors.type}</p>}
            </div>
            <div className="form-group">
                <p className="form-btn-header">MIMS degree requirements fulfilled:</p>
                <div className="form-group-btn">
                    <label className="form-btn-label">
                    <input 
                        type="checkbox"
                        className={`form-btn ${formData.requirements === "Technology" ? 'active' : ''}`}
                        onChange={() => handleReqClick("Technology")}
                        checked={formData.requirements === "Technology"}
                        />
                        Technology
                    </label>    
                    <label className="form-btn-label">
                        <input 
                            type="checkbox"
                            className={`form-btn ${formData.requirements === "Social Science and Policy" ? 'active' : ''}`}
                            onChange={() => handleReqClick("Social Science and Policy")}
                            checked={formData.requirements === "Social Science and Policy"}
                        />
                        Social Science and Policy
                    </label>
                </div>
            </div>
            <div className="form-group">
                <p className="form-btn-header">Applied Data Science Certificate course type:</p>
                <div className="form-group-btn">
                    <label className="form-btn-label">
                    <input 
                        type="checkbox"
                        className={`form-btn ${formData.DScertification === "Introductory Data Science Course" ? 'active' : ''}`}
                        onChange={() => handleDSClick("Introductory Data Science Course")}
                        checked={formData.DScertification === "Introductory Data Science Course"}
                        />
                        Introductory Data Science
                    </label>    
                    <label className="form-btn-label">
                        <input 
                            type="checkbox"
                            className={`form-btn ${formData.DScertification === "Analytical Methods and Techniques of Data Science Course" ? 'active' : ''}`}
                            onChange={() => handleDSClick("Analytical Methods and Techniques of Data Science Course")}
                            checked={formData.DScertification === "Analytical Methods and Techniques of Data Science Course"}
                        />
                        Analytical Methods and Techniques of Data Science
                    </label>
                    <label className="form-btn-label">
                        <input 
                            type="checkbox"
                            className={`form-btn ${formData.DScertification === "Elective" ? 'active' : ''}`}
                            onChange={() => handleDSClick("Elective")}
                            checked={formData.DScertification === "Elective"}
                        />
                        Elective
                    </label>
                </div>
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="topics">Topics:</label>
                <input type="text" name="topics" value={formData.topics} onChange={handleChange}
                    className={`form-input ${errors.topics ? 'error': ''}`}
                    placeholder="Enter capitalized topics separated by commas and spaces, e.g. 'Data Science, Programming'. Refer to topics list in sidebar for existing topics, or add a new one"/>      
                {errors.topics && <p className="error-message">{errors.topics}</p>}
            </div>
            <div className="form-group">
                <label className="form-label" htmlFor="other">Other Details:</label>
                <textarea name="other" value={formData.other} onChange={handleChange} rows="3"
                    className={`form-input-other ${errors.other ? 'error': ''}`}
                    placeholder="Note any other relevant details here"
                ></textarea>
            </div>
            <button type="submit" className="course-add-submit">Submit Course</button>
        </form>
        }
    </div>
  )
}

export default CourseAddForm