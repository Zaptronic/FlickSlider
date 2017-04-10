var Flickity = require('flickity');
var $ = require("jquery");
var p5 = require('p5');

var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  wrapAround: true,
  setGallerySize: false,
  dragThreshold: 12,
  pageDots: false

});
var $progressBar = $('.progress-bar');

backgroundColorSelector(flkty.selectedIndex);
progressBarMapper();

flkty.on( 'select', function() {
  backgroundColorSelector(flkty.selectedIndex);
  progressBarMapper();
});

var sketch = function(mySketch) {
    mySketch.collectColors = [];
    var checkImage = $('.is-selected img').attr('src');
    var checkWidth = $('.is-selected img').width();
    mySketch.img;

    mySketch.setup = function() {
        mySketch.createCanvas(250, 250);
        mySketch.img = mySketch.loadImage(checkImage, mySketch.imgAnalyzer);
    };
    mySketch.imgAnalyzer = function() {
        console.log(mySketch.img);
        mySketch.img.loadPixels();
        for (var y = 0; y < mySketch.img.height; y+=100) {
            for (var x = 0; x < mySketch.img.height; x+=50) {
                    var colors = mySketch.img.get(x,y);
                    mySketch.collectColors.push(colors);
            }
        }
        mySketch.img.updatePixels();
        console.log(mySketch.collectColors);

        // not checked just copied from dominatcolortest
        // console.log(collectColors);
        // var count = collectColors.length;
        // for (var i = 0; i<collectColors.length; i++) {
        //     redC += parseInt(collectColors[i][0]);
        //     greenC += parseInt(collectColors[i][1]);
        //     blueC += parseInt(collectColors[i][2]);
        // }
        // avR = floor(redC / count);
        // avG = floor(greenC / count);
        // avB = floor(blueC / count);
        // console.log(redC, greenC, blueC);
        // console.log(avR, avG, avB);
        // getContrastYIQ(avR, avG, avB);


    }
    mySketch.draw = function() {
        mySketch.frameRate(1);
        mySketch.background(0);
        mySketch.fill(255);
        mySketch.image(mySketch.img, 0, 0);
    };
};

var myp5 = new p5(sketch);

function backgroundColorSelector(colorvalue) {
    var colors = [
        {
            dominantColor: true,
            backgroundColor: [255,220,220]
        },
        {
            dominantColor: false,
            backgroundColor: [220,200,255]
        },
        {
            dominantColor: false,
            backgroundColor: [200,100,50]
        },
        {
            dominantColor: false,
            backgroundColor: [30,0,130]
        }
    ];
    dominantColorCalculator = function() {
        if(colors[colorvalue].dominantColor) {
            var checkImage = $('.is-selected img').attr('src');
            console.log('checkthis: ' + checkImage);
        } else {
            return;
        }

        //select img from current slide
        //loop trough pixels in image an calculate dominantColor
        //return dominantColor
    }

    backgroundColorSetter = function() {
        var colorSlide = String('rgb(' + colors[colorvalue].backgroundColor + ')');
        if(!colors[colorvalue].dominantColor) {
            $('body').css('background-color', colorSlide);
        } else {
            $('body').css('background-color', 'white');
        }
    }
    this.dominantColorCalculator();
    this.backgroundColorSetter();
}

function progressBarMapper() {
    var mapper = (100 / flkty.slides.length);
    $progressBar.width( mapper + (flkty.selectedIndex * mapper) + '%' );
}

function getContrastYIQ(avR, avG, avB){
	var yiq = ((avR*299)+(avG*587)+(avG*114))/1000;
    console.log(yiq);
    if (yiq >= 128) {
        return true; //white
    }
}

// var promise = new Promise(function(resolve, reject) {
//     mySketch.img = mySketch.loadImage(checkImage);
//     console.log('prom');
//
//     if(checkImageLoaded) {
//         resolve(mySketch.img);
//     } else {
//         reject();
//     }
// });
//
// promise.then(function(){
//     console.log(succes);
//     console.log(mySketch.img);
//     mySketch.img.loadPixels();
//     for (var y = 0; y < mySketch.img.height; y+=10) {
//         for (var x = 0; x < mySketch.img.height; x+=5) {
//                 var colors = mySketch.img.get(x,y);
//                 mySketch.collectColors.push(colors);
//         }
//     }
//     mySketch.img.updatePixels();
// }, function(err){
//     console.log('err');
// });
