Guestbook = new Mongo.Collection("guestbook");
Guestbook.attachSchema(new SimpleSchema({
    author: {
        type: String,
        label: 'Name'
    },
    message: {
        type: String,
        label: 'Message',
        autoform: {
            rows: 10
        }
    }
}));

Site = new Mongo.Collection("site");
Site.attachSchema(new SimpleSchema({
    person: {
        type: Object,
        label: "Deceased"
    },
    'person.name': {
        type: String,
        label: "Name",
    },
    'person.about': {
        type: String,
        label: "About",
        max: 2000,
        autoform: {
            rows: 10,
            placeholder: "Short description"
        }
    },
    'person.yob': {
        type: Number,
        label: "Year of birth",
        optional: true,
        min: 1900,
        max: 2015
    },
    'person.yod': {
        type: Number,
        label: "Year of death",
        optional: true,
        min: 1900,
        max: 3000
    },


    wake: {
        type: Object,
        label: "Wake",
        optional: true
    },
    'wake.details': {
        type: String,
        label: "Wake Information",
        autoform: {
            rows: 10,
            value: "Date: __/__/____ - __/__/____ \n Location"
        }
    },
    'wake.location': {
        type: String,
        autoform: {
            type: 'map',
            afFieldInput: {
                type: 'map',
                geolocation: true,
                searchBox: true,
                autolocate: true,
                mapType: 'roadmap',
                searchBox: true,
                width: '500px',
                height: '500px'
            }
        }
    },

    funeral: {
        type: Object,
        label: "Funeral",
        optional: true
    },
    'funeral.details': {
        type: String,
        label: "Funeral Information",
        autoform: {
            rows: 10,
            value: "Date:\nTime:",
            width: '300px;'
        }
    },
    'funeral.location': {
        type: String,
        autoform: {
            type: 'map',
            afFieldInput: {
                type: 'map',
                geolocation: true,
                searchBox: true,
                autolocate: true,
                mapType: 'roadmap',
                searchBox: true,
                width: '300px'
            }
        }
    },

    contact_email: {
        type: String,
        label: "Contact Email",
        regEx: SimpleSchema.RegEx.Email
    }

}));


Router.route('/', function() {
    this.render('nav', {
        data: function() {
            return {}
        }
    });
});

Router.route('/create', function() {
    this.render('create');
});


if (Meteor.isClient) {

    Template.guestbook.events({
        'click': function() {
            // ...
        }
    });


    Template.guestbook.helpers({
        guestBookEntry: function() {
            return Guestbook.find({});
        }
    });
    Template.guestbook.rendered = function() {

    };


    Template.gallery.events({
        'click': function() {
            // ...
        }
    });

    Template.gallery.rendered = function() {

    };


    Template.donation.events({
        'click': function() {
            // ...
        }
    });

    Template.donation.rendered = function() {

    };

    Template.donation.helpers({

    })





    Meteor.startup(function() {
        var Page = (function() {

            var $container = $('#container'),
                $bookBlock = $('#bb-bookblock'),
                $items = $bookBlock.children(),
                itemsCount = $items.length,
                current = 0,
                bb = $('#bb-bookblock').bookblock({
                    speed: 800,
                    perspective: 2000,
                    shadowSides: 0.8,
                    shadowFlip: 0.4,
                    onEndFlip: function(old, page, isLimit) {

                        current = page;
                        // update TOC current
                        updateTOC();
                        // updateNavigation
                        updateNavigation(isLimit);
                        // initialize jScrollPane on the content div for the new item
                        setJSP('init');
                        // destroy jScrollPane on the content div for the old item
                        setJSP('destroy', old);

                    }
                }),
                $navNext = $('#bb-nav-next'),
                $navPrev = $('#bb-nav-prev').hide(),
                $menuItems = $container.find('ul.menu-toc > li'),
                $tblcontents = $('#tblcontents'),
                transEndEventNames = {
                    'WebkitTransition': 'webkitTransitionEnd',
                    'MozTransition': 'transitionend',
                    'OTransition': 'oTransitionEnd',
                    'msTransition': 'MSTransitionEnd',
                    'transition': 'transitionend'
                },
                transEndEventName = transEndEventNames[Modernizr.prefixed('transition')],
                supportTransitions = Modernizr.csstransitions;

            function init() {

                // initialize jScrollPane on the content div of the first item
                setJSP('init');
                initEvents();

            }

            function initEvents() {

                // add navigation events
                $navNext.on('click', function() {
                    bb.next();
                    return false;
                });

                $navPrev.on('click', function() {
                    bb.prev();
                    return false;
                });

                // add swipe events
                $items.on({
                    'swipeleft': function(event) {
                        if ($container.data('opened')) {
                            return false;
                        }
                        bb.next();
                        return false;
                    },
                    'swiperight': function(event) {
                        if ($container.data('opened')) {
                            return false;
                        }
                        bb.prev();
                        return false;
                    }
                });

                // show table of contents
                $tblcontents.on('click', toggleTOC);

                // click a menu item
                $menuItems.on('click', function() {

                    var $el = $(this),
                        idx = $el.index(),
                        jump = function() {
                            bb.jump(idx + 1);
                        };

                    current !== idx ? closeTOC(jump) : closeTOC();

                    return false;

                });

                // reinit jScrollPane on window resize
                $(window).on('debouncedresize', function() {
                    // reinitialise jScrollPane on the content div
                    setJSP('reinit');
                });

            }

            function setJSP(action, idx) {

                var idx = idx === undefined ? current : idx,
                    $content = $items.eq(idx).children('div.content'),
                    apiJSP = $content.data('jsp');

                if (action === 'init' && apiJSP === undefined) {
                    $content.jScrollPane({
                        verticalGutter: 0,
                        hideFocus: true
                    });
                } else if (action === 'reinit' && apiJSP !== undefined) {
                    apiJSP.reinitialise();
                } else if (action === 'destroy' && apiJSP !== undefined) {
                    apiJSP.destroy();
                }

            }

            function updateTOC() {
                $menuItems.removeClass('menu-toc-current').eq(current).addClass('menu-toc-current');
            }

            function updateNavigation(isLastPage) {

                if (current === 0) {
                    $navNext.show();
                    $navPrev.hide();
                } else if (isLastPage) {
                    $navNext.hide();
                    $navPrev.show();
                } else {
                    $navNext.show();
                    $navPrev.show();
                }

            }

            function toggleTOC() {
                var opened = $container.data('opened');
                opened ? closeTOC() : openTOC();
            }

            function openTOC() {
                $navNext.hide();
                $navPrev.hide();
                $container.addClass('slideRight').data('opened', true);
            }

            function closeTOC(callback) {

                updateNavigation(current === itemsCount - 1);
                $container.removeClass('slideRight').data('opened', false);
                if (callback) {
                    if (supportTransitions) {
                        $container.on(transEndEventName, function() {
                            $(this).off(transEndEventName);
                            callback.call();
                        });
                    } else {
                        callback.call();
                    }
                }

            }

            return {
                init: init
            };

        })();

        Page.init();
    });
}
