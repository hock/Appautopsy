
function loadcontent(data) {
    $("#overview").html("");
    $("#autopsy").remove();
    $("#overview").after('<div id="autopsy"></div>');
      components = data.plugins;
        for(var i in components) {
            if(!(components[i].ignore)) {
                 var cubeDesc = [{
                    ID:components[i].name,
                    Color:"default",
                    Index:i+10,
                    Title:components[i].name,
                    Icon:components[i].image,
                    Link:components[i].link,
                    Details:components[i].details,
                    Description:components[i].description,
                    Privacy:components[i].privacy,
                    Property:components[i].property,
                    Accessibility:components[i].access,
                    Webstandards:components[i].webstandards,
                    Commerce:components[i].comm,
                    Positive:components[i].positive,              
                    Negative:components[i].negative              
                              
                }];
            
                $.tmpl('cubeTemplate', cubeDesc).prependTo("#autopsy");             
            }   
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
        $(".cube").mouseenter(function() {
          $(".cube .label").css("display","none");
          $(this).children(".label").css("display","block");
        });
        
        $('#autopsy').isotope({
            itemSelector : '.cube',    
            animationEngine: "jquery",
            animationOptions: {
               duration: 1050,
               easing: 'easeInOutQuint',
               queue: true,
               complete: function() {
                   $(".cube").removeClass("red");
                   $(".cube").removeClass("green");

                   var cur = $(".currentval").text();
                   if(cur == "Privacy") {
                      $(".cube").each(function() {

                            var val = $(this).find(".privacy").text();
                            if(val == "-1") { $(this).addClass("red");}
                            if(val == "1") { $(this).addClass("green");}
                            $(this).css("z-index",10000-$(this).offset().top);                  
                      });
                    }
                    else if(cur == "Property") {
                       $(".cube").each(function() {
                             var val = $(this).find(".property").text();
                             if(val == "-1") { $(this).addClass("red");}
                             if(val == "1") { $(this).addClass("green");}
                             $(this).css("z-index",10000-$(this).offset().top);                  
                       });
                     }
                     else if(cur == "Accessibility") {
                        $(".cube").each(function() {
                              var val = $(this).find(".accessibility").text();
                              if(val == "-1") { $(this).addClass("red");}
                              if(val == "1") { $(this).addClass("green");}
                              $(this).css("z-index",10000-$(this).offset().top);                  
                        });
                      }
                      else if(cur == "Web Standards") {
                         $(".cube").each(function() {
                               var val = $(this).find(".webstandards").text();
                               if(val == "-1") { $(this).addClass("red");}
                               if(val == "1") { $(this).addClass("green");}
                               $(this).css("z-index",10000-$(this).offset().top);                  
                         });
                       }
                       else if(cur == "Practices") {
                          $(".cube").each(function() {
                                var val = $(this).find(".commerce").text();
                                if(val == "-1") { $(this).addClass("red");}
                                if(val == "1") { $(this).addClass("green");}
                                $(this).css("z-index",10000-$(this).offset().top);                  
                          });
                        }
                        
                   }
                   
    
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
                },
                privacy : function ( $elem ) {
                    var val = $elem.find('.privacy').text();
                    if(val == "") { val = "0";}
                    return parseInt(val);
                },
                property : function ( $elem ) {
                    var val = $elem.find('.property').text();
                    if(val == "") { val = "0";}
                    return parseInt(val);
                },
                accessibility : function ( $elem ) {
                    var val = $elem.find('.accessibility').text();
                    if(val == "") { val = "0";}
                    return parseInt(val);
                },
                webstandards : function ( $elem ) {
                    var val = $elem.find('.webstandards').text();
                    if(val == "") { val = "0";}
                    return parseInt(val);
                },
                commerce : function ( $elem ) {
                    var val = $elem.find('.commerce').text();
                    if(val == "") { val = "0";}
                    return parseInt(val);
                }
            }
        });
}
