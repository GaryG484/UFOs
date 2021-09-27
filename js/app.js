// is how you make comments
// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
// With this code we A) Declare a variable (tbody), and B) Use d3.select to tell JavaScript to
// look for the <tbody> tags in the HTML
var tbody = d3.select("tbody");

//tbody.html("");—tells JavaScript to use an empty string when creating the table; in other words,
// create a blank canvas. This is a standard way to clear data.
function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");
  
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
      // Append a row to the table body
      let row = tbody.append("tr");
  
      // Loop through each field in the dataRow and add
      // each value as a table cell (td)
      Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        }
      );
    });
  }

// See below code for notes
function handleClick() {
    // Grab the datetime value from the filter
    let date = d3.select("#datetime").property("value");

    //.select() function will select the very first element that matches our selector string: "#datetime"
    
    //d3.select("#datetime") tells D3 to look for the #datetime id in the HTML tags

    // By chaining .property("value"); to the d3.select function, we're telling D3 not only to look 
    //for where our date values are stored on the webpage, but to actually grab that information and hold 
    //it in the "date" variable.

    //Now we need to set a default filter and save it to a new variable. Our default filter will actually be 
    //the original table data because we want users to refine their search on their own terms.
    let filteredData = tableData;

    // write an if statement that shows only the rows where the date is equal to the date filter we created 
    //above
    //Check to see if a date was entered and filter the data using that date.
    if (date) {
        // Apply `filter` to the table data to only keep the
        // rows where the `datetime` value matches the filter value
        filteredData = filteredData.filter(row => row.datetime === date);
    };

    // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will
    // just be the original tableData.
    buildTable(filteredData);
};

// Attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", handleClick);

// Build the table when the page loads
buildTable(tableData);
