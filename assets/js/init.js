/*
 * Copyright (c) 2021 Marketify
 * Author: Marketify
 * This file is made for CURRENT TEMPLATE
*/


jQuery(document).ready(function () {

	"use strict";

	// here all ready functions

	tokyo_tm_color_switcher();
	tokyo_tm_switcher_opener();
	tokyo_tm_cursor_switcher();
	tokyo_tm_menu();
	tokyo_tm_modalbox_news();
	tokyo_tm_popupscroll();
	tokyo_tm_modalbox_about();
	tokyo_tm_popupscroll_about();
	tokyo_tm_projects();
	tokyo_tm_portfolio();
	tokyo_tm_cursor();
	tokyo_tm_imgtosvg();
	tokyo_tm_popup();
	tokyo_tm_data_images();
	tokyo_tm_contact_form();
	tokyo_tm_owl_carousel();
	tokyo_tm_my_load();

});

// -----------------------------------------------------
// ---------------   FUNCTIONS    ----------------------
// -----------------------------------------------------

// -----------------------------------------------------
// ---------------------   SWITCHERS    ----------------
// -----------------------------------------------------

function tokyo_tm_color_switcher() {
	"use strict";

	var list = jQuery('.tokyo_tm_settings .tk-unlimited-colors li a');

	list.on('click', function () {
		let thisEl = jQuery(this);

		$('.tokyo_tm_settings .tk-unlimited-colors li').removeClass('active');
		$(this.parentNode).addClass('active');

		var elval = thisEl.attr('class');

		if (typeof (Storage) !== "undefined") {
			localStorage.setItem('tk_color', elval);
		}
		thisEl.closest('.tokyo_tm_all_wrap').attr('data-color', '' + elval + '');
		return false;
	});

	let tkColor = localStorage.getItem('tk_color');
	$(`.tk-unlimited-colors a.${tkColor}`).parent().addClass('active');
	$('.tokyo_tm_all_wrap').attr('data-color', '' + tkColor + '');


}


function tokyo_tm_switcher_opener() {

	"use strict";

	var settings = jQuery('.tokyo_tm_settings');
	var button = settings.find('.link');
	var direction = settings.find('.direction li a');
	var light = settings.find('.direction li a.light');
	var dark = settings.find('.direction li a.dark');

	button.on('click', function () {
		var element = jQuery(this);
		if (element.hasClass('opened')) {
			element.removeClass('opened');
			element.closest('.tokyo_tm_settings').removeClass('opened');
		} else {
			element.addClass('opened');
			element.closest('.tokyo_tm_settings').addClass('opened');
		}
		return false;
	});

	direction.on('click', function () {
		var element = jQuery(this);
		if (!element.hasClass('active')) {
			direction.removeClass('active');
			element.addClass('active');
		}
	});

	dark.on('click', function () {
		var el = jQuery(this);
		jQuery('body').addClass('dark');
		jQuery('.tokyo_tm_partners').addClass('opened');
		el.closest('.tokyo_tm_settings').addClass('changed');
		return false;
	});

	light.on('click', function () {
		var ele = jQuery(this);
		jQuery('body').removeClass('dark');
		jQuery('.tokyo_tm_partners').removeClass('opened');
		ele.closest('.tokyo_tm_settings').removeClass('changed');
		return false;
	});
}


function tokyo_tm_cursor_switcher() {

	"use strict";

	var wrapper = jQuery('.tokyo_tm_all_wrap');
	var button = jQuery('.tokyo_tm_settings .cursor li a');
	var show = jQuery('.tokyo_tm_settings .cursor li a.show');
	var hide = jQuery('.tokyo_tm_settings .cursor li a.hide');

	button.on('click', function () {
		localStorage.setItem('tk_cursor', 'showme');
		var element = jQuery(this);
		if (!element.hasClass('showme')) {
			button.removeClass('showme');
			element.addClass('showme');
		}
		return false;
	});

	show.on('click', function () {
		wrapper.attr('data-magic-cursor', '');
		localStorage.setItem('magic_cursor', '')
	});
	hide.on('click', function () {
		localStorage.setItem('magic_cursor', 'hide')
		wrapper.attr('data-magic-cursor', 'hide');
	});

	let mCursor = localStorage.getItem('magic_cursor');

	if (mCursor == "hide") {
		$('.tokyo_tm_settings .cursor li a.show').removeClass('showme');
		$('.tokyo_tm_settings .cursor li a.hide').addClass('showme');
	}
	else {
		$('.tokyo_tm_settings .cursor li a.show').addClass('showme');
		$('.tokyo_tm_settings .cursor li a.hide').removeClass('showme');
	}

	wrapper.attr('data-magic-cursor', mCursor);


}
// -------------------------------------------------
// --------------------  MENU  ---------------------
// -------------------------------------------------

function tokyo_tm_menu() {

	"use strict";

	var list = jQuery('.tokyo_tm_all_wrap .leftpart .menu ul li,.tokyo_tm_mobile_menu .menu ul li');
	var vContent = jQuery('.tokyo_tm_all_wrap');
	var vSection = jQuery('.tokyo_tm_section');

	list.on('click', function () {
		var element = jQuery(this);
		var myHref = element.find('a').attr('href');
		if (!element.hasClass('active')) {
			list.removeClass('active');
			element.addClass('active');
			vSection.removeClass('active');
			vContent.find(myHref).addClass('active').animate({ scrollTop: 0 });
		}
	});
}

// -------------------------------------------------
// -------------  MODALBOX NEWS  -------------------
// -------------------------------------------------

function tokyo_tm_modalbox_news() {

	"use strict";

	

	var modalBox = jQuery('.tokyo_tm_modalbox_news');
	var list = jQuery('.tokyo_tm_news ul li');
	var closePopup = modalBox.find('.close');

	list.each(function () {
		var element = jQuery(this);
		var details = element.find('.list_inner').html();
		var buttons = element.find('.details .title a,.tokyo_tm_full_link,.tokyo_tm_read_more a');
		var mainImage = element.find('.main');
		var imgData = mainImage.data('img-url');
		var title = element.find('.title');
		var titleHref = element.find('.title a').html();
		buttons.on('click', function () {
			
			jQuery('body').addClass('modal');
			modalBox.addClass('opened');
			modalBox.find('.description_wrap').html(details);
			mainImage = modalBox.find('.main');
			mainImage.css({ backgroundImage: 'url(' + imgData + ')' });
			title = modalBox.find('.title');
			title.html(titleHref);
			tokyo_tm_imgtosvg();
			return false;
		});
	});
	closePopup.on('click', function () {
		modalBox.removeClass('opened');
		modalBox.find('.description_wrap').html('');
		jQuery('body').removeClass('modal');
		return false;
	});
}

// -----------------------------------------------------
// -------------    WIDGET MENU SCROLL -----------------
// -----------------------------------------------------

function tokyo_tm_popupscroll() {

	"use strict";

	var WW = jQuery(window).width();
	var H = jQuery(window).height();
	var scrollable = jQuery('.tokyo_tm_modalbox_news .scrollable');

	var popupBox = jQuery('.tokyo_tm_modalbox_news .description_wrap');

	if (WW >= 1200) {
		popupBox.css({ height: H - 140 });
	} else {
		popupBox.css({ height: H });
	}

	scrollable.each(function () {
		var element = jQuery(this);
		var wH = jQuery(window).height();

		element.css({ height: wH - 140 });

		if (WW >= 1200) {
			element.css({ height: wH - 140 });
		} else {
			element.css({ height: wH });
		}

		element.niceScroll({
			touchbehavior: false,
			cursorwidth: 0,
			autohidemode: true,
			cursorborder: "0px solid #fff"
		});
	});
}

// -------------------------------------------------
// -------------  MODALBOX ABOUT  ------------------
// -------------------------------------------------

function tokyo_tm_modalbox_about() {

	"use strict";

	var modalBox = jQuery('.tokyo_tm_modalbox_about');
	var opener = jQuery('.tokyo_tm_about .tokyo_tm_button a');
	var closer = modalBox.find('.close');

	opener.on('click', function () {
		modalBox.addClass('opened');
		return false;
	});
	closer.on('click', function () {
		modalBox.removeClass('opened');
		return false;
	});
}

// -----------------------------------------------------
// --------------    ABOUT POPUP SCROLL ----------------
// -----------------------------------------------------

function tokyo_tm_popupscroll_about() {

	"use strict";

	var WW = jQuery(window).width();
	var H = jQuery(window).height();
	var scrollable = jQuery('.tokyo_tm_modalbox_about .scrollable');

	var popupBox = jQuery('.tokyo_tm_modalbox_about .description_wrap');

	if (WW >= 1200) {
		popupBox.css({ height: H - 140 });
	} else {
		popupBox.css({ height: H });
	}

	scrollable.each(function () {
		var element = jQuery(this);
		var wH = jQuery(window).height();

		element.css({ height: wH - 140 });

		if (WW >= 1200) {
			element.css({ height: wH - 140 });
		} else {
			element.css({ height: wH });
		}

		element.niceScroll({
			touchbehavior: false,
			cursorwidth: 0,
			autohidemode: true,
			cursorborder: "0px solid #fff"
		});
	});
}

// -------------------------------------------------
// -----------------    PORTFOLIO    ---------------
// -------------------------------------------------

function tokyo_tm_projects() {

	"use strict";

	jQuery('.tokyo_tm_portfolio_animation_wrap').each(function () {
		jQuery(this).on('mouseenter', function () {
			if (jQuery(this).data('title')) {
				let catClas = '';
				if(localStorage.getItem('this_class') === '.green.tk-rounded'){
					catClas = 'tk-rounded-radius';
				}
				jQuery('.tokyo_tm_portfolio_titles').html(jQuery(this).data('title') + '<span class="work__cat '+ catClas+'">' + jQuery(this).data('category') + '</span>');
				jQuery('.tokyo_tm_portfolio_titles').addClass('visible');
			}

			jQuery(document).on('mousemove', function (e) {
				jQuery('.tokyo_tm_portfolio_titles').css({
					left: e.clientX - 10,
					top: e.clientY + 25
				});
			});
		}).on('mouseleave', function () {
			jQuery('.tokyo_tm_portfolio_titles').removeClass('visible');
		});
	});
}

// filterable 

function tokyo_tm_portfolio() {

	"use strict";

	if (jQuery().isotope) {

		// Needed variables
		var list = jQuery('.tokyo_tm_portfolio .portfolio_list');
		var filter = jQuery('.tokyo_tm_portfolio .portfolio_filter ul');

		if (filter.length) {
			// Isotope Filter 
			filter.find('a').on('click', function () {
				var selector = jQuery(this).attr('data-filter');
				list.isotope({
					filter: selector,
					animationOptions: {
						duration: 750,
						easing: 'linear',
						queue: false
					}
				});
				return false;
			});

			// Change active element class
			filter.find('a').on('click', function () {
				filter.find('a').removeClass('current');
				jQuery(this).addClass('current');
				return false;
			});
		}
	}
}

// -------------------------------------------------
// -------------  PROGRESS BAR  --------------------
// -------------------------------------------------

function tdProgress(container) {

	"use strict";

	container.find('.progress_inner').each(function () {
		var progress = jQuery(this);
		var pValue = parseInt(progress.data('value'), 10);
		var pColor = progress.data('color');
		var pBarWrap = progress.find('.bar');
		var pBar = progress.find('.bar_in');
		pBar.css({ width: pValue + '%', backgroundColor: pColor });
		setTimeout(function () { pBarWrap.addClass('open'); });
	});
}

jQuery('.tokyo_progress').each(function () {

	"use strict";

	var pWrap = jQuery(this);
	pWrap.waypoint({ handler: function () { tdProgress(pWrap); }, offset: '90%' });
});

// -----------------------------------------------------
// ---------------   PRELOADER   -----------------------
// -----------------------------------------------------

function tokyo_tm_preloader() {

	"use strict";

	var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
	var preloader = $('#preloader');

	if (!isMobile) {
		setTimeout(function () {
			preloader.addClass('preloaded');
		}, 800);
		setTimeout(function () {
			preloader.remove();
		}, 2000);

	} else {
		preloader.remove();
	}
}

// -----------------------------------------------------
// -----------------   MY LOAD    ----------------------
// -----------------------------------------------------

function tokyo_tm_my_load() {

	"use strict";

	var speed = 500;
	setTimeout(function () { tokyo_tm_preloader(); }, speed);
}

// -----------------------------------------------------
// ------------------   CURSOR    ----------------------
// -----------------------------------------------------

function tokyo_tm_cursor() {
	"use strict";

	var myCursor = jQuery('.mouse-cursor');

	if (myCursor.length) {
		if ($("body")) {
			const e = document.querySelector(".cursor-inner"),
				t = document.querySelector(".cursor-outer");
			let n, i = 0,
				o = !1;
			window.onmousemove = function (s) {
				o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
			}, $("body").on("mouseenter", "a, .cursor-pointer", function () {
				e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
			}), $("body").on("mouseleave", "a, .cursor-pointer", function () {
				$(this).is("a") && $(this).closest(".cursor-pointer").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
			}), e.style.visibility = "visible", t.style.visibility = "visible"
		}
	}
};

// -----------------------------------------------------
// ---------------    IMAGE TO SVG    ------------------
// -----------------------------------------------------

function tokyo_tm_imgtosvg() {

	"use strict";

	jQuery('img.svg').each(function () {

		var jQueryimg = jQuery(this);
		var imgClass = jQueryimg.attr('class');
		var imgURL = jQueryimg.attr('src');

		jQuery.get(imgURL, function (data) {
			// Get the SVG tag, ignore the rest
			var jQuerysvg = jQuery(data).find('svg');

			// Add replaced image's classes to the new SVG
			if (typeof imgClass !== 'undefined') {
				jQuerysvg = jQuerysvg.attr('class', imgClass + ' replaced-svg');
			}

			// Remove any invalid XML tags as per http://validator.w3.org
			jQuerysvg = jQuerysvg.removeAttr('xmlns:a');

			// Replace image with new SVG
			jQueryimg.replaceWith(jQuerysvg);

		}, 'xml');

	});
}

// -----------------------------------------------------
// --------------------   POPUP    ---------------------
// -----------------------------------------------------

function tokyo_tm_popup() {

	"use strict";

	jQuery('.gallery_zoom').each(function () { // the containers for all your galleries
		jQuery(this).magnificPopup({
			delegate: 'a.zoom', // the selector for gallery item
			type: 'image',
			gallery: {
				enabled: true
			},
			removalDelay: 300,
			mainClass: 'mfp-fade'
		});

	});
	jQuery('.popup-youtube, .popup-vimeo').each(function () { // the containers for all your galleries
		jQuery(this).magnificPopup({
			disableOn: 700,
			type: 'iframe',
			mainClass: 'mfp-fade',
			removalDelay: 160,
			preloader: false,
			fixedContentPos: false
		});
	});

	jQuery('.soundcloude_link').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true,
		},
	});
}

// -----------------------------------------------------
// ---------------   DATA IMAGES    --------------------
// -----------------------------------------------------

function tokyo_tm_data_images() {

	"use strict";

	var data = jQuery('*[data-img-url]');

	data.each(function () {
		var element = jQuery(this);
		var url = element.data('img-url');
		element.css({ backgroundImage: 'url(' + url + ')' });
	});
}

// -----------------------------------------------------
// ----------------    CONTACT FORM    -----------------
// -----------------------------------------------------

function tokyo_tm_contact_form() {

	"use strict";

	jQuery(".contact_form #send_message").on('click', function () {

		var name = jQuery(".contact_form #name").val();
		var email = jQuery(".contact_form #email").val();
		var message = jQuery(".contact_form #message").val();
		var subject = jQuery(".contact_form #subject").val();
		var success = jQuery(".contact_form .returnmessage").data('success');

		jQuery(".contact_form .returnmessage").empty(); //To empty previous error/success message.
		//checking for blank fields	
		if (name === '' || email === '' || message === '') {

			jQuery('div.empty_notice').slideDown(500).delay(2000).slideUp(500);
		}
		else {
			// Returns successful data submission message when the entered information is stored in database.
			jQuery.post("modal/contact.php", { ajax_name: name, ajax_email: email, ajax_message: message, ajax_subject: subject }, function (data) {

				jQuery(".contact_form .returnmessage").append(data);//Append returned message to message paragraph


				if (jQuery(".contact_form .returnmessage span.contact_error").length) {
					jQuery(".contact_form .returnmessage").slideDown(500).delay(2000).slideUp(500);
				} else {
					jQuery(".contact_form .returnmessage").append("<span class='contact_success'>" + success + "</span>");
					jQuery(".contact_form .returnmessage").slideDown(500).delay(4000).slideUp(500);
				}

				if (data === "") {
					jQuery("#contact_form")[0].reset();//To reset form fields on success
				}

			});
		}
		return false;
	});
}

// -----------------------------------------------------
// ----------------    OWL CAROUSEL    -----------------
// -----------------------------------------------------

function tokyo_tm_owl_carousel() {

	"use strict";

	var carousel = jQuery('.partners .owl-carousel');

	var rtlMode = false;

	if (jQuery('body').hasClass('rtl')) {
		rtlMode = 'true';
	}

	carousel.owlCarousel({
		loop: true,
		items: 4,
		lazyLoad: false,
		margin: 50,
		autoplay: true,
		autoplayTimeout: 7000,
		rtl: rtlMode,
		dots: true,
		nav: false,
		navSpeed: true,
		responsive: {
			0: { items: 1 },
			480: { items: 2 },
			768: { items: 3 },
			1040: { items: 3 },
			1200: { items: 3 },
			1600: { items: 4 },
			1920: { items: 4 }
		}
	});
	tokyo_tm_imgtosvg();
	

	if(!localStorage.getItem('theme_color')){
		localStorage.setItem('theme_color', 'dark');
	}

	$('.tk-theme-color .black, .demos #intro-dark-mode').on('click', function (e) {

		if($(this).attr('id') !== 'intro-dark-mode'){
			e.preventDefault();
		}
		if (typeof (Storage) !== "undefined") {
			localStorage.setItem('theme_color', 'dark');
		}

		$('body').addClass('dark');
		$('body').removeClass('white');
		$(this).addClass("active");
		$('.tk-theme-color .white').removeClass('active');
	});


	$('.tk-theme-color .white, .demos #intro-light-mode').on('click', function (e) {
		if($(this).attr('id') !== 'intro-light-mode'){
			e.preventDefault();
		}
		if (typeof (Storage) !== "undefined") {
			localStorage.setItem('theme_color', 'white');
		}

		$('body').removeClass('dark');
		$('body').addClass('white');
		$(this).addClass("active");
		$('.tk-theme-color .black').removeClass('active');
	});






	if (typeof (Storage) !== "undefined") {
		let themeColor = localStorage.getItem('theme_color');
		$('body').toggleClass(themeColor);
		if (themeColor === "dark") {
			
			$('.tokyo_tm_settings .tk-theme-color li a').removeClass('active');
			$('.tokyo_tm_settings .tk-theme-color li a.black').addClass('active');
		}
		else {
			$('.tokyo_tm_settings .tk-theme-color li a').removeClass('active');
			$('.tokyo_tm_settings .tk-theme-color li a.white').addClass('active');
			$('body').addClass('white');
		}

	}

	//for theme radius
	$(document).ready(function () {
		function tokyo_tm_addActiveRadius() {

			const radiusClass = `.tokyo_tm_about .about_image .main, .tokyo_tm_button button, .tokyo_tm_button a, .tokyo_tm_portfolio .portfolio_list li .inner .main_image, .tokyo_tm_portfolio .portfolio_list li .inner, .tokyo_tm_news ul li .list_inner, .tokyo_tm_contact .fields ul li input, .tokyo_tm_contact .fields .last textarea, .tokyo_tm_contact .map_wrap .map, .tokyo_tm_title span, .tokyo_tm_modalbox_about .description_wrap, .tokyo_tm_modalbox_news .box_inner,.typofix pre,.typofix img,.tokyo_tm_portfolio_titles,.work__cat,.tokyo_tm_modalbox_about .box_inner`;


			$('.tk-theme-radius li a').on('click', function (e) {
				$('.tk-theme-radius li a').removeClass('active')
				let thisClass = $(this).attr('class');
				thisClass = '.' + thisClass.replace(" ", ".");

				if (typeof (Storage) !== "undefined") {
					localStorage.setItem('this_class', thisClass);
				}

				$(this).addClass('active');

				$(radiusClass).css("border-radius", "8px");
				$('.tokyo_tm_modalbox_news .box_inner, .tokyo_tm_modalbox_about .box_inner').css("border-radius", "8px");
				$('.tokyo_tm_modalbox_news .description_wrap .image img').css("border-radius", "8px");
				$('.tokyo_tm_news ul li .details').css("border-bottom-right-radius", "8px");
				$('.tk-news-article .image').css("border-top-right-radius", "8px");
				$('.tokyo_tm_settings .icon,.tk-news-article .image').css("border-top-left-radius", "8px");
				$('.tokyo_tm_settings,.tokyo_tm_settings .icon,.tokyo_tm_news ul li .details ').css("border-bottom-left-radius", "8px");

				if(thisClass !== '.green.tk-rounded'){
					$(radiusClass).css("border-radius", "0px");
					$('.tokyo_tm_modalbox_news .box_inner, .tokyo_tm_modalbox_about .box_inner').css("border-radius", "0px");
					$('.work__cat').css("border-radius", "0px");
					$('.tokyo_tm_modalbox_news .description_wrap .image img').css("border-radius", "0px");
					$('.tokyo_tm_news ul li .details').css("border-bottom-right-radius", "0px");
					$('.tk-news-article .image').css("border-top-right-radius", "0px");
					$('.tokyo_tm_settings .icon,.tk-news-article .image').css("border-top-left-radius", "0px");
					$('.tokyo_tm_settings,.tokyo_tm_settings .icon,.tokyo_tm_news ul li .details ').css("border-bottom-left-radius", "0px");
					
				}
				else{
					$('.box_inner').addClass('tk-post-rounded-radius');
				}

				

			});

			let tkThisClass = localStorage.getItem('this_class');

			if (!$(tkThisClass).hasClass('active')) {
				$(tkThisClass).addClass('active');
			}

			if(tkThisClass !== '.green.tk-rounded'){
				$(radiusClass).css("border-radius", "0px");
				$('.work__cat').css("border-radius", "0px");
				$('.tokyo_tm_modalbox_news .box_inner, .tokyo_tm_modalbox_about .box_inner').css("border-radius", "0px");
				$('.tokyo_tm_modalbox_news .description_wrap .image img').css("border-radius", "0px");
				$('.tokyo_tm_news ul li .details').css("border-bottom-right-radius", "0px");
				$('.tk-news-article .image').css("border-top-right-radius", "0px");
				$('.tokyo_tm_settings .icon,.tk-news-article .image').css("border-top-left-radius", "0px");
				$('.tokyo_tm_settings,.tokyo_tm_settings .icon,.tokyo_tm_news ul li .details ').css("border-bottom-left-radius", "0px");
			}
			if(localStorage.getItem('this_class') === '.green.tk-rounded'){
				$('.box_inner').addClass('tk-post-rounded-radius');
			}
	
		}
		tokyo_tm_addActiveRadius();
	});

	$(document).ready(function () {
		$(".tk-post-item").slice(0, 2).show();
		$(".loadmore-tk, .loadmore-au").on("click", function (e) {
			e.preventDefault();
			$(".tk-post-item:hidden").slice(0, 10).slideDown();
			if ($(".tk-post-item:hidden").length == 0) {
				$(".loadmore-tk, .loadmore-au").text("No More Posts").addClass("noContent");
			}
		});

	});

	$(document).ready(function () {
		const checkEl = '<div class="checkmark draw"></div>';
		$('.tk-unlimited-colors li.active').append(checkEl);
		$('.tk-theme-color li a.active').parent().append(checkEl);
		$('.tk-theme-radius li a.active').parent().append(checkEl);

		function tokyo_tm_addCheckmark(clickElement, markSelector) {
			$(clickElement).on('click', function (e) {
				if ($(markSelector).length === 0) {
					$(this).parent().append(checkEl);
				}
				else {
					$(markSelector).remove();
					$(this).parent().append(checkEl);
				}
			});

		}

		tokyo_tm_addCheckmark('.tk-unlimited-colors li a', '.tk-unlimited-colors li .checkmark');
		tokyo_tm_addCheckmark('.tk-theme-color li a', '.tk-theme-color li .checkmark');
		tokyo_tm_addCheckmark('.tk-theme-radius li a', '.tk-theme-radius li .checkmark');

		
	});
}