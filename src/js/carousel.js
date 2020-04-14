import "jquery";
import "owl.carousel";
import {D3} from "./timer_d3";

var owl=$(".carousel");
owl.owlCarousel({
    loop:true,
    thumbs:false,
    // nav:true,
    // autoWidth:true,
    autoplay:true,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    items:1,
    lazyLoad:true,
    itemsDesktop: ["100%", 1],
    itemsDesktopSmall: ["100%", 1],
    itemsMobile: ["100%", 1],
    itemsTablet: ["100%", 1],
    onInitialized(){
        D3();
    }
});
