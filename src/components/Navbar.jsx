import FilterSidebar from "./FilterSidebar"



// This component creates the navigation bar at the top of the page, to be displayed when the screen size is sufficiently
// narrow. The filter sidebar is "removed" and displays below the navbar when the hamburger menu is toggled, so the user 
// is still able to use the course filters, but the visual appearance is refined. 

function Navbar({ degReq, handleReqFilter, DScert, handleDSCertFilter, catalog, topics, toggleTopic, clearAllFilters }) {

  return (
    <div className="navbar">
        <input type="checkbox" name="navbar-btn" id="navbar-btn"/>
        <label htmlFor="navbar-btn" className="navbar-btn-label">
            <span></span>
            <span></span>
            <span></span>
        </label>
        <p className="navbar-menu-text">Filter Menu</p>
        {/* Due to CSS' combinators being limited to children or siblings, I had to duplicate the filter sidebar here... 
            I also did need to include both sidebars, because not displaying the navbar by default on large screens removes 
            its enclosed sidebar. Really not a fan of this workaround but there wasn't a way to make the navbar menu toggle 
            button and filter sidebar have the same direct parent AND still keep the navbar cleanly separated for 
            structural and aesthetic purposes */}
        <FilterSidebar degReq={degReq} handleReqFilter={handleReqFilter} DScert={DScert} 
            handleDSCertFilter={handleDSCertFilter} catalog={catalog} topics={topics} toggleTopic={toggleTopic} 
            clearAllFilters={clearAllFilters}/>
    </div>
  )
}

export default Navbar