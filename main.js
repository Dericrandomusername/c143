video = "";
function setup() {
    canvas = createCanvas(600, 500)
    canvas.center();
    video = createCapture(VIDEO);
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)

}
function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX=" + leftWristX + "leftWristY=" + leftWristY);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX=" + rightWristX + "righttWristY=" + rightWristY);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;

    }
}
function modelLoaded() {
    console.log('Posenet Is Initialized')
}

song1 = "";
song2 = "";
song1_status = "";
song2_status = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;

leftWristX = 0;
rightWristX = 0;
leftWristY = 0;
rightWristY = 0;
function preload() {
    song1 = loadSound("music.mp3")
    song2 = loadSound("believer.mp3")
}
function draw() {
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    image(video, 0, 0, 600, 500)
    fill("red")
    stroke("red")
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        song2.stop()
        if (song1_status == false) {
            song1.play()
            document.getElementById("song").innerHTML = "playing harry potter theme"
        }
    }
    if (scoreLeftWrist > 0.5) {
        circle(leftWristX, leftWristY, 20);
        song1.stop()
        if (song2_status == false) {
            song2.play()
            document.getElementById("song").innerHTML = "playing Believer"
        }
    }
}
function play() {
    song.play()
    song.setVolume(1);
    song.rate(1)
}