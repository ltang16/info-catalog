function CatalogCourse({ course }) {
    // Creating a new string for instructor names, since some courses had multiple head instructors
    const instructors = Array.isArray(course.instructor) ? course.instructor.join(", ") : course.instructor;

    return (
        <li className="course-item">
            <p className="course-id-title">Info {course.id}: {course.title}</p>
            <p className="course-units">{course.units} Units</p>
            <p className="course-instructor">Instructor(s): {instructors}</p>
            <p className="course-description">{course.description}</p>
        </li>
    )
}

export default CatalogCourse