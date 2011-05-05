<?php
    if(isset($_GET['s'])) {
        ?><script  type="text/javascript">var startaddress = "<?php echo $_GET['s']; ?>";</script><?php
    } else {
        ?><script  type="text/javascript">var startaddress = "boingboing.net";</script><?php
    }
?>
<!DOCTYPE html>  
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

    <title>App Autopsy</title>

    <meta name="description" content="">
    <meta name="author" content="">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="/images/favicon.ico" /> 
    <link rel="apple-touch-icon" href="">

    <link href='http://fonts.googleapis.com/css?family=Rock+Salt' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="style/style.css" type="text/css" media="all" /> 	
	<link rel="stylesheet" href="style/autopsy.css" type="text/css" media="all" /> 
    
    <script  type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"></script>
    <script type="text/javascript" src="http://ajax.microsoft.com/ajax/jquery.ui/1.8.5/jquery-ui.js"></script>
    <script  type="text/javascript" src="http://ajax.microsoft.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js"></script>    
    <script  type="text/javascript" src="js/jquery.isotope.min.js"></script>
    <script  type="text/javascript" src="js/jquery.pinnedfooter.js"></script>
    <script  type="text/javascript" src="js/functions.js"></script>
    <script  type="text/javascript" src="js/main.js"></script>
</head>
<body>
    <div class="wrapper" id="content">
        <h1 class="page-title"><div id="logo"></div><span class="hand">App Autopsy</span> <input id="appaddress" placeholder="boingboing.net" type="text"/> <input type="button" id="autopsyaction" value="Go"/>
            <ul id="sort">
                <span class="currentval">Sort by Value</span>
              <li><a href="#privacy">Privacy</a></li>
              <li><a href="#property">Property</a></li>
              <li><a href="#accessibility">Accessibility</a></li>
              <li><a href="#webstandards">Web Standards</a></li>
              <li><a href="#commerce">Practices</a></li>
              
            </ul>
        </h1>

        <div id="overview"></div>        
        <div id="autopsy"></div>
        <div class="clear"></div>
    </div>
    <div class="clear"></div>
    
    <div class="wrapper" id="additional">
        Running with <a>default</a> rule file and <a>default</a> value file.
    </div>
    <div id="footer">
        Appautopsy by Caplan/Hockenberry. <a href="?s=appautopsy.com">Run an autopsy on this site</a> | Code at <a href="https://github.com/hock/Appautopsy">Github</a>.
    </div>
</body>
</html>