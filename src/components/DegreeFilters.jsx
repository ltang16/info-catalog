function DegreeFilters({ degReq, onClick }) {
  return (
    <div className="requirement-filters">
        <p className="requirement-filters-text">MIMS degree requirement type:</p>
        <button 
            className={`requirement-filters-btn ${degReq === "tech" ? 'active' : ''}`}
            onClick={() => onClick('tech')}
            disabled={degReq === 'tech'}>
            Technology
        </button>
        <button 
            className={`requirement-filters-btn ${degReq === "ssp" ? 'active' : ''}`}
            onClick={() => onClick('ssp')}
            disabled={degReq === 'ssp'}>
            Social Science and Policy
        </button>
        <button 
            className={`requirement-filters-btn ${degReq === "all" ? 'active' : ''}`}
            onClick={() => onClick('all')}
            disabled={degReq === 'all'}>
            All Information Courses
        </button>
    </div>
  )
}

export default DegreeFilters