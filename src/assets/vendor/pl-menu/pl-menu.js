
(function ($) {
    
    $.initPlMenu = function() {
        /* MENU CHEVRON ROTATION */
        $('.arrow-r').on('click', function() {
            if($(this).hasClass('collapsible-header--child')){
                $(this).parent('li').siblings('li').find('.collapsible-header--child').find('.fa-angle-down').removeClass('rotate-element');
            }else{
                $('.arrow-r').not(this).find('.fa-angle-down').removeClass('rotate-element');
            }
            $(this).find('.fa-angle-down').toggleClass('rotate-element');
        });

        var mouseLeaveTimeout;
        // Function vertical bar
        $('#sideNavMenu li > a').on('mouseenter', function(){
               clearTimeout(mouseLeaveTimeout);
               var top = $(this).offset().top;
               var height = $(this).outerHeight();
               var marker = $('#sideScrollerMark');
               marker.css({
                   'transform': 'translateY(' + top + 'px)',
                   'height':   height + 'px',
               });
           }).on('mouseleave', function(){
               mouseLeaveTimeout = setTimeout(function(){
                   var active_menu = $('#sideNavMenu > li.active');
                   var marker = $('#sideScrollerMark');
                   if(active_menu.length > 0){
                       var last;
                       if (active_menu.find('li.active').length > 0){
                           last = active_menu.find('li.active').last().children('a');
                       }
                       else{
                           last = active_menu.children('a');
                       }
                       var top = last.offset().top;
                       var height = last.outerHeight();
                       marker.css({
                           'transform': 'translateY(' + top + 'px)',
                           'height':   height + 'px',
                       });
                   }
                   else{
                       marker.css({
                           'transform': 'translateY(0px)',
                           'height':   '0',
                       });
                   }

               }, 150);
           });
    };

    /* COLLAPSIBLE MENU */
    $.fn.collapsible = function (options) {
        var defaults = {
            accordion: undefined
        };

        options = $.extend(defaults, options);


        return this.each(function () {

            var $this = $(this);

            var $panel_headers = $(this).find('> li > .collapsible-header');

            var collapsible_type = $this.data("collapsible");

            // Turn off any existing event handlers
            $this.off('click.collapse', '.collapsible-header');
            $panel_headers.off('click.collapse');


            /****************
             Helper Functions
             ****************/

            // Accordion Open
            function accordionOpen(object) {
                $panel_headers = $this.find('> li > .collapsible-header');
                if (object.hasClass('active')) {
                    object.parent().addClass('active');
                } else {
                    object.parent().removeClass('active');
                }
                if (object.parent().hasClass('active')) {
                    object.siblings('.collapsible-body').stop(true, false).slideDown({
                        duration: 350,
                        easing: "easeOutQuart",
                        queue: false,
                        complete: function () {
                            $(this).css('height', '');
                        }
                    });
                    if(object.hasClass('collapsible-header--child')){
                        //Close siblings submenus
                        object.parent().siblings('li').find('.collapsible-header--child').siblings('.collapsible-body').stop(true, false).slideUp({
                            duration: 350,
                            easing: "easeOutQuart",
                            queue: false,
                            complete: function () {
                                $(this).css('height', '');
                            }
                        }).siblings('.collapsible-header--child').removeClass('active').parent().removeClass('active');
                    }
                    else{
                        $('.collapsible-header--child').siblings('.collapsible-body').stop(true, false).slideUp({
                            duration: 350,
                            easing: "easeOutQuart",
                            queue: false,
                            complete: function () {
                                $(this).css('height', '');
                            }
                        }).siblings('.collapsible-header--child').removeClass('active').parent().removeClass('active');
                    }
                } else {
                    object.siblings('.collapsible-body').stop(true, false).slideUp({
                        duration: 350,
                        easing: "easeOutQuart",
                        queue: false,
                        complete: function () {
                            $(this).css('height', '');
                        }
                    });
                }

                $panel_headers.not(object).removeClass('active').parent().removeClass('active');
                $panel_headers.not(object).parent().children('.collapsible-body').stop(true, false).slideUp({
                    duration: 350,
                    easing: "easeOutQuart",
                    queue: false,
                    complete: function () {
                        $(this).css('height', '');
                    }
                });
            }

            // Expandable Open
            function expandableOpen(object) {
                if (object.hasClass('active')) {
                    object.parent().addClass('active');
                } else {
                    object.parent().removeClass('active');
                }
                if (object.parent().hasClass('active')) {
                    object.siblings('.collapsible-body').stop(true, false).slideDown({
                        duration: 350,
                        easing: "easeOutQuart",
                        queue: false,
                        complete: function () {
                            $(this).css('height', '');
                        }
                    });
                } else {
                    object.siblings('.collapsible-body').stop(true, false).slideUp({
                        duration: 350,
                        easing: "easeOutQuart",
                        queue: false,
                        complete: function () {
                            $(this).css('height', '');
                        }
                    });
                }
            }

            /**
             * Check if object is children of panel header
             * @param  {Object}  object Jquery object
             * @return {Boolean} true if it is children
             */
            function isChildrenOfPanelHeader(object) {

                var panelHeader = getPanelHeader(object);

                return panelHeader.length > 0;
            }

            /**
             * Get panel header from a children element
             * @param  {Object} object Jquery object
             * @return {Object} panel header object
             */
            function getPanelHeader(object) {

                return object.closest('li > .collapsible-header');
            }

            /*****  End Helper Functions  *****/



            if (options.accordion || collapsible_type === "accordion" || collapsible_type === undefined) { // Handle Accordion
                // Add click handler to only direct collapsible header children
                $panel_headers = $this.find('> li > .collapsible-header');
                $panel_headers.on('click.collapse', function (e) {
                    var element = $(e.target);

                    if (isChildrenOfPanelHeader(element)) {
                        element = getPanelHeader(element);
                    }

                    element.toggleClass('active');
                    accordionOpen(element);
                });
                // Open first active
                accordionOpen($panel_headers.filter('.active').first());
            } else { // Handle Expandables
                $panel_headers.each(function () {
                    // Add click handler to only direct collapsible header children
                    $(this).on('click.collapse', function (e) {
                        var element = $(e.target);
                        if (isChildrenOfPanelHeader(element)) {
                            element = getPanelHeader(element);
                        }
                        element.toggleClass('active');
                        expandableOpen(element);
                    });
                    // Open any bodies that have the active class
                    if ($(this).hasClass('active')) {
                        expandableOpen($(this));
                    }

                });
            }

        });
    };
}(jQuery));