var Flickity = require('flickity');
var $ = require("jquery");
var p5 = require('p5');
// var sketch = require('./sketch');

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
        dominantColor: false,
        backgroundColor: [255,220,220]
    },
    {
        dominantColor: true,
        backgroundColor: [220,200,255]
    },
    {
        dominantColor: false,
        backgroundColor: [185,164,222]
    },
    {
        dominantColor: false,
        backgroundColor: [30,0,130]
    }
];

var dominantColorCollection = [];
var imagesCollection = [];
var $progressBar = $('.progress-bar');

var sketch = function(mySketch) {
    mySketch.collectColors = [];
    var checkImage = $('.is-selected img').attr('src');
    var checkWidth = $('.is-selected img').width();
    mySketch.img;
    mySketch.imgs = [];

    mySketch.setup = function() {
        mySketch.createCanvas(250, 250);
        $('.carousel-cell__inner').each(function(index){
            var imgs = $(this).find('img').attr('src');
            if (imgs) {
                imagesCollection.push(imgs);
                var url = imagesCollection[index];
                mySketch.imgs = new ImageObject(index, mySketch);

                console.log(mySketch.imgs);
                // mySketch.img = mySketch.loadImage(url, mySketch.imgAnalyzer);
            } else {
                imagesCollection.push(false);
                return;
            }
            // console.log(mySketch.img);
        });
        // for(var i=0; i < imagesCollection.length; i++) {
        //     console.log(imagesCollection);
        //     if (colors[i].dominantColor == true) {
        //         mySketch.img = mySketch.loadImage(imagesCollection[i], mySketch.imgAnalyzer);
        //     } else {
        //         dominantColorCollection.push(false);
        //         console.log('false');
        //     }
        // }

        // colors[i].dominantColor
        // console.log(imagesCollection);
        // console.log(dominantColorCollection);
        //for loop check op dominantcolor in color
        //check if img exist if so grab img
        //if true doe volgende regel
        // mySketch.img = mySketch.loadImage(checkImage, mySketch.imgAnalyzer);
        // if false push empty value (or false) in color array
    };
    // mySketch.imgAnalyzer = function() {
    //     var redC = 0;
    //     var greenC = 0;
    //     var blueC = 0;
    //     mySketch.img.loadPixels();
    //     for (var y = 0; y < mySketch.img.height; y+=100) {
    //         for (var x = 0; x < mySketch.img.height; x+=50) {
    //                 var colors = mySketch.img.get(x,y);
    //                 mySketch.collectColors.push(colors);
    //         }
    //     }
    //     mySketch.img.updatePixels();
    //
    //
    //     var count = mySketch.collectColors.length;
    //     for (var i = 0; i < mySketch.collectColors.length; i++) {
    //         redC += parseInt(mySketch.collectColors[i][0]);
    //         greenC += parseInt(mySketch.collectColors[i][1]);
    //         blueC += parseInt(mySketch.collectColors[i][2]);
    //     }
    //     var avR = mySketch.floor(redC / count);
    //     var avG = mySketch.floor(greenC / count);
    //     var avB = mySketch.floor(blueC / count);
    //     var domColor = [avR, avG, avB];
    //     dominantColorPush(domColor);
    //     getContrastYIQ(avR, avG, avB);
    //
    //     console.log(dominantColorCollection);
    // }
};

ImageObject = function(index, mySketch) {
    this.collectColors = [];
    this.index = index;
    this.url = imagesCollection[index];
    // this.img = mySketch.loadImage(this.url, this.imgAnalyzer);
    this.img = mySketch.loadImage(this.url, this.imgAnalyzer);
    console.log(this.img);
    mySketch.loadImage(this.url);
    // var redC = 0;
    // var greenC = 0;
    // var blueC = 0;
    //
    // mySketch.loadPixels();
    // for (var y = 0; y < this.img.height; y+=100) {
    //     for (var x = 0; x < this.img.height; x+=50) {
    //             var colors = this.img.get(x,y);
    //             this.collectColors.push(colors);
    //     }
    // }
    // mySketch.updatePixels();
    // console.log(this.img.height);
    // console.log(this.imgAnalyzer);

    this.imgAnalyzer = function() {
        console.log('mik');
        var redC = 0;
        var greenC = 0;
        var blueC = 0;
        this.img.loadPixels();
        for (var y = 0; y < this.img.height; y+=100) {
            for (var x = 0; x < this.img.height; x+=50) {
                    var colors = this.img.get(x,y);
                    this.collectColors.push(colors);
            }
        }
        this.img.updatePixels();
        console.log('collectcolors ' + this.collectColors);


        // var count = mySketch.collectColors.length;
        // for (var i = 0; i < mySketch.collectColors.length; i++) {
        //     redC += parseInt(mySketch.collectColors[i][0]);
        //     greenC += parseInt(mySketch.collectColors[i][1]);
        //     blueC += parseInt(mySketch.collectColors[i][2]);
        // }
        // var avR = mySketch.floor(redC / count);
        // var avG = mySketch.floor(greenC / count);
        // var avB = mySketch.floor(blueC / count);
        // var domColor = [avR, avG, avB];
        // dominantColorPush(domColor);
        // getContrastYIQ(avR, avG, avB);

        console.log(dominantColorCollection);
    }
    this.img = mySketch.loadImage(this.url, this.imgAnalyzer);
}

var myp5 = new p5(sketch);
backgroundColorSelector(flkty.selectedIndex);
progressBarMapper();

function backgroundColorSelector(colorvalue) {
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

function dominantColorPush(domColor) {
    var newDominantColor = {'dominantColorRGB': domColor};
    dominantColorCollection.push(newDominantColor);

    // colors.push({'dominantColorRGB': domColor});
    // console.log(newDominantColor);
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
