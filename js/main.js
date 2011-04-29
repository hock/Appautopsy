$(document).ready(function() {
    var cubeMarkup = '<div id="${ID}" class="cube ${Color}" style="z-index:${Index};"> <span class="title">${Title}</span><span class="link">${Link}</span><div class="topface"><div style="background-image:url(${BGImage});"><h1>${Title}</h1></div></div> <div class="leftface"><div></div></div> <div class="rightface"><div></div></div> <div class="label"><strong><a href="${Link}">${Title}</a><br/><em>${Details}</em> ${Description}</div> </div>';
    var overviewMarkup = '<img class="over-badge" src="${BGImage}"/><h1><a href="${Link}">${Title}</a></h1><p>${Description}</p><div id="geocode"></div>';
    $.template( "cubeTemplate", cubeMarkup );
    $.template( "overviewTemplate", overviewMarkup );
    var components = [];        
    
    $("#autopsyaction").click(function() {
        if($("#appaddress").val() == "") {
           $("#appaddress").val("boingboing.net"); 
        }
        $.ajax({
            url: 'http://appautopsy.com/service/index.php?s='+$("#appaddress").val(), 
            dataType: 'jsonp', 
            success: function(data){
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
                   data.plugins[d].description = data.plugins[d].description.join();               

                }
                data.title = data.plugins["Title"].details;
                loadcontent(data);
                $.getJSON("geoloc.php?s="+data.plugins["IP"].details, function(loc) {
                    console.log(loc);
                    
                    console.log(loc["latitude"]);
                    var bgimage = "http://staticmaps.cloudmade.com/8ee2a50541944fb9bcedded5165f09d9/staticmap?center="+loc.latitude+","+loc.longitude+"&zoom=8&size=500x300&format=png&styleid=999";
                    console.log(bgimage);
                    $("#geocode").css("background-image", "url('"+bgimage+"')");
                });
            }
        }); 
    });

    
    /*$.get("http://appautopsy/ipify.php?s="+requesturl, function(data) {
       $.get("http://api.hostip.info/?ip="+data, function(loc) {
           console.log(loc);
       }); 
    });*/

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