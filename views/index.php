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
                        <div id="title">
                            <span id="how">How</span> <span id="it">it</span> <span id="all">all</span> <span id="began">began…</span>
                        </div>
                        <div id="keep-scrolling">
                            <div class="inner">keep scrolling<div class="arrow"></div></div>        
                        </div>
                    </div>
                    <p>
                    <span id="body1">On Christmas Eve 1983, my children wanted me to tell them a bedtime Christmas story; one they had never heard before. I thought for a moment, and wondered, where do I start? I then thought that the North Pole would be a good place to start. So, I began telling them a story about one of Santa’s little elves.</span>
                    </p>
                    <p> 
                    <span id="body2">A couple of minutes into the story, one of my children asked me what his name was. I was caught off guard as I hadn’t thought of a name. I paused, glanced out the window and noticed that it was beginning to snow. I turned to my children and said, “Snowflake, his name is Snowflake”. They all giggled and thought that was the coolest name ever. When they asked me how he got his name, I told them that Santa named him Snowflake. They asked why did Santa name him Snowflake? When they asked me that, I remembered as a child, catching snowflakes on my mitten. I told them that Santa named him Snowflake because he loves catching snowflakes and collects them as a hobby and has the world’s largest collection of snowflakes.</span>
                    </p>
                    <p>
                    <span id="body3">
                    It was that special and memorable moment on Christmas Eve so many years ago, that the story of Snowflake’s Christmas was told for the very first time and Santa’s Workshop Elves were born. Over the years Snowflake’s Christmas has been read to thousands of children and has become a Christmas favourite in many homes.</span>
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
            <div class="bg">
            </div>
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
                    <div class="small-12 medium-6 columns left">
                        <div id="boat-holder">
                            <img id="boat-base" src="/assets/img/boat-base.png"/>
                            <img id="boat-sail-back" src="/assets/img/boat-sail-back.svg"/>
                            <img id="boat-sail-front" src="/assets/img/boat-sail-front.svg"/>
                            <img id="boat-flag" src="/assets/img/boat-flag.svg"/>
                            <img id="splash" src="/assets/img/splash.svg"/>
                        </div>
                    </div>
                    <div class="small-12 medium-6 columns right">
                        <div id="santa-approved-holder">
                            <img id="santa-approved" src="/assets/img/santa-approved.svg"/>
                            <img id="ready-for-delivery" src="/assets/img/ready-for-delivery.svg"/>
                        </div>
                    </div>
                </div>
                <div id="water-holder">
                     <div id="water"></div>
                     <div id="water-blur"></div>   
                </div>
            </div>
        </section>
        <section id="book">
            <div class="inner">
                <div class="row expanded">
                    <div class="small-12 medium-6 columns left">
                        <div id="elf-holder">
                            <img id="drawing" class="" src="/assets/img/drawing.png"/>
                            <img id="elf-one" class="elf" src="/assets/img/elf1.png"/>
                            <img id="elf-two" class="elf" src="/assets/img/elf2.png"/>
                            <img id="elf-three" class="elf" src="/assets/img/elf3.png"/>
                            <img id="elf-four" class="elf" src="/assets/img/elf4.png"/>
                            <img id="elf-five" class="elf" src="/assets/img/elf5.png"/>
                            <img id="elf-six" class="elf" src="/assets/img/elf6.png"/>
                            <img id="elf-seven" class="elf" src="/assets/img/elf7.png"/>
                            <img id="elf-eight" class="elf" src="/assets/img/elf8.png"/>
                            <img id="elf-nine" class="elf" src="/assets/img/elf9.png"/>
                            <img id="elf-wicked-snowking" class="" src="/assets/img/snow-king.png"/>
                        </div>
                    </div>
                    <div class="small-12 medium-6 columns right">
                        <div class="text">
                            <div id="inner-one" class="inner">
                                <h2>
                                Once upon a time…
                                </h2>
                                <p>
                                in a small village nestled at the base of the snow-covered
                                mountains and glaciers known as the North Pole, live the
                                Workshop Elves, Santa’s helpers. Their world is filled with fun,
                                excitement and magic. The Workshop Elves are Santa’s very
                                special elves, whose names are… SNOWFLAKE, HOLLY,
                                TWINKLES, CANDY, JINGLES, ANGEL, SPARKLES, CRYSTAL and
                                MASTER ELF.
                                </p>
                            </div>
                            <div id="inner-two" class="inner elf-text">
                                <h2>Snowflake</h2>
                                <p>
                                    is the youngest elf and has a most unusual hobby…collecting snowflakes! Whenever it begins to snow, he runs out and catches pretty snowflakes to add to his collection. Because of his hobby, Santa attached a snowflake to the back of his hat. Snowflake’s other responsibility is taking care of Santa’s reindeer ‘Dasher’.
                                </p>

                            </div>
                            <div id="inner-three" class="inner elf-text">
                                <h2>Angel</h2>
                                <p>
                                    has been blessed with the gift of music and a beautiful singing voice. Her voice sounds like an angel from heaven. Santa is so impressed with her musical talents that he attached a small harp to the back of her hat. Angel is also responsible for Santa’s reindeer ‘Vixen’.
                                </p>

                            </div>
                            <div id="inner-four" class="inner elf-text">
                                <h2>Jingles</h2>
                                <p>
                                    is a very loveable and comical character. He’s the only one of the Workshop Elves who can’t talk. His voice was stolen by the Wicked SnowKing. Jingles communicates with the other Elves is by ringing the bell that Santa attached to the back of his hat. Jingles is also responsible for Santa’s reindeer Cupid.
                                </p>
                            </div>
                            <div id="inner-five" class="inner elf-text">
                                <h2>Candy</h2>
                                <p>
                                    is a fast talking and energetic little elf with a very sweet tooth. Every year she makes candy canes for all the boys and girls around the world. She has the responsibility of making sure that no candy cane leaves the North Pole without their famous red, green and white stripes. Santa attached a candy cane to the back of her hat. Candy is also responsible for Santa’s reindeer ‘Blitzen’.
                                </p>
                            </div>
                            <div id="inner-six" class="inner elf-text">
                                <h2>Twinkles</h2>
                                <p>
                                    is the Astronomer of the Workshop Elves and it’s his responsibility to chart out Santa’s Christmas Eve voyage by the stars, so Santa knows exactly where he is going. He views and studies the stars through a large telescope pointing up to the sky. Because of his knowledge and responsibility, Santa attached a star to the back of Twinkles hat. Twinkles is also responsible for Santa’s reindeer ‘Comet’.
                                </p>
                            </div>
                            <div id="inner-seven" class="inner elf-text">
                                <h2>Holly</h2>
                                <p>
                                    is a happy-go-lucky little elf, who is always in the Christmas Spirit. Her loving Christmas spirit prompted Santa to attach holly berries to the back of her hat, a symbol of the Spirit of Christmas. Holly is also responsible for Santa’s reindeer ‘Prancer’.
                                </p>
                            </div>
                            <div id="inner-eight" class="inner elf-text">
                                <h2>Sparkles</h2>
                                <p>
                                    is responble for decorating the workshop and the Christmas tree, and putting up all the colourful Christmas lights. Because of his love for Christmas decorations, Santa gave Sparkles a Christmas ball from the Christmas and attached it to the back of his hat. Sparkles is also responsible for Santa’s reindeer ‘Dancer’.
                                </p>
                            </div>
                            <div id="inner-nine" class="inner elf-text">
                                <h2>Crystal</h2>
                                <p>
                                    enjoys carving ice sculptures, of animals and of the other elves. She enjoys outdoor sports like skiing, snowboarding and playing hockey. Because of her creative sculpturing talent and love for ice sports, Santa attached an ice crystal to the back of her hat. Crystal is also responsible for Santa’s reindeer ‘Donner’.
                                </p>
                            </div>
                            <div id="inner-ten" class="inner elf-text">
                                <h2>Master Elf</h2>
                                <p>
                                   is the oldest of all the Workshop Elves and has the most experience in making toys. Santa put him in charge of the workshop and it’s his responsible for making sure that all the toys are of top quality and work properly, and that they are all ready in time for Santa’s Christmas Eve journey. Because of this, Santa gave him a small magnifying glass to inspect all the toys with. 
                                </p>
                            </div>
                            <div id="inner-eleven" class="inner elf-text">
                                <h2>The Wicked SnowKing</h2>
                                <p>
                                   lives in a cold dark Ice Palace on the other side of the glacier, which is guarded by his Ice Warriors. The Snow King is very cold hearted and evil and would like nothing more than to destroy Santa and the Workshop Elves, thus putting an end to Christmas forever! His relationship with Santa has been one of jealously and envy for many years. What the Workshop Elves don't know, is that the Wicked SnowKing is Santa’s brother. 
                                </p>
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
                    <div id="video-screen">
                        <video data-src="/assets/media/storyboard.mp4" playsinline loop controls>
                            <source data-src="/assets/media/storyboard.mp4" type="video/mp4"/>
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div id="video-envelope">
                    </div>
                    <div id="video-envelope-flap">
                    </div>
                    <div id="contact-info">
                        <img id="contact-info1" src="/assets/img/contact-info-1.png" />
                        <img id="contact-info2" src="/assets/img/contact-info-2.png" />
                        <img id="contact-info3" src="/assets/img/contact-info-3.png" />
                    </div>
                </div>
            </div>
        </section>

        <section id="ebook">
            <div class="sc-bg"></div>
            <div class="row expanded">
                <div class="small-12 medium-6 columns left">
                    <div id="title">
                        <h2>eBook & Hard Copy</h2>
                        <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <div id="button-holder">
                            <a id="preview-one" class="preview-button">Preview 1</a>
                            <a id="preview-two" class="preview-button">Preview 2</a>
                        </div>
                        <p id="music-preview">
                            Listen to music: <a id="like-a-star">Like a Star<span class="playing"></span></a> or <a id="on-christmas-eve">On Christmas Eve<span class="playing"></span></a><br>
                            <audio id="audio-track" controls>
                              <source src="/assets/media/audio-track.mp3" type="audio/mpeg">
                            </audio>
                            <audio id="audio-track2" controls>
                              <source src="/assets/media/on-christmas-eve.mp3" type="audio/mpeg">
                            </audio>
                             <address>contact: <a href="mailto:dave@workshopelves.com">dave@workshopelves.com</a></address>
                        </p>
                    </div>
                </div>
                <div class="small-12 medium-6 columns right">
                    <img id="ebook-cover" src="/assets/img/ebook-cover.jpg" />
                </div>
            </div>
            <div class="blue-blur"></div>
        </section>

        <!-- ebook preview modals -->
        <div id="modal-one" class="modal transition-opac" >
            <div class="modal-inner">
                <div class="close"></div>
                <video src="/assets/media/preview-one.mp4" playsinline loop controls>
                    <source src="/assets/media/preview-one.mp4" type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
        <div id="modal-two" class="modal transition-opac" >
            <div class="modal-inner">
                <div class="close"></div>
                <video src="/assets/media/preview-two.mp4" playsinline loop controls>
                    <source src="/assets/media/preview-two.mp4" type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>

    </div><!-- /content wrapper -->

    <?php //$this->insert('footer', $view_data ); ?>



</div><!-- /site wrapper -->




