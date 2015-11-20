
function getWidthHeight(bigImage){
    var widthHeight = {width: bigImage.width, height: bigImage.height}; //sets the width and height into an array
        return widthHeight; //passes back the array
  //got this concept from: http://stackoverflow.com/questions/8636857/get-the-width-of-an-image-specified-by-an-url-jquery
}

$(document).ready(function(){
    console.log("working");
    $(document).on('click',"img.unOpened",function(){
        console.log("got in the first one");
        console.log($(this).attr("src"));
        var source=$(this).attr("src");
        var thumbLeft=parseInt($(this).position().left);  //find the left positon of the thumbnail image
        var thumbTop=parseInt($(this).position().top); //find the top position of the thumbnail image
        // console.log("left "+$(this).position().left);
        // console.log("top "+thumbTop);
        // var bigImage = new Image(); //creating a temporary image, for the non-thumbnail version of the image to get the width/height attributes for the animation
        // bigImage.src=source.substr(0,source.length-9)+".jpg";  //sets the src to be the url for non-thumbnail version
        // var widthHeight = $(bigImage).load(getWidthHeight(bigImage)); //creates an array variable that holds the width and the height
        // var widthHeight = $(bigImage).on("load",getWidthHeight(bigImage));
        var imageURL=".image"+$(this).attr("id");
        console.log(imageURL);
        var bigImage = new Image();
        bigImage = $(imageURL);
        bigImage.src=source.substr(0,source.length-9)+".jpg";  //sets the src to be the url for non-thumbnail version
        console.log(bigImage+ " big image");
        var widthHeight = $(bigImage).on('load',getWidthHeight(bigImage));
        console.log(bigImage);
        console.log(widthHeight[0].width);
        console.log(widthHeight[0].height);
        $(this).animate({width: widthHeight[0].width+"px", height: widthHeight[0].height+"px"}, {queue: false});  //animate the box out to the size of the non-thumbnail, reduces jerkiness
            //got the queue:false idea from https://css-tricks.com/examples/jQueryStop/
        $(this).attr("src",source.substr(0,source.length-9)+".jpg"); //subtract 9 for thumb.jpg, switches the src to be the non-thumb version
        $(this).css("position","absolute");  //make position absolute so it doesn't push the other ones in the gallery around
        $(this).attr("left",thumbLeft);  //sets the left position of the the new full size image to be that of the old thumbnail version
        $(this).attr("top",thumbTop); //sets the top position of the new full size image to be that of the old thumbnail version
        $(this).css("z-index","2"); //sets the z-index higher than the 1 they all start out with, to push it in front
        $(this).addClass("opened");
        $(this).removeClass("unOpened");
    });
});

$(document).ready(function(){
    $(document).on('click',"img.opened",function(){
        console.log("got in here");
        // console.log($(this).attr("src"));
        var source=$(this).attr("src");
        
        var thumbImage = new Image(); //creating a temporary image, for the non-thumbnail version of the image to get the width/height attributes for the animation
        thumbImage.src=source.substr(0,source.length-4)+"thumb.jpg";  //sets the src to be the url for non-thumbnail version
        var widthHeight = $(thumbImage).on("load",getWidthHeight(thumbImage)); //creates an array variable that holds the width and the height
        $(this).animate({width: widthHeight[0].width+"px", height: widthHeight[0].height+"px"}, {queue: false});  //animate the box out to the size of the non-thumbnail, reduces jerkiness
        
        $(this).css("z-index","1");
        $(this).css("position","static");
        $(this).addClass("unOpened");
        $(this).removeClass("opened");
        $(this).attr("src",source.substr(0,source.length-4)+"thumb.jpg");  //subtracts 4 for .jpg
    });
});

$(document).ready(function(){
    $(document).on('click',".button",function(event){
        event.preventDefault();
        console.log("got into the button");
        // console.log($(this).attr("src"));
        var minYear=$("#minYear").val();
        var maxYear=$("#maxYear").val();
        console.log(minYear+" minYear "+maxYear+" maxYear");
        console.log("images "+$(".wrapper img").length);

        $(".wrapper").find("img").each(function(i){
            console.log($(this));
            if ($(this).attr("title")<minYear || $(this).attr("title")>maxYear) {
                console.log("inside the if");
                $(".wrapper").find("#"+$(this).attr("id")).addClass("hidden");
                console.log($(this).attr("id"));
            };
        });
    });
});

$(document).ready(function(){
    $(document).on('click',".removeFilter",function(event){
        event.preventDefault();
        console.log("in the removefilter");
        $(".wrapper").find("img.hidden").each(function(i){
            $(".wrapper").find("#"+$(this).attr("id")).removeClass("hidden");
        });
    });
});