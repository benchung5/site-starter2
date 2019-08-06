<?php 
use Config\Config as Config;
?>

<!-- going offline modal -->
<!-- <div id="modal" class="modal offline-modal">
  <div class="modal-inner offline-message">You are currently offline</div>
</div> -->

<header id="header" class="hide-for-print">
  
  <div class="header-inner">
    <div class="row text-center">
      <div class="small-10 large-4 columns logo-container align-middle">
        <h1 class="logo-main">
          <a href="/"><img alt="Nature With Us Logo" src="<?=Config::paths('ROOT_URL')?>assets/img/naturewithus-logo.png"></a>
        </h1>
      </div>
      <nav class="large-8 columns menu-container show-for-large">
        <ul class="menu menu-left align-right">
          <li><a href="/" title="Nature With Us Home">Home</a></li>
          <li><a href="/plants" title="Niagara Trees">Niagara Trees</a></li>
          <li><a href="/articles" title="Articles">Articles</a></li>
          <li><a href="/about" title="About Nature With Us">About</a></li>
          <li><a href="/contact" title="Contact Nature Wtih Us">Contact</a></li>
        </ul>
      </nav>
    </div>
  </div>

<!-- version including search -->

<!--   <div class="header-inner">
    <div class="row text-center">
      <div class="small-10 large-4 columns logo-container align-middle">
        <h1 class="logo-main">
          <a href="/"><img alt="logo" src="..."></a>
        </h1>
      </div>
      <nav class="large-6 columns menu-container show-for-large">
        <ul class="menu menu-left align-right">
          <li><a href="/">Home</a></li>
          <li><a href="/filter">Articles</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
      <div class="small-2 columns menu-container">
        <ul class="menu align-right lesser-menu ">
          <li class="show-for-large"><a href="/account/login">Login</a></li>
        </ul>
      </div>
    </div>
  </div> -->

  <div class="mobile-menu-button hide-for-large">
    <button class="grid-button rearrange" type="button" role="button" aria-label="Toggle Navigation">
      <span class="grid"></span>
    </button>
  </div>

  <div class="mobile-menu-container hide-for-large" style="visibility: hidden; opacity: 0;"> 
    <div class="mobile-menu-inner">
      <div class="top">
        <img class="mobile-top-logo" src="<?=Config::paths('ROOT_URL')?>assets/img/naturewithus-logo.png">
      </div>   
      <ul class="menu menu-mobile vertical">
          <li><a href="/" title="Nature With Us Home">Home</a></li>
          <li><a href="/plants" title="Niagara Trees">Niagara Trees</a></li>
          <li><a href="/articles" title="Articles">Articles</a></li>
          <li><a href="/about" title="About Nature With Us">About</a></li>
          <li><a href="/contact" title="Contact Nature Wtih Us">Contact</a></li>
      </ul>
      <div class="mobile-menu-stretch"></div>
      <ul class="mobile-menu-buttons">
        <li><a href="/search">Search</a></li>
<!--         <li>
          <a href="/admin">signup</a>
          <a href="/admin">login</a>
        </li>  -->
      </ul>
    </div>
  </div>

</header>