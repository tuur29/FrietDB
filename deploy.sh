
echo -e "\n\n Starting!\n"

# Angular build
read -n1 -r -p "Press key if there are no uncommited changes" key
rm -rf dist
sed -i -e 's/\/dist/#\/dist/g' .gitignore
ng build -prod --base-href="//frietkoten.gent/"
read -n1 -r -p "Press key if angular app has build successfully" key
cp "dist/index.html" "dist/404.html"
echo "frietkoten.gent" > "dist/CNAME"

# Deploy to Github Pages
git add .
git commit -m "deploy"
git push origin `git subtree split --prefix dist master`:gh-pages --force
git reset HEAD~
git checkout -- .

# Heroku
read -n1 -r -p "Press key if you want to deploy to heroku" key
git subtree push --prefix server heroku master
rm -rf dist

echo -e "\n\n Done!\n"