$(document).ready(function () {

    $(document).on("scroll", onScroll);
    
    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        
        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');
      
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top-50
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
		$('.mainMenu').hide();
    });
	
	//nav function
	$('.dropdown-toggle').click(function(){
		$('.mainMenu').toggle();
	});
	//to do reset menu on resize
	
	//modal function
	$('.item-works').on('click', function(){
	
		var thisModal = $(this).attr('data-modal'); 
		//console.log(thisModal);
		$('.modal-window, .modal-overlay').css('display','none');
		$('.modal-overlay, #'+thisModal).css('display','block');
		
		 $('html, body').stop().animate({
            'scrollTop': $('#'+thisModal).offset().top-100
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
		
	});
	$('.modal-window .close').on('click', function(){
		$(this).parent().css('display','none');
		$('.modal-overlay').css('display','none');
	});
	$('.modal-overlay').on('click', function(){
		$('.modal-window .close').trigger('click');
	});
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('.mainMenu a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.mainMenu li a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}