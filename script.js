// ADD STUDENT
function addStudent() {

    const student = {
        name: document.getElementById("name").value,
        registerNumber: document.getElementById("registerNumber").value,
        department: document.getElementById("department").value,
        year: document.getElementById("year").value,
        gender: document.getElementById("gender").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        roomNumber: document.getElementById("roomNumber").value
    };

    if (student.name === "" || student.email === "") {
        alert("Please enter Student Name and Email");
        return;
    }

    fetch("http://localhost:8080/students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    })
    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to add student");
        }

        return response.json();
    })
    .then(data => {

        alert("Student added successfully!");

        // Clear form
        document.getElementById("name").value = "";
        document.getElementById("registerNumber").value = "";
        document.getElementById("department").value = "";
        document.getElementById("year").value = "";
        document.getElementById("gender").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("email").value = "";
        document.getElementById("address").value = "";
        document.getElementById("roomNumber").value = "";

        // Automatically refresh list
        getStudents();

    })
    .catch(error => {
        console.error(error);
        alert("Error adding student");
    });
}


// VIEW / REFRESH STUDENTS
function getStudents() {

    fetch("http://localhost:8080/students")
        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to load students");
            }

            return response.json();
        })
        .then(data => {

            let output = `
                <table class="student-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Register No</th>
                            <th>Department</th>
                            <th>Year</th>
                            <th>Phone</th>
                            <th>Room</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            if (data.length === 0) {

                output += `
                    <tr>
                        <td colspan="7" style="text-align:center;">
                            No students found
                        </td>
                    </tr>
                `;

            } else {

                data.forEach(student => {

                    output += `
                        <tr>
                            <td>${student.id}</td>

                            <td>
                                <b>${student.name}</b>
                            </td>

                            <td>
                                ${student.registerNumber || "-"}
                            </td>

                            <td>
                                ${student.department || "-"}
                            </td>

                            <td>
                                ${student.year || "-"}
                            </td>

                            <td>
                                ${student.phone || "-"}
                            </td>

                            <td>
                                <span class="room-badge">
                                    ${student.roomNumber || "Not Assigned"}
                                </span>
                            </td>
                        </tr>
                    `;

                });
            }

            output += `
                    </tbody>
                </table>
            `;

            document.getElementById("studentList").innerHTML = output;

        })
        .catch(error => {

            console.error(error);

            document.getElementById("studentList").innerHTML = `
                <p class="empty-message">
                    Unable to load students
                </p>
            `;

            alert("Error loading students");
        });
}