/*up*/
$(window).on("scroll",function(){
    if($(window).scrollTop()>=10){
        $(".up").addClass("show")
    }
    else{
        $(".up").removeClass("show")
    }  
})
$(".up").on("click",function(){
    $(window).scrollTop({
        top:0
    })
})
/*end up*/



