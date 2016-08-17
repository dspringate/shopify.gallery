/* Jonathan Snook - MIT License - https://github.com/snookca/prepareTransition */
(function(a){a.fn.prepareTransition=function(){return this.each(function(){var b=a(this);b.one("TransitionEnd webkitTransitionEnd transitionend oTransitionEnd",function(){b.removeClass("is-transitioning")});var c=["transition-duration","-moz-transition-duration","-webkit-transition-duration","-o-transition-duration"];var d=0;a.each(c,function(a,c){d=parseFloat(b.css(c))||d});if(d!=0){b.addClass("is-transitioning");b[0].offsetWidth}})}})(jQuery);

/* replaceUrlParam - http://stackoverflow.com/questions/7171099/how-to-replace-url-parameter-with-javascript-jquery */
function replaceUrlParam(e,r,a){var n=new RegExp("("+r+"=).*?(&|$)"),c=e;return c=e.search(n)>=0?e.replace(n,"$1"+a+"$2"):c+(c.indexOf("?")>0?"&":"?")+r+"="+a};

// Site functions
window.site = window.site || {};

site.cacheSelectors = function () {
	site.cache = {
		// General
		$html         : $('html'),
		$body         : $('document.body')
	};
};

site.init = function () {
	site.cacheSelectors();
	site.smoothScroll();
	site.expandSearch();
};

site.smoothScroll = function () {
	$(".scroll").click( function(event) {
		event.preventDefault();
		//calculate destination place
		var dest = 0;
		if ($(this.hash).offset().top > $(document).height() - $(window).height()) {
			dest = $(document).height() - $(window).height();
		} else {
			dest = $(this.hash).offset().top;
		}
		// go to destination
		$('html, body').animate({scrollTop:dest}, 1000, 'swing');
	});
};

site.expandSearch = function () {
	$(document).ready(function(){
        var submitIcon = $('.searchbox-icon');
        var inputBox = $('.searchbox-input');
        var searchBox = $('.searchbox');
        var isOpen = false;
        submitIcon.click(function(){
            if(isOpen == false){
                searchBox.addClass('searchbox-open');
                inputBox.focus();
                isOpen = true;
            } else {
                searchBox.removeClass('searchbox-open');
                inputBox.focusout();
                isOpen = false;
            }
        });  
         submitIcon.mouseup(function(){
                return false;
            });
        searchBox.mouseup(function(){
                return false;
            });
        $(document).mouseup(function(){
                if(isOpen == true){
                    $('.searchbox-icon').css('display','block');
                    submitIcon.click();
                }
            });
    });
    function buttonUp(){
        var inputVal = $('.searchbox-input').val();
        inputVal = $.trim(inputVal).length;
        if( inputVal !== 0){
            $('.searchbox-icon').css('display','none');
        } else {
            $('.searchbox-input').val('');
            $('.searchbox-icon').css('display','block');
        }
    }
};

// Initialise Site's JS on docready
$(site.init);