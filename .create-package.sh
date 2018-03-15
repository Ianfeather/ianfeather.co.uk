#!/bin/bash

echo -e "Remove the current package"
rm -rf _package-to-deploy
mkdir _package-to-deploy

echo -e "Copy across global files"
cp -r global/ _package-to-deploy/

echo -e "Combine JS"
cat source/javascripts/ianf.js source/javascripts/prism.js > source/javascripts/ianf.min.js

echo -e "Compile our stylesheet"
sass -t compressed sass/screen.sass:stylesheets/screen.css

echo -e "Insert the compiled css int"
cat stylesheets/screen.css > source/_includes/styles.html

echo -e "Compile the blog with jekyll"
bundle exec jekyll build --trace

echo -e "Copy across the stylesheet for older pages"
cp -r stylesheets site/

echo -e "Copy across the blog package"
cp -r site/ ./_package-to-deploy/

# echo -e "Compile presentation stylesheet"
# sass -t compressed presentations/front-end-ops/sass/style.sass:presentations/front-end-ops/css/style.css

# echo -e "Copy across the presentations package"
# cp -r presentations _package-to-deploy/

# echo -e "Copy across the test-cases package"
# cp -r testcases _package-to-deploy/

echo -e "Clean up JS"
rm source/javascripts/ianf.min.js
