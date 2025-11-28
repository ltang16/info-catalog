import CatalogCourse from './CatalogCourse'

function CatalogList({ catalog }) {
  return (
    <ul className="catalog-list">
        {catalog.length === 0 ? 
        <p className="catalog-description">No courses available for current filter selections.</p> :
        <p className="catalog-description">{catalog.length} course{catalog.length > 1 ? "s" : ""} available.</p>}
        {catalog.length !== 0 && catalog.map((course) => (
            <CatalogCourse course={course}/>
        ))}
    </ul>
  )
}

export default CatalogList