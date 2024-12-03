# dynamic-form-react
This React-based app dynamically creates forms based on the type of form you opt for. The app allows users to fill out forms, validate the provided data, and view or delete previously submitted entries. The app also provides a progress bar on form completion percentage.
Dynamic Form Generation: Automatically draws out fields depending on the selected form type.
Validation: Makes sure all required fields are filled out with appropriate error messages, as challenging as they may seem.
Progress Bar: Shows a percentage of required fields completed.
Submitted Data Management: Displays data that has already been submitted in a table view with options to delete entries.
Responsive Design: Bootstrap is used.

Technologies Used
•	React (for building UI)
•	Bootstrap (for styling and responsive design)
•	JavaScript (for form logic)

Instructions to Set Up
Requirements
•	Node.js and npm (which come together with Node.js) should be installed.

Steps to Run the App
Step 1: Clone the Repository
1.1.git clone
1.2.cd into the directory dynamic-form-react.
Step 2: Install Dependencies
npm install
Step 3: Start the App
npm start
Step 4: View the application through the browser
http://localhost:3000.

How It Works
1.	Select Form Type
Users get to select which type of form to use: User Information, Address Information, or Payment Information.
2.	Fill Out the Form
These fields change dynamically based on the selected form type. Some fields are required, and validation disallows entry of blank fields.
3.	Submit the Form After filling a form, it's added to a table for easier visual access.
You can delete any row of submitted data.
4.	Progress Bar shows how much of the form is completed based on already set required fields.
