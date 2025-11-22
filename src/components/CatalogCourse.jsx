function CatalogCourse({ course }) {
    // Create a new string for instructor names, since some courses have multiple head instructors
    const instructors = Array.isArray(course.instructor) ? course.instructor.join(", ") : course.instructor

    // Split description according to newline characters to improve legibility
    const descriptionArray = course.description.split("\n")

    // Create new string or array of strings for timeslots, separating by semester if the course is offered in both semesters
    let timeslots
    if (Array.isArray(course.semester)) {
        timeslots = []
        for (let i = 0; i < course.semester.length; i++) {
            timeslots[i] = `${course.semester[i]}: ${course.timeslot[i]} — ${course.location[i]}`
        }
    } else {
        // Only single-semester courses had some fields that were null thankfully, but I want to replace the nulls here
        const timeslot = course.timeslot ? course.timeslot : "Unknown Time"
        const location = course.location ? course.location : "Unknown Location"
        timeslots = `${course.semester}: ${timeslot} — ${location}`
    }

    return (
        <li className="course-item" id={course.index}>
            <p className="course-id-title">{course.type === "Core" ? "🌟 " : ""}Info {course.id}: {course.title}</p>
            <p className="course-units">{course.units} Units</p>
            <p className="course-instructor">Instructor(s): {instructors}</p>
            <div className="course-timeslot">
                <p className="course-timeslot-text">Timeslot(s):</p>
                {Array.isArray(timeslots) ? timeslots.map((ts) => (
                    <p className="course-timeslot-details">{ts}</p>
                )) : timeslots}
            </div>
            <div className="course-description-container">
                {descriptionArray.map((desc) => (
                    <p className="course-description">{desc}</p>
                ))}
            </div>

            {/* If there's other information about this course, add it here in smaller text */}
            {!course.other ? "" : <p className="other">{course.other}</p>}

            {/* If this course satisfies one of the MIMS degree requirements, add this section */}
            {!course.requirements ? "" : <div className="course-requirements">
                <p className="course-requirements-text">Meets the MIMS </p>
                <p className="course-requirements-req">{course.requirements}</p>
                <p className="course-requirements-text">degree requirement</p>
            </div>}

            {/* If this course can be counted towards the Applied DS certificate, add this section */}
            {!course.DScertification ? "" : <div className="course-DScert">
                <p className="course-DScert-text">Counts towards the Graduate Certificate in Applied Data Science as an </p>
                <p className="course-DScert-type">{course.DScertification}</p>
            </div>}

            <div className="course-topics">
                <p className="course-topics-text">Topics covered: </p>
                {course.topics.map((topic) => (
                    <p className="course-topic">{topic}</p>
                ))}
            </div>
        </li>
    )
}

export default CatalogCourse