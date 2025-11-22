function DSCertificateFilters({ DScert, onClick }) {
  return (
    <div className="certificate-filters">
        <p className="certificate-filters-text">Applied Data Science Certificate course type:</p>
        <button 
            className={`certificate-filters-btn ${DScert === "DScert" ? 'active' : ''}`}
            onClick={() => onClick('DScert')}
            disabled={DScert === 'DScert'}>
            All Applicable Courses
        </button>
        <button 
            className={`certificate-filters-btn ${DScert === "intro" ? 'active' : ''}`}
            onClick={() => onClick('intro')}
            disabled={DScert === 'intro'}>
            Introductory Data Science
        </button>
        <button 
            className={`certificate-filters-btn ${DScert === "amt" ? 'active' : ''}`}
            onClick={() => onClick('amt')}
            disabled={DScert === 'amt'}>
            Analytical Methods and Techniques of Data Science
        </button>
        <button 
            className={`certificate-filters-btn ${DScert === "elective" ? 'active' : ''}`}
            onClick={() => onClick('elective')}
            disabled={DScert === 'elective'}>
            Elective
        </button>
        <button 
            className={`certificate-filters-btn ${DScert === "all" ? 'active' : ''}`}
            onClick={() => onClick('all')}
            disabled={DScert === 'all'}>
            All Information Courses
        </button>
    </div>
  )
}

export default DSCertificateFilters