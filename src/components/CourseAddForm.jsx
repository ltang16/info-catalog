import { useEffect, useState } from 'react'

function CourseAddForm({ catalog }) {

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
    // Clear success message from previous form submission
    if (successMessage) {
        setSuccessMessage('')
    }
  }

  // Change formData object when course type selection is made
  const handleTypeClick = (category) => {
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
  }

  // Change formData object when degree requirements selection is made
  const handleReqClick = (category) => {
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
    // TO-DO: when a new course is added or a course is edited, need to add useEffect() in App.jsx to change catalog and 
        // update the contents immediately -- when [catalog] dependency changes??? 
        // ALSO: 
            // need to parse multiple instructor names... and use 'Staff' if data field is null
            // need to parse topics list, comma-delimited
            // non-required fields (instructor, timeslot, location, requirements, DScertification, other) must be set to null in when being added to the catalog!!!
    e.preventDefault()

    // Validate all form fields
    const newErrors = {}
    if (!formData.id) {
        newErrors.id = "ID is required."
    } else if (parseInt(formData.id.split('').map(char => {return /[0-9]/.test(char) ? char : '';}).join('')) < 200) {
        newErrors.id = "ID must be at least 200 for graduate-level courses."
    }
    if (!formData.title) {
        newErrors.title = "Title is required."
    }
    if (!formData.units) {
        newErrors.units = "Unit count is required."   
    } else if (formData.units.length > 1) {
        const unitsCheck = formData.units.split(' - ').map(n => (parseInt(n) >= 1 && parseInt(n) <= 4))
        if (unitsCheck.includes(false)) {
            newErrors.units = "Unit count must be between 1 and 4."
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
    setSuccessMessage('The course has been added to the catalog. Thank you for your submission!')
    // TO-DO: add actual catalog update function here! 
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
    }, 3000)
  }


  
  return (
    <div id="course-add-section">
        <h2 className="course-add-header">Add a New Course to the Catalog</h2>
        <form className="course-add-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="form-id-label" htmlFor="id">Course ID</label>
                <input type="text" name="id" value={formData.id} onChange={handleChange}
                    className={`form-id ${errors.id ? 'error': ''}`}
                    placeholder="Ex: '201' for Info 201"/>      
                {errors.id && <p className="error-message">{errors.id}</p>}
            </div>
            <div className="form-group">
                <label className="form-title-label" htmlFor="title">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange}
                    className={`form-title ${errors.title ? 'error': ''}`}
                    placeholder="Ex: 'Information Law and Policy' for Info 205"/>      
                {errors.title && <p className="error-message">{errors.title}</p>}
            </div>
            <div className="form-group">
                <label className="form-units-label" htmlFor="units">Unit Count</label>
                <input type="text" name="units" value={formData.units} onChange={handleChange}
                    className={`form-units ${errors.units ? 'error': ''}`}
                    placeholder="Enter a value between 1 and 4"/>      
                {errors.units && <p className="error-message">{errors.units}</p>}
            </div>
            <div className="form-group">
                <label className="form-instructor-label" htmlFor="instructor">Instructor Name(s)</label>
                <input type="text" name="instructor" value={formData.instructor} onChange={handleChange}
                    className="form-instructor"
                    placeholder="For multiple instructors, separate the names with a comma"/>
            </div>
            <div className="form-group">
                <label className="form-description-label" htmlFor="description">Course Description</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange}
                    className={`form-description ${errors.description ? 'error': ''}`}
                    placeholder="Please provide a detailed description of the course"/>      
                {errors.description && <p className="error-message">{errors.description}</p>}
            </div>
            <div className="form-group">
                <label className="form-semester-label" htmlFor="semester">Semester Offered</label>
                <input type="text" name="semester" value={formData.semester} onChange={handleChange}
                    className={`form-semester ${errors.semester ? 'error': ''}`}
                    placeholder="Input should follow the format 'Season, Calendar Year'"/>      
                {errors.semester && <p className="error-message">{errors.semester}</p>}
            </div>
            <div className="form-group">
                <label className="form-timeslot-label" htmlFor="timeslot">Timeslot Offered</label>
                <input type="text" name="timeslot" value={formData.timeslot} onChange={handleChange}
                    className="form-timeslot"
                    placeholder="Ex: 'Thursday & Thursday, 11:00am - 12:30pm'"/>
            </div>
            <div className="form-group">
                <label className="form-location-label" htmlFor="location">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleChange}
                    className="form-location"
                    placeholder="Provide the building name followed by the room number"/>
            </div>
            <div className="form-group">
                <p className="form-type-text">Course Type: </p>
                <label className="form-type-label">
                    <input 
                        type="checkbox"
                        className={`form-type-btn ${formData.type === "Core" ? 'active' : ''}`}
                        onChange={() => handleTypeClick("Core")}
                        checked={formData.type === "Core"}
                    />
                    Core
                </label>    
                <label className="form-type-label">
                    <input 
                        type="checkbox"
                        className={`form-type-btn ${formData.type === "Non-Core" ? 'active' : ''}`}
                        onChange={() => handleTypeClick("Non-Core")}
                        checked={formData.type === "Non-Core"}
                    />
                    Non-Core
                </label>    
                {errors.type && <p className="error-message">{errors.type}</p>}
            </div>
            <div className="form-group">
                <p className="form-requirements-text">Degree requirements fulfilled:</p>
                <label className="form-requirements-label">
                    <input 
                        type="checkbox"
                        className={`form-requirements-btn ${formData.requirements === "Technology" ? 'active' : ''}`}
                        onChange={() => handleReqClick("Technology")}
                        checked={formData.requirements === "Technology"}
                    />
                    Technology
                </label>    
                <label className="form-requirements-label">
                    <input 
                        type="checkbox"
                        className={`form-requirements-btn ${formData.requirements === "Social Science and Policy" ? 'active' : ''}`}
                        onChange={() => handleReqClick("Social Science and Policy")}
                        checked={formData.requirements === "Social Science and Policy"}
                    />
                    Social Science and Policy
                </label>
            </div>
            <div className="form-group">
                <p className="form-DScert-text">Applied Data Science Certificate course type:</p>
                <label className="form-DScert-label">
                    <input 
                        type="checkbox"
                        className={`form-DScert-btn ${formData.DScertification === "Introductory Data Science Course" ? 'active' : ''}`}
                        onChange={() => handleDSClick("Introductory Data Science Course")}
                        checked={formData.DScertification === "Introductory Data Science Course"}
                    />
                    Introductory Data Science
                </label>    
                <label className="form-DScert-label">
                    <input 
                        type="checkbox"
                        className={`form-DScert-btn ${formData.DScertification === "Analytical Methods and Techniques of Data Science Course" ? 'active' : ''}`}
                        onChange={() => handleDSClick("Analytical Methods and Techniques of Data Science Course")}
                        checked={formData.DScertification === "Analytical Methods and Techniques of Data Science Course"}
                    />
                    Analytical Methods and Techniques of Data Science
                </label>
                <label className="form-DScert-label">
                    <input 
                        type="checkbox"
                        className={`form-DScert-btn ${formData.DScertification === "Elective" ? 'active' : ''}`}
                        onChange={() => handleDSClick("Elective")}
                        checked={formData.DScertification === "Elective"}
                    />
                    Elective
                </label> 
            </div>
            <div className="form-group">
                <label className="form-topics-label" htmlFor="topics">Topics</label>
                <input type="text" name="topics" value={formData.topics} onChange={handleChange}
                    className={`form-topics ${errors ? 'error': ''}`}
                    placeholder="Enter capitalized topics separated by commas. Refer to topics list in sidebar for existing topics, or add a new one"/>      
                {errors.topics && <p className="error-message">{errors.topics}</p>}
            </div>
            <div className="form-group">
                <label className="form-other-label" htmlFor="other">Other Details</label>
                <input type="text" name="other" value={formData.other} onChange={handleChange}
                    className="form-other"
                    placeholder="Note any other relevant details here"/>
            </div>
            <button type="submit" className="course-add-submit">Submit Course</button>
            {successMessage && <p className="success-message">{successMessage}</p>}
        </form> 
    </div>
  )
}

export default CourseAddForm