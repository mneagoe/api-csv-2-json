# CSV to JSON Api
### A simple service for parsing csv files into json objects.

## Getting Started
After cloning, go into the projects generated directory and run:
```
$ npm install
$ npm start
```


## DEMO
This Api uses a template engine to render a simple UI for testing the functionality. You can access this UI by opening a new tab in your browser at `localhost:3000`.


## API
```
Method: POST
URL: /csv
body: form-data
e.g.: http://localhost:3000/csv
```
### IMPORTANT
When building your client, please be sure to add `csvFile` to the name property of your file upload input, as well as the `multipart/form-data` to the enctype property of the form:
```
<form enctype="multipart/form-data">
  <input type="file" id="myFile" name="csvFile">
  <input type="submit">
</form>
```

### POSTMAN
To test the Api with this client, simply choose `POST` as the HTTP method and complete the URL with `localhost:3000/csv`. Then, select Body and choose `from-data`. This will display a table where you have to complete the Key column with `csvFile`, and select `file` options. In Value column, you will have a button to upload your csv file.




