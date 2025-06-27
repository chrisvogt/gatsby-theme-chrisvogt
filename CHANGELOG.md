# Changelog

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
