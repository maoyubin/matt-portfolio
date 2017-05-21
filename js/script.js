// An empty js file added to prevent animations firing on page loading
jQuery(document).ready(function() {
	var offset = 220;
	var duration = 500;
	jQuery(window).scroll(function() {
		var browserWidth = jQuery(window).width();

		//if(browserWidth > 450){
			if (jQuery(this).scrollTop() > offset) {
				jQuery('.back-to-top').fadeIn(duration);
			} else {
				jQuery('.back-to-top').fadeOut(duration);
			}
		//}
	});

	jQuery('.back-to-top').click(function(event) {
		event.preventDefault();
		jQuery('html, body').animate({scrollTop: 0}, duration);
		return false;
	});
		
	$('a[href*="#port--"]').click(function() {
	  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
	    var target = $(this.hash);
	    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	    if (target.length) {
	      $('html, body').animate({
	        scrollTop: target.offset().top
	      }, 1000);
	      return false;
	    }
	  }
	});

	var dom  = Portfolio.Utils.Dom;
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var header = $('.main-menu');
	var navbarHeight = header.outerHeight();

	var DOMcache = {
		header: $('.main-menu')[0],
        sections:  $(".main-section")
    };

    var headerHeight = parseInt(window.getComputedStyle(DOMcache.header, null).height);

	$(window).scroll(function(event){
		didScroll = true;
	});

	setInterval(function() {
		if (didScroll) {
			hasScrolled();
			didScroll = false;
		}

		var scrolledValue =  headerHeight + dom.getBody().scrollTop;
        activateSideMenuItem(scrolledValue);
	}, 300);

	//var scrolledValue =  headerHeight + dom.getBody().scrollTop;
	//activateSideMenuItem(scrolledValue);

	function hasScrolled() {
		var st = $(this).scrollTop();
		// Make sure they scroll more than delta
		if(Math.abs(lastScrollTop - st) <= delta)
			return;

		// If they scrolled down and are past the navbar, add class .nav-up.
		// This is necessary so you never see what is "behind" the navbar.
		if (st > lastScrollTop && st > navbarHeight){
			// Scroll Down
			header.removeClass('nav-down').addClass('nav-up');
		} else {
			// Scroll Up
			if(st < $(window).height()) {
			    header.removeClass('nav-up').addClass('nav-down');
			}
		}

		lastScrollTop = st;
	};

	function activateSideMenuItem( position ) {

        var coords = [].slice.call( DOMcache.sections ).map( function(section) {
            return {
                id: section.id,
                coord: dom.getElemDistance(section)
            };
        }).filter(function( section ) {
            return section.coord <= position;
        });
		
        var indexId = coords[coords.length -1].id;


        [].slice.call(DOMcache.sections).map( function(section) {
        	
        	if(indexId==section.id && !$(section).hasClass("icon-active")){
        		$(dom.getSideMenuObj(indexId)).addClass("icon-active")
        	}else if(indexId != section.id){
        		$(dom.getSideMenuObj(section.id)).removeClass("icon-active");
        	}
        });
    };


});