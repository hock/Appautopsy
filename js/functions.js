
function loadcontent(data) {
    $("#overview").html("");
    $("#autopsy").remove();
    $("#overview").after('<div id="autopsy"></div>');
      components = data.plugins;
        for(var i in components) {
            var cubeDesc = [{
                ID:components[i].name,
                Color:"default",
                Index:i+10,
                Title:components[i].name,
                Link:"",
                Details:components[i].details,
                Description:components[i].description
                
            }];
            
            $.tmpl('cubeTemplate', cubeDesc).prependTo("#autopsy");                
        }
              
        var cubeDesc = [{
              ID:data.Domain,
              Color:"default",
              Index:10000,
              BGImage:"icongrabber.php?s="+data.target,
              Title:data.title,
              Link:data.target,
              Description:"..."
        }];
        $.tmpl('cubeTemplate', cubeDesc ).prependTo("#autopsy");
        $.tmpl('overviewTemplate', cubeDesc ).prependTo("#overview");
        
        $(".cube").each(function() {
          $(this).fadeIn('slow', function() {
              $(this).css("z-index",10000-$(this).offset().top);          
          });
        });
        $('#autopsy').isotope({
            itemSelector : '.cube',    
            animationEngine: "jquery",
            animationOptions: {
               duration: 1050,
               easing: 'easeInOutQuint',
               queue: true,
               complete: function() {
                   $(".cube").each(function() {
                         $(this).css("z-index",10000-$(this).offset().top);                  
                   })}
             },            
            getSortData : {
                title : function ( $elem ) {
                    return $elem.find('.title').text();
                },
                link : function ( $elem ) {
                    return $elem.find('.link').text();
                },
                random : function ( $elem ) {
                    return Math.floor(Math.random()*11);
                }
            }
        });
}
