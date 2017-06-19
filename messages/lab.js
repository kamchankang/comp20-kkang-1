// Your JavaScript goes here...

var request = new XMLHttpRequest();

function parse() {
    request.open("GET", "https://messagehub.herokuapp.com/messages.json", true);

    request.onreadystatechange = function() {
	if(request.readyState == 4 && request.status == 200){
	    console.log("Retrieved Data");
	    data = request.responseText;
	    console.log(data);
	    DataArray = JSON.parse(data);
	    var messages = document.getElementById("messages");
	    for(i = 0; i < DataArray.length; i++){
		messages.innerHTML += DataArray[i].content + '&nbsp' + DataArray[i].username + '<br>';
	    }
	}
	else if(request.readyState == 4 && request.status != 200) {
	    document.getElementById("messages").innerHTML = "Something wrong";
	    
	}
	else {
	    console.log ("work work work work work...");
	}
    };
	request.send(null);
}
