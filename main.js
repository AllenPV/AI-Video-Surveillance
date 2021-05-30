objects = [];
status = "";

function setup() {
    Canvas = createCanvas(480, 380);
    Canvas.center();
    Video = createCapture(VIDEO);
    Video.hide();
    Video.size(480,380);
}



function Start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status:Detecting Objects";
}

function modelLoaded() {
    console.log("Model is Loaded");
    status = true;
   
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(Video, 0, 0, 480, 380);
    if (status != "") {
        objectDetector.detect(Video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status:Objects Detected";
            document.getElementById("no._of_objects").innerHTML = "Number of objects detected - " + objects.length;
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}