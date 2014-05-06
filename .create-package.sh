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
echo -e "${blue}Compile the blog with jekyll${none}"
cd blog
jekyll build

echo ""
echo -e "${blue}Compile our stylesheet${none}"
sass -t compressed sass/screen.sass:stylesheets/screen.css
cp -r stylesheets site/

echo ""
echo -e "${blue}Copy across the blog package${none}"
cd ..
cp -r blog/site/ ./_package-to-deploy/

echo ""
echo -e "${blue}Compile presentation stylesheet${none}"
cd presentations/front-end-ops
sass sass/style.sass:css/style.css
cd ../..

echo ""
echo -e "${blue}Copy across the presentations package${none}"
cp -r presentations _package-to-deploy/

echo ""
echo -e "${blue}Clean up JS${none}"
rm blog/source/javascripts/ianf.min.js


# TODO
# Configure scp access and write a deploy job
# For the moment - I'm just using FTP to deploy this package
