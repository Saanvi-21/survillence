video = "";
objects = [];
status = "";
function preload(){
    video = createVideo('video.mp4');
    video.hide()
}
function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
}


function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.volume(0);
    video.speed(1);
}
function gotResult(error, results){
    if (error){
        console.log(error);
    }else{
        console.log(results);
        objects = results;
    }
}
function draw(){
    image(video,0,0,480,380);

    if(status != ""){

        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {

            document.getElementById("status").innerHTML = "Status : objects Detected";
            document.getElementById("number").innerHTML = "Number of objects are : "+ objects.length;

            fill("#0000FF")
            perecent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + perecent + " %", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#0000FF");
            rect(objects[i].x, objects[i].y, objects[i].width , objects[i].height);
        }
        }
    }