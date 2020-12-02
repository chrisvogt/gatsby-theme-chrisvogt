# Widgets

This directory contains all theme widgets. Widgets are components that wrap an
experience in a consistent style. They are currently used primarily on the home
page, but theoretically could be dropped into any route or layout.

## Conventions

* Widgets are expected to manage their own data, but may reach into the rest of
  the app to reuse utils and hooks to fetch and select that data, which has the
  benefit of making that data readily available to other components and widgets.
* Widgets are designed to fill 100% of the available space they are provided. A
  widget shouldn't be expected to know its surroundings, and should instead try
  to expand to fill its available space.

## Considerations

Things that would be nice to see:

* A convention established for analytics event tracking within widgets.
* A proof of concept or some thought put into extracting widgets into their own
  packages, which could either live in this monorepo or elsewhere, in a separate
  repo.
