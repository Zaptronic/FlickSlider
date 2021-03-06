var Flickity = require('flickity');
var $ = require("jquery");
var p5 = require('p5');
// var sketch = require('./sketch');

var $progressBar = $('.progress-bar');
var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  cellAlign: 'left',
  wrapAround: true,
  setGallerySize: false,
  dragThreshold: 12,
  pageDots: false

});

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
        dominantColor: true,
        backgroundColor: [100,10,100]
    },
    {
        dominantColor: false,
        backgroundColor: [199,204,198]
    },
    {
        dominantColor: false,
        backgroundColor: [130,200,130]
    }
];
var dominantColorCollection = [];
// var dominantColorIndex = [];

//for every slide do check
//check dom color if true
//get index == dom index
//check if img is available in index
//create new p5 sketch
// add argument index
// var indexslide = new p5(sketch, index);
var globalIndex = 0;

var sketch = function(mySketch) {
    mySketch.index = globalIndex;
    mySketch.collectColors = [];
    mySketch.img;
    // var checkImage = $('.is-selected img').attr('src');
    var checkimage = "img/L100107" + mySketch.index +".jpg";
    //use combi from checkImage and checkimage2
    //grab the first image in (carroussel_inner img)
    //strip the static part from the src turn it into a variable
    //add the checkimage 2 technique

    mySketch.setup = function() {
        mySketch.noCanvas();
        mySketch.img = mySketch.loadImage(checkimage, mySketch.imgAnalyzer);
    };
    mySketch.imgAnalyzer = function() {
        var redC = 0;
        var greenC = 0;
        var blueC = 0;
        mySketch.img.loadPixels();
        for (var y = 0; y < mySketch.img.height; y+=100) {
            for (var x = 0; x < mySketch.img.height; x+=50) {
                    var colors = mySketch.img.get(x,y);
                    mySketch.collectColors.push(colors);
            }
        }
        mySketch.img.updatePixels();
        // console.log(mySketch.collectColors);

        var count = mySketch.collectColors.length;
        for (var i = 0; i < mySketch.collectColors.length; i++) {
            redC += parseInt(mySketch.collectColors[i][0]);
            greenC += parseInt(mySketch.collectColors[i][1]);
            blueC += parseInt(mySketch.collectColors[i][2]);
        }
        var avR = mySketch.floor(redC / count);
        var avG = mySketch.floor(greenC / count);
        var avB = mySketch.floor(blueC / count);
        var domColor = [avR, avG, avB];
        dominantColorPush(domColor);
    }
};

$('.carousel-cell__inner img').each( function(index){
    globalIndex++;
    var myp5 = new p5(sketch);
});

// $('.carousel-cell__inner').each( function(index){
//     if ( $(this).find('img').length ) {
//         globalIndex++;
//         var myp5 = new p5(sketch);
//         // dominantColorIndex.push(index);
//     } else {
//         // dominantColorIndex.push(false);
//     }
// });



// backgroundColorSelector(flkty.selectedIndex);
progressBarMapper();
function backgroundColorSelector(colorvalue) {

    backgroundColorSetter = function() {
        var convertfactor = dominantColorCollection.length / colors.length;
        console.log(convertfactor);
        //might be faulty
        var convertColor = Math.round(colorvalue * convertfactor);
        console.log(convertColor);

        var dominantSlide = String('rgb(' + dominantColorCollection[convertColor].dominantColorValues + ')');
        var colorSlide = String('rgb(' + colors[colorvalue].backgroundColor + ')');

        if(colors[colorvalue].dominantColor) {
            $('body').css('background-color', dominantSlide);
        } else if (!colors[colorvalue].dominantColor) {
            $('body').css('background-color', colorSlide);
        } else {
            $('body').css('background-color', 'white');
        }
    }
    this.backgroundColorSetter();
}

function progressBarMapper() {
    var mapper = (100 / flkty.slides.length);
    $progressBar.width( mapper + (flkty.selectedIndex * mapper) + '%' );
}

function dominantColorPush(domColor) {
    var newDominantColor = {'dominantColorValues': domColor};
    dominantColorCollection.push(newDominantColor);
    backgroundColorSelector(flkty.selectedIndex);
}

//contrast check to see if text has enough contrast
function getContrastYIQ(avR, avG, avB){
	var yiq = ((avR*299)+(avG*587)+(avG*114))/1000;
    // console.log(yiq);
    if (yiq >= 128) {
        return true; //white
    }
}

flkty.on( 'select', function() {
  backgroundColorSelector(flkty.selectedIndex);
  progressBarMapper();
});
