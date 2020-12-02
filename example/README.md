# Example Website

This is a demonstration website that can be used to preview Private Sphere while
in development. To do this, I run the following command from the project root:

```sh
yarn workspace example develop
```

This command will start a local development instance of the GatsbyJS theme. As
you modify theme files, Gatsby will use [Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/)
to automatically update components while you review the demonstration website.

## Considerations

Things added to this `package.json` won't necessarily be utilized by consumers
of the Private Sphere theme. That means you can experiment with demonstrations
and experimental features here that would be useful to share with others, but
don't necessarily need to be installed by all people who use Private Sphere.

For features and code that should be inherited by all child themes, please see
the `/theme` directory.
