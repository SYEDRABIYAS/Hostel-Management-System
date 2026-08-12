// ADD ROOM

function addRoom() {

    const room = {

        roomNumber:
            document.getElementById("roomNumber").value,

        capacity:
            parseInt(
                document.getElementById("capacity").value
            ),

        occupied:
            parseInt(
                document.getElementById("occupied").value
            ),

        status:
            document.getElementById("status").value
    };


    if (
        room.roomNumber === "" ||
        isNaN(room.capacity) ||
        isNaN(room.occupied) ||
        room.status === ""
    ) {

        alert("Please fill all room details");

        return;
    }


    if (room.occupied > room.capacity) {

        alert(
            "Occupied students cannot be greater than capacity"
        );

        return;
    }


    fetch("http://localhost:8080/rooms", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(room)

    })

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Failed to add room"
            );
        }

        return response.json();

    })

    .then(data => {

        alert("Room added successfully!");


        // Clear form

        document.getElementById("roomNumber").value = "";

        document.getElementById("capacity").value = "";

        document.getElementById("occupied").value = "";

        document.getElementById("status").value = "";


        // Refresh room list

        getRooms();

    })

    .catch(error => {

        console.error(error);

        alert("Error adding room");

    });

}



// GET ALL ROOMS

function getRooms() {


    fetch("http://localhost:8080/rooms")

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Failed to load rooms"
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

                            <th>Room Number</th>

                            <th>Capacity</th>

                            <th>Occupied</th>

                            <th>Available</th>

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

                            No rooms found

                        </td>

                    </tr>

                `;

            }


            else {


                data.forEach(room => {


                    const available =
                        room.capacity -
                        room.occupied;


                    let statusClass =
                        "room-badge";


                    if (
                        room.status === "Full"
                    ) {

                        statusClass =
                            "room-badge full";

                    }


                    else if (
                        room.status === "Maintenance"
                    ) {

                        statusClass =
                            "room-badge maintenance";

                    }


                    output += `

                        <tr>

                            <td>
                                ${room.id}
                            </td>


                            <td>

                                <b>
                                    ${room.roomNumber}
                                </b>

                            </td>


                            <td>
                                ${room.capacity}
                            </td>


                            <td>
                                ${room.occupied}
                            </td>


                            <td>
                                ${available}
                            </td>


                            <td>

                                <span
                                    class="${statusClass}">

                                    ${room.status}

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
                "roomList"
            ).innerHTML = output;

        })


        .catch(error => {

            console.error(error);


            document.getElementById(
                "roomList"
            ).innerHTML = `

                <p class="empty-message">

                    Unable to load rooms

                </p>

            `;


            alert("Error loading rooms");

        });

}