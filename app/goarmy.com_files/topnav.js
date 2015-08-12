(function($){
    $.fn.topNav = function(){
        var pageRt = $('#site_wrapper').offset().left + 960;
        $('li.navbtn').each(function(){
               
            $('.currentNav a.topLevNav').css('color', '#f6cd2e');
            
                      
            var subNavCols = $('.navCol',this).length;
            var subNavWidth = (195*subNavCols) + 'px';
            var subNavColWidth = (100/subNavCols) + '%';
            $('.topsubnav',this).css({'width':subNavWidth}) + 'px';
            var iFrameHeight = $('div.topsubnav',this).height() + 'px';//for ie6
            $('iframe.topsubnav',this).css({'height':iFrameHeight,'margin-bottom':'-'+iFrameHeight});
        });

        $('li.navbtn').hover(function(){
            
            $('a.topLevNav',this).css('color', '#4F4F48');
            $('.currentNav a.topLevNav',this).css('color', '#4F4F48');
            $('a.topLevNav',this).css('background', '#ffffff');
            $('a.topLevNav',this).css('height','40px');
            
              
            var subNavRt = $(this).offset().left + $('div.topsubnav',this).outerWidth();
            var marLeft = pageRt - subNavRt;
            if(parseInt(marLeft) < 0){
                $('.topsubnav',this).css('left',marLeft+'px');
            }
            else{
                $('.topsubnav',this).css('left','0px');
            }
            var ext = $('img', this).attr('src')
            ext = ext.substr(ext.length-5,ext.length);
            $(this).addClass('sfhover');
            $(this).children().children('img').attr('src', function() {return this.src.replace(ext,'o.png');});
            }
        ,function(){
        
            $('a.topLevNav',this).css('color', '#FFFFFF');
            $('.currentNav a.topLevNav').css('color', '#f6cd2e');
            $('a.topLevNav',this).css('background', 'transparent');
            
        
            $('.topsubnav',this).css('left','-9999px'); 
            $(this).removeClass('sfhover');
            if($(this).hasClass('currentNav')){ext = 'a.png'}else{ext = 'i.png'}
            $(this).children().children('img').attr('src', function() {return this.src.replace(/o.png/,ext);});
            }
        );  
    };
})(jQuery);