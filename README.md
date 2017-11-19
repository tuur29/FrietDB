# FrietDB

This web app shows the menu and more info about 'frituren' in the Ghent area.

## API Keys

You will have to add 3 files, 2 are called `/src/environments/environment(.prod).ts` with the necessary api keys and should look like this:

```
export const environment = {
  production: true,
  backendurl: "https://<URL>:<SERVER_PORT>/<API_PATH>",
  mapskey: '<PASTE_PRODUCION_API_KEY>'
};
```
You will need a [Google Maps Javascript API key](https://developers.google.com/maps/documentation/javascript/get-api-key).

The third file should be called `/server/.env` and looks like this:

```

MONGODB_URI=mongodb://localhost/frietdb
JWT_SECRET=-e,aj(ef,X$X>F6'^uDH8;u\uDDz)"9`

```

## Development server

Run `npm run all` for a full dev server. Navigate to `http://localhost:4200/`. The frontend will automatically reload if you change any of the source files.

### More options

- `npm start` : runs only frontend Angular 4 app
- `npm run mongo` : runs backend MongoDB server
- `npm run express` : runs backend Express.js server
- `npm run server` : runs all backend servers

## Build & Deploy

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Github Pages

When building for Github Pages you should build with add: `--base-href "https://USERNAME.github.io/REPOSITORY_NAME/"`. Next, rename the index.html file to `404.html`

To publish it, remove `/dist` from `.gitignore`, make a local commit and push to the gh-pages branch with:

```
$ git push origin `git subtree split --prefix dist master`:gh-pages --force
```

Lastly undo the edit in `.gitignore` and reset your master branch with `git reset HEAD~`.
Don't forget to re-enable your custom domain if you are using one.

[More Info](http://clontz.org/blog/2014/05/08/git-subtree-push-for-deployment/)

### Heroku

Navigate to the root of the project and add your heroku app to the repo by running:

```
$ heroku git:remote -a frietdb
```

Next you can install mongodb by running `heroku addons:create mongolab`. Lastely push the server to your heroku dyno with:

```
$ git subtree push --prefix server heroku master
```

You will only need to repeat the previous command when you wish to update the dyno.

[More Info](https://devcenter.heroku.com/articles/getting-started-with-nodejs)

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
