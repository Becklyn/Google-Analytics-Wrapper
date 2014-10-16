Google Analytics Wrapper
========================

A google analytics wrapper which helps to be compatible with German data privacy laws.

It only supports [universal tracking][universal-tracking].


## Installation
Download the JavaScript file in the `dist/` directory or install it using bower (or any similar package manager).


## Usage
At first you need to initialize the API:

```javascript
Becklyn.Google_Analytics.init("UA-XXXXXXX-X");
```

The api is very simple:
```javascript
/**
 * Toggles the active state.
 * It sets the API inactive, when it was active and vice versa.
 *
 * @return {Boolean} the new active state
 */
Becklyn.Google_Analytics.toggleActive();


/**
 * Returns, whether the user has activated the tracking
 *
 * @returns {Boolean}
 */
Becklyn.Google_Analytics.isActive();
```


## Details
The library automatically sets a cookie when disabling the tracking, which is valid "forever" (until 2100).
It will automatically disable the tracking when a user is reentering the page (except they deleted the cookies).


[universal-tracking]: https://support.google.com/analytics/answer/2790010
