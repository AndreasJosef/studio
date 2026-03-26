# Up Next

Finished the toggle logic both frontend and backend for saving and deleting
jobs. Create a shared toggle button that takes in either a list item or detail
view item and saves to db. In the case of list view it first does a background
fetch of the complete ad and saves it to the db then. 


## TODO NEXT

- finish and finetune the effect for loading the jobs from a users. api endpoint
  exists. so that is mostly a matter of fetching and transforming into UI job
- decide on how to render the jobs
 - currently leaning towards a gallery view with top filters tabs. think like
 notion db and the the different views you can select. could be just an active
 pill style for current view.
 - then need to check as well what is up for this week.
    - figure out how to use zustand
    - make theme switch.. that could acutally be zustand bc I use context for
    user auth and will not change that.


