// constatnts
var startTimeArray = ["07:00", "08:00", "08:55", "10:00", "10:55", "11:50", "12:45", "13:40", "14:35", "15:30", "16:25", "17:20", "18:15", "19:10", "20:05", "21:00", "21:55"];
var endTimeArray = ["07:50", "08:50", "09:45", "10:50", "11:45", "12:40", "13:35", "14:30", "15:25", "16:20", "17:15", "18:10", "19:05", "20:00", "20:50", "21:45", "22:40"];
var dayArray = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag"];
var allRooms = ["Fotostudio", "Audiostudie", "Viedeoschnitt", "EDV1", "EDV2", "EDV3", "EDV4", "EDV5", "EDV6", "EDV7", "EDV8", "EDV9", "EDV10", "EDV11", "EDV12", "EDV13", "EDV14", "EDV15", "EDV16", "EDV17", "EDV18"];
var dayDefaultValue = "Montag";
var startTimeDefaultValue = "-- Startzeit --";
var endTimeDefaultValue = "-- Endzeit --";
var urlParams = new URLSearchParams(window.location.search);
var roomValue = urlParams.get('roomValue');
var newUri = "../html/index.html?roomValue=Fotostudio";
if (roomValue == null) {
    window.location.href = newUri;
}
var reservations = [];
loadAllReservations();
// popup window
document.addEventListener("DOMContentLoaded", function () {
    var openPopupButton = document.getElementById("openPopupButton");
    var modal = document.getElementById("myModal");
    var closeIcon = document.querySelector(".close");
    // get dropdowns
    var dropdownDay = document.getElementById("day");
    var dropdownStartTime = document.getElementById("time");
    var dropdownEndTime = document.getElementById("timeE");
    openPopupButton.addEventListener("click", function () {
        modal.style.display = "block";
        // set value at dropdowns
        dropdownDay.value = dayDefaultValue;
        dropdownStartTime.value = startTimeDefaultValue;
        dropdownEndTime.value = endTimeDefaultValue;
    });
    closeIcon === null || closeIcon === void 0 ? void 0 : closeIcon.addEventListener("click", function () {
        modal.style.display = "none";
    });
    function closeModal() {
        modal.style.display = "none";
    }
    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
// 
document.addEventListener("DOMContentLoaded", function () {
    // Function to assign unique IDs to the columns
    function assignColumnIds() {
        var table = document.querySelector("table");
        var headers = table.querySelectorAll("th");
        var rows = table.querySelectorAll("tr");
        // Reserving room per onlick
        function addReservationPerClick(cellId) {
            // get modal
            var modal = document.getElementById("myModal");
            // show modal
            modal.style.display = "block";
            // get dropdown elements
            var dropdownDay = document.getElementById("day");
            var dropdownStartTime = document.getElementById("time");
            var dropdownEndTime = document.getElementById("timeE");
            // split id into row and column
            var array = cellId.split("_");
            // get data from column
            var day = dayArray[Number(array[2]) - 1];
            var startTime = startTimeArray[Number(array[1]) - 1];
            var endTime = endTimeArray[Number(array[1]) - 1];
            7;
            // set value of dropdown in modal
            dropdownDay.value = day;
            dropdownStartTime.value = startTime;
            dropdownEndTime.value = endTime;
        }
        // Iterate through each header and row
        for (var i = 0; i < headers.length; i++) {
            if (!headers[i].classList.contains("hour")) {
                var _loop_1 = function (j) {
                    var cell = rows[j].children[i];
                    // Generate a unique ID based on the column index and row index
                    cell.id = "cell_".concat(j, "_").concat(i);
                    cell.addEventListener('click', function () {
                        addReservationPerClick(cell.id);
                    });
                };
                for (var j = 1; j < rows.length; j++) {
                    _loop_1(j);
                }
            }
        }
    }
    // Call the function to assign IDs
    assignColumnIds();
});
// get all values from dropdown
document.addEventListener("DOMContentLoaded", function () {
    var dropdownDay = document.getElementById("day");
    var dropdownStartTime = document.getElementById("time");
    var dropdownEndTime = document.getElementById("timeE");
    var submitButton = document.getElementById("submitButton");
    submitButton === null || submitButton === void 0 ? void 0 : submitButton.addEventListener("click", function () {
        // get values from dropdown
        var startTime = dropdownStartTime.value;
        var endTime = dropdownEndTime.value;
        var day = dropdownDay.value;
        // ceck if all set
        if (startTime && endTime && day) {
            if (endTime > startTime) {
                // get values/convert to id/ make reservation
                getColumn(startTime, endTime, day);
            }
        }
    });
});
// adding color to box
function addReservation(array) {
    for (var i = 0; i < array.length; i++) {
        var id = document.getElementById(array[i]);
        if (id) {
            id.style.backgroundColor = "#eb4258";
        }
    }
}
// convert ids to the cell id
function toCell(startTimeId, dayId) {
    return "cell_".concat(startTimeId, "_").concat(dayId);
}
// get assigned columns
function getColumn(startTime, endTime, day) {
    var reservation = { day: day, startTime: startTime, endTime: endTime };
    reservations.push(reservation);
    // importatnt variables
    var dayId = 0; // id of day
    var units = 0; // count uf units reservated
    var startTimeId = 0; // reservation start time
    var columnIds = []; // array of all ids
    // get start id
    for (var i = 0; i < startTimeArray.length; i++) {
        if (startTimeArray[i] === startTime) {
            startTimeId = i;
            // get units
            for (var j = i; j < endTimeArray.length; j++) {
                units++;
                if (endTimeArray[j] === endTime) {
                    break;
                }
            }
            ;
        }
    }
    ;
    // get dayId
    for (var i = 0; i < dayArray.length; i++) {
        if (dayArray[i] === day) {
            // + 1 because the first column is 1 not 0
            dayId = i + 1;
        }
    }
    // fill array with the ids from html
    for (var i = startTimeId; i < startTimeId + units; i++) {
        // + 1 because the first row is 1 not 0
        columnIds.push(toCell(i + 1, dayId));
    }
    // add reservations to calendar
    addReservation(columnIds);
}
function loadAllReservations() {
}
var isShown = false;
function showRooms() {
    var box = document.getElementById("rooms");
    var changeRoom = document.getElementById("changeRoom");
    var openPopupButton = document.getElementById("openPopupButton");
    if (isShown) {
        box.style.transform = "translate(100%, -50%)";
        changeRoom.style.transform = "translate(0%, 0%)";
        openPopupButton.style.transform = "translate(0%, 0%)";
        setTimeout(function () {
            box.style.display = "none";
        }, 501);
        isShown = false;
    }
    else {
        box.style.display = "grid";
        setTimeout(function () {
            box.style.transform = "translate(0%, -50%)";
        }, 0);
        changeRoom.style.transform = "translate(-340%, 0%)";
        openPopupButton.style.transform = "translate(-340%, 0%)";
        isShown = true;
    }
}
displayRooms();
function displayRooms() {
    var box = document.getElementById("rooms");
    // Clear existing content in the box
    box.innerHTML = '';
    // Assuming allRooms is an array of strings
    for (var i = 0; i < allRooms.length; i++) {
        // Use textContent instead of innerHTML
        var anchor = document.createElement("a");
        anchor.textContent = allRooms[i];
        anchor.id = allRooms[i];
        var currentRoomId = anchor.id;
        if (checkRoom(allRooms[i])) {
            anchor.style.cssText = "color: #0074d9"; // Matching room
        }
        else {
            anchor.style.cssText = "color: #fff"; // Non-matching room
        }
        anchor.href = "../html/index.html?roomValue=".concat(currentRoomId);
        box.appendChild(anchor);
    }
}
function checkRoom(room) {
    return roomValue === room;
}
