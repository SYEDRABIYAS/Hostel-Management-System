// ADD FEE

function addFee() {

    const fee = {

        studentName:
            document.getElementById("studentName").value,

        registerNumber:
            document.getElementById("registerNumber").value,

        amount:
            parseFloat(
                document.getElementById("amount").value
            ),

        paymentDate:
            document.getElementById("paymentDate").value,

        paymentStatus:
            document.getElementById("paymentStatus").value
    };


    if (
        fee.studentName === "" ||
        fee.registerNumber === "" ||
        isNaN(fee.amount) ||
        fee.paymentDate === "" ||
        fee.paymentStatus === ""
    ) {

        alert("Please fill all fee details");

        return;
    }


    fetch("http://localhost:8080/fees", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(fee)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Failed to add fee"
            );
        }

        return response.json();

    })

    .then(data => {

        alert("Fee payment added successfully!");


        // Clear form

        document.getElementById("studentName").value = "";

        document.getElementById("registerNumber").value = "";

        document.getElementById("amount").value = "";

        document.getElementById("paymentDate").value = "";

        document.getElementById("paymentStatus").value = "";


        // Refresh fee list

        getFees();

    })

    .catch(error => {

        console.error(error);

        alert("Error adding fee");

    });

}



// GET ALL FEES

function getFees() {

    fetch("http://localhost:8080/fees")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Failed to load fees"
                );
            }

            return response.json();

        })

        .then(data => {

            let output = `

                <table class="student-table">

                    <thead>

                        <tr>

                            <th>ID</th>
                            <th>Student Name</th>
                            <th>Register No</th>
                            <th>Amount</th>
                            <th>Payment Date</th>
                            <th>Status</th>

                        </tr>

                    </thead>

                    <tbody>

            `;


            if (data.length === 0) {

                output += `

                    <tr>

                        <td
                            colspan="6"
                            style="text-align:center;">

                            No fee records found

                        </td>

                    </tr>

                `;

            } else {

                data.forEach(fee => {

                    let statusClass =
                        "room-badge";


                    if (
                        fee.paymentStatus === "Pending"
                    ) {

                        statusClass =
                            "room-badge full";

                    }


                    output += `

                        <tr>

                            <td>
                                ${fee.id}
                            </td>

                            <td>
                                <b>
                                    ${fee.studentName}
                                </b>
                            </td>

                            <td>
                                ${fee.registerNumber}
                            </td>

                            <td>
                                ₹${fee.amount}
                            </td>

                            <td>
                                ${fee.paymentDate}
                            </td>

                            <td>

                                <span
                                    class="${statusClass}">

                                    ${fee.paymentStatus}

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


            document.getElementById(
                "feeList"
            ).innerHTML = output;

        })


        .catch(error => {

            console.error(error);

            document.getElementById(
                "feeList"
            ).innerHTML = `

                <p class="empty-message">

                    Unable to load fee records

                </p>

            `;

            alert("Error loading fees");

        });

}