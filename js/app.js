$(document).ready(function() {
  // SIDEBAR INPUT PHONE MASK
  $(function(){
    $("#phone").mask("+7(999) 999-9999");
  });
  // SIDEBAR TOGGLE
  $(".sidebar__toggle").click(function() {
    $(".sidebar").addClass("sidebar_open");
  });
  $(".sidebar__close").click(function() {
    $(".sidebar").removeClass("sidebar_open");
  });

  // MENU TOGGLE
  $(".menu__toggle").click(function() {
    $(".menu__list").addClass("menu__list_open");
  });
  $(".menu__close, .menu__link").click(function() {
    $(".menu__list").removeClass("menu__list_open");
  });
});
