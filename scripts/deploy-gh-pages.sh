git branch -D gh-pages
git checkout -b gh-pages && \
sed -i '' '/^dist\/$/d' .gitignore && \
npm -s run build && \
node tools/build-docs.js && \
git add docs/dist && \
git commit -am "Build docs" && \
git push origin :gh-pages && \
git subtree push --prefix docs/dist origin gh-pages && \
git checkout master
