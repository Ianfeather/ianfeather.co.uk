module.exports = function(config) {
  // config.addPassthroughCopy('src/images')

  config.addLayoutAlias('default', 'layouts/post.html');
  config.addLayoutAlias('page', 'layouts/page.html');

  return {
    dir: { input: 'source', output: 'dist', data: '_data' },
    passthroughFileCopy: true,
    // templateFormats: ['njk', 'md', 'css', 'html', 'yml'],
    // htmlTemplateEngine: 'njk'
  }
}
