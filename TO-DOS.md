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
> [x] build new component for course addition form w/ form submission, error handling, etc. -- stores changes to catalog in localStorage!
>> [x] 1. form data field
>> [x] 2. handleChange function
>> [x] 3. form submission function
>> [x] 4. add to catalog function + save to localStorage effect
>> [x] also add "shortcut" button at top of page since form will be at bottom; jump w/ smooth scroll :)
>> [x] add "return to top" button at bottom of page, also with smooth scroll :)
>>> [x] change "return to top" button to be sticky (bottom right) and up arrow symbol?

> [x] sort filtered catalog in alphabetical order based on course ID, then course title 
> [ ] add new component for breadcrumbs

[x] build full catalog page CSS -- individual course item component, filter sidebar, header, course addition form
> [ ] add responsive styling for smaller screens???

[x] add form for course addition to catalog -- store updated catalog in localStorage
[ ] enable course item editing (ideally in place rather than sending to form at bottom...) -- also store in localStorage
[x] create MIMs requirements filtering function and filter buttons
[x] create DS certificate filtering function and filter buttons
[x] create course topic filtering function (MULTIPLE ALLOWED) and selection buttons
[ ] add breadcrumbs component and functions
[ ] 800+ word writeup :)  
[ ] host live demo on Netlify or something similar  
[x] start Github repo  
[ ] push all code to Github repo



MINOR FIXES:
[x] fix grid row spacing so that header section doesn't have weird gap when no courses are available -- unless responsive design not necessary... (yippee the course addition form is long enough)