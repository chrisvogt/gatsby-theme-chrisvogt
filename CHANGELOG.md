# Changelog

## 0.50.0 🌗

- Renamed the project from gatsby-theme-chrisvogt to gatsby-theme-chronogrove.
- This is a ½ marker towards a full release.

## 0.47.0

- Adds support for Spotify to the audio player component that renders at the bottom of the page.

## 0.46.1

- Fixes the recently-played Steam games table so that it reports down to the minute, instead of rounding hours up or down (_e.g._, "0 hours" played).

## 0.46.0

- Replaces Google Books API book descriptions with Goodreads book descriptions.
- Adds support for `<i>`, `<b>`, and `<br />` elements in widget content response.

## 0.45.3

– Rearranges the page header layout to accommodate longer menu items.

## 0.45.2

— Splits the Home page content out into a new About Me page at /about/.

## 0.45.1

### Performance Improvements

- **Fixed animated background freezing during window resize**: Resolved critical performance issue that caused page freezing and crashes when resizing the browser window or opening DevTools
- **Optimized resize event handling**: Added 100ms debounce to prevent excessive resize event calls
- **Reduced rendering overhead**: Decreased animated circle count from 80 to 40 for better performance
- **Improved canvas sizing**: Replaced expensive `document.body.scrollHeight` calculations with faster `window.innerHeight`
- **Enhanced memory management**: Added proper animation cleanup with `cancelAnimationFrame`

### Technical Details

- Implemented conditional canvas resizing (only when dimensions actually change)
- Added circle repositioning logic to maintain bounds after resize
- All existing functionality preserved with no breaking changes

## 0.45.0

- Adds a new "Skip to content" link for keyboard-first visitors, allowing them to TAB once on the page and then skip to the <main> content.

## 0.44.4

- Updates Steam widget "Recently-Played Games" to reflect MINUTES for games played.

## 0.44.0

- Updates themed <table/> elements to have a light and dark mode.

## 0.43.0

- Adds a new Owned Games section to the Steam widget, using data added to metrics.chrisvogt.me via [chrisvogt/metrics#57](https://github.com/chrisvogt/metrics/pull/57).

### Notes

- The current <Table/> styles don't have a dark mode.
