import DegreeFilters from './DegreeFilters'
import DSCertificateFilters from './DSCertificateFilters'
import TopicFilters from './TopicFilters'



// This component creates the webpage's sidebar to house all filter buttons at the right side of the page. 

function FilterSidebar({ degReq, handleReqFilter, DScert, handleDSCertFilter, catalog, topics, toggleTopic, 
    clearAllFilters }) {

  return (
    <div className="filter-sidebar">
      <p className="filter-sidebar-header">Course Filters</p>
        <DegreeFilters degReq={degReq} onClick={handleReqFilter}/>
        <DSCertificateFilters DScert={DScert} onClick={handleDSCertFilter}/>
        <TopicFilters catalog={catalog} topics={topics} onClick={toggleTopic}/>
        <label>
            <button
                className="clear-filters-btn"
                onClick={() => clearAllFilters()}
                disabled={degReq === "all" && DScert === "all" && topics.length === 0}
            >Clear All Filters
            </button>
        </label>
    </div>
  )
}

export default FilterSidebar