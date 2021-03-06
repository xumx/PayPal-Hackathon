JUSTGIVING_ENDPOINT = 'https://api.justgiving.com/54d08cef';

Action = {
    print: function() {
        html2canvas([document.getElementById('item1'), document.getElementById('item2'), document.getElementById('item4')], {
            onrendered: function(canvas) {
                var win = window.open();
                win.document.write("<br><img src='" + canvas.toDataURL() + "'/>");
                win.print();
            }
        });
    },
    clear: function() {
        Meteor.call('clear');
    },
    quickFill: function() {
        Site.insert({
            "person": {
                "name": "Winston Koh",
                "about": "In memory of Winston Koh, Professor of Economics, husband, father and friend, whose zest for life was captured in his numerous and diverse endeavours.",
                "yob": 1963,
                "yod": 2013
            },
            "funeral": {
                "details": "The wake will be held from 8:00am - 10:30pm on 22 March (Fri) and 7:30am - 1:00pm on 23 March (Sat).\nThe memorial service will be on 23 March (Sat) at 2:00pm.\nBoth the wake and memorial service will be held at Church of St. Mary of the Angels, 5 Bukit Batok East Avenue 2, Singapore 659918. More details on the venue will be announced closer to the date.",
                "location": "1.3471332339368238,103.75942513346672"
            },
            "contact_email": "avgb@Singapore.com",
            "charity": {
                "charityId": "11494",
                "name": "The Fire Fighters Charity",
                "registrationNumber": "1093387",
                "description": "Every 30 seconds in the UK fire fighters are called to an incident, risking their lives to save others, but sadly they often sustain physical injuries whilst carrying out their duties.\n\nThe Fire Fighters Charity is here for fire fighters during their times of need. The Charity offers vital support services across the UK for all fire fighters, assisting in excess of 17,500 individuals every year.\n\nOur modern, dynamic and award-winning charity has three UK centres, located in Cumbria, Devon and West Sussex, which provide therapy, rehabilitation and recuperation facilities. Our pioneering Beneficiary Support Services offers local and remote assistance to fire service personnel in need nationwide – providing solutions to real life problems.\n\nIt costs over £9 million every year to keep the Charity running, and with no government funding, we are completely reliant upon donations and fundraising, so your support is very much needed.\n\nTo find out more, please visit www.firefighterscharity.org.uk.",
                "logoFileName": "",
                "logoUrl": "",
                "countryCode": "GB"
            },
            "contact": {
                "name": "Winston's family",
                "phone": "+6582888399",
                "email": "mary@gmail.com"
            }
        });

        Guestbook.insert({
            author: 'Andrea Koh',
            message: 'The years following were whirlwind ones for Winston and our Cohort – they have passed so swiftly many of us wonder where have they gone. The children grew up from the days we would hold kids’ birthday parties as an excuse for us parents to get together and have a mini-reunion; our children became young adults, accomplished in their own right – just witness this in Melissa and Andrea. Several years ago, as one by one we started to pass the age of 40 and as a reminder of our mortality, our Cambridge year started to meet annually. We generously extended this invitation to our Oxford counterparts. Winston was always one of the first to respond to the email can you make this or other date, vying for first place with another dear friend based in Hong Kong! These gatherings were organised and made painless and seamless by another dear friend, a “national treasure”, who has been key to rounding up our Cohort each year, and who has been key to joining us up on this occasion. In the course of these gatherings, where we would tuck into Singapore’s gastronomic delights, chicken rice, otak, chilli crab, while reminiscing over stodgy English food, CCF houseparties, long ago times when we were young and 10 kg lighter, Winston would amaze us with stories of his travels, sporting achievements, ball room dancing prowess and athleticism. At the time I thought – Winston seemed to grow younger every year we met, with a new tale of adventure, a new skill mastered, a new challenge he wanted to conquer – you felt so energised in his company!'
        });

        Guestbook.insert({
            author: 'Mathew',
            message: 'As every superhero lives a double life, for me, my dad wasn’t just the athletic sportsman, the intelligent, eloquent professor, or even the charismatic dancer who looks just a little too young for his age. To me, my dad’s double life was well, the life of being my dad. I often find that is the little things people do that let us see the greatness in them. My dad would always crack lame jokes that sometimes didn’t make sense and would leave us all with quizzical expressions plastered on our faces, save for him, who would be chuckling as if he was the funniest person in the world (In his mind at least) or doing little funny things like making song parodies in a strange operatic rendition. And of course, little things like reminding me to take my vitamin c, saying “Hi Andie!” when he came home from work, telling me not to sleep too late those little things made me remember that there\'s always someone there rooting for me, to keep going , and to not give up. And when I faced a time when it seemed like everyone was against me and I felt so alone in the world, my dad supported me and always used to say "Who bully you? I\'ll beat them up for you.\" That made me feel more strong and protected than anything else in the world, it made me remember that I had my very own superhero constantly giving me superhuman strength to carry on in my life, no matter how hard it seemed to be. Even when he had our arguments, I knew my dad meant the best for me, and sacrificed so much just for my own good. Just like any superhero would, my dad would always put others first, and wanted to protect others at any cost.'
        });
    },
    justgiving: function() {},
    hoiio: function(numbers) {
        // numbers should be an array.
        Meteor.call('hoiio.sms', function(error, result) {
            console.log(result);
        });
    }
}

Guestbook = new Mongo.Collection("guestbook");
Guestbook.attachSchema(new SimpleSchema({
    message: {
        type: String,
        autoform: {
            placeholder: 'Message:',
            rows: 10
        }
    },
    author: {
        type: String,
        // label: "",
        autoform: {
            placeholder: "Name:",
            afFieldInput: {
                class: 'underline'
            }
        }
    }
}));

Site = new Mongo.Collection("site");
Site.attachSchema(new SimpleSchema({
    person: {
        type: Object,
        label: "Personal Details"
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
            rows: 3,
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
    funeral: {
        type: Object,
        label: "Funeral details",
        optional: true
    },
    'funeral.details': {
        type: String,
        label: "Information",
        autoform: {
            rows: 10
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
                height: '500px'
            }
        }
    },

    charity: {
        type: Object,
        blackbox: true,
        optional: true,
        autoform: {
            omit: true
        }
    },

    contact: {
        type: Object,
        label: "Contact Person"
    },
    'contact.name': {
        type: String,
        label: "Name:",
        optional: true
    },
    'contact.phone': {
        type: String,
        label: "Phone Number:",
        optional: true
    },
    'contact.email': {
        type: String,
        label: "Email:",
        regEx: SimpleSchema.RegEx.Email,
        optional: true
    }

}));


Router.route('/', function() {
    this.render('landing');
});

Router.route('/landing', function() {
    this.render('landing');
});

Router.route('/create', function() {
    this.render('create');
});

Router.route('/upload', function() {
    this.render('upload');
});

Router.route('/charity', function() {
    this.render('charityselection');
});


Router.route('/:name', function() {
    this.render('nav', {
        data: function() {
            return Site.findOne()
        }
    });
});

if (Meteor.isServer) {
    Meteor.methods({
        'clear': function() {
            Site.remove({});
            Guestbook.remove({});
        },
        'justgiving.GetCharityById': function(id) {
            return HTTP.get(JUSTGIVING_ENDPOINT + '/v1/charity/' + id, {
                headers: {
                    "Content-type": "application/json"
                }
            }).data;
        },
        'justgiving.CharitySearch': function(query) {
            return HTTP.get(JUSTGIVING_ENDPOINT + '/v1/charity/search', {
                params: {
                    q: query
                },
                headers: {
                    "Content-type": "application/json"
                }
            }).data;

            //charitySearchResults
        },
        'hoiio.sms': function() {
            var url = "https://secure.hoiio.com/open/sms/send?dest=%2B6582888399&app_id=KM2BbQEN5gJBY1wF&access_token=jhlid31sCQdlxaHD&msg=The%20wake%20will%20be%20held%20from%208%3A00am%20-%2010%3A30pm%20on%2022%20March%20(Fri).%20The%20memorial%20service%20will%20be%20on%2023%20March%20(Sat)%20at%202%3A00pm.%20It%20will%20be%20held%20at%20Church%20of%20St.%20Mary%20of%20the%20Angels.%20Details%20on%20http%3A%2F%2Fji.com%2Fwinstonkoh";
            HTTP.get(url);
        }
    });
}

if (Meteor.isClient) {

    Template.guestbook.helpers({
        guestBookEntry: function() {
            return Guestbook.find({}, {
                sort: {
                    _id: -1
                }
            });
        }
    });
    Template.create.created = function() {
        // Session.set('charityList', []);
    };

    Template.charityselection.helpers({
        charityList: function() {
            return Session.get('charityList');
        },
        noCharity: function() {
            return !(Site.findOne().charity);
        }
    });

    Template.charityselection.events({
        'click [name=searchCharity]': function(event, template) {
            var query = template.find('[name=charityQuery]').value;
            if (query) {
                Meteor.call('justgiving.CharitySearch', query, function(error, result) {
                    if (result.charitySearchResults.length) {
                        Session.set('charityList', result.charitySearchResults);
                    }
                });
            } else {
                console.error('no search charity query');
            }
        },
        'click [name=selectCharity]': function(event, template) {
            $(event.currentTarget).parent().siblings().removeClass('selected');
            $(event.currentTarget).parent().addClass('selected');

            var site = Site.findOne();
            if (site) {
                Site.update(site._id, {
                    $set: {
                        charity: this
                    }
                })
            }

            console.log('selected ' + this.charityId);
        },
        'click [name=skip]': function() {
            var site = Site.findOne();
            Router.go('/' + site.person.name.replace(' ', ''));
        }
    });


    Template.create.helpers({
        insertOrUpdate: function() {
            if (Site.findOne()) {
                return 'update';
            } else {
                return 'insert';
            }
        },
        doc: function() {
            return Site.findOne();
        }
    });

    Template.upload.events({
        'click [name=go]': function() {
            Router.go('/charity');
        }
    });
    Template.create.events({
        'submit #details': function() {
            Router.go('/upload');
            Action.hoiio();
        },
        'click [name=quickFill]': function() {
            Action.quickFill();
        }
    });

    Template.donation.rendered = function() {
        braintree.setup(
            "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiI0MTQ0NGNmMGU1ZTAyMDU4NDQ2NDg3ZDI0ZWY5NjA3ZmM3M2Q3ZmU0NGU3OWUzNzEwOWFiNjRiOWYyY2QyN2ZlfGNyZWF0ZWRfYXQ9MjAxNS0wMy0yOFQxMDowMzoxMS41NjcxMzgyMjcrMDAwMFx1MDAyNm1lcmNoYW50X2lkPWRjcHNweTJicndkanIzcW5cdTAwMjZwdWJsaWNfa2V5PTl3d3J6cWszdnIzdDRuYzgiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZGNwc3B5MmJyd2RqcjNxbi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL2RjcHNweTJicndkanIzcW4vY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIn0sInRocmVlRFNlY3VyZUVuYWJsZWQiOnRydWUsInRocmVlRFNlY3VyZSI6eyJsb29rdXBVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvZGNwc3B5MmJyd2RqcjNxbi90aHJlZV9kX3NlY3VyZS9sb29rdXAifSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQiLCJtZXJjaGFudEFjY291bnRJZCI6InN0Y2gybmZkZndzenl0dzUiLCJjdXJyZW5jeUlzb0NvZGUiOiJVU0QifSwiY29pbmJhc2VFbmFibGVkIjp0cnVlLCJjb2luYmFzZSI6eyJjbGllbnRJZCI6IjExZDI3MjI5YmE1OGI1NmQ3ZTNjMDFhMDUyN2Y0ZDViNDQ2ZDRmNjg0ODE3Y2I2MjNkMjU1YjU3M2FkZGM1OWIiLCJtZXJjaGFudEFjY291bnQiOiJjb2luYmFzZS1kZXZlbG9wbWVudC1tZXJjaGFudEBnZXRicmFpbnRyZWUuY29tIiwic2NvcGVzIjoiYXV0aG9yaXphdGlvbnM6YnJhaW50cmVlIHVzZXIiLCJyZWRpcmVjdFVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tL2NvaW5iYXNlL29hdXRoL3JlZGlyZWN0LWxhbmRpbmcuaHRtbCJ9LCJtZXJjaGFudElkIjoiZGNwc3B5MmJyd2RqcjNxbiIsInZlbm1vIjoib2ZmbGluZSIsImFwcGxlUGF5Ijp7InN0YXR1cyI6Im1vY2siLCJjb3VudHJ5Q29kZSI6IlVTIiwiY3VycmVuY3lDb2RlIjoiVVNEIiwibWVyY2hhbnRJZGVudGlmaWVyIjoibWVyY2hhbnQuY29tLmJyYWludHJlZXBheW1lbnRzLmRldi1kY29wZWxhbmQiLCJzdXBwb3J0ZWROZXR3b3JrcyI6WyJ2aXNhIiwibWFzdGVyY2FyZCIsImFtZXgiXX19",
            'dropin', {
                container: 'dropin'
            });

        var site = Site.findOne();
        if (site && site.charity) {
            $('<script>').appendTo('#jg').attr({
                'data-charity': site.charity.charityId,
                'data-env': "https://www.justgiving.com",
                'data-width': "330",
                'id': 'jgGive',
            }).attr('src', 'https://www.justgiving.com/bundles/js/givewidgetloader.js');
        }
    }

    Template.gallery.rendered = function() {

    };

    Template.nav.helpers({
        site: function() {
            return Site.findOne();
        }
    });

    Template.nav.events({
        'click [name=print]': function() {
            Action.print();
        },
        'click [name=clear]': function() {
            Action.clear();
        },
        'submit #guestbook-new-entry': function() {
            $('#bb-nav-next').click();
        }
    });

    Template.nav.rendered = function() {
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
    }
}
