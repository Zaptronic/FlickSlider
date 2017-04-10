var Flickity = require('flickity');
var $ = require("jquery");
// console.log(Flickity);

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

function backgroundColorSelector(colorvalue) {
    var colors = [
        {
            dominantColor: false,
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

    backgroundColorSetter = function() {
        var colorSlide = String('rgb(' + colors[colorvalue].backgroundColor + ')');
        if(!colors[colorvalue].dominantColor) {
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
