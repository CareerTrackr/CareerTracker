# CareerTracker

CareerTracker is an application that can be used to track your applications, as well as a convenient place to save information that are reused on every application.

# Documentation

## Applications View

When the Applications view renders, it performs a fetch for the row (ROW TODO) and column data.
Upon receiving this fetch request, the server checks if a file has been already created for the rows/columns.
> If the file hasn't been created, it will create a template file.

> If the file has been created, it will return the data from the file.

Once the data has been retrieved, the data is parsed through and if the renderCellsLink is set to true, it will set the relevant object to contain a renderCell property equal to a Link MUI component. [For now, it seems impossible to store a renderCell property set to an MUI component on the template file, so this is the workaround implemented]

The data grid component will then take the subsequent column/row data and render them out to the front end.