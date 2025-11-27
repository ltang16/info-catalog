function DSCertificateFilters({ DScert, onClick }) {
  return (
    <div className="certificate-filters">
        <p className="certificate-filters-text">Applied Data Science Certificate course type:</p>
        <p className="certificate-filters-text-adl">(1 selection permitted)</p>
        {/* Using hybrid of radio buttons and checkboxes -- I don't want to allow multiple selections but I 
            do want to allow no selections (all courses shown) */}
        <label className="certificate-filters-btn-text">
          <input 
            type="checkbox" 
            className={`certificate-filters-btn ${DScert === "DScert" ? 'active': ''}`}
            onChange={() => onClick('DScert')}
            checked={DScert === 'DScert'}
            />
          All Applicable Courses
        </label>
        <label className="certificate-filters-btn-text">
          <input 
            type="checkbox" 
            className={`certificate-filters-btn ${DScert === "intro" ? 'active': ''}`}
            onChange={() => onClick('intro')}
            checked={DScert === 'intro'}
            />
          Introductory Data Science
        </label>
        <label className="certificate-filters-btn-text">
          <input 
            type="checkbox" 
            className={`certificate-filters-btn ${DScert === "amt" ? 'active': ''}`}
            onChange={() => onClick('amt')}
            checked={DScert === 'amt'}
            />
          Analytical Methods and Techniques of Data Science
        </label>
        <label className="certificate-filters-btn-text">
          <input 
            type="checkbox" 
            className={`certificate-filters-btn ${DScert === "elective" ? 'active': ''}`}
            onChange={() => onClick('elective')}
            checked={DScert === 'elective'}
            />
          Elective
        </label>
    </div>
  )
}

export default DSCertificateFilters