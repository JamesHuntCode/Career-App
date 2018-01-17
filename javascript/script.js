$(document).ready(function() {
    // Tracking when to fire certain events
    $(document).scroll(function() {
        // Check if skills are visible by user
        if(checkIfOnScreen($('#professional-skillset'))) {
            revealSkills();
        }
        // Check if recent projects are visible by user

    });

    // Method to check if a certain element is visible to the user
    var checkIfOnScreen = function(elem) {
        var currentPos = elem.offset();
        var currentTop = currentPos.top - $(window).scrollTop();
        var screenHeight = $(window).height();

        return (currentTop > screenHeight) ? false : true;
    }

    // NAVIGATION BAR
    $('#nav-bar a').hover(function() {
        $(this).animate({color: '#808080'}, 200);
    }, function() {
        $(this).animate({color: '#ffffff'}, 200);
    });
    // END OF NAVIGATION BAR

    // SUMMARY (SLIDESHOW)

    // Prepare content for slideshow
    $('#left').addClass('active');
    $('#center').addClass('not-active');
    $('#right').addClass('not-active');

    $('#website-slide-content h1').hide();
    $('#website-slide-content h3').hide();

    $('#website-slide-content h1').slideDown(1000);
    $('#website-slide-content h3').delay(1000).slideDown(1000);

    $('#coding-slide-content h1').hide();
    $('#coding-slide-content h3').hide();

    $('#minigame-slide-content h1').hide();
    $('#minigame-slide-content h3').hide();

    // Main slideshow method
    var slideshow = function(topSlide, middleSlide, bottomSlide) {
        // Method to show the top slide
        var showTopSlide = function() {
            topSlide.fadeIn(1000);
            middleSlide.fadeIn(2000);
            bottomSlide.fadeIn(2000);

            // Change slide controls
            setSelectedControlTo('#left');
            setNoLongerSelectedTo('#center', '#right');
        }

        // Method to show the middle slide
        var showMiddleSlide = function() {
            topSlide.fadeOut(1000);
            middleSlide.fadeIn(1000);
            bottomSlide.fadeIn(1000);

            // Introduce content
            $('#coding-slide-content h1').slideDown(1000);
            $('#coding-slide-content h3').delay(1000).slideDown(1000);

            // Change slide controls
            setSelectedControlTo('#center');
            setNoLongerSelectedTo('#left', '#right');
        }

        // Method to show the bottom slide
        var showBottomSlide = function() {
            topSlide.fadeOut(1000);
            middleSlide.fadeOut(1000);
            bottomSlide.fadeIn(1000);

            // Introduce content
            $('#minigame-slide-content h1').slideDown(1000);
            $('#minigame-slide-content h3').delay(1000).slideDown(1000);

            // Change slide controls
            setSelectedControlTo('#right');
            setNoLongerSelectedTo('#left', '#center');
        }

        var counter = 1;

        // Method to auto-change slides
        var changeSlides = function() {
            if (counter === 1) {
                showTopSlide();
                counter = 2;
            } else if (counter === 2) {
                showMiddleSlide();
                counter = 3;
            } else if (counter == 3) {
                showBottomSlide();
                counter = 1;
            }
        }
        var slideshowTimer = setInterval(changeSlides, 7000);

        // Only show controls when user hovers over slideshow
        var slideControls = [$('#left'), $('#center'), $('#right')];

        for (let i = 0; i < slideControls.length; i++) {
            slideControls[i].css('opacity', 0);
        }

        var offsetEase;
        var looping = false;

        $('#summary').hover(function() {
            if (!looping) { offsetEase = 0 };
            for (let i = 0; i < slideControls.length; i++) {
                slideControls[i].delay(offsetEase).animate({opacity: '1'}, 400);
                offsetEase += 100;
                looping = true;
            }
            looping = false;
        }, function() {
            offsetEase = 0;
            for (let i = 0; i < slideControls.length; i++) {
                slideControls[i].delay(offsetEase).animate({opacity: '0'}, 400);
                offsetEase += 100;
            }
        })

        // Handle user request to change slide
        $('.slideshow-control-button').on('click', function() {
            if ($(this).is('#left')) {
                showTopSlide();
                setSelectedControlTo('#left');
                setNoLongerSelectedTo('#center', '#right');
                clearInterval(slideshowTimer);
                counter = 1;
            } else if ($(this).is('#center')) {
                showMiddleSlide();
                setSelectedControlTo('#center');
                setNoLongerSelectedTo('#left', '#right');
                clearInterval(slideshowTimer);
                counter = 2;
            } else {
                showBottomSlide();
                setSelectedControlTo('#right');
                setNoLongerSelectedTo('#left', '#center');
                clearInterval(slideshowTimer);
                counter = 3;
            }
        });

        // Method to change selected slideshow control
        var setSelectedControlTo = function(applyControlTo) {
            var changeMe = $(applyControlTo);

            changeMe.addClass('active');
            changeMe.removeClass('not-active');
        }

        // Method to remove focus from previously selected slideshow controls
        var setNoLongerSelectedTo = function(elem1, elem2) {
            var elemToChange1 = $(elem1);
            var elemToChange2 = $(elem2);

            elemToChange1.addClass('not-active');
            elemToChange1.removeClass('active');

            elemToChange2.addClass('not-active');
            elemToChange2.removeClass('active');
        }
    }

    // Initiate slideshow
    var minigameSlide = $('#minigames');
    var codingSlide = $('#coding-passion');
    var websiteSlide = $('#stunning-websites');
    slideshow(websiteSlide, codingSlide, minigameSlide);

    // Link leading user to my github profile
    $('.slideshow-content a').hover(function () {
        $(this).animate({color: '#808080'}, 200);
    }, function() {
        $(this).animate({color: '#ffffff'}, 200);
    });
    // END OF SUMMARY (SLIDESHOW)

    // ABOUT && SKILLSET

    $('.github-repo-link').hover(function () {
        $(this).animate({color: '#808080'}, 200);
    }, function() {
        $(this).animate({color: '#333'}, 200);
    });

    // Prepare document for reveal of skills on scroll
    var topSkillLogos = [$('#c-sharp-logo'), $('#javascript-logo'), $('#sql-logo')];
    var topSkillHeaders = [$('#c-sharp-header'), $('#javascript-header'), $('#sql-header')];
    var topSkillSummaries = [$('#c-sharp-summary'), $('#javascript-summary'), $('#sql-summary')];
    var topGitLinks = [$('#c-sharp-link'), $('#js-link'), $('#sql-link')];

    var bottomSkillLogos = [$('#processing-logo'), $('#html-css-logo'), $('#p5-logo')];
    var bottomSkillHeaders = [$('#processing-header'), $('#html-css-header'), $('#p5-header')];
    var bottomSkillSummaries = [$('#processing-summary'), $('#html-css-summary'), $('#p5-summary')];
    var bottomGitLinks = [$('#processing-link'), $('#html-css-link'), $('#p5-link')];

    var allSkillBasedContent = [topSkillLogos, topSkillHeaders, topSkillSummaries, topGitLinks, bottomSkillLogos, bottomSkillHeaders, bottomSkillSummaries, bottomGitLinks];

    // Keep skillset content hidden initially
    for (let i = 0; i < allSkillBasedContent.length; i++) {
        for (let j = 0; j < allSkillBasedContent[i].length; j++) {
            allSkillBasedContent[i][j].css('opacity', 0);
        }
    }

    // Method to reveal skill set to user
    var revealSkills = function() {
        // Dynamic reveal of skills on scroll
        var interval = 0;

        var fadeReveal = function(elements) {
            for (let i = 0; i < elements.length; i++) {
                elements[i].delay(interval).animate({opacity: '1'}, 500);
                interval += 100;
            }
        }

        // Start cycle
        for (let i = 0; i < allSkillBasedContent.length; i++) {
            fadeReveal(allSkillBasedContent[i]);
        }
    }

    // END OF ABOUT && SKILLSET

    // MY RECENT PROJECTS

    // Code handling the user requesting to see more projects
    $('#bottom-4-projects').hide();

    var currentContent = $('#direct-user-down').text();

    $('#drop-down-button').on('click', function() {
        $(this).toggleClass('rotated');
        // Dynamically change user instructions
        if (currentContent.toLowerCase() === "want to see more? click below!") {
            $('#direct-user-down').html("Click again to hide extra content.");
            currentContent = "Click again to hide content.";
        } else {
            $('#direct-user-down').html("Want to see more? Click below!");
            currentContent = "Want to see more? Click below!";
        }
        $('#bottom-4-projects').slideToggle(800);
    });

    $('#view-all a').hover(function() {
        $(this).animate({color: '#808080'}, 200);
    }, function() {
        $(this).animate({color: '#333'}, 200);
    });

    // END OF MY RECENT PROJECTS

    // FOOTER

    $('#footer a').hover(function() {
        $(this).animate({color: '#808080'}, 200);
    }, function() {
        $(this).animate({color: '#ffffff'}, 200);
    });

    // END OF FOOTER
});
