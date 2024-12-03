import React, { useState, useEffect } from "react";

const App = () => {
    const [formType, setFormType] = useState(""); // Tracks selected form type
    const [formFields, setFormFields] = useState([]); // Dynamic form fields
    const [formData, setFormData] = useState({}); // Stores form data
    const [errors, setErrors] = useState({}); // Tracks validation errors
    const [submittedData, setSubmittedData] = useState([]); // Tracks submitted data
    const [progress, setProgress] = useState(0); // Tracks progress bar

    // Simulated API response handler based on formType
    useEffect(() => {
        if (!formType) return;

        const fetchFormFields = async () => {
            // Simulated backend responses
            const apiResponses = {
                "User Information": {
                    fields: [
                        { name: "firstName", type: "text", label: "First Name", required: true },
                        { name: "lastName", type: "text", label: "Last Name", required: true },
                        { name: "age", type: "number", label: "Age", required: false },
                    ],
                },
                "Address Information": {
                    fields: [
                        { name: "street", type: "text", label: "Street", required: true },
                        { name: "city", type: "text", label: "City", required: true },
                        {
                            name: "state",
                            type: "dropdown",
                            label: "State",
                            options: ["California", "Texas", "New York"],
                            required: true,
                        },
                        { name: "zipCode", type: "text", label: "Zip Code", required: false },
                    ],
                },
                "Payment Information": {
                    fields: [
                        { name: "cardNumber", type: "text", label: "Card Number", required: true },
                        { name: "expiryDate", type: "date", label: "Expiry Date", required: true },
                        { name: "cvv", type: "password", label: "CVV", required: true },
                        { name: "cardholderName", type: "text", label: "Cardholder Name", required: true },
                    ],
                },
            };

            const response = apiResponses[formType];
            if (response) setFormFields(response.fields);
        };

        fetchFormFields();
    }, [formType]);

    // Handles form field value changes
    const handleInputChange = (fieldName, value) => {
        setFormData((prev) => ({ ...prev, [fieldName]: value }));

        if (formFields.find((field) => field.name === fieldName)?.required) {
            setErrors((prev) => ({ ...prev, [fieldName]: value ? "" : "This field is required" }));
        }
    };

    // Validates the entire form before submission
    const validateForm = () => {
        const newErrors = {};
        formFields.forEach((field) => {
            if (field.required && !formData[field.name]) {
                newErrors[field.name] = "This field is required";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handles form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            setSubmittedData((prev) => [...prev, formData]);
            setFormData({});
            setProgress(100);
            setTimeout(() => alert("Form submitted successfully!"), 500);
        }
    };

    // Handles form type selection
    const handleFormTypeChange = (e) => {
        setFormType(e.target.value);
        setFormData({});
        setErrors({});
        setProgress(0);
    };

    // Renders dynamic form fields
    const renderField = (field) => {
        const { name, type, label, required, options } = field;
        const value = formData[name] || "";

        switch (type) {
            case "dropdown":
                return (
                    <div key={name} className="form-group">
                        <label>{label}{required && " *"}</label>
                        <select
                            value={value}
                            onChange={(e) => handleInputChange(name, e.target.value)}
                            className="form-control"
                        >
                            <option value="">Select</option>
                            {options.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                        {errors[name] && <small className="text-danger">{errors[name]}</small>}
                    </div>
                );
            default:
                return (
                    <div key={name} className="form-group">
                        <label>{label}{required && " *"}</label>
                        <input
                            type={type}
                            value={value}
                            onChange={(e) => handleInputChange(name, e.target.value)}
                            className="form-control"
                        />
                        {errors[name] && <small className="text-danger">{errors[name]}</small>}
                    </div>
                );
        }
    };

    // Deletes a row of submitted data
    const handleDelete = (index) => {
        setSubmittedData((prev) => prev.filter((_, i) => i !== index));
        alert("Entry deleted successfully!");
    };

    // Displays the submitted data in a table
    const renderTable = () => (
        <table className="table">
            <thead>
                <tr>
                    {Object.keys(submittedData[0] || {}).map((key) => (
                        <th key={key}>{key}</th>
                    ))}
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {submittedData.map((data, index) => (
                    <tr key={index}>
                        {Object.values(data).map((value, i) => (
                            <td key={i}>{value}</td>
                        ))}
                        <td>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(index)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="container">
            <header className="my-4 text-center">
                <h1>Dynamic Form Implementation</h1>
            </header>

            <div className="mb-4">
                <label>Select Form Type:</label>
                <select onChange={handleFormTypeChange} value={formType} className="form-control">
                    <option value="">Choose...</option>
                    <option value="User Information">User Information</option>
                    <option value="Address Information">Address Information</option>
                    <option value="Payment Information">Payment Information</option>
                </select>
            </div>
            {formType && 
            (
                <form onSubmit={handleSubmit}>
                    {formFields.map(renderField)}

                    <div className="my-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                
                    <div className="progress">
                    <div
                        className="progress-bar"
                        role="progressbar"
                        style={{ width: `${progress}%` }}
                    >
                        {`${progress}%`}
                    </div>
                </div>

                    
                </form>
            )
            }
            <div>{
    submittedData.length > 0 && (
        <div className="mt-4">
            <h3>Submitted Data</h3>
            {renderTable()}
        </div>
    )
}

<footer className="text-center mt-4">
    <p>&copy; 2024 Dynamic Forms Inc.</p>
</footer>
    </div >
 

            </div >

    )
}


export default App;