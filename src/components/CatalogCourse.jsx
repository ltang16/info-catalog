import { useState, useEffect, useCallback } from 'react'
import { FaEdit } from 'react-icons/fa'
import EditingCourse from './EditingCourse'



// This component presents all details for each course in the filtered catalog, as the course data is stored in the JSON 
// file. The user can also edit each course by clicking the edit button, which will bring up a different form-based 
// component to store the user's changes to the course details.

function CatalogCourse({ course, onEditCourse, setNeedScroll }) {

    // Create a new string for instructor names, since some courses have multiple head instructors
    const instructors = Array.isArray(course.instructor) ? course.instructor.join(", ") : course.instructor

    // Split description according to newline characters to improve legibility
    const descriptionArray = course.description.split("\n")

    // Create new string or array of strings for timeslots, separating by semester if the course is offered in both semesters
    let timeslots
    if (Array.isArray(course.semester)) {
        // For courses offered in multiple semesters, display from most to least recent
        timeslots = []
        for (let i = 0; i < course.semester.length; i++) {
            timeslots[course.semester.length-1-i] = `${course.semester[i]}: ${course.timeslot[i]} — ${course.location[i]}`
        }
    } else {
        // Only single-semester courses had some fields that were null thankfully, but I want to replace the nulls here
        const timeslot = course.timeslot ? course.timeslot : "Unknown Time"
        const location = course.location ? course.location : "Unknown Location"
        timeslots = `${course.semester}: ${timeslot} — ${location}`
    }



    // State data to determine if the course is currently being edited by the user -- false by default
    const [isEditing, setIsEditing] = useState(false)
    // Function to toggle course editing state (when edit and save buttons are clicked)
    const toggleEdit = () => {
        setIsEditing(!isEditing)
    }

    

    // Styling for edit button icon
    const iconStyleEdit = {color: "#060081", height: "25px", width: "25px"}



    return (
        <>
            {isEditing ? 
            <EditingCourse course={course} toggleEdit={toggleEdit} onEditCourse={onEditCourse} 
                setNeedScroll={setNeedScroll}/> :
            <li className="course-item" id={`i${course.index}`}>
                <div className="course-header">
                    <p className="course-id-title">{course.type === "Core" ? "🌟 " : ""}Info {course.id}: {course.title}</p>
                    <button 
                        className="course-edit-btn"
                        onClick={toggleEdit}>
                        <FaEdit style={iconStyleEdit}/> 
                    </button>    
                </div> 
                <p className="course-units">{course.units} Units</p>
                <p className="course-instructor">Instructor(s): {instructors}</p>
                <ul className="course-timeslot">
                    <p className="course-timeslot-text">Timeslot(s):</p>
                    {Array.isArray(timeslots) ? timeslots.map((ts, index) => (
                        <li className="course-timeslot-details">{ts}</li>
                    )) : 
                        <p className="course-timeslot-details-single">{timeslots}</p>}
                </ul>
                <div className="course-description-container">
                    {descriptionArray.map((desc) => (
                        <p className="course-description">{desc}</p>
                    ))}
                </div>

                {/* If there's other information about this course, add it here in smaller text */}
                {!course.other ? "" : <p className="course-other">{course.other}</p>}

                {/* If this course satisfies one of the MIMS degree requirements, add this section */}
                {!course.requirements ? "" : <p className="course-requirements">
                    Meets the MIMS
                    <span className="course-requirements-req">{course.requirements}</span>
                    degree requirement
                </p>}

                {/* If this course can be counted towards the Applied DS certificate, add this section */}
                {!course.DScertification ? "" : <p className="course-DScert">
                    Counts towards the Graduate Certificate in Applied Data Science as an
                    <span className="course-DScert-type">{course.DScertification}</span>
                </p>}

                <div className="course-topics">
                    <p className="course-topics-text">Topics: </p>
                    {course.topics.map((topic) => (
                        <p className="course-topic">{topic}</p>
                    ))}
                </div>
            </li>
            }
        </>
    )
}

export default CatalogCourse