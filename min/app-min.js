function colors(o){var e=[{dominantColor:!1,backgroundColor:[255,220,220]},{dominantColor:!1,backgroundColor:[220,200,255]},{dominantColor:!1,backgroundColor:[200,100,50]},{dominantColor:!1,backgroundColor:[30,0,130]}];backgroundColorSetter=function(){var r=String("rgb("+e[o].backgroundColor+")");e[o].dominantColor?$("body").css("background-color","white"):$("body").css("background-color",r)},this.backgroundColorSetter()}function progressBarMapper(){var o=100/flkty.slides.length;$progressBar.width(o+flkty.selectedIndex*o+"%")}var Flickity=require("flickity"),$=require("jquery"),elem=document.querySelector(".main-carousel"),flkty=new Flickity(elem,{cellAlign:"left",wrapAround:!0,setGallerySize:!1,dragThreshold:12,pageDots:!1}),$progressBar=$(".progress-bar");colors(flkty.selectedIndex),progressBarMapper(),flkty.on("select",function(){console.log("Flickity selected slide: "+flkty.selectedIndex),colors(flkty.selectedIndex),progressBarMapper()}),flkty.on("settle",function(){console.log("Flickity settled at slide: "+flkty.selectedIndex)});