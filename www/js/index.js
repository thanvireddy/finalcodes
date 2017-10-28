/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
       // window.addEventListener("batterystatus", onBatteryStatus, false); 
        var dev_info="Cordova version: " + device.cordova + "<br>" +
      "Device model: " + device.model + "<br>" +
      "Device platform: " + device.platform + "<br>" +
      "Device version: " + device.version;
        document.getElementById("deviceInfo").innerHTML=dev_info;

        document.getElementById("cameraTakePicture").addEventListener 
            ("click", cameraTakePicture); 
        
        document.getElementById("getAcceleration").addEventListener("click", getAcceleration);
        document.getElementById("watchAcceleration").addEventListener(
        "click", watchAcceleration);

        document.getElementById("getOrientation").addEventListener("click", getOrientation);
        document.getElementById("watchOrientation").addEventListener("click", watchOrientation);

        document.getElementById("dialogs").addEventListener("click", dialogTypes);

        window.addEventListener("batterystatus", onBatteryStatus, false); 

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function onBatteryStatus(info) { 
   alert("BATTERY STATUS:  Level: " + info.level + " isPlugged: " + info.isPlugged); 
};

function cameraTakePicture() { 
   navigator.camera.getPicture(onSuccess, onFail, {  
      quality: 50, 
      destinationType: Camera.DestinationType.DATA_URL 
   });  
   
   function onSuccess(imageData) { 
      var image = document.getElementById('myImage'); 
      image.src = "data:image/jpeg;base64," + imageData; 
   }  
   
   function onFail(message) { 
      alert('Failed because: ' + message); 
   } 
}


function getAcceleration() {
   navigator.accelerometer.getCurrentAcceleration(
      accelerometerSuccess, accelerometerError);

   function accelerometerSuccess(acceleration) {
      var message='Acceleration X: ' + acceleration.x + '\n' +
         'Acceleration Y: ' + acceleration.y + '\n' +
         'Acceleration Z: ' + acceleration.z + '\n' +
         'Timestamp: '      + acceleration.timestamp + '\n';

         alert(message);
   };

   function accelerometerError() {
      alert('onError!');
   };
}

function watchAcceleration() {
   var accelerometerOptions = {
      frequency: 3000
   }
   var watchID = navigator.accelerometer.watchAcceleration(
      accelerometerSuccess, accelerometerError, accelerometerOptions);

   function accelerometerSuccess(acceleration) {
      alert('Acceleration X: ' + acceleration.x + '\n' +
         'Acceleration Y: ' + acceleration.y + '\n' +
         'Acceleration Z: ' + acceleration.z + '\n' +
         'Timestamp: '      + acceleration.timestamp + '\n');

      setTimeout(function() {
         navigator.accelerometer.clearWatch(watchID);
      }, 10000);
   };

   function accelerometerError() {
      alert('onError!');
   };
    
}

function getOrientation() {
   navigator.compass.getCurrentHeading(compassSuccess, compassError);

   function compassSuccess(heading) {
      alert('Heading: ' + heading.magneticHeading);
   };

   function compassError(error) {
      alert('CompassError: ' + error.code);
   };
}

function watchOrientation(){
   var compassOptions = {
      frequency: 3000
   }
   var watchID = navigator.compass.watchHeading(compassSuccess, 
      compassError, compassOptions);

   function compassSuccess(heading) {
      alert('Heading: ' + heading.magneticHeading);

      setTimeout(function() {
         navigator.compass.clearWatch(watchID);
      }, 10000);
   };

   function compassError(error) {
      alert('CompassError: ' + error.code);
   };
}

function dialogTypes(){
    navigator.notification.alert("This is alert message", alertCallback, "Acceleration", "Okay");
    function alertCallback() {
        console.log("Alert is Dismissed!");
    }

    navigator.notification.confirm("I accept terms and conditions.", confirmCallback, "Plz Confirm", "Agree,Disagree");
    function confirmCallback(buttonIndex) {
        console.log("You clicked " + buttonIndex + " button!");
    }

    var message = "Am I Prompt Dialog?";
   var title = "PROMPT";
   var buttonLabels = ["YES","NO"];
   var defaultText = "Default"
   navigator.notification.prompt(message, promptCallback, 
      title, buttonLabels, defaultText);

   function promptCallback(result) {
      console.log("You clicked " + result.buttonIndex + " button! \n" + 
         "You entered " +  result.input1);
   }

   
   var times = 2;
   navigator.notification.beep(times);
    
};
