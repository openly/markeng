function SlideShow(container){
  var slides = container.find('.slide').hide()
    , curSlide = slides.eq(0).show().addClass('active')
    , buttons = $('<ul>',{"class":"buttons"})
    , timer;

    slides.each(function(){
      buttons.append($('<li>',{
        "class":"button",
        "data":{
          "slide": $(this)
        },
        "click": function(){
          var newSlide = $(this).data('slide')
          newSlide.show();
          
          buttons.find('li.button').removeClass("active");
          $(this).addClass("active");

          curSlide.fadeOut(1000,function(){
            curSlide.removeClass("active");
            newSlide.addClass("active");
            curSlide = newSlide;
          });
          if(!$(this).data('autoTrigger')){
            clearInterval(timer);
          }else{
            $(this).data('autoTrigger',false);
          }
        }
      }));
    });
    buttons.find('li:first').addClass('active')
    container.append(buttons);

    timer = setInterval(function(){
      var nextEl = buttons.find('li.active').next();
      if(nextEl.length < 1) nextEl = buttons.find('li:first');
      nextEl.data('autoTrigger',true).click();
    },3000)
}

$(function(){
  $(".slideshow").each(function(){
    new SlideShow($(this));
  })
})