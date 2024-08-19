const fs = require('fs');
const { Parser } = require('json2csv');
const { PassThrough } = require('stream');
const csv = require('fast-csv');

const AssignSecretSanta = async (req, res) => {
    try {
        const employeeFilePath = req.files['employeeList'][0].path;
        const pastAssignmentsFilePath = req.files['pastAssignments'][0].path;

        let employeeList = [];
        let pastAssignments = new Map();

        // Process employee list CSV
        const parseCsv = (filePath, mapFunction) => {
            return new Promise((resolve, reject) => {
                const data = [];
                fs.createReadStream(filePath)
                    .pipe(csv.parse({ headers: true }))
                    .on('data', row => data.push(mapFunction(row)))
                    .on('end', () => resolve(data))
                    .on('error', reject);
            });
        };

        employeeList = await parseCsv(employeeFilePath, row => ({
            Employee_Name: row.Employee_Name,
            Employee_EmailID: row.Employee_EmailID
        }));

        const pastAssignmentsArray = await parseCsv(pastAssignmentsFilePath, row => ({
            Employee_EmailID: row.Employee_EmailID,
            Secret_Child_EmailID: row.Secret_Child_EmailID
        }));

        pastAssignmentsArray.forEach(row => pastAssignments.set(row.Employee_EmailID, row.Secret_Child_EmailID));

        let copyletEmployeeList = [...employeeList];
        let AssignSecretSantaData = [];

        for (const employee of employeeList) {
            let availableChildren = copyletEmployeeList.filter(child =>
                child.Employee_EmailID !== employee.Employee_EmailID && 
                child.Employee_EmailID !== pastAssignments.get(employee.Employee_EmailID) // Avoid previous year's assignment
            );

            if (availableChildren.length === 0) {
                return res.status(500).send({ statusCode: 500, message: 'Not enough unique assignments available to fulfill the requirement.' });
            }

            // Randomly select a child from the available options
            const randomIndex = Math.floor(Math.random() * availableChildren.length);
            const selectedChild = availableChildren[randomIndex];

            AssignSecretSantaData.push({
                ...employee,
                Secret_Child_Name: selectedChild.Employee_Name,
                Secret_Child_EmailID: selectedChild.Employee_EmailID
            });

            // Remove selected child from the list to avoid reassignment
            copyletEmployeeList = copyletEmployeeList.filter(val => val.Employee_EmailID !== selectedChild.Employee_EmailID);
        }

        // Create a PassThrough stream to send CSV directly
        const passThroughStream = new PassThrough();
        const json2csvParser = new Parser();
        passThroughStream.end(json2csvParser.parse(AssignSecretSantaData));

        // Set response headers to indicate a file download
        res.setHeader('Content-disposition', 'attachment; filename=secret_santa_assignments.csv');
        res.setHeader('Content-Type', 'text/csv');

        // Pipe the CSV data directly to the response
        passThroughStream.pipe(res);

    } catch (err) {
        console.error(err); // Log error details
        res.status(500).send({ statusCode: 500, message: err.message });
    }
};

module.exports = {
    AssignSecretSanta
};
