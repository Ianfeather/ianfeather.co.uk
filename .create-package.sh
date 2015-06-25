#!/bin/bash

blue='\033[0;34m'
none='\033[0m'

echo ""
echo -e "${blue}Remove the current package${none}"
rm -rf _package-to-deploy/*

echo ""
echo -e "${blue}Copy across global files${none}"
cp -r global/ _package-to-deploy/

echo ""
echo -e "${blue}JSHint${none}"
jshint blog/source/javascripts/ianf.js

echo ""
echo -e "${blue}Uglify our JS${none}"
cat blog/source/javascripts/ianf.js blog/source/javascripts/prism.js > blog/source/javascripts/ianf.min.js
uglifyjs blog/source/javascripts/ianf.min.js -o blog/source/javascripts/ianf.min.js

echo ""
echo -e "${blue}Compile our stylesheet${none}"
sass -t compressed blog/sass/screen.sass:blog/stylesheets/screen.css

echo ""
echo -e "${blue}Insert the compiled css into the head"
cat blog/stylesheets/screen.css > blog/source/_includes/styles.html

echo ""
echo -e "${blue}Compile the blog with jekyll${none}"
cd blog
jekyll build
cd ..

echo ""
echo -e "${blue}Copy across the stylesheet for older pages${none}"
cp -r blog/stylesheets blog/site/

echo ""
echo -e "${blue}Copy across the blog package${none}"
cp -r blog/site/ ./_package-to-deploy/

echo ""
echo -e "${blue}Compile presentation stylesheet${none}"
sass -t compressed presentations/front-end-ops/sass/style.sass:presentations/front-end-ops/css/style.css

echo ""
echo -e "${blue}Copy across the presentations package${none}"
cp -r presentations _package-to-deploy/

echo ""
echo -e "${blue}Copy across the test-cases package${none}"
cp -r testcases _package-to-deploy/

echo ""
echo -e "${blue}Clean up JS${none}"
rm blog/source/javascripts/ianf.min.js
