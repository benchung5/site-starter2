<?php 
use Config\Config as Config;

// $this->insert('header', $view_data );
$this->insert('featured', $view_data );
?>

<script>
// must put this above the html to redirect before rendering if needed
(function() {
    // //check if item is in local storage
    // if (localStorage.getItem('token')) {
    //     var token = localStorage.getItem('token');

    //     if (window.XMLHttpRequest) { xhttp = new XMLHttpRequest(); }
    //     else { xhttp = new ActiveXObject("Microsoft.XMLHTTP"); }
        
    //     //listen for response
    //     xhttp.onreadystatechange = function() {
    //         if(xhttp.readyState == 4 && xhttp.status == 200) {
    //             var resp = null;
    //             try {
    //                 resp = JSON.parse(this.response);
    //             } catch(e) {
    //                 console.log("can't parse response");
    //             }

    //             if(resp.id) {
    //               // show page
    //               //console.log('show page');
    //             } else { 
    //               accessDenied();
    //             }
    //         }
    //     }

    //     //send ajax request
    //     try {
    //         xhttp.open("POST", "<?= Config::paths('ROOT_URL').'api/users/verify' ?>", true);
    //         xhttp.setRequestHeader('Accept', 'application/json, text/plain, */*');
    //         xhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    //         xhttp.setRequestHeader('Authorization', 'Bearer '+token);
    //         //turn params into json and send
    //         xhttp.send();
    //     } catch(e) {
    //         console.log(e);
    //     }
    // } else {
    //     accessDenied();
    // }

    // function accessDenied() {
    //     //redirect to access denied pager
    //     var location = window.location.hostname;
    //     window.location.assign('http://'+location+'/access_denied');
    // }       
})();
</script>

<div class="home-page site-wrapper">
    <div class="content-wrapper">

        <div id="falling-snow"></div>
        <section id="how-it-began">
            <div class="row">
                <div class="small-12 columns align-parent">
                    <div id="top-intro">
                        <div>
                            <span id="how">How</span> <span id="it">it</span> <span id="all">all</span> <span id="began">began…</span>
                        </div>
                        <div id="keep-scrolling">
                            <div class="inner">keep scrolling<div class="arrow"></div></div>        
                        </div>
                    </div>
                    <p>
                    <span id="body1">On December 24 th , 1983, my children asked me to tell them a bedtime Christmas
                    story; one they had never heard before. I thought for a moment, then began
                    telling them the story about one of Santa&#39;s little elves. After about a minute, they interrupted me and asked me what his name was. Not knowing myself, I wasn’t sure what to tell them, so I ignored it and proceeded to tell them the story, while at the same time, trying to think of a name. Moments later they asked me again what his name was. Well I had to come up with something quick!</span>
                    </p>
                    <p> 
                    <span id="body2">I paused and
                    thought for a moment and glanced out the window. I noticed it was beginning to
                    snow, so I responded and said… “Snowflake”. “His name is Snowflake”! They all giggled as they thought it was a cool name. They asked me why his name was
                    Snowflake? Once again, I had to come up with something quick to address their
                    curiosity. I told them that Santa had given him that name because Snowflake
                    collected snowflake’s as a hobby, and he had the world’s largest collection of
                    snowflakes. They just thought that was awesome!</span>
                    </p>
                    <p>
                    <span id="body3">
                    It was that special and magical moment on Christmas Eve so many years ago, that
                    the story of Snowflake’s Christmas was told for the very first time and when the Workshop Elves were born. Over the years the story has been read to tens of thousands of children and has become a Christmas tradition for families in many homes.</span>
                    </p>
                </div>
            </div>
        </section>

        <section id="thirty-five-yrs">
            <div id="thirty-five-yrs-svg">
                <div id="years-in-the-making"></div>
                <div id="svg"></div>
                <div id="filmstrip"></div>
            </div>
        </section>

        <section id="snowflakes-christmas">
            <div class="sc-bg"></div>
            <div class="row expanded">
                <div class="small-12 large-6 columns left">
                    <div id="title">
                        <div id="snowflake-container">
                          <div class="blur-highlight"></div>
                          <div id="snowflake"></div>  
                        </div>
                        <div id="snowflakes"></div>
                        <div id="christmas"></div>
                        <div id="imagine-this"></div>
                    </div>
                </div>
                <div class="small-12 large-6 columns right">
                    <img id="snowking" src="/assets/img/snow-king.png" />
                    <div id="smoke"></div>
                </div>
            </div>
            <div class="blue-blur"></div>
        </section>
        <section id="dear-santa">
            <div class="inner">
                <div class="icicles-container">
                    <img class="icicles-one" src="/assets/img/icicles2.svg" />
                    <img class="icicles-five" src="/assets/img/icicles2.svg" />
                    <img class="icicles-four" src="/assets/img/icicles4.svg" />
                    <img class="icicles-two" src="/assets/img/icicles3.svg" />
                    <img class="icicles-three" src="/assets/img/icicles3.svg" />
                </div>
                <div class="row expanded">
                    <div class="small-12 large-6 columns left">
                        <img id="dear-santa-envelope" src="/assets/img/santa-letter.png"/>
                    </div>
                    <div class="small-12 large-6 columns right">
                        <div id="dear-santa-text">
                            <h2>Lorem ipsum</h2>
                            <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="north-pole">
            <div class="inner">
                <div class="row expanded">
                    <div class="small-12 large-6 columns left">
                        <img id="shooting-star" src="/assets/img/shooting-star.png"/>
                        <img id="north-pole-sign" src="/assets/img/north-pole-sign.svg"/>
                    </div>
                    <div class="small-12 large-6 columns right">
                        <img id="north-pole-envelope" src="/assets/img/north-pole-letter.png"/>
                    </div>
                </div>
            </div>
        </section>
        <section id="boat">
            <div class="inner">
                <div class="row expanded">
                    <div class="small-12 xlarge-12 columns left">
                        <div id="boat-holder">
                            <img id="boat-base" src="/assets/img/boat-base.png"/>
                            <img id="boat-sail-back" src="/assets/img/boat-sail-back.svg"/>
                            <img id="boat-sail-front" src="/assets/img/boat-sail-front.svg"/>
                            <img id="boat-flag" src="/assets/img/boat-flag.svg"/>
                            <img id="splash" src="/assets/img/splash.svg"/>
                        </div>
                    </div>
                    <div class="small-12 xlarge-12 columns right">
                        <div id="santa-approved-holder">
                            <img id="santa-approved" src="/assets/img/santa-approved.svg"/>
                            <img id="ready-for-delivery" src="/assets/img/ready-for-delivery.svg"/>
                        </div>
                    </div>
                </div>
                <div id="water"></div>
                <div id="water-blur"></div>
                <div id="water-outer"></div>
            </div>
        </section>
        <section id="book">
            <div class="inner">
                <div class="row expanded">
                    <div class="small-12 xlarge-6 columns left">
                        <div id="elf-holder">
                            <img id="drawing" class="elf" src="/assets/img/drawing.png"/>
                            <img id="elf-one" class="elf" src="/assets/img/elf1.png"/>
                            <img id="elf-two" class="elf" src="/assets/img/elf2.png"/>
                        </div>
                    </div>
                    <div class="small-12 xlarge-6 columns right">
                        <div class="text">
                            <div id="inner-one" class="inner">
                                <h2>Lorem ipsum</h2>
                                <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                            <div id="inner-two" class="inner">
                                <h2>Kiusmod tempor</h2>
                                <p>Incididunt ut labore et dolore magna aliqua. Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            </div>
                            <div id="inner-three" class="inner">
                                <h2>Incididunt ut labore </h2>
                                <p>Adipiscing elit et dolore magna aliqua. Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Incididunt ut labore et dolore magna aliqua. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id="video">
            <img id="trees-bg-far" src="/assets/img/trees-bg-far.svg" />
            <div id="trees-bg-near">
                <img src="/assets/img/trees-bg-near.svg" />
                <div id="bg-cover"></div>
            </div>
            
            <div class="inner">
                <div id="video-holder">
                    <div id="video-screen">video screen here...</div>
                    <div id="video-envelope"></div>
                </div>
            </div>
        </section>

    </div><!-- /content wrapper -->

    <?php $this->insert('footer', $view_data ); ?>



</div><!-- /site wrapper -->




