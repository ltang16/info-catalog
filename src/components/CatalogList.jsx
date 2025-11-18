import CatalogCourse from './CatalogCourse'

function CatalogList({ catalog }) {
  return (
    <ul className="catalog-list">
        {catalog.length === 0 ? 
        <p className="catalog-description">No courses available for given selections.</p> :
        <p className="catalog-description">{catalog.length} courses available.</p>}
        {catalog.length !== 0 && catalog.map((course) => (
            <CatalogCourse course={course}/>
        ))}
    </ul>
  )
}

export default CatalogList