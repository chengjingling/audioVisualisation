var mySound;
var playStopButton;
var analyzer;
var spectralCentroid;
var brightness;
var zcr;
var circleSize;
var outerCircleSize;
var amplitudeSpectrum;
var barHeights;
var myRec;
var speechColor;

function preload() {
    mySound = loadSound('/sounds/Kalte_Ohren_(_Remix_).mp3');
}

function setup() {
    createCanvas(1000, 600);
    
    playStopButton = createButton('play');
    playStopButton.position(width - 45, 20);
    playStopButton.mousePressed(playStopSound);

    spectralCentroid = 0;
    zcr = 0;
    amplitudeSpectrum = [];
    
    if (typeof Meyda === 'undefined') {
        console.log('Meyda could not be found!');
    }
    
    else {
        console.log('Meyda found!');
        analyzer = Meyda.createMeydaAnalyzer({
            'audioContext': getAudioContext(),
            'source': mySound,
            'bufferSize': 512,
            'featureExtractors': ['spectralCentroid', 'zcr', 'amplitudeSpectrum'],
            'callback': features => {
                spectralCentroid = features.spectralCentroid;
                zcr = features.zcr;
                amplitudeSpectrum = features.amplitudeSpectrum;
            }
        });
    }
    
    myRec = new p5.SpeechRec('en-US', parseResult);
	myRec.continuous = true;
	myRec.interimResults = true;
    myRec.start();
    
    speechColor = '#189945';
}

function draw() {
    frameRate(20);
    noStroke();

    if (mySound.isPlaying()) {
        brightness = map(spectralCentroid, 0, 256, 0, 1);
    }
    else {
        brightness = 0;
    }
    background(lerpColor(color('black'), color('white'), brightness));
    
    if (mySound.isPlaying()) {
        circleSize = map(zcr, 0, 255, 285, 405);
        outerCircleSize = map(zcr, 0, 255, 295, 575);
    }
    else {
        circleSize = 285;
        outerCircleSize = 295;
    }
    fill(speechColor);
    circle(500, 300, outerCircleSize);
    fill('#DDD');
    circle(500, 300, circleSize);
    
    barHeights = [];
    if (mySound.isPlaying()) {
        for (var i = 0; i < 8; i++) {
            barHeights.push(amplitudeSpectrum[i] * 1.5);
        }
    }
    else {
        barHeights = [0, 0, 0, 0, 0, 0, 0, 0];
    }
    fill(speechColor);
    rect(387.5, 300 - barHeights[0] / 2, 15, barHeights[0], 10);
    rect(417.5, 300 - barHeights[1] / 2, 15, barHeights[1], 10);
    rect(447.5, 300 - barHeights[2] / 2, 15, barHeights[2], 10);
    rect(477.5, 300 - barHeights[3] / 2, 15, barHeights[3], 10);
    rect(507.5, 300 - barHeights[4] / 2, 15, barHeights[4], 10);
    rect(537.5, 300 - barHeights[5] / 2, 15, barHeights[5], 10);
    rect(567.5, 300 - barHeights[6] / 2, 15, barHeights[6], 10);
    rect(597.5, 300 - barHeights[7] / 2, 15, barHeights[7], 10);
}

function playStopSound() {
    if (mySound.isPlaying()) {
        mySound.pause();
        analyzer.stop();
        playStopButton.html('play');
    } 
    else {
        mySound.loop();
        analyzer.start();
        playStopButton.html('stop');
    }
}

function parseResult() {
    var mostrecentword = myRec.resultString.split(' ').pop().toLowerCase();
    console.log(mostrecentword);
    if (mostrecentword.indexOf('red') !== -1 ||
        mostrecentword.indexOf('orange') !== -1 ||
        mostrecentword.indexOf('yellow') !== -1 ||
        mostrecentword.indexOf('blue') !== -1 ||
        mostrecentword.indexOf('purple') !== -1) 
    {
        speechColor = mostrecentword;
    }
    else if (mostrecentword.indexOf('green') !== -1)
    {
        speechColor = '#189945';
    }
}