function DegreeFilters({ degReq, onClick }) {
  return (
    <div className="requirement-filters">
        <p className="requirement-filters-text">MIMS degree requirement type:</p>
        {/* Using hybrid of radio buttons and checkboxes -- I don't want to allow multiple selections but I 
            do want to allow no selections (all courses shown) */}
        <label className="requirement-filters-btn-text">
          <input 
            type="checkbox" 
            className={`requirement-filters-btn ${degReq === "tech" ? 'active': ''}`}
            onChange={() => onClick('tech')}
            checked={degReq === 'tech'}
            />
          Technology
        </label>
        <label className="requirement-filters-btn-text">
          <input 
            type="checkbox" 
            className={`requirement-filters-btn ${degReq === "ssp" ? 'active': ''}`}
            onChange={() => onClick('ssp')}
            checked={degReq === 'ssp'}
            />
          Social Science and Policy
        </label>
    </div>
  )
}

export default DegreeFilters