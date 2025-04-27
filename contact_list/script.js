fetch('contact_list.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data: ' + response.statusText);
        }
        return response.json();  // Parse the JSON
    })
    .then(data => {
        console.log("Fetched Data:", data);  // Check the parsed JSON

        // Get the page ID from the body tag (page1, page2, etc.)
        const pageId = document.body.id;
        let pageClassification = "";

        // Map pageId to corresponding classification
        if (pageId === "page1") {
            pageClassification = "ACCOUNTING AND FINANCE";
        } else if (pageId === "page2") {
            pageClassification = "ECONOMICS";
        } else if (pageId === "page3") {
            pageClassification = "MARKETING";
        } else if (pageId === "page4") {
            pageClassification = "MANAGEMENT & ORGANISATIONS";
        } else if (pageId === "page5") {
            pageClassification = "DEANS OFFICE";
        }

        // Filter the data for Academic Staff and Research Fellows based on the classification
        const academicStaff = data["Academic Staff"];

        // If there are two tables (page1 to page4)
        if (pageId !== "page5") {
            // Populate the Academic Staff Table
            const academicStaffFiltered = academicStaff.filter(contact => contact["Classification"] === pageClassification);
            const tableBody1 = document.querySelector("#AC tbody");
            academicStaffFiltered.forEach(contact => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${contact["Full Name"]}</td>
                    <td>${contact["Position"]}</td>
                    <td>${contact["Ext No"]}</td>
                    <td>${contact["Room"]}</td>
                `;
                tableBody1.appendChild(row);
            });

            // Populate the Research Fellows/Adjunct Professors Table
            const researchFellows = data["Research Fellows/Adjunct Professor"];
            const researchFellowsFiltered = researchFellows.filter(contact => contact["Classification"] === pageClassification);
            const tableBody2 = document.querySelector("#RF tbody");
            researchFellowsFiltered.forEach(contact => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${contact["Full Name"]}</td>
                    <td>${contact["Position"]}</td>
                    <td>${contact["Ext No"]}</td>
                    <td>${contact["Room"]}</td>
                `;
                tableBody2.appendChild(row);
            });
        } else {
            // If there is only one table (page5), populate only Academic Staff Table
            const academicStaffFiltered = academicStaff.filter(contact => contact["Classification"] === pageClassification);
            const tableBody1 = document.querySelector("#AC tbody");
            academicStaffFiltered.forEach(contact => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${contact["Full Name"]}</td>
                    <td>${contact["Position"]}</td>
                    <td>${contact["Ext No"]}</td>
                    <td>${contact["Room"]}</td>
                `;
                tableBody1.appendChild(row);
            });
        }
    })
    .catch(error => console.error('Error loading JSON:', error));
