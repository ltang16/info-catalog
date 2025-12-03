function Breadcrumbs({ degReq, removeReq, DScert, removeDSCert, topics, removeTopic }) {
    // Need to get the full name for the MIMS degree requirement, since degReq is an abbreviated version
    let degReqText
    if (degReq !== 'all') {
        if (degReq === 'tech') {
            degReqText = 'Technology'
        } else {
            degReqText = 'Social Science and Policy'
        }
    }

    // Full name for DS certification course type
    let DSCertText
    if (DScert !== 'all') {
        if (DScert === 'DScert') {
            DSCertText = 'All Applicable Courses'
        } else if (DScert === 'intro') {
            DSCertText = 'Introductory Data Science'
        } else if (DScert === 'amt') {
            DSCertText = 'Analytical Methods and Techniques of Data Science'
        } else {
            DSCertText = 'Elective'
        }
    }



    return (
        <div className="breadcrumbs-section">
            {/* There should only be breadcrumbs for active filters, e.g. when catalog isn't showing all courses! 
                And clicking the "X" on the breadcrumbs will remove an active filter, just like unchecking the filter 
                in the sidebar */}
            {degReq !== 'all' && 
                <div className="breadcrumb">
                    <p className="breadcrumb-text">MIMS degree requirement: {degReqText}</p>
                    <button className="breadcrumb-btn" onClick={() => removeReq(degReq)}>X</button>
                </div>
            }
            {DScert !== 'all' &&
                <div className="breadcrumb">
                    <p className="breadcrumb-text">Applied Data Science Certificate course type: {DSCertText}</p>
                    <button className="breadcrumb-btn" onClick={() => removeDSCert(DScert)}>X</button>
                </div>
            }
            {topics.length !== 0 && topics.map((topic) => 
                <div className="breadcrumb">
                    <p className="breadcrumb-text">Topic: {topic}</p>
                    <button className="breadcrumb-btn" onClick={() => removeTopic(topic)}>X</button>
                </div>)
            }
        </div>
    )
}

export default Breadcrumbs