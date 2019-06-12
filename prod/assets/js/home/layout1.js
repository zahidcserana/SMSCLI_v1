// header fixed js
$(document).on("scroll", function(){
    if ($(document).scrollTop() >= 100){
        $(".header").addClass("shrink");
    }
    else {
        $(".header").removeClass("shrink");
    }
});
// header fixed js
$(function () {
    $('#right-menubar, #right-closebar, .sidebar-menu ul li a').on('click', function(){
        $('#right-sidebarmenu').toggleClass('toggle-show');
    });
});
$(function () {
    $('#search-bar, #search-closebar').on('click', function(){
        $('#search-body').toggleClass('search-show');
    });
});

// cartbar js
$(document).ready(function(){
    $(".cart-bar").click(function(){ 
        $(".cart-body").slideToggle(200);
    });
    // $(document).on('click', function(){
    //     $('.cart-body').slideUp(200);
    // });
    $('.cart-bar, .menu-toggle, .cart-body').on('click', function(e){
        e.stopPropagation();
    });

});

/*-- header search dropdown js --*/
$(function () {
    $(".input-group-btn .search-dropdown li a").click(function () {
        var selText = $(this).html();
        $(this).parents('.input-group-btn').find('.btn-search').html(selText);
    });
});

/*-- header cartbar js --*/
$(function () {
    $(".cart-btn .btn-search").on("click", function () {
        $(".cart-drop-down-menu").slideToggle();
    });

    $(".cart-close").click(function () {
        $(".cart-drop-down-menu").hide(300);
    });

    $(".home-cart-btn").click(function () {
        $(".cart-drop-down-menu").hide(300);
    });

    $(".home-checkout-btn").click(function () {
        $(".cart-drop-down-menu").hide(300);
    });

    $(document).on('click', function () {
        $('.cart-drop-down-menu').hide(300);
    });

    $('.cart-btn .btn-search, .cart-drop-down-menu').on('click', function (e) {
        e.stopPropagation();
    });
})




/*-- active menu js --*/
$(document).ready(function () {
    $('.nav-manu ul li a').click(function () {
        $('li a').removeClass("active-menu");
        $(this).addClass("active-menu");
    });
});

$(function () {
    var action;
    $(".number-spinner button").mousedown(function () {
        btn = $(this);
        input = btn.closest('.number-spinner').find('input');
        btn.closest('.number-spinner').find('button').prop("disabled", false);

        if (btn.attr('data-dir') == 'up') {
            action = setInterval(function () {
                if (input.attr('max') == undefined || parseInt(input.val()) < parseInt(input.attr('max'))) {
                    input.val(parseInt(input.val()) + 1);
                } else {
                    btn.prop("disabled", true);
                    clearInterval(action);
                }
            }, 50);
        } else {
            action = setInterval(function () {
                if (input.attr('min') == undefined || parseInt(input.val()) > parseInt(input.attr('min'))) {
                    input.val(parseInt(input.val()) - 1);
                } else {
                    btn.prop("disabled", true);
                    clearInterval(action);
                }
            }, 50);
        }
    }).mouseup(function () {
        clearInterval(action);
    });
});

/*-- product view js --*/
var Chef = {
    init: function () {
        this.productImagePreview();
        this.menuToggle();
    },

    productImagePreview: function () {
        $(document).on('click', '.product-images li', function () {
            if (!$(this).hasClass('preview')) {
                var src = $(this).find('img').attr('src');
                $('.product-images .preview img').attr('src', src);
            }
        });
    },

    menuToggle: function () {
        $(document).on('click', '#menu .trigger', function () {
            // Toggle open and close icons
            $(this).find('img').each(function () {
                if ($(this).hasClass('hidden')) {
                    $(this).removeClass('hidden');
                } else {
                    $(this).addClass('hidden');
                }
            });

            // Toggle menu links
            $(this).siblings('.links').stop(true, true).slideToggle(200);

            // Toggle open class
            $('#menu').toggleClass('open');
        });
    },

};

$(function () {
    Chef.init();
});

/*-- Mobile menu js --*/
$(document).ready(function () {
    $(".mobile-toggle").click(function () {

        var target = $(this).parent().children(".mobile-menu");
        $(target).slideToggle();
    });
    $(".mobile-nav ul li a").on('click', function () {
        $('.mobile-menu').hide(300);
    });
});

/*-- Mobile menu js --*/
$(document).ready(function () {
    $(".mobile-shopby").click(function () {

        var target = $(this).parent().children(".category-filter");
        $(target).slideToggle();
    });
});

$(window).scroll(function () {
    if ($(window).scrollTop() >= 300) {
        $('.native-routing-home').addClass('fixed-cart');
        $('.cartbody').addClass('cart-native');
        $('.native-routing-container-home').addClass('native-routing2');
    }
    else {
        $('.native-routing-home').removeClass('fixed-cart');
        $('.cartbody').removeClass('cart-native');
        $('.native-routing-container-home').removeClass('native-routing2');
    }
});

// toggole MENU 
$(document).ready(function() {
    $(".togglemenu > li > a").on("click", function() {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).siblings(".submenu").slideUp(200);
            $(".togglemenu > li > a i").removeClass("fa-minus").addClass("fa-plus");
        } else {
            $(".togglemenu > li > a i").removeClass("fa-minus").addClass("fa-plus");
            $(this).find("i").removeClass("fa-plus").addClass("fa-minus");
            $(".togglemenu > li > a").removeClass("active");
            $(this).addClass("active");
            $(".submenu").slideUp(200);
            $(this).siblings(".submenu").slideDown(200);
        }
    });
});

// sidbar menu js
$('#m-menubar, #closebar').on('click', function(){
    $('#sidbar-menu').toggleClass('show');
});

// inner mega menu
$(function(){
    $(".innermenu-title").on("click", function () {
    $(".innervertical-menu").slideToggle();
    });
});

/*-- active according --*/
$(document).ready(function () {
    $('.card-header').click(function () {
        $('.card-header').removeClass("active");
        $(this).addClass("active");
    });
});
// cursol


 $('.panel-collapse').on('show.bs.collapse', function () {
    $(this).siblings('.panel-heading').addClass('active');
  });

  $('.panel-collapse').on('hide.bs.collapse', function () {
    $(this).siblings('.panel-heading').removeClass('active');
  });

  // select all thumbnails
const galleryThumbnail = document.querySelectorAll(".thumbnails-list li");
// select featured
const galleryFeatured = document.querySelector(".product-gallery-featured img");

// loop all items
galleryThumbnail.forEach((item) => {
  item.addEventListener("mouseover", function () {
    let image = item.children[0].src;
    galleryFeatured.src = image;
  });
});

// show popover
$(".main-questions").popover('show');
