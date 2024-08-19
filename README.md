# Secret Santa Assignment Application

This Node.js application automates the process of assigning Secret Santa pairs among employees. It takes input in the form of CSV files and generates an output CSV file with the assigned Secret Santa pairs.

## Features

- **CSV Input**: Accepts employee information and past Secret Santa assignments as CSV files.
- **Assignment Logic**: Ensures no employee is assigned to themselves or to the same Secret Santa as in the previous year.
- **CSV Output**: Generates a CSV file with Secret Santa assignments.

## File Structure

- **`controller/`**
  - `adminController.js`
- **`middleware/`**
  - `multer.js`
- **`routes/`**
  - `admin.js`
- **`view/`**
  - `index.html`
- **`index.js`**
- **`package.json`**
- **`README.md`**

## Installation

1. **Clone the repository:**

   ```bash
   git clone git@github.com:karthick587/Secret_Santa_Event.git
   cd Secret_Santa_Event

2. **Install dependencies:**

   ```bash
   npm install

3. **Start the server:**

   ```bash
   npm start

## Usage

- **Open your browser and navigate to http://localhost:3000. Use the form to upload the following files:**: Open your browser and navigate to http://localhost:3000. Use the form to upload the following files: Employee List File: A CSV file with columns Employee_Name and Employee_EmailID.
Previous Secret Santa Assignments: A CSV file with columns Employee_EmailID, Secret_Child_Name, and Secret_Child_EmailID.
- **Download Results:**: After processing the files, the application will automatically download a CSV file with the Secret Santa assignments.

## Dependencies

- **express**: Web framework for Node.js.
- **multer**: Middleware for handling file uploads.
- **fast-csv**: CSV parsing and formatting.
- **json2csv**:  Convert JSON to CSV.

## Error Handling

- **Unsupported File Type**: Ensure that only .xlsx files are uploaded.


