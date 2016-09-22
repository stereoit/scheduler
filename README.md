OKPanda scheduler
=================

[live](https://stereoit.github.io/scheduler/)

What is done
 - React application handling Teacher view and Student View

What I clearly missed
 - Any part of backend developemnt (the REST endpoints) + DB storage
 - implementing Backbone Router for dynamic URL handling
 - state management
 - any styling

 Overall
 -------

 After the initial analysis I've tried to focus on implementing at least something complete. Since I have better experience with React than Jquery, I've built several components and reused some of them. For simplicity I've used rollup.js bundler, but fired back later when I tried to implement Backbone Router. Currently the features of adding new Slot and booking lesson are implemented. It would be necessary to add some check, so the used is not blocking Lesson out of allowed Slot time.

 Todos
 -----
  - implement probably some kind of stores/actions so the state would be consistent
  - add dynamic url with Backbone Router
  - hookup the stores to REST api
  - style with Sass

 Structure
 ---------

     ├── app  (frontend part)
     ├── docs (github pages)
     └── Documentation (initial task + notes)
