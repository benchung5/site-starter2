<!DOCTYPE html>
<html lang="en-US">
   <head>
      <title>Your Site Title | Your Site Brief Tagline</title>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"/> <!--320-->
      <meta name="description" content=" | Your Site Brief Tagline" />
      <meta charset="UTF-8" />
      
      <link rel='stylesheet' id='default-style-css'  href='css/global.css' type='text/css' media='all' />
      <link rel='stylesheet' id='default-style-css'  href='style.css' type='text/css' media='all' />
      
      <script type='text/javascript' src='https://code.jquery.com/jquery-1.10.2.min.js'></script>
      <script type='text/javascript' src='http://masonry.desandro.com/masonry.pkgd.js?ver=3.1.4'></script>
      <script type='text/javascript' src='js/jquery.easing.1.3.js?ver=3.8'></script>
      <script type='text/javascript' src='js/onePixel.js?ver=3.8'></script>
      <script type='text/javascript' src='js/jquery.mobilemenu.js?ver=3.8'></script>
      <script type='text/javascript' src='js/modernizr.js?ver=3.8'></script>
      <script type='text/javascript' src='js/jquery.stellar.min.js?ver=3.8'></script>
      <script type="text/javascript" src="js/jquery.sticky.min.js"></script>
      
<!--      jquery ui-->
      <script type="text/javascript" src="js/jquery.ui.accordion.min.js"></script>
      <script type="text/javascript" src="js/jquery.ui.core.min.js"></script>
      <script type="text/javascript" src="js/jquery.ui.tabs.min.js"></script>
      <script type="text/javascript" src="js/jquery.ui.widget.min.js"></script>
      
      <script src="http://heartcode-canvasloader.googlecode.com/files/heartcode-canvasloader-min-0.9.1.js"></script>
      
      <script>
        $(window).load(function(){
            $("#nav-primary-belowheader-wrapper").sticky({ topSpacing: 0 });
            $('#nav-primary-belowheader-wrapper').on('sticky-start', function () {
                
                $('#logo-sticky').show();
                
            });
            $('#nav-primary-belowheader-wrapper').on('sticky-end', function () {
                
                $('#logo-sticky').hide();
                
            });
            $("#mobile-menu").sticky({ topSpacing: 0 });
        });
      </script>
      
   </head>
   <body  class="internal-page page-template page-template-template-home-php no-customize-support transparent-header belowheader-menu standard-pageheader">
<!--for menus that don't work well sticky-->
      <header id="site-header">
         <div id="header-inner">
            <div class="testpagey" style="display: none; background: #000;">
               &nbsp;<!--keep this to make the height work for testing-->
            </div>
            <div id="header-main-wrapper">
               <div id="header-main" class="row">
                  <div class="large-2 columns media-center-lg">
                     <div id="logo-header">
                        <a href="/"><img src="images/logo-main.png" alt="Logo" title="Your Site Title"/></a>
                     </div>
                  </div>
                  <div class="large-10 columns">
                     <div id="header-right">
<!--                        <div class="widget-area widget-header-right">
                           <div class="textwidget">
                              <a><i class="fa fa-search fa-lg" ></i></a>
                               <a><i class="fa fa-shopping-cart fa-lg" ></i></a>&nbsp;
                               <a href="#">wishlist</a><i class="fa fa-circle" ></i>
                               <a href="#">login</a>
                               
                               <div class="socials header-socials">
                                   <a class="social link-twitter" alt="twitter" href="http://twitter.com"><i style="font-size: 17px;" class="fa fa-twitter fa-lg simple_social"></i></a>
                                   <a class="social link-facebook"alt="facebook" href="http://facebook.com"><i style="font-size: 17px;" class="fa fa-facebook fa-lg simple_social"></i></a>
                              <a class="social link-linkedin" alt="linkedin" href="http://linkedin.com"><i style="font-size: 17px;" class="fa fa-linkedin fa-lg simple_social"></i></a>
                                   <a class="social link-pinterest" alt="pinterest" href="http://pinterest.com"><i style="font-size: 17px;" class="fa fa-pinterest fa-lg simple_social"></i></a>
                                   <a class="social link-googleplus" alt="googleplus" href="http://googleplus.com"><i style="font-size: 17px;" class="fa fa-google-plus fa-lg simple_social"></i></a>
                                   <a class="social link-instagram" alt="instagram" href="http://instagram.com"><i style="font-size: 17px;" class="fa fa-instagram fa-lg simple_social"></i></a>
                                   <a class="social link-youtube" alt="youtube" href="http://youtube.com"><i style="font-size: 17px;" class="fa fa-youtube fa-lg simple_social"></i></a>
                               </div>
                               <div class="clear"></div>
                               <form id="searchform" method="get" role="search" action="/search">
                                   <div>
                                       <a class="search-submit-button" href="javascript:void(0)">
                                           <i class="fa fa-search"></i>
                                       </a>
                                       <div id="searchtext">
                                           <input type="text" id="kw" name="kw" value="">
                                       </div>
                                   </div>
                               </form>
                           </div>
                        </div>-->
                     </div>
                  </div>
               </div>
            </div>
            <div id="nav-primary-belowheader-wrapper" >
               <div class="nav row padding-columns">
                  <div id="logo-sticky">
                      <a href="/"><img title="Your Site Title" alt="Logo" src="images/logo-main.png"></a>
                  </div>
                  <div id="nav-primary-b" class="nav">
                     <nav>
                        <ul class="menu group">
                           <li class="active" >
                              <a href="index.php">Home</a>
                           </li>
                           <li>
                              <a href="#">Samples</a>
                              <ul class="sub-menu">
                                 <li><a href="internal-template.php">Template Sidebar</a></li>
                                 <li><a href="internal-template-fullwidth.php">Templeate Full Width</a></li>
                              </ul>
                           </li>
                        </ul>
                     </nav>
                  </div>
                  <!--#nav-primary-->
               </div>
            </div>
            <div id="mobile-menu">
               <div id="mobile-selector" unselectable="on" class="unselectable"><span>Navigate to...</span></div>
               <div id="mobile-menu" unselectable="on" class="unselectable">
                  <ul id="menu-custom-mobile-menu" class="menu">
                     <li class="active" >
                        <a href="index.php">Home</a>
                     </li>
                     <li><a href="internal-template.php">Template Sidebar</a></li>
                     <li><a href="internal-template-fullwidth.php">Templeate Full Width</a></li>
                     <li>
                        <a href="#l">Submenu1</a>
                        <ul class="sub-menu">
                           <li><a href="#">Submenu1</a></li>
                           <li><a href="#">Submenu2</a></li>
                        </ul>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </header>
      <div class="clear"></div>
      <div id="main-wrapper">
