$(document).ready(function() {
    var v = "";
    var cubeMarkup = '<div id="${ID}" class="cube ${Color}" style="z-index:${Index};"> <span class="title">${Title}</span><span class="link">${Link}</span><span class="privacy">${Privacy}</span><span class="property">${Property}</span><span class="accessibility">${Accessibility}</span><span class="webstandards">${Webstandards}</span><span class="commerce">${Commerce}</span> <div class="topface"><div style="background-image:url(${BGImage});"></div></div> <div class="leftface"><div></div></div> <div class="rightface"><div></div></div>    <div class="label"><div class="image-icon" style="background-image:url(${Icon});"></div><strong><a href="${Link}">${Title}</a></br>${Description} <br/><em>${Details}</em> <br/><div class="values">${Positive}<br/>${Negative}</div></div> </div>';
    var overviewMarkup = '<img class="over-badge" src="${BGImage}"/><h1><a href="${Link}">${Title}</a></h1><p>${Description}</p><div id="geocode"></div>';
    $.template( "cubeTemplate", cubeMarkup );
    $.template( "overviewTemplate", overviewMarkup );
    var components = [];        
    

      
    $('#appaddress').bind('keypress', function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if(code == 13) { $("#autopsyaction").click(); }
    });
    
    $("#autopsyaction").click(function() {
        if($("#appaddress").val() == "") {
           $("#appaddress").val(startaddress); 
        }
        $("#appaddress").val($("#appaddress").val().replace("http://","").replace("www.",""));
        
          $.getJSON('data/autopsy-values.json', function(data) {
            v = data;

        $.ajax({
            url: 'http://appautopsy.com/service/index.php?s='+$("#appaddress").val(), 
            dataType: 'jsonp', 
            success: function(data){
                if(typeof(data) == "undefined") {
                    alert("We couldn't figure out that url (try it without www?)");
                } else {
                    if(typeof(data.plugins) != 'undefined') {
                       for(var d in data.plugins) {

                           var strings = ""; var modules = "";
                           if(typeof(data.plugins[d].string) != 'undefined') {
                               strings = data.plugins[d].string.join();
                           }
                           if(typeof(data.plugins[d].module) != 'undefined') {
                               modules = data.plugins[d].module.join();
                           }
                           data.plugins[d].name = d;
                           data.plugins[d].details = strings + modules;
                           if(typeof(data.plugins[d].description) != 'undefined') {
                               data.plugins[d].description = data.plugins[d].description.join();               
                            }
                            if(typeof(v[d]) != 'undefined') {
                                if(typeof(v[d].description) != 'undefined') {
                                    data.plugins[d].description = v[d].description;
                                 }
                                 if(typeof(v[d].link) != 'undefined') {
                                     data.plugins[d].link = v[d].link;
                                  }
                                  if(typeof(v[d].image) != 'undefined') {
                                      data.plugins[d].image = "images/icons/"+v[d].image;
                                   }
                                   if(typeof(v[d].ignore) != 'undefined') {
                                       data.plugins[d].ignore = true;
                                    }
                                   data.plugins[d].positive = "";
                                   data.plugins[d].negative = "";
                                   
                                   if(typeof(v[d].values) != 'undefined') {
                                       data.plugins[d].privacy = v[d].values["privacy"].rank;
                                       data.plugins[d].property = v[d].values["property"].rank;
                                       data.plugins[d].access = v[d].values["accessibility"].rank;
                                       data.plugins[d].webstandards = v[d].values["webstandards"].rank;
                                       data.plugins[d].comm = v[d].values["commercialpractices"].rank;
                                    
                                        data.plugins[d].positive = "Positive Values: ";
                                        data.plugins[d].negative = "Negative Values: ";
                                        
                                        if(data.plugins[d].privacy == "1") {
                                          data.plugins[d].positive += "Privacy "
                                        }
                                        if(data.plugins[d].property == "1") {
                                          data.plugins[d].positive += "Property "
                                        }
                                        if(data.plugins[d].access == "1") {
                                          data.plugins[d].positive += "Accessibility "
                                        }
                                        if(data.plugins[d].webstandards == "1") {
                                          data.plugins[d].positive += "Web Standards "
                                        }
                                        if(data.plugins[d].comm == "1") {
                                          data.plugins[d].positive += "Commercial Practices "
                                        }
                                        if(data.plugins[d].privacy == "-1") {
                                          data.plugins[d].negative += "Privacy "
                                        }
                                        if(data.plugins[d].property == "-1") {
                                          data.plugins[d].negative += "Property "
                                        }
                                        if(data.plugins[d].access == "-1") {
                                          data.plugins[d].negative += "Accessibility "
                                        }
                                        if(data.plugins[d].webstandards == "-1") {
                                          data.plugins[d].negative += "Web Standards "
                                        }
                                        if(data.plugins[d].comm == "-1") {
                                          data.plugins[d].negative += "Commercial Practices "
                                        }
                                       data.plugins[d].image = "images/icons/"+v[d].image;
                                    }
                             }
                        } // end for
                    }
                    if(typeof(data.plugins) != 'undefined' 
                        && typeof(data.plugins["Title"]) != 'undefined') {
                        data.title = data.plugins["Title"].details;
                    }

                    loadcontent(data);
                            if(typeof(data.plugins) != 'undefined' 
                                && typeof(data.plugins["Title"]) != 'undefined') {
                        $.getJSON("geoloc.php?s="+data.plugins["IP"].details, function(loc) {
                            var bgimage = "http://staticmaps.cloudmade.com/8ee2a50541944fb9bcedded5165f09d9/staticmap?center="+loc.latitude+","+loc.longitude+"&zoom=8&size=500x300&format=png&styleid=999";
                            $("#geocode").css("background-image", "url('"+bgimage+"')");
                        });
                    }
                }
            }
        });  // end ajax

        }); // end json
    });


    $('#sort a').click(function(){
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
    $("#autopsyaction").click();
});