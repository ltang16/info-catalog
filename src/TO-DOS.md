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
> [x] sort topics list in sidebar by alphabetical order, even if lowercase! 
> [x] add new component for breadcrumbs

[x] build full catalog page CSS -- individual course item component, filter sidebar, header, course addition form
> [x] add responsive styling for smaller screens -- make navbar and hamburger menu components :) (this was such a painful process and I don't even really like the solution I had to devise)

[x] add form for course addition to catalog -- store updated catalog in localStorage
[x] enable course item editing (ideally in place rather than sending to form at bottom...) -- also store in localStorage
> [x] create course editing status state data
> [x] build new function for course editing and updating catalog state data (wow what a trial and error process this was)
> [x] build new component for editing course interface -- use form fields and populate with existing course data! "save" button should call the new catalog update function, then set the edit status to false and display new catalog

[x] add in QoL feature for scrolling to edited course after edit is complete... useCallback???
> [x] add in QoL scroll to course added from "course add" form :)

[x] create MIMs requirements filtering function and filter buttons
[x] create DS certificate filtering function and filter buttons
[x] create course topic filtering function (MULTIPLE ALLOWED) and selection buttons
[x] add breadcrumbs component and full CSS
[x] 800+ word writeup :)  
[x] host live demo on Netlify or something similar  
[x] start Github repo  
[x] push all code to Github repo



MINOR FIXES:
[x] fix grid row spacing so that header section doesn't have weird gap when no courses are available -- unless responsive design not necessary... (yippee the course addition form is long enough)
[x] fix permitted unit values in both add and edit forms
[x] update course addition form value handling for multiple semester data... 
[x] fix button text to be white 
[x] fix course sorting -- maybe don't allow 4-digit courses?