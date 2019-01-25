function updateTextInput(val) {
		document.getElementById('textInput').value=(val + " Miles");
		console.log(val);
		//TODO update slider bar when text input is entered
	}
	
function pullClasses(isYoga,isBoxing,isLifting,isClass) {
		console.log("pull classes running");
		window.classList = [];
		var database = firebase.database();
	 var classList = [];
		var features = database.ref().child("features");
		
		featureFunction(afterPull);
		
		function afterPull(classList){
			console.log("this is running");
		
		var i;
		var classList = window.classList;
		console.log(classList);
		for (i = 0;i<(classList.length);i++){
		console.log(classList[0]);
		var pj = classList[i];
		var qj = (classList[i]).toString();
		var studioSerial = qj.substring(0,1);
		
		var classSerial = classList[i].substring(1);
		console.log("one run through");
		
		var newClassRow = document.createElement("div");
		newClassRow.classList.add("classbox");
		
		var initialClassInfo = document.createElement("div");
		initialClassInfo.classList.add("initialClassInfo");
		
		var newClassInfo = document.createElement("div");
		newClassInfo.classList.add("classInfo");
		
		var newClassTitle = document.createElement("label");
		newClassTitle.classList.add("classTitle");
		
		var features = firebase.database().ref().child("features");
		
		var classTimeText;
		var firebaseText;
		var classDescriptionText;
		
		features.orderByKey().once("value", function(snapshot) {
			console.log("features thing ran");
		
			snapshot.forEach(function(data) {
				console.log(data.val());
		console.log(data.child("studioSerial").val());
				if (data.child("studioSerial").val() == studioSerial) {
					console.log(studioSerial);
				
				firebase.database().ref().child("features").child(studioSerial).child("properties").child("Classes").orderByKey().once("value", function(snapshot) {
					
					
						snapshot.forEach(function(data) {
						
							if (data.child("serialNumber").val() == classSerial) {
							
								firebaseText = data.child("Name").val();
								console.log(firebaseText);
								classTimeText = data.child("Duration").val(); // TODO format time from duration
								classDescriptionText = data.child("Description").val();
								
							}
						}); // end for each
					}); // end classes order by
				} // end big if
			}); //end snapshot for each outside studioSerial
		}); // end features.orderBy
		
		var classText = document.createTextNode(firebaseText);
		console.log(firebaseText);
		newClassTitle.appendChild(classText);
		var br = document.createElement("br");

		var classTime = document.createTextNode(classTimeText);
		newClassInfo.appendChild(newClassTitle);
		newClassInfo.appendChild(classTime);
		
		var moreInfoBox = document.createElement("div");
		
		var classDescription = document.createElement("p");
		var classDescriptionTextNode = document.createTextNode(classDescriptionText);
		classDescription.appendChild(classDescriptionTextNode);
		var classWebsiteButton = document.createElement("button");
		var signupButton = document.createElement("button");
		classWebsiteButton.innerHTML = "More Info";
		signupButton.innerHTML = "Sign Up";
		classDescription.appendChild(classWebsiteButton);
		classDescription.appendChild(signupButton);
		
		signupButton.setAttribute("onclick", "popupFunction()");
		
		moreInfoBox.appendChild(classDescription);
		
		var newClassDecision = document.createElement("div");
		
		var newMoreInfo = document.createElement("button");
		newMoreInfo.innerHTML = "+";
		newMoreInfo.classList.add("collapsible");
		console.log(i);
		window.infoAttribute = classList[i];
		const infoAttribute = window.infoAttribute; //try var
		console.log(window.infoAttribute);
		newMoreInfo.setAttribute("id", infoAttribute);
		
		var moreInfoBoxId = infoAttribute + "Description";
		moreInfoBox.setAttribute("id", moreInfoBoxId);
		
		newClassDecision.appendChild(newMoreInfo);
		
		initialClassInfo.appendChild(newClassInfo);
		initialClassInfo.appendChild(newClassDecision);
		newClassRow.appendChild(initialClassInfo);
		
		newClassRow.style.maxHeight = initialClassInfo.style.height + "px";
		newClassRow.style.overflow = "hidden";
		
		newClassRow.appendChild(moreInfoBox);
		
		moreInfoBox.style.maxHeight = 0 + "px";
		
		newMoreInfo.setAttribute("onclick", "moreInfoClick(this.id)");	
		
		console.log(document.getElementById("classFinder").firstChild.nextSibling);
		document.getElementById("classFinder").firstChild.nextSibling.appendChild(newClassRow);
		} //end for loop 
		
		
		console.log(isYoga);
		} //end afterpull
		
	function featureFunction(callback) {
		features.orderByKey().once("value").then(function(snapshot) {
			console.log("order by running");
			var point =[];
			
			var isZip = document.getElementById("zip").checked;
			
			if (isZip) {
				console.log("isZip true");
							var zipLoc = document.getElementById("enterZip");
							var zip = zipLoc.value;
							
							
							 var geocoder = new google.maps.Geocoder();
							 
							 geocode(afterGeocoder);
							 
	function geocode(callback) {

 	geocoder.geocode({'address': zip}, function (results, status) {
 	console.log("geocoder");
          if (status === 'OK') {
          	var map = window.map;
            map.setCenter(results[0].geometry.location);
            console.log("status ok");
  
  console.log(results[0].geometry.location.lat.value);
            window.centerPoint = new google.maps.LatLng({
					lat: results[0].geometry.location.lat.value,
					lng: results[0].geometry.location.lng.value            	
            	});
            	
            point[0] = results[0].geometry.location.lat;
            point[1] = results[0].geometry.location.lng;
            console.log(point);
            window.marker = new google.maps.Marker({ //TODO remove later, sets marker at zip code
              map: map,
              position: results[0].geometry.location
              
            });
            //studioList = findStudios(point);
            callback(results[0].geometry.location);
          } else {
            alert('Geocode was not successful for the following reason: ' + status);
           // studioList = findStudios(point);
            callback.call();
          }
        }); // end geocode function
							
						
				} // end if isZip
				
				if (isZip == false) {
					console.log("isZip false");
				 if (navigator.geolocation){
          navigator.geolocation.getCurrentPosition(function(position){
          	point[0] = position.coords.latitude;
          	point[1] = position.coords.longitude;
          	//studioList = findStudios(point);
          	callback.call();
            });
			} 
			else {
				alert("Please allow file to access your location or enter a zip code");
				studioList = findStudios(point);
				//callback.call();
			}
			} // end if isZip = false
			
			}
			
			function afterGeocoder(something) {
				console.log("afterGeocoder");
				console.log(something);
			studioList = findStudios(something);
			}

		snapshot.forEach(function(data) {
			
			var key = data.key;
				console.log(key);
			firebase.database().ref().child("features").child(key).child("properties").child("ClassTypes").orderByKey().once("value", function(snapshot) {
						
		
		
					inspectStudio();
		
			
			function inspectStudio() {
				var oneRef = firebase.database().ref().child("features").child(key).child("properties").child("Classes");
				oneRef.once("value", function(snapshot) {
				
					var studSerial = key;	
					snapshot.forEach(function(data) {
			
						
						function addClass() {
							
							var classListLength = classList.length;
							var classSerial = data.child("serialNumber").val();
							var studSerialString = studSerial.toString();
							var serial = (studSerialString + classSerial);
							classList[classListLength] = serial;
						
							window.classList = classList;
				
												
							}	//end addclass
							
							var classType = data.child("ClassType").val();
						
											if ((isYoga == true) && (classType == "Yoga")){
					
					addClass();

				
									
				}	
				else if ((isBoxing == true) && (classType == "Boxing")){
					
					addClass();
			
									
				}	
									
					else if ((isLifting == true) && (classType == "Lifting")){
					
					addClass();
				
						
				}	
					 				
				else if ((isClass == true) && (classType == "Class")){
					
					addClass();
			
									
				}	
		
					//}
						});		//end line 19
					
					 });     //end line 16

						
				} // end inspect studio
				
				
					
			//	console.log(snapshot.val());
				//if ((isYoga == true) && (snapshot.val() == "Yoga")){
					
					//inspectStudio();
				
				
				//	console.log("studio Inspected");
									
			//	}	
			//	else if ((isBoxing == true) && (snapshot.val() == "Boxing")){
					
			//		inspectStudio();
									
			//	}	
									
			//		else if ((isLifting == true) && (snapshot.val() == "Lifting")){
					
			//		inspectStudio();
						
			//	}	
					 				
			//	else if ((isClass == true) && (snapshot.val() == "Class")){
					
			//		inspectStudio();
									
			//	}	
			
				}); //end classtypes function
		
					}); //end line 11
					console.log(classList);
			 callback.call(classList);	
				
							}); //end line 10
			
						console.log(classList);
						
		  }
		console.log(classList);

  } // end pullClasses

function clearSearch() {
		while (document.getElementById("searchTable").firstChild) {
			console.log("clear Search ran");
			var FirstChild = document.getElementById("searchTable").firstChild;
			document.getElementById("searchTable").removeChild(FirstChild);
	}
	}

function pleaseWork() {
	
	 clearSearch();

	
		var yogaBox = document.getElementById("yogaBox");
		var boxingBox = document.getElementById("boxingBox");
		var liftingBox = document.getElementById("liftingBox");
		var classBox = document.getElementById("classBox");
		var isYoga = yogaBox.checked;
		var isBoxing = boxingBox.checked;
		var isLifting = liftingBox.checked;
		var isClass = classBox.checked;
		var classList = [];
		// order output of studio array first by studio then by class
		
		
		var classes = pullClasses(isYoga,isBoxing,isLifting,isClass); //, function()  {
			
		
	}
	
function moreInfoClick(rowElement) {
		console.log(rowElement);
		
		// find rowElement in database
		//rowElement should equal studio + class serial
		
		//center map on selected studio and change pin color to blue
		//refocusMap(rowElement);
		
		var serialString = rowElement.toString();
		
		var studioSerial = serialString.substring(0,1);
		
		var classSerial = serialString.substring(1);
		
		var studioRef = firebase.database().ref().child("features").child(studioSerial);
		
		var descriptionText;
		
		var studioName;
		
		var className;
		
		var address;
		
		afterDatabase();
		
		function afterDatabase() {
			console.log("after database running");
		var UIcontainer = document.getElementById(rowElement).parentElement.parentElement.parentElement;
		//UIcontainer is the initialClassInfo
		
		
		console.log(UIcontainer);
		console.log(rowElement);
		
		var initialClassInfo = UIcontainer.firstChild;//this equals the classInfo div
		initialClassInfo.classList.add("initialClassInfo");
		console.log(initialClassInfo);
		
		var moreInfoContent = document.getElementById(rowElement + "Description");
		
		console.log(moreInfoContent);
		console.log(moreInfoContent.scrollHeight);
		console.log(initialClassInfo.scrollHeight);
		
		if(moreInfoContent.style.maxHeight == 0 + "px") {
			console.log(moreInfoContent.style.maxHeight);
			moreInfoContent.style.maxHeight = moreInfoContent.scrollHeight + "px";
			console.log(moreInfoContent.style.maxHeight);
		} else {
			console.log(moreInfoContent.style.maxHeight);
			moreInfoContent.style.maxHeight = 0 + "px";
			console.log(moreInfoContent.style.maxHeight);
		}
		
		
	
	var header = document.createElement("h2");
	var classNameDisplay = document.createTextNode(className);
	header.appendChild(classNameDisplay);
	//UIcontainer.appendChild(header);
	
	var photoBox = document.createElement("div");
	var photoText = document.createElement("h5");
	var photoTextNode = document.createTextNode("Photo Here");
	photoText.appendChild(photoTextNode);
	photoBox.appendChild(photoText);
	photoBox.id="photoBox";
	//UIcontainer.appendChild(photoBox);
	
	var descriptionTextDisplay = document.createElement("p");
	var descriptionTextNode = document.createTextNode(descriptionText);
	descriptionTextDisplay.appendChild(descriptionTextNode);
	
	
	//UIcontainer.appendChild(descriptionTextDisplay);	
	
		var x = document.getElementById(rowElement);
	
	
	
	}
	
	}
	
function refocusMap(rowElement) {
		var map = window.map;
		
		console.log(rowElement);
		console.log(rowElement.coordinates[0]);
		
		var pos = {
              lat: rowElement.coordinates[1],
              lng: rowElement.coordinates[0]
            };
console.log(pos);
            map.setCenter(pos);
		
		//get location from firebase
		//map.setCenter(locationFromFirebase) //;
		
		// change pin color to blue
		
		}
		
function closeMoreInfo(){
		var element = document.getElementById("UIcontainer");
		while (element.firstChild) {
			element.removeChild(element.firstChild);
			}
			element.classList.remove("redBox");
		//element.parentNode.removeChild(element);
		}
		
function findStudios(point) {
		console.log(point);		
		console.log(point[0]);
		console.log(point[1]);
		studioList = [];
		var i = 0;
		var featuresRef = firebase.database().ref().child("features");
		
		wrapperFunction(afterFunction);
		
		function wrapperFunction(callback) {
		featuresRef.orderByKey().once("value", function(snapshot) { 
		console.log("features ref order function running");
		snapshot.forEach(function(data) {
		var key = data.key;
		console.log(key);
		console.log(data.val());
		
			var studLat = data.child("geometry").child("coordinates").child("0").val();
			var studLng = data.child("geometry").child("coordinates").child("1").val();
			
			console.log(studLat);
			console.log(studLng);
			studioList[i] = key;
			i++;
		});
		});
		callback.call();
		} //end wrapper function
		
		function afterFunction() {
		console.log(studioList);
		var center = window.map.getCenter();
		console.log(window.centerPoint);
		console.log(window.marker.position);
		console.log(center);			
			return studioList;	
					
			}		
		
		}
		
function popupFunction() {
			$("#popup-overlay").addClass("active");
			$("#popup-content").addClass("active");
			console.log("popup function running");
			}