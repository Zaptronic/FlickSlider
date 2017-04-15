var p5 = require('p5');

var sketch = function(mySketch) {
    mySketch.collectColors = [];
    var checkImage = $('.is-selected img').attr('src');
    var checkWidth = $('.is-selected img').width();
    mySketch.img;

    mySketch.setup = function() {
        mySketch.createCanvas(250, 250);
        //for loop check op bestaan plaatje en check op dominantcolor in color
        //if true doe volgende regel
        mySketch.img = mySketch.loadImage(checkImage, mySketch.imgAnalyzer);
        // if false push empty value (or false) in color array
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
        getContrastYIQ(avR, avG, avB);
    }
};
