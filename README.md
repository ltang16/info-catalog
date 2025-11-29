# A Better Information Course Catalog for MIMS

## Summary

For this Info 202 implementation project, I decided to add a categorization structure for all Information graduate courses offered during the 2024-2025 and 2025-2026 academic years, aimed at assisting MIMS students in their course search. The current Information catalog doesn't have a meaningful organizational scheme beyond separating courses into undergraduate, graduate, and professional levels, so I implemented a new one by creating a set of faceted metadata containing all relevant course information. The metadata for each course includes details such as the course unit count, description, and past and future timeslots, all displayed simultaneously to create as informative of an interface as possible without the user having to navigate to different webpages. This new category architecture enables filtering of the course catalog, helping the user find specific courses that fulfill a MIMS degree requirement, are applicable towards the Applied Data Science graduate certificate, or pertain to various topics. All components were built in React to create an online webpage to house the catalog and its categorization scheme.

## Process

### Creating Faceted Metadata

Since I wanted users of this new site to be able to filter on three major course traits, my first goal was to determine which categories each course should be placed into. I began by storing all course catalog details in a JSON file, as we did in the website building assignment, to provide the course data for the React application. Each course was represented by faceted metadata stored in a JSON object, with the following keys: an index to uniquely identify the course, the course ID, title, unit count, instructor(s), description, semester(s) offered, timeslot(s), location, course type (core or non-core for the MIMS degree), the MIMS degree requirement it fulfills if any, its applicability towards the Applied Data Science certificate, the topics it covers, and any additional information. Some facets could be multi-valued and were represented as arrays, in the event that the course was offered during multiple semesters and therefore had multiple possible instructors or timeslots. 

The MIMS degree requirement was one of the three major course traits acting as a filter and also produced a shallow hierarchy, in that every single course either did not fulfill any requirements, or fulfilled either the Technology requirement or the Social Science and Policy requirement. Consequently, each course could only be placed into one of these categories, and each category was exclusive and without overlap. 




I also created a new multi-valued facet





The rest of the facets were purely informational, in that they weren't used in the filtering functionality and merely provided details about the course that might be helpful for a MIMS student.










This faceted metadata structure helped me thoroughly describe the course collection for both informative and filtering purposes. The MIMS degree requirement, certificate eligibility, and topic facets formed a system of overlapping but equally-important categories for this collection (similarly to what we accomplished with the Algolia interface), rather than a singular hierarchical taxonomy that would have required a very rigid and complex ruleset to eventually divide all courses into their own unique categories. Additionally, these three facets acted as a way to parse a user's inherent search query into a combination of Boolean operations -- for example, a MIMS student searching for a 