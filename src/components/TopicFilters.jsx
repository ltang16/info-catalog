function TopicFilters({ catalog, topics, onClick }) {

  // Create an alphabetically-sorted array of all topics found in the course catalog
  // If a new topic is added later on, a new button should be added for it dynamically! This way, I don't have to 
  // add it manually myself :)
  const allTopics = [...new Set(catalog.map((course) => course.topics).flat())].sort()

  return (
    <div className="topic-filters">
        <p className="topic-filters-text">Course topics:</p>
        <p className="topic-filters-text-adl">(Multiple selections permitted; if multiple topics are selected, each displayed 
            course will match at least one selected topic)</p>
        {allTopics && allTopics.map((topic) => (
            <label className="topic-filters-btn-text">
                <input 
                    type="checkbox"
                    className={`topic-filters-btn ${topics.includes(topic) ? 'active' : ''}`}
                    onChange={() => onClick(topic)}
                    checked={topics.includes(topic)}
                />
                {topic}
            </label>
        ))}
    </div>
  )
}

export default TopicFilters