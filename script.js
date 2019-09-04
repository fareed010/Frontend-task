// Navbar drop down script
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
}
// DOM variables 
var accordionTitle1 = document.querySelector(".accordion-title-1");
var panel1 = document.querySelector('.panel-1');
var accordionTitl2 = document.querySelector(".accordion-title-2");
var panel2 = document.querySelector(".panel-2");
var accordionTitle3 = document.querySelector(".accordion-title-3");
var panel3 = document.querySelector(".panel-3");
var accordionTitle4 = document.querySelector(".accordion-title-4");
var panel4 = document.querySelector(".panel-4");

// Recieving Data from json

var getRequest = new XMLHttpRequest();
getRequest.open('GET', 'data.json');
getRequest.onload = function(){
    var data = getRequest.responseText;
    var fileJson = JSON.parse(data);
    // calling UI function
    UI(fileJson);
};
getRequest.send();
// UI display function
function UI(JSONFILE){
    // section 1
    accordionTitle1.innerHTML = JSONFILE[0].title;
    panel1.innerHTML = JSONFILE[0].content;
    // section 2
    accordionTitl2.innerHTML = JSONFILE[1].title;
    panel2.innerHTML = JSONFILE[1].content;
    // section 3
    accordionTitle3.innerHTML = JSONFILE[2].title;
    panel3.innerHTML = JSONFILE[2].content;
    // section 4
    accordionTitle4.innerHTML = JSONFILE[3].title;
    panel4.innerHTML = JSONFILE[3].content;
}

var myAPP = myAPP || {};

myAPP.Accordion = function ( panelSelectorsObj ) { // e.g. function ({ heading: <String>, content: <String>})

    this.panels = []; // Master list of collapsable panels. Accessible publically e.g myAPP.accordionContainer.panels[0].select();
    this.panelSelectors = panelSelectorsObj; // an obj containing the panel selectors - { heading: <String>, content: <String>}
    this.accordionPanels = document.querySelectorAll( this.panelSelectors['heading'] );

    for (i = 0; i < this.accordionPanels.length; i++) {
        this.makePanel( this.accordionPanels[i], i );
    }
};

myAPP.Accordion.prototype = {

    // resetPanels() - used for unselecting/collapsing AccordionPanels
    resetPanels: function () {
        this.panels.forEach( function ( v ) {
            v.unselect();
        });
    },
    // makePanel( <HTMLElement>, <position index used for naming> ) - Spawns a new AccordionPanel and pushes it into the master list of AccordionPanels controlled by Accordian
    makePanel: function ( panelElement, index ) {
        var panel = new myAPP.AccordionPanel( panelElement, this, index );
        this.panels.push( panel );
    }
};

myAPP.AccordionPanel = function ( headingEl, panelHolder, index ) {
    // The AccordionPanel Class controls each of the collapsable panels spawned from Accordion Class
    var self = this;

    this.panelHolder = panelHolder;
    this.index = index;
    this.headingEl = headingEl; // this is the clickable heading
    this.contentEl = headingEl.nextElementSibling;//headingEl.querySelector( this.panelHolder.panelSelectors['content'] );
    this.isSelected = false;

    this.setupAccessibility();

    this.headingEl.addEventListener( "click", function () {

        if (self.isSelected){
            self.unselect(); // already open, presume user wants it closed
        }
        else {
            self.panelHolder.resetPanels(); // close all panels
            self.select(); // then open desired panel
        }

    });

    return this;
};

myAPP.AccordionPanel.prototype = {

    setupAccessibility: function(){
        this.headingEl.setAttribute( 'role', 'tab' );
        this.headingEl.setAttribute( 'aria-selected', 'false' );
        this.headingEl.setAttribute( 'id', 'accordionHeading_' + this.index );
        this.headingEl.setAttribute( 'aria-controls', 'accordionContent_' + this.index );
        this.headingEl.setAttribute( 'tabindex', '0' );
        this.headingEl.setAttribute( 'aria-expanded', 'false' ); // dynamic html attribute

        this.contentEl.setAttribute( 'id', 'accordionContent_' + this.index );
        this.contentEl.setAttribute( 'aria-labelledby', 'accordionHeading_' + this.index );
        this.contentEl.setAttribute( 'role', 'tabpanel' );
        this.contentEl.setAttribute( 'tabindex', '0' );
        this.contentEl.setAttribute( 'aria-hidden', 'true' ); // dynamic html attribute
    },
    select: function () {
        var self = this;
        this.isSelected = true;

        this.headingEl.classList.add('active');
        this.headingEl.setAttribute( 'aria-expanded', 'true' );
        this.headingEl.setAttribute( 'aria-selected', 'true' );

        this.contentEl.classList.add('active');
        this.contentEl.setAttribute( 'aria-hidden', 'false' );
        setTimeout(function(){
            self.contentEl.focus();
        }, 1000); // wait for animation to finish before shifting focus (Don't need to - just looks nicer)

    },
    unselect: function () {
        this.isSelected = false;

        this.headingEl.classList.remove('active');
        this.headingEl.setAttribute( 'aria-expanded', 'false' );
        this.headingEl.setAttribute( 'aria-selected', 'false' );

        this.contentEl.classList.remove('active');
        this.contentEl.setAttribute( 'aria-hidden', 'true' );
    }
};

myAPP.init = function () {

    // Create Accordian instance and turn all elements with class '.accordion-panel' into AccordianPanel Class intances.
    this.accordionContainer = new myAPP.Accordion({
        heading:    '.accordion-panel__heading',
        content:    '.accordion-panel__content'
    }); //  store the panel selectors in Accordian Class - Accordion( { heading: <String>, content: <String>} )

    // Select second panel
    this.accordionContainer.panels[1].select(); // or myAPP.accordionContainer.panels[0].select();
};

window.onload = function () {
    myAPP.init();
};
// image slider
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("d00t");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" actives", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " actives";
}
