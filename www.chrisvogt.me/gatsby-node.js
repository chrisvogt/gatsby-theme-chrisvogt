exports.createPages = async ({ graphql, actions }) => {
  const { createRedirect } = actions

  createRedirect({
    // Originally published to the wrong category
    fromPath: '/personal/2024-my-website-costs/',
    toPath: '/meta/2024-my-website-costs/',
    isPermanent: true,
    redirectInBrowser: true
  })
}
