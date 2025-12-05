import CatalogCourse from './CatalogCourse'



// This component houses the list of all courses in the filtered catalog. It also displays the count of courses in the
// filtered catalog. 

function CatalogList({ catalog, onEditCourse }) {
  
  return (
    <ul className="catalog-list">
        {catalog.length === 0 ? 
        <p className="catalog-description">No courses available for current filter selections.</p> :
        <p className="catalog-description">{catalog.length} course{catalog.length > 1 ? "s" : ""} available.</p>}
        {catalog.length !== 0 && catalog.map((course) => (
            <CatalogCourse course={course} onEditCourse={onEditCourse}/>
        ))}
    </ul>
  )
}

export default CatalogList