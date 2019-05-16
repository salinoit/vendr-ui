(function ($) {
    "use strict";

    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    // custom nav trigger function for owl casousel
    function customTrigger(slideNext, slidePrev, targetSlider) {
        $(slideNext).on('click', function () {
            targetSlider.trigger('next.owl.carousel');
        });
        $(slidePrev).on('click', function () {
            targetSlider.trigger('prev.owl.carousel');
        });
    }

    /* MOBILE MENU JS*/
    function mobileMenu(triggerElem, dropdown) {
        var $dropDownTrigger = $(triggerElem + ' > a');

        //$dropDownTrigger.append('<span class="lnr lnr-plus-circle"></span>');
        $dropDownTrigger.find('span').on('click', function (e) {
            e.preventDefault();
            $(this).parents(triggerElem).find(dropdown).slideToggle().parents(triggerElem).siblings().find(dropdown).slideUp();
        });
    }

    if (windowWidth < 767) {
        mobileMenu('.has_dropdown', '.dropdown');
        mobileMenu('.has_megamenu', '.dropdown_megamenu');
    }

    $('body').scrollspy({ target: '#for_mobile' });

    /* offcanvas menu */
    $('.close_menu, .offcanvas-overlay').on('click', function () {
        $('.offcanvas-menu').addClass('closed');
    });

    /* filter menu reveal on click*/
    // $('.filter__menu_icon').on('click', function () {
    //     $('.filter_dropdown').toggleClass('active');
    // });

    /**/
    $('.menu_icon').on('click', function () {
        $(this).siblings('.offcanvas-menu').removeClass('closed');
    });

    // Click event to scroll to top
    var scrollTop = $('.go_top');
    scrollTop.on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
        return false;
    });


    //  for mobile
    if (windowWidth <= 991) {
        var $slideNav = $('#for_mobile .nav');
        $slideNav.slideUp();
        $('.navbar-toggle').on('click', function () {
            $slideNav.slideToggle();
        })
    }

    /* preloader js */
    $(window).load(function () {
        $('.preloader_inner').fadeOut(1000);
        $('.preloader-bg').delay('500').fadeOut(1000);
    });


    // accordion js
    var $accordionTrigger = $('.single_acco_title a');
    $accordionTrigger.on('click', function () {
        $accordionTrigger.not(this).removeClass('active').find('.lnr').not($(this).find('.lnr')).removeClass('lnr-chevron-up').addClass('lnr-chevron-down');
        $(this).toggleClass('active').find('.lnr').toggleClass('lnr-chevron-up lnr-chevron-down');
    });


    /* date picker js */
    if ($('.date_area').length) {
      $('.dattaPikkara').datepicker(
        {
          onSelect:function(){
            try {
              raiseFilter();
            }
            catch(e)
            {}
          }
        }
      );
    }


    // price selection js
    var $licenseText = $('.card--pricing2 .pricing-options li p'),
        $price = $('.card--pricing2 .price h1 span');
    $licenseText.slideUp();

    $('.card--pricing2 .custom-radio label').on('click', function () {
        var $this = $(this);
        $licenseText.slideUp(200);
        $this.parents('li').find('p').slideDown(200);
        $price.text($this.data('price') + '.00');
    });


    /*removing extra margin from the last child of item description-area */
    $('.tab-content-wrapper').length ? $('#product-details').children().children().last().css({ 'margin-bottom': 0, 'padding-bottom': 0 }) : $('#product-details').children().last().css({ 'margin-bottom': 0, 'padding-bottom': 0 });


    /* featured product slider */
    if ($('section.featured-products').length) {
      var $featuredProd = $('.prod-slider1');
      $featuredProd.owlCarousel({
          items: 4,
          loop:true,
          autoplay: false,
          autoplaySpeed: 1000,
          responsive: {
              0: {
                  items: 2,
                  loop:true,
              },
              768: {
                  items: 3,
                  loop:true,
              },
              992: {
                  items: 4,
                  loop:true,
              }
          }

      });
      customTrigger('.product__slider-nav .nav_right', '.product__slider-nav .nav_left', $featuredProd);
    }


    /* bootstrap tooltip activation */
    $('[data-toggle="tooltip"]').tooltip();

    /*
     * Replace all SVG images with inline SVG
     */
    $('img.svg').each(function () {
        var $img = $(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        $.get(imgURL, function (data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');
    });
})(jQuery);



  