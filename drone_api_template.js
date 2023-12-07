// Auth parameters for https://api-app.flytnow.com
var base_url = 'https://api-app.flytnow.com';
var your_email = '';
var your_password = '';
var auth_token = '';

// Auth parameters for https://dev.flytbase.com/

var your_drone_namespace = "";
var your_personal_access_token = "";
var your_vehicle_id = "";

// LOGIN
// For the RESTful API pings to https://api-app.flytnow.com, first run the login API command to retrieve your auth token

function get_auth_token() {
    var loginAPI = {
        "url": base_url + '/login/user',
        "method": "POST",
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "email": your_email,
            "password": your_password
        }
    };

    $.ajax(loginAPI).done((response) => {
        // AUTHENTICATION TOKEN
        auth_token = JSON.stringify(response);
        console.log(response);
    });
}

get_auth_token()

// NAMESPACE FOR DRONE 
// For the RESTful API pings to https://dev.flytbase.com/, first run the namespace API command to retrieve your drone's namespace

function get_namespace() {
    var settings = {
        "url": "https://dev.flytbase.com/rest/ros/get_global_namespace",
        "method": "GET",
        "headers": {
            "Authorization": "Token " + your_personal_access_token,
            "VehicleID": your_vehicle_id
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        your_drone_namespace = JSON.parse(response)["param_info"]["param_value"]

    });
}

get_namespace();

// DRONE DETAILS

// Get all drones
function get_all_drones() {
    var settings = {
        "url": base_url + "/drone_details/get_all_drones",
        "method": "GET",
        "headers": {
            "Authorization": auth_token
        },
    };

    $.ajax(settings).done((response) => {
        console.log(response);
    });
}


// TELEMETRY

// Drone & RC battery percentage
function get_battery_percentage() {
    var settings = {
        "url": base_url + "/drone_details/battery_percentage/:your_drone_id",
        "method": "GET",
        "headers": {
            "Authorization": token
        }
    }

    $.ajax(settings).done((response) => {
        console.log(response);
    })
}

// Global Position
function get_global_position() {
    var settings = {
        "url": "https://dev.flytbase.com/rest/ros/" + your_drone_namespace + "/mavros/global_position/global",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Token " + your_personal_access_token,
            "VehicleID": your_vehicle_id
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

// Attitude Euler
function get_attitude_euler() {
    var settings = {
        "url": "https://dev.flytbase.com/rest/ros/" + your_drone_namespace + "/mavros/imu/data_euler",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Token " + your_personal_access_token,
            "VehicleID": your_vehicle_id
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

// VIDEO SHARING & STREAMING

// Create Video Link
function create_video_link() {
    var settings = {
        "url": "https://api-app.flytnow.com/video_link/create",
        "method": "POST",
        "headers": {
            "Authorization": auth_token,
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "expires": 36000,
            "drone_ids": ["your_drone_id"]
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

// Update Video Link
function update_video_link() {
    var settings = {
        "url": "https://api-app.flytnow.com/video_link/update/:your_link_id",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": auth_token
        },
        "data": JSON.stringify({
            "expires": 50
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

//Delete Video Link
function delete_video_link() {
    var settings = {
        "url": "https://api-app.flytnow.com/video_link/delete/:your_link_id",
        "method": "DELETE",
        "headers": {
            "Authorization": auth_token
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

// MISSION PLANNING

// Set waypoints
function set_waypoints() {
    var settings = {
        "url": "https://dev.flytbase.com/rest/ros/" + your_drone_namespace + "/navigation/waypoint_set",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Authorization": "Token " + your_personal_access_token,
            "VehicleID": your_vehicle_id,
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "waypoints": [{
                "frame": 3,
                "command": 16,
                "is_current": false,
                "autocontinue": true,
                "param1": 0,
                "param2": 1,
                "param3": 0,
                "param4": 0,
                "x_lat": 37.42953107340465,
                "y_long": -122.08367249477757,
                "z_alt": 2
            }, {
                "frame": 3,
                "command": 16,
                "is_current": false,
                "autocontinue": true,
                "param1": 0,
                "param2": 1,
                "param3": 0,
                "param4": 0,
                "x_lat": 37.42973980783216,
                "y_long": -122.08323261249913,
                "z_alt": 2
            }, {
                "frame": 3,
                "command": 20,
                "is_current": false,
                "autocontinue": true,
                "param1": 0,
                "param2": 1,
                "param3": 0,
                "param4": 0,
                "x_lat": 37.42947995468062,
                "y_long": -122.08284637440099,
                "z_alt": 2
            }]
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

// Get waypoints
function get_waypoints() {
    var settings = {
        "url": "https://dev.flytbase.com/rest/ros/" + your_drone_namespace + "/navigation/waypoint_get",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Token " + your_personal_access_token,
            "VehicleID": your_vehicle_id
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

// Execute waypoints
function execute_waypoints() {
    var settings = {
        "url": "https://dev.flytbase.com/rest/ros/" + your_drone_namespace + "/navigation/waypoint_execute",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Token " + your_personal_access_token,
            "VehicleID": your_vehicle_id
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

// Clear waypoints
function clear_waypoints() {
    var settings = {
        "url": "https://dev.flytbase.com/rest/ros/" + your_drone_namespace + "/navigation/waypoint_clear",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Token " + your_personal_access_token,
            "VehicleID": your_vehicle_id
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

// Pause waypoints
function pause_waypoints() {
    var settings = {
        "url": "https://dev.flytbase.com/rest/ros/" + your_drone_namespace + "/navigation/waypoint_pause",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Token " + your_personal_access_token,
            "VehicleID": your_vehicle_id
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}