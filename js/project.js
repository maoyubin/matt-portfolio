// An empty js file added to prevent animations firing on page loading
jQuery(document).ready(function() {

    var slides = $("[class^='carousel-slides-']");
    var projectLabels = $(".projects-nav label");
    var slideDots = $(".carousel-nav-dots").children("label");
    var projectImgMap = new Map();
    var lastSelectedSlide = $(slides[0]);
	initialDots();

    slides.each(function(index) {
    	projectImgMap.set($(projectLabels[index]).attr('for'),$(slides[index]));
		if(index==0){
			 $(slides[index]).css("display","block");
			 displaySlideImgs($(slides[index]));
		}else{
			 $(slides[index]).css("display","none");
			 displaySlideImgs($(slides[index]),-1);
		}
	});

	function hideSlideImgs(slideItem = $(slides[index]),selectIndex = 0){
		slides.each(function(index) {
	    	projectImgMap.set($(projectLabels[index]).attr('for'),$(slides[index]));
			if(index==0){
				displaySlideImgs($(slides[index]));
			}else{
				displaySlideImgs($(slides[index]),-1);
			}
		});
	}

	$( ".projects-nav label" ).on( "click", function() {
		initialDots();

		slides.each(function(index) {
    		$(slides[index]).css("display","none");
		});

		displaySlideImgs(lastSelectedSlide,-1);
		displaySlideImgs(projectImgMap.get($(this).attr('for')));
		projectImgMap.get($(this).attr('for')).css("display","block");
		lastSelectedSlide = projectImgMap.get($(this).attr('for'));
	});

	$(".carousel-nav-dots label").hover( function(event){
    	slideDots.each(function(index) {
    		$(slideDots).removeClass('active-dots');
    		$(slideDots).addClass('unactive-dots');
		}); 
		$(this).addClass('active-dots');
	} );

	function displaySlideImgs(slideItem,selectIndex = 0){
		slideItem.children().eq(0).css("display", selectIndex == 0 ?"block":"none");
		slideItem.children().eq(1).css("display", selectIndex == 1 ?"block":"none");
		slideItem.children().eq(2).css("display", selectIndex == 2 ?"block":"none");
	};

	function initialDots(){
		slideDots.each(function(index) {
			$(slideDots[index]).removeClass('active-dots');
			if(index==0){
				$(slideDots[index]).addClass('active-dots');
			}else{
				$(slideDots[index]).addClass('unactive-dots');
			}    		
		}); 
	};


});