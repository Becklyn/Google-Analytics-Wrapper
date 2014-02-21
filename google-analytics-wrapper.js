window.Becklyn = (function (Becklyn, window, document) {

    "use strict";

    /**
     * The settings as set by the initialization
     *
     * @type {Object}
     */
    var settings;


    /**
     * Registers the universal analytics code
     *
     * @param code {String}
     * @param domain {String}
     */
    function init (code, domain)
    {
        // set settings
        settings           = {};
        settings.code      = code;
        settings.domain    = domain;
        settings.parameter = 'ga-disable-' + code;
        settings.active    = readActiveStateFromCookie();

        // initialize the google analytics global variable to enable/disable tracking.
        // Must be called before loading the google analytics code
        //
        // @see https://developers.google.com/analytics/devguides/collection/gajs/#disable
        setGoogleAnalyticsTrackingState();

        // load the google analytics sdk
        loadGoogleAnalytics();
    }


    /**
     * Load google analytics
     */
    function loadGoogleAnalytics ()
    {
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', settings.code, settings.domain);
        ga('set', 'anonymizeIp', true);
        ga('send', 'pageview');
    }


    /**
     * Returns the active state as currently set in the cookie
     *
     * @returns {Boolean}
     */
    function readActiveStateFromCookie ()
    {
        // active = we didn't find the cookie
        return -1 === document.cookie.indexOf(settings.parameter + "=true;");
    }


    /**
     * Updates the cookie, according to the given isActive value
     */
    function updateCookie ()
    {
        if (settings.active)
        {
            // remove cookie
            document.cookie = settings.parameter + "=false; expires=Thu, 1 Jan 1970 00:00:00 GMT; path=/";
        }
        else
        {
            // set cookie
            document.cookie = settings.parameter + "=true; expires=Fri, 01 Jan 2100 00:00:00 GMT'; path=/";
        }
    }


    /**
     * Toggles the google analytics code
     */
    function setGoogleAnalyticsTrackingState ()
    {
        window[settings.parameter] = !settings.active;
    }


    /**
     * Toggles the active state.
     * It sets the API inactive, when it was active and vice versa.
     *
     * @return {Boolean} the new active state
     */
    function toggleActive ()
    {
        if (!settings)
        {
            error();
            return false;
        }

        settings.active = !settings.active;
        updateCookie();
        return settings.active;
    }


    /**
     * Returns, whether the user has activated the google analytics tracking
     *
     * @returns {Boolean}
     */
    function isActive ()
    {
        if (!settings)
        {
            error();
            return false;
        }

        return settings.active;
    }


    /**
     * Sends an error message
     */
    function error ()
    {
        if (window.console && window.console.error)
        {
            window.console.error("Becklyn Google Analytics: Not initialized");
        }
    }



    // Export API
    Becklyn.Google_Analytics = {
        init:         init,
        toggleActive: toggleActive,
        isActive:     isActive
    };

    return Becklyn;

})(window.Becklyn || {}, window, document);