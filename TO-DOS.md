TO-DO:  
[x] create the JSON course catalog  
> [x] add all courses  
> [x] add "topics" metadata to all courses (as list) 
> [x] tag all applied data science certificate courses
> [x] add "index" to each course? (assigned arbitrary ordinal numbers based on course ID)
> [x] add all Fall 2024 and Spring 2025 courses...

[x] build webpage structure 
> [x] maybe create new component for individual courses and use in overall app body
> [x] create new components for course requirement, DS certificate, and topics filter buttons
> [x] create new component for catalog list -- need to pass filtered course list to this! will then pass individual course data to individual course component
> [x] switch requirement and certificate button types to checkboxes/radio buttons (mix of both to enable only one selection at a time, but also none!) and create toggle click functions!!! removes need for "all Info courses" button and improves aesthetics
> [x] add state data for user-given course requirements, DS certificate eligibility, topics, and subsequent filtered catalog (single-select for course reqs and DS cert, and multi-select for topics)
> [x] build new component for filtering sidebar and create "clear all filters" button + function
> [ ] build new component for course addition form w/ form submission, error handling, etc. -- should change and post existing JSON file!
>> [x] 1. form data field
>> [x] 2. handleChange function
>> [x] 3. form submission function
>> [ ] 4. add to catalog + post JSON function -- add new useEffect in App.jsx to "reload" catalog when it changes
>> [x] also add "shortcut" button at top of page since form will be at bottom; jump w/ smooth scroll :)
>> [x] add "return to top" button at bottom of page, also with smooth scroll :)

> [ ] add numerical, then alphabetical ordering for catalog object array after it loads... 
> [ ] add new component for breadcrumbs? 

[ ] build catalog page CSS  
[ ] add form for course addition to catalog -- need to permanently edit JSON file
[ ] enable course item editing (ideally in place rather than sending to form at bottom...) -- also permanently edit JSON file
[x] create MIMs requirements filtering function and filter buttons
[x] create DS certificate filtering function and filter buttons
[x] create course topic filtering function (MULTIPLE ALLOWED) and selection buttons
[ ] add breadcrumbs component and functions?
[ ] 800+ word writeup :)  
[ ] host live demo on Netlify or something similar  
[x] start Github repo  
[ ] push all code to Github repo  