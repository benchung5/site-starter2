/* ==========================================================================
// fooslider
========================================================================== */

const fooSlider = function() {
  var FooSlider = {
    animations: {
      carousel: {
        from: {},
        to: {
          transform: "translate(0, 0px)",
          autoAlpha: 1,
          ease: Power2.easeInOut,
          // zIndex: 1,
        }
       },
       fadeIn: {
        from: {
          transform: "translate(0, 0px)"
        },
        to: {
          autoAlpha: 1,
          ease: Power2.easeInOut,
          // zIndex: 1,
        }
      }
    },


    //check for non null values in array
    otherThanNull: function(myArray) {
      var isValid = myArray.some(function (item) {
          return item !== null;
      });
      return isValid;
    },

    initPositions: function() {
      //just set it to first one for now
      //remember current is in an array to 2 = 3
      this.current = 0;

      //init with first slide at initial position
      this.boxes[this.current].style.transform = "translate(0, 0px)";
      $(this.boxes[this.current]).addClass('current');

      //move boxes into correct position
      for (var i = 0; i < this.boxes.length; i++) {
        if(i < this.current) {
          if(this.animStyle === 'carousel') { 
            //move prev boxes to above
            this.boxes[i].style.transform = "translate(0, " + (-this.moveAmount) + "px)"; 
          }
          $(this.boxes[i]).removeClass('current');
        }

        if(i > this.current) {
          if(this.animStyle === 'carousel') {
            //move next boxs to below
            this.boxes[i].style.transform = "translate(0, " + (this.moveAmount) + "px)"
          };
          $(this.boxes[i]).removeClass('current');
        }
      }
    },

    setPositions: function() {
      //loop through all boxes every time setPositions is called
      //move all boxes into correct position...
      for (var i = 0; i < this.boxes.length; i++) {
        //move if it's the current one, move it to zero from wherever it is
        if(i === this.current) {
          this.animateIn(this.boxes[i]);
        }
        //if loopback and it's going back to the first slide animate the prev slide as if going forward
        if(this.isLoopBack && (this.current === 0) && (i === (this.boxes.length - 1))) {
          //move prev box to above
          this.animate(this.boxes[i], i, 'prev');
        }
        //if prev
        else if(i < this.current) {
          //move prev box to above
          this.animate(this.boxes[i], i, 'prev');
        }
        //if next
        else if(i > this.current) {
          //move next boxes to below
          this.animate(this.boxes[i], i, 'next');
        }
      }   
    },

    goTo: function(position) {
      if(this.otherThanNull(this.boxes)) {
       if (position <= 0 ){
          //can't slide past beginning
        } else if (position > (this.boxes.length)) {
          //go back to first slide
          this.current = 0;
          this.setPositions();
        }
        else {
          //convert to array system
          this.current = (position - 1 );
          this.setPositions();
        }
      }
    },

    move: function(direction) {
      if(this.canSlide  && this.otherThanNull(this.boxes)) {
        //increment current
        if (direction === "prev" && this.current > 0) {
          this.current--;
        } else if (direction === "next") {
          if (this.current < (this.boxes.length - 1)) {
            this.current++;
          } else if (this.isLoopBack) {
            //loop back to first slide if reached the end
            this.current = 0;
          }
        } 
        this.setPositions();
      }
    },

    animate: function(el, index, direction) {
      var moveAmount = null;
      if(direction === 'prev') {
        moveAmount = -this.moveAmount;
      } else if(direction === 'next') {
        moveAmount = this.moveAmount;
      }

      //*only move box if its previously current
      if($(this.boxes[index]).hasClass('current')) {
        //lock slider while animating
        this.canSlide = false;

        TweenLite.to(el, this.slideSpeed, { 
            transform: "translate(0, " + moveAmount + "px)",
            autoAlpha: 0,
            // zIndex: 0,
            ease: Power2.easeInOut,
            onComplete: this.onAnimInComplete.bind(this),
         });
        $(this.boxes[index]).removeClass('current');
      }
    },

    animateIn: function (el) {
      TweenLite.fromTo(el, this.slideSpeed, 
        this.animations[this.animStyle].from, this.animations[this.animStyle].to, this.onAnimInComplete);
      $(this.boxes[this.current]).addClass('current');
    },

    onAnimInComplete: function() {
      //transition complete
      //unlock slider
      this.canSlide = true;
      //callback function
      if(this.onAnimComlete) {
        this.onAnimComlete();
      }
    },

    initControls: function() {
      var prevControls = [].slice.call(document.querySelectorAll('.fs-prev'));
      if(this.otherThanNull(prevControls)) {
        for(var i = 0; i < prevControls.length; i++) {
          prevControls[i].addEventListener('click', function(e) {
            this.move('prev');
          }.bind(this));
        }
      }

      var nextControls = [].slice.call(document.querySelectorAll('.fs-next'));
      if(this.otherThanNull(nextControls)) {
        for(var i = 0; i < nextControls.length; i++) {
          nextControls[i].addEventListener('click', function(e) {
            this.move('next');
          }.bind(this));
        }
      }
    },

    init: function(options) {
        var inst = Object.create(this);
        inst.slideSpeed = options.slideSpeed || 0.5;
        inst.animStyle = options.animStyle || 'carousel';
        inst.onAnimComlete = options.onAnimComplete;
        inst.isLoopBack = options.isLoopBack;
        inst.current = 0;
        inst.canSlide = true;
        inst.boxes = [].slice.call(document.querySelectorAll(".fooslider .slide"));
        inst.container = document.querySelector('.fooslider');

        if(inst.otherThanNull(inst.boxes)) {
          inst.moveAmount = 0;
          if(inst.container) {
            inst.moveAmount = inst.container.clientHeight;
          }

          inst.initPositions();
          inst.initControls();
        }//if bo
        else {
          //console.warn('there is no foo slider');
        }
        return inst;
    },
  }

  var mySlider = FooSlider.init({
    slideSpeed: 1,
    animStyle: 'fadeIn',
    onAnimComplete: onSlideComplete,
    isLoopBack: true
    //animStyle: 'carousel',
  });

  function onSlideComplete() {
    //console.log('slide complete');
  }

  //set clider position through code
  // mySlider.goTo(5);
}

export default fooSlider;