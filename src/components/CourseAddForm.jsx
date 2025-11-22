import { useState } from 'react'

function CourseAddForm() {

  // TO-DO: FINISH ERROR HANDLING
  // Error handling -- create object with attributes for each form field
  const [errors, setErrors] = useState({})

  // TO-DO: FINISH SUBMIT HANDLER
  const handleSubmit = (e) => {
    // Prevent page from reloading on submission
    // TO-DO: when a new course is added or a course is edited, need to add useEffect() in App.jsx to change catalog and 
        // update the contents immediately -- when [catalog] dependency changes??? 
    e.preventDefault()
  }
  
  return (
    <div id="course-add-section">
        <h2 className="course-add-header">Add a New Course to the Catalog</h2>
        {/* NEED TO ADD COURSE SUBMISSION HANDLER + COURSE ADDITION FXN -- 
            SEE VALUE FIELDS FOR STATE DATA!*/}
        <form className="course-add-form" onSubmit={handleSubmit}>
            <label className="form-id-label" htmlFor="form-id">Course ID</label>
            {/* NEED TO ADD FORM ONCHANGE HANDLERS*/}
            <input type="text" name="form-id"
                className={`form-id ${errors ? 'error': ''}`}
                placeholder="Ex: '201' for Info 201"
                required/>        
        </form>
    </div>
  )
}

export default CourseAddForm