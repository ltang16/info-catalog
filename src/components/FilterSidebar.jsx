import DegreeFilters from './DegreeFilters'
import DSCertificateFilters from './DSCertificateFilters'
import TopicFilters from './TopicFilters'

function FilterSidebar({ degReq, handleReqFilter, DScert, handleDSCertFilter, catalog, topics, toggleTopic, 
    clearAllFilters }) {

  return (
    <div className="filter-sidebar">
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