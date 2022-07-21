//서지상세 스크롤시 바 이동관련 js
var util = {
  init: function () {
      this.bind();
  },

  bind: function () {
      $(window).scroll(function () {
          util.menuSelect();
      });
  },

  menuSelect: function () {
    $('.detailNav').find('.on').removeClass('on');
    //$('.detailNav').find('.strong').removeClass('strong');
    if (this.checkVisible($('#detailSection1'))) {
      $('[href="#detailSection1"]').parent('div').addClass('on');
    } else if (this.checkVisible($('#detailSection2'))) {
      $('[href="#detailSection2"]').parent('div').addClass('on');
    } else if (this.checkVisible($('#detailSection3'))) {
      $('[href="#detailSection3"]').parent('div').addClass('on');
    } else if (this.checkVisible($('#detailSection4'))) {
      $('[href="#detailSection4"]').parent('div').addClass('on');
    } else if (this.checkVisible($('#detailSection5'))) {
      $('[href="#detailSection5"]').parent('div').addClass('on');
    } else if (this.checkVisible($('#detailSection6'))) {
      $('[href="#detailSection6"]').parent('div').addClass('on');
    } else if (this.checkVisible($('#detailSection7'))) {
      $('[href="#detailSection7"]').parent('div').addClass('on');
    }
  },

  checkVisible: function (elm, eval) {
      eval = eval || 'object visible';
      var viewportHeight = $(window).height(); // Viewport Height
      var scrolltop = $(window).scrollTop(); // Scroll Top
      var y;
      try {
          y = $(elm).offset().top;
      } catch (e) {
          y = $(window).height();
      }

      var elementHeight = $(elm).height();

      if (eval == 'object visible') return y < viewportHeight + scrolltop  && y > scrolltop - elementHeight + 110;
      if (eval == 'above') return y < viewportHeight + scrolltop;
  },
};

$(document).ready(function(){

  //서지상세 시작
  // 서시상세 탭 과 서지 컨텐츠 id href 부여
  $('.detailCont').each(function(index){
    $(this).attr('id', 'detailSection' + (index + 1))
  });

  $('.detailNav .tab').each(function(index){
    $(this).children('a').attr('href', '#detailSection' + (index + 1))
  });

  //서지상세 탭 이벤트
  var scroll = $(this).scrollTop();
  var detailNavTop = $('.detailNav').offset().top;
 
  $(window).scroll(function () {
    scroll = $(this).scrollTop();
    detailH1 = $('.topSearch').outerHeight();
    detailH2 = $('.swipeTab.type1').outerHeight();
    //console.log(scroll)
    if(scroll > detailNavTop){
      $('.detailNav').addClass('fix');
    }else{
      $('.detailNav').removeClass('fix');
    }
 });



  var detailNav = new Swiper('.detailNav .inner',{
    slidesPerView: "auto",
    spaceBetween: 0,
    freeMode: true,
  });


  
  $(document).on('click','.detailNav .tab>a',function(e){
    e.preventDefault()
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "body" : href);
    var height1 = $('.topSearch').outerHeight();
    var height2 = $('.detailNav').outerHeight();
    var result = height1 + height2;
    var position1= target.offset().top - result - 10;
    var position2= target.offset().top - result - 52;
    var i = $(this).parent().index();

    $('.detailNav .tab').removeClass('on');
    $(this).parent().addClass('on')
    $('.detailNav .tab').addClass('strong');
    if($('.detailNav').hasClass('fix')){
      if($(this).parent().index() == 0){
        $('html, body').animate({ scrollTop: 0 },600,function(){
          $('.detailNav .tab').removeClass('strong');
        });
      }else{
        $('html, body').animate({ scrollTop: position1 },600,function(){
          $('.detailNav .tab').removeClass('strong');
        });
      }
      
    }else{
      if($(this).parent().index() == 0){
        $('html, body').animate({ scrollTop: 0 },600,function(){
          $('.detailNav .tab').removeClass('strong');
        });
      }else{
        $('html, body').animate({ scrollTop: position2 },600,function(){
          $('.detailNav .tab').removeClass('strong');
        });
      }
    }
    
    var i = $(this).parent().index();
    detailNav.slideTo(i)

  });


  //추천자료 열고닫기
  $('.infoDetailW .recommendCont .tit').click(function(){
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).parent().next('.recommendArea').slideUp();
    }else{
      $(this).addClass('on');
      $(this).parent().next('.recommendArea').slideDown();
    }
    return false;
  });


  //다국어초록 더보기
  $('.addInfoMore').click(function(){
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).prev().removeClass('on')
      $(this).text('더보기')
      $(this).attr('title','더보기');
      $('.kakaoTrans').removeClass('on')
      $('.translate').hide();
      $('.translateCont').hide();
      $('.selectLang').removeClass('on');
      $('.langContent>div').removeClass('on');
      $('.translateCont .transResult').removeClass('on');
    }else{
      $(this).addClass('on');
      $(this).prev().addClass('on');
      $(this).text('접기')
      $(this).attr('title','접기');
    }
    return false;
  });

  //카카오번역보기
  $('.kakaoTrans').click(function(){
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).parents('.additionalInfo').find('.translate').slideUp();
      //$(this).parents('.additionalInfo').find('.abstract').show();
    }else{
      $(this).addClass('on');
      $(this).parents('.additionalInfo').find('.translate').slideDown();
      //$(this).parents('.additionalInfo').find('.abstract').hide();
    }
    return false;
  });

  $('.selectLang').click(function(){
    $('.selectLang').removeClass('on');
    $(this).addClass('on');
    $('.langContent>div').removeClass('on')
    $('.langContent>div').eq($(this).parent().index()).addClass('on')
    return false
  });

  $('.langSelectW .translateBtn').click(function(e){
    e.preventDefault();
    $('.addInfoMore').addClass('on');
    $('.addInfoMore').prev().addClass('on');
    $('.addInfoMore').text('접기')
    $('.addInfoMore').attr('title','접기');

    $('.translateCont').show();
    $('.translateCont .transResult').addClass('on');
  });

  $('.translateCont .transResult').click(function(){
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).next().slideUp();
    }else{
      $(this).addClass('on');
      $(this).next().slideDown();
    }
    return false
  });

  //analysisTab
  $('.analysisTab>ul>li>a').click(function(){
    $('.analysisTab>ul>li>a').removeClass('on');
    $(this).addClass('on')
    $('.analysisTabCont>div').hide();
    $('.analysisTabCont>div').eq($(this).parent().index()).show();
    return false;
  });

  //usageAnalysisMore
  $('.usageAnalysisMore').click(function(){
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).text('더보기');
      $(this).attr('title','더보기');
      $('.usageAnalysis .analysis').removeClass('on');
      $('.usageAnalysis .analysis').eq(0).addClass('on');
    }else{
      $(this).addClass('on');
      $(this).text('접기');
      $(this).attr('title','접기');
      $('.usageAnalysis .analysis').addClass('on');
    }
    return false
  });


  //공개강의
  var videoList = new Swiper('.videoList .inner',{
    slidesPerView: "auto",
    spaceBetween: 0,
    freeMode: true,
  });

   //학술지 패싯
   $('.thesisFacet .titArea .tit').click(function(){
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).parent().next('.thFacetCont').stop().slideUp();
    }else{
      $(this).addClass('on');
      $(this).parent().next('.thFacetCont').stop().slideDown();
    }
    return false;
  });
  
  $('.thShList .thShListBtn').click(function(){
    if($(this).hasClass('on')){
      $(this).removeClass('on');
      $(this).parents('li').find('ul').slideUp();
    }else{
      $(this).addClass('on');
      $(this).parents('li').find('ul').slideDown();
    }
    return false;
  });

  util.init();
});    


