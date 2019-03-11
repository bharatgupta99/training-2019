$( document ).ready(function() {
    $('.toggle-btn').click(function(){
        $('.nav-bar').toggleClass('nav-bar-full');
        $('.dashboard').toggleClass('dashboard-full');
        $('.side-menu').toggleClass('side-menu-hide');
    });
});
