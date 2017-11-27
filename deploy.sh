
# Angular build
read -n1 -rep $'\nPress key if there are no uncommited changes\n' key
rm -rf dist
sed -i -e 's/\/dist/#\/dist/g' .gitignore
ng build -prod
read -n1 -rep $'\nPress key if angular app has build successfully\n' key
cp "dist/index.html" "dist/404.html"
echo "frietkoten.gent" > "dist/CNAME"

# Deploy to Github Pages
git add .
git commit -m "deploy"
git push origin `git subtree split --prefix dist master`:gh-pages --force
git reset HEAD~
git checkout -- .

# Heroku
read -n1 -rep $'\nPress key if you want to deploy to heroku\n' key
git subtree push --prefix server heroku master
rm -rf dist

echo -e "\n\n Deployed!\n"
