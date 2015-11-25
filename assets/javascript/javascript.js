
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
        var imageURL=".image"+$(this).attr("data-id");
        console.log(imageURL);
        var bigImage = new Image();
        bigImage = $(imageURL);
        bigImage.src=source.substr(0,source.length-9)+".jpg";  //sets the src to be the url for non-thumbnail version
        console.log(bigImage+ " big image");
        var widthHeight = $(bigImage).on('load',getWidthHeight(bigImage));
        //$(this).animate({width: widthHeight[0].width+"px", height: widthHeight[0].height+"px"}, {queue: false});  //animate the box out to the size of the non-thumbnail, reduces jerkiness
            //got the queue:false idea from https://css-tricks.com/examples/jQueryStop/
        $(this).attr("src",source.substr(0,source.length-9)+".jpg"); //subtract 9 for thumb.jpg, switches the src to be the non-thumb version
        $(this).css("position","absolute");  //make position absolute so it doesn't push the other ones in the gallery around
        //$(this).attr("left",thumbLeft);  //sets the left position of the the new full size image to be that of the old thumbnail version
        //$(this).attr("top",thumbTop); //sets the top position of the new full size image to be that of the old thumbnail version
        $(this).offset({top: 0, left: 0});
        $(this).css("z-index","2"); //sets the z-index higher than the 1 they all start out with, to push it in front
        $(this).addClass("opened");
        $(this).removeClass("unOpened");
        $(this).addClass("alignToCenter");

        var viewportWidth=$(window).width(); //get the viewport width
        var viewportHeight=$(window).height(); //get the viewport height
        var marginWidth=(viewportWidth - widthHeight[0].width) / 1.9; //not dividing by 2 b/c want off-screen a little
        var marginHeight=(viewportHeight - widthHeight[0].height) / 1.9; //not dividing by 2 b/c want off-screen a little
        console.log("margin width: "+marginWidth+" and margin height: "+marginHeight);
        $(this).css("border-right",marginWidth+"px solid black"); //making the rest of the screen black with the margin width
        $(this).css("border-left",marginWidth+"px solid black"); //making the rest of the screen black with the margin width
        $(this).css("border-bottom",marginHeight+"px solid black"); //making the rest of the screen black with the margin height
        $(this).css("border-top",marginHeight+"px solid black"); //making the rest of the screen black with the margin height
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
        //$(this).animate({width: widthHeight[0].width+"px", height: widthHeight[0].height+"px"}, {queue: false});  //animate the box out to the size of the non-thumbnail, reduces jerkiness

        $(this).attr("src",source.substr(0,source.length-4)+"thumb.jpg");  //subtracts 4 for .jpg
        console.log("got even further");
        $(this).addClass("transitionBorder");
        $(this).css("z-index","1");
        $(this).css("position","static");
        $(this).addClass("unOpened");
        $(this).removeClass("opened");
        $(this).removeClass("alignToCenter");
        // $(this).css("border-right","1px solid black");
        // $(this).css("border-right","1px solid black");
        // $(this).css("border-bottom","1px solid black");
        // $(this).css("border-top","1px solid black");
        $(this).css("border","1px solid black");
    });
});

$(document).ready(function(){
    $(document).on('click',".addFilter",function(event){
        event.preventDefault();
        $(".errorMessage").text("");
        $(".addFilter").addClass("hidden"); //so can't try to re-filter without clearing first
        var minYear=99999999999; //setting it super low so every image's data-year will be less than it the first time through loop below
        var maxYear=-9999999999; //setting it high for the opposite of above
        var formMin=$("#minYear").val(); //minimum year from form
        var formMax=$("#maxYear").val(); //max year from form

        $(".wrapper").find("img").each(function(i){ //loop through each img in the wrapper container
            var loopYear=$(this).attr("data-year"); //sets loopYear to be the data-year attribute of the current img
                if(loopYear<minYear){
                    minYear=loopYear; //re-sets minYear to be the current imgs data-year
                }

                if(loopYear>maxYear){
                    maxYear=loopYear; //re-sets maxYear to be the current imgs data-year
                }

            if ($(this).attr("data-year")<formMin || $(this).attr("data-year")>formMax) {  //checks if the imgs data-year is less than min from form or > max from form
                $(".wrapper").find("[data-id='"+$(this).attr("data-id")+"']").addClass("hideMeLater"); //adds the hideMeLater class - done so that hidden gets added, only if it passes validations later
            };
        });

        if(formMin>formMax) {
            $(".errorMessage").html("You have selected a Maximum Year before the Minimum Year!");
        }else if(formMin<minYear) {
            if(formMax>maxYear) {
                $(".errorMessage").html("You have chosen dates outside Laura's activity from "+minYear+" to "+maxYear);
            } else{

                $(".errorMessage").html("You have selected a minimum year before Laura's first painting in "+minYear+"!");            
            }
        } else if(formMax>maxYear){
                $(".errorMessage").html("You have selected a maximum year after Laura's last painting in "+maxYear+"!");                        
        } else{
            $(".wrapper").find(".hideMeLater").addClass("hidden"); //if there are no errors, add the hidden class which actually hides it
        }

    });
});

$(document).ready(function(){
    $(document).on('click',".removeFilter",function(event){
        event.preventDefault();
        $(".wrapper").find("img.hidden").each(function(i){
            $(".wrapper").find("[data-id='"+$(this).attr("data-id")+"']").removeClass("hidden");
            $(".wrapper").find("[data-id='"+$(this).attr("data-id")+"']").removeClass("hideMeLater");
        });
        
        $(".addFilter").removeClass("hidden");
    });
});
