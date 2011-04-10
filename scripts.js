$(document).ready(function() {
    var cubeMarkup = '<div id="${ID}" class="cube ${Color}" style="z-index:${Index};"> <span class="title">${Title}</span><span class="link">${Link}</span><div class="topface"><div style="background-image:url(${BGImage});"><h1>${Title}</h1></div></div> <div class="leftface"><div></div></div> <div class="rightface"><div></div></div> <div class="label"><strong><a href="${Link}">${Title}</a>: ${Description}</div> </div>';
    var overviewMarkup = '<img class="over-badge" src="${BGImage}"/><h1><a href="${Link}">${Title}</a></h1><p>${Description}</p>';
    $.template( "cubeTemplate", cubeMarkup );
    $.template( "overviewTemplate", overviewMarkup );
    
    var components = [];
    var reindex = function() {
        $(".cube").each(function() {
              $(this).css("z-index",10000-$(this).offset().top);                  
        });

        
    };
    $.getJSON('autopsy.json', function(data) {
        components = data.components;
        for(var i in components) {
            var cubeDesc = [{
                ID:components[i].title,
                Color:"default",
                Index:i+10,
                Title:components[i].title,
                Link:components[i].link,
                Description:components[i].description
            }];
            
            $.tmpl('cubeTemplate', cubeDesc).prependTo("#autopsy");                
        }
        
       
        var cubeDesc = [{
              ID:data.title,
              Color:"default",
              Index:10000,
              BGImage:data.image,
              Title:data.title,
              Link:data.link,
              Description:data.description
        }];
        $.tmpl('cubeTemplate', cubeDesc ).prependTo("#autopsy");
        $.tmpl('overviewTemplate', cubeDesc ).prependTo("#overview");
        
        $(".cube").each(function() {
          $(this).fadeIn('slow', function() {
              //$(this).css("z-index",10000-$(this).offset().top);
          
          });
        });
        
        $('#autopsy').isotope({
            itemSelector : '.cube',    
            animationEngine: "jquery",
            animationOptions: {
               duration: 1050,
               easing: 'easeInOutQuint',
               queue: true,
               complete: reindex
             },            
            getSortData : {
                title : function ( $elem ) {
                    return $elem.find('.title').text();
                },
                link : function ( $elem ) {
                    return $elem.find('.link').text();
                }
            }
        });
    });


    $('#sort a').click(function(){
      // get href attribute, minus the '#'
      var sortText = $(this).text();              
      var sortName = $(this).attr('href').slice(1);
      $(".currentval").text(sortText);
      $('#autopsy').isotope({ sortBy : sortName });
      return false;
    });
    $("#footer").pinFooter(); 
    $(window).resize(function() {
        $("#footer").pinFooter();
    });
});