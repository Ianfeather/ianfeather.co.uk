const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function(config) {

  // A useful way to reference the context we are runing eleventy in
  let env = process.env.ELEVENTY_ENV;

  // Layout aliases can make templates more portable
  config.addLayoutAlias('default', 'layouts/base.njk');
  config.addLayoutAlias('pictorial', 'layouts/pictorial.njk');

  // Add some utility filters
  config.addFilter("dateDisplay", require("./src/utils/filters/date.js") );

  config.addCollection("archive", (collection) => {
    return collection.getFilteredByGlob("src/site/posts/**/*");
  });

  config.addCollection("sidebarRecent", (collection) => {
    return collection.getFilteredByTag("post").slice(-5);
  });

  config.addCollection("sidebarFewer", (collection) => {
    return collection.getFilteredByTag("fewer_words").slice(-5);
  });

  config.addCollection("sidebarNonTech", (collection) => {
    return collection.getFilteredByTag("non_tech").slice(-5);
  });

  config.addPlugin(pluginRss);

  // minify the html output
  config.addTransform("htmlmin", require("./src/utils/minify-html.js"));

  config.addLinter("inclusive-language", function(content, inputPath, outputPath) {
    let words = "simply,obviously,basically,of course,clearly,just,everyone knows,however,easy".split(",");
    if( inputPath.endsWith(".md") ) {
      for( let word of words) {
        let regexp = new RegExp("\\b(" + word + ")\\b", "gi");
        if(content.match(regexp)) {
          console.warn(`Inclusive Language Linter (${inputPath}) Found: ${word}`);
        }
      }
    }
  });

  // compress and combine js files
  config.addFilter("jsmin", function(code) {
    const UglifyJS = require("uglify-js");
    let minified = UglifyJS.minify(code);
      if( minified.error ) {
          console.log("UglifyJS error: ", minified.error);
          return code;
      }
      return minified.code;
  });


  // pass some assets right through
  config.addPassthroughCopy("./src/site/images");

  return {
    dir: {
      input: "src/site",
      output: "dist",
      data: `_data`
    },
    templateFormats : ["njk", "md", "11ty.js"],
    htmlTemplateEngine : "njk",
    markdownTemplateEngine : "njk",
    passthroughFileCopy: true
  };

};
