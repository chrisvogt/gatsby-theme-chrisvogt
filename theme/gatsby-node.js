const path = require('path')
const slugify = require(`@sindresorhus/slugify`)
const startCase = require('lodash/startCase')

exports.createPages = async ({ actions, graphql, reporter }) => {
  actions.createPage({
    component: path.resolve('../theme/src/templates/home.js'),
    path: '/'
  })

  const result = await graphql(
    `
      {
        allMdx {
          edges {
            node {
              fields {
                category
                id
                slug
                type
              }
              internal {
                contentFilePath
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panic('error loading content', result.errors)
    return
  }

  result.data.allMdx.edges.forEach(({ node }) => {
    const template = node.fields.type === 'media'
      ? path.resolve('../theme/src/templates/media.js')
      : path.resolve('../theme/src/templates/post.js')

    let nodePath = '/'

    const category = node.fields.category
    if (category) {
      nodePath += `${category}/`
    }

    const slug = node.fields.slug
    if (slug) {
      nodePath += slug
    }

    console.log(`The node path is ${nodePath}`)

    actions.createPage({
      path: nodePath ? nodePath : '/',
      component: `${template}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.fields.id
      }
    })
  })
}

exports.onCreateNode = ({ node, getNode, actions, reporter }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent)
    const title = node.frontmatter.title || startCase(parent.name)

    let slug = slugify(title)
    if (!slug && parent.relativePath) {
      slug = parent.relativePath.replace(parent.ext, '')
    }

    if (!slug) {
      reporter.panic(
        `Can not create node with title: ${title} there is no relative path or frontmatter to set the "slug" field`
      )
      return
    }

    if (slug === 'index') {
      slug = ''
    }

    const category = node.frontmatter.category
    if (category) {
      createNodeField({
        name: `category`,
        node,
        value: category
      })
    }

    const type = node.frontmatter.type
    if (type) {
      createNodeField({
        name: `type`,
        node,
        value: type
      })
    }

    createNodeField({
      name: `slug`,
      node,
      value: slug
    })

    createNodeField({
      name: 'id',
      node,
      value: node.id
    })

    createNodeField({
      name: 'title',
      node,
      value: title
    })
  }
}
