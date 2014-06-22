'use strict';
var app = app || {
    ui: {
        emailModal: {}
    },
    projects: {},
    trivia: {
        mta: {}
    },
    security: {}
};
app.projects = (function(CallinaryArts, projectsJson) {
    function init() {
        $(function() {
            var projects = CallinaryArts.Templates.project(projectsJson);
            $('#projects').append(projects);
            app.trivia.mta.init();
            app.trivia.offRoad.init();
        });
    }
    return {
        data: projectsJson,
        init: init
    };
})(window.CallinaryArts, window.projectsJson);
if ($('body').hasClass('page-home')) {
    app.projects.init();
}
app.security.decodeAddress = function(phraseString) {
    var step1 = phraseString.replace(/[a-zA-Z]/g, function(c) {
        return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
    var step2 = step1.replace(/~/g, '@');
    var step3 = step2.replace(/`/g, '.');
    return step3;
};
app.ui.emailModal.show = function(address) {
    var $modal = $('.modal'),
        $input = $('input', $modal),
        $mailTo = $('a', $modal);
    $modal.addClass('active');
    $input.val(address).select();
    $mailTo.attr('href', 'mailto:' + address);
};
app.ui.emailModal.hide = function() {
    var $modal = $('.modal');
    $modal.removeClass('active');
};

app.ui.lazyload = function() {
    if ($('img.lazy').length) {
        $('img.lazy').show().lazyload({
            threshold: 500,
            effect: 'fadeIn'
        });
    }
};

$(function() {
    if (location.search === '?goto=projects') {
        app.ui.scrollTo('#projects');
    }
    $('[data-scroll-to]').on('click', function(e) {
        e.preventDefault();
        app.ui.scrollTo(this.getAttribute('data-scroll-to'));
        var $elm = $(e.target);
        if ($elm.hasClass('button')) {
            var originalText = $elm.text(),
                temporaryText = 'Wooo yeah!';
            $elm.text(temporaryText);
            setTimeout(function() {
                $elm.text(originalText);
            }, 600);
        }
    });
        
    $('[data-email-modal-toggle]').on('click', function() {
        var code = $(this).attr('data-email-modal-toggle'),
            address = app.security.decodeAddress(code);
        app.ui.emailModal.show(address);
    });
    $('.modal').on('click', 'input', function() {
        $(this).select();
    });
    $('.background-overlay, .icon', '.modal').on('click', function() {
        app.ui.emailModal.hide();
    });
    $(document).keyup(function(e) {
        // ESC key
        if (e.keyCode === 27) {
            app.ui.emailModal.hide();
        }
    });
    app.ui.lazyload();
});
app.ui.scrollTo = function(selector) {
    var $elm = $(selector),
        elmTop = $elm.offset().top;
    $('html,body').animate({
        scrollTop: elmTop
    }, 600, 'easeInQuad');
};
app.ui.greeting = (function() {
    var date = new Date(),
        hour = date.getHours();

    function init() {
        if (hour >= 17) {
            setGreeting('Good evening!');
        } else if (hour >= 12) {
            setGreeting('Good afternoon!');
        } else if (hour >= 5) {
            setGreeting('Good morning!');
        } else {
            setGreeting('Hello there!');
        }
    }

    function setGreeting(message) {
        document.querySelector('.greeting').innerHTML = message;
    }
    return {
        init: init
    };
})();
if ($('body').hasClass('page-home')) {
    app.ui.greeting.init();
}
app.trivia.mta = (function() {
    var whitelist, colors, circles, circlesContainer;

    function checkInput(input) {
        var val = input.value.toString().toUpperCase(),
            idx = whitelist.indexOf(val);
        if (val.length && idx > -1) {
            circles[idx].innerHTML = val;
            circles[idx].setAttribute('data-color', colors[idx]);
            input.value = '';
            circlesContainer.setAttribute('data-animation', false);
        }
    }

    function init() {
        whitelist = '1234567ACEBDFMGJZLSNQR';
        colors = ['red', 'red', 'red', 'green', 'green', 'green', 'purple', 'blue', 'blue', 'blue', 'orange', 'orange', 'orange', 'orange', 'lime', 'brown', 'brown', 'gray', 'gray', 'yellow', 'yellow', 'yellow'];
        circles = document.querySelectorAll('.mta .circle');
        circlesContainer = document.querySelector('.mta .circles');
    }
    return {
        init: init,
        checkInput: checkInput
    };
})();
app.trivia.offRoad = (function() {
    var $container, $buttons, $message, facts;

    function toggleAnswer(choice) {
        var fact = facts[choice.toLowerCase()];
        if (fact !== undefined) {
            $message.text(fact.description).addClass('active').attr('data-valid', fact.value);
        }
    }

    function init() {
        $container = $('.trivia.off-road');
        $buttons = $('.button', $container);
        $message = $('.message', $container);
        facts = {
            'a': {
                value: false,
                description: 'NOPE. Rice was made in China.'
            },
            'b': {
                value: false,
                description: 'NOPE. Noodles were made in China.'
            },
            'c': {
                value: true,
                description: 'YES! Fortune cookies have origins in Japan and were first produced in California.'
            },
            'd': {
                value: false,
                description: 'NOPE. The first alcoholic beverage was found in China.'
            }
        };
        $('input', $container).on('change', function() {
            $buttons.removeClass('checked');
            $(this).closest('.button').addClass('checked');
            toggleAnswer($(this).val());
        });
    }
    return {
        init: init
    };
})();
/*
$(function() {
    'use strict';
    // Move each project up
    // For every pixel scrolled from the top, 
    // move project 1/3 of that amount
    
    // Detect request animation frame
    var scroll = window.requestAnimationFrame ||
                 window.webkitRequestAnimationFrame ||
                 window.mozRequestAnimationFrame ||
                 window.msRequestAnimationFrame ||
                 window.oRequestAnimationFrame ||
                 // IE Fallback, you can even fallback to onscroll
                 function(callback){ window.setTimeout(callback, 1000/60); };

    var lastPosition = -1;

    app.ui.translateProjects = function() {
        if (lastPosition === window.pageYOffset) {
            scroll( app.ui.translateProjects );
            return false;
        } else {
            lastPosition = window.pageYOffset;
        }

        var scrollTop = window.pageYOffset,
            projectDelta = parseInt(scrollTop/-10),
            $projects = $('.text');

        $projects.css({
            '-webkit-transform': 'translate3d(0,' + projectDelta + 'px, 0)',
            '-moz-transform': 'translate3d(0,' + projectDelta + 'px, 0)',
            'transform': 'translate3d(0,' + projectDelta + 'px, 0)'
        });

        scroll( app.ui.translateProjects );
    };

    app.ui.translateProjects();
});
*/