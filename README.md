### HIERARCHY TABLE ... made with Vue 3 + Typescript + Vite bundler

*** HOW TO START ***
npm install  
npm run dev

#### DESCRIPTION
This is hierarchy table with two child sub-tables that uses mydata.json data file located in the /public folder.  
Parent table row upon click opens child table rows, which upon click opens it's child table row/s with data. Clicking again on the row closes it. Clicking on another row opens present row and closes formerly opened row. Clicking on a row that has no child table data doesn't open child table with rows. You many delete parent table row and its coresponding childs upon clicking x

#### DATA LOCATION
datafile mydata.json is located in the /public folder
/src/interfaces contains interface file
/src/services sontains service file for obtaining data (separation of concern)  
/src/App.vue contains component with main presentation layer functionality
