<?php 
$this->insert('header', $view_data );
$this->insert('featured', $view_data );
?>

<div class="home-page site-wrapper">
    <div class="content-wrapper">
        <section id="hero">
            <div class="row hero-row">
                <div class="small-12 large-7 columns">
                    <div class="left">
                        <h1>Preserve Biodiversity</h1>
                        <p>Exploring the social and environmental benefits of native gardens, organic methods and sustainable landscapes.</p>
                        <a class="button-view-models transparent" href="filter_plants">Search Native Plants</a>
                    </div>
                </div>

                <div class="small-12 large-5 columns">
                    <div class="device-bg">
                        <picture class="device-middle">
                          <source srcset="assets/img/device.png" media="(min-width: 1200px)">
                          <source srcset="assets/img/device-sml.png">
                          <img class="device" src="assets/img/device-sml.png" >
                        </picture>
                    </div>
                </div>
            </div>
        </section>

    <!--     <section id="intro">
            <div class="row" data-scroll>
                <div class="small-12 large-6 columns medium-media-padding">
                   <p>
                    Art in the Open aims to add significance to civic spaces, as well as engage with audiences to promote an appreciation for the artworks themselves, but also the public spaces they inhabit.  These artworks all tell stories that have helped shape not just local communities, but also how we understand and appreciate Niagara and its history. The pieces chosen highlight this both in a wider manner, but will
                   </p>
                </div>
                <div class="small-12 large-6 columns medium-media-padding">
                    <p>
                    also feature local figures and stories that are all very relevant to this region. Art in the Open is focused on furthering community engagement with public art works across the region, promoting not just education and appreciation of the very diverse works and important artists in this area, but to illustrate how these works act as landmarks for the history of these 12 municipalities.
                    </p>
                </div>
            </div>
        </section> -->

    <!--     <section id="beautiful-peices">
                <div class="beautiful-peices-bg"></div>
                <div class="stroke-top"></div>
                <div class="stroke-bottom"></div>
                <div class="row beautiful-peices-row main-row">
                    <div class="show-for-large small-12 large-5 columns left">
                        <picture class="device-middle" data-scroll>
                          <source srcset="assets/img/device-middle.png" media="(min-width: 1200px)">
                          <source srcset="assets/img/device-middle.png">
                          <img src="assets/img/device-middle.png" >
                        </picture>
                    </div>
                    <div class="small-12 large-7 columns right medium-media-padding">
                        <div data-scroll>
                            <h3>Over 250+ Beautiful Pieces</h3>
                            <p>As information and images of the myriad works goes online, we’re eager for you to expand the conversation around them, with your own insights and memories.</p>
                        </div>
                        <div class="row types-count-row" data-scroll>
                            <div class="small-6 columns">
                                <div class="types-count">
                                    <a href="#" class="circle-button monument" alt="monument"><div class="icon"></div></a>
                                    <span class="large" data-monument></span> Monuments
                                </div>
                                <div class="types-count">
                                    <a href="#" class="circle-button mural" alt="murals"><div class="icon"></div></a>
                                    <span class="large" data-mural></span> Murals
                                </div>
                                <div class="types-count">
                                    <a href="#" class="circle-button totem" alt="totems"><div class="icon"></div></a>
                                    <span class="large" data-totem></span> Totems
                                </div>
                            </div>
                            <div class="small-6 columns">
                                <div class="types-count">
                                    <a href="#" class="circle-button sculpture" alt="sculpture"><div class="icon"></div></a>
                                    <span class="large" data-sculpture></span> sculptures
                                </div>
                                <div class="types-count">
                                    <a href="#" class="circle-button statue" alt="statue"><div class="icon"></div></a>
                                    <span class="large" data-statue></span> Statues
                                </div>
                                <div class="types-count">
                                    <a href="#" class="circle-button installation" alt="installations"><div class="icon"></div></a>
                                    <span class="large" data-installation></span> Installations
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </section> -->

<!--         <section id="explore">
           <div class="row">
                <div class="small-12 columns medium-media-padding">
                    <div class="center-info" data-scroll>
                        <h3>Explore Niagara’s Many Routes</h3>
                        <p>Hike, bike, or sip your way through our region's outdoor art</p>
                    </div>
                </div>
            </div>
            <div class="route-icons row" data-scroll>
                <div class="circle-group">
                    <div class="circle-wrapper">
                        <div class="circle pink"><div class="icon icon-biking"></div></div>
                    </div>
                    <span class="circle-title">Biking</span>
                </div>
                <div class="circle-group">
                    <div class="circle-wrapper">
                        <div class="circle yellow"><div class="icon icon-hiking"></div></div>
                    </div>
                    <span class="circle-title">Hiking</span>
                </div>
                <div class="circle-group">
                    <div class="circle-wrapper">
                        <div class="circle green"><div class="icon icon-hospitality"></div></div>
                    </div>
                    <span class="circle-title">Hospitality</span>
                </div>
            </div>
        </section> -->

        <section id="gallery" data-scroll>
                <div class="gallery-wrapper">
                    <div class="gal-item img1">
                        <div class="heading-wrapper">
                            <h3>Characters</h3>
                        </div>
                    </div>
                    <div class="gal-item img2">
                        <div class="heading-wrapper">
                            <h3>Concepts</h3>
                        </div>
                    </div>
                    <div class="gal-item img3">
                        <div class="heading-wrapper">
                            <h3>Environments</h3>
                        </div>
                    </div>
                    <div class="gal-item img4">
                        <div class="heading-wrapper">
                            <h3>Weapons</h3>
                        </div>
                    </div>
                </div>
                <div class="clear"></div>
        </section>
    </div><!-- /content wrapper -->

    <?php $this->insert('footer', $view_data ); ?>

</div><!-- /site wrapper -->




