# FrietDB

This web app shows the menu and more info about 'frituren' in the Ghent area.

## API Keys

You will have to add 2 files called `/src/environments/environment(.prod).ts` with the necessary api keys. The files should look like this:

```
export const environment = {
  production: true,
  backendurl: "https://<URL>:<SERVER_PORT>/<API_PATH>",
  mapskey: '<PASTE_PRODUCION_API_KEY>'
};
```
You will need a [Google Maps Javascript API key](https://developers.google.com/maps/documentation/javascript/get-api-key).

## Development server

### Frontend

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Backend

Make sure there is a MongoDB service with a database called 'frietdb' running. go to `./server/` and also execute `npm start` there.

## Build & Deploy

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Github Pages

When building for Github Pages you should build with add: `--base-href "https://USERNAME.github.io/REPOSITORY_NAME/"`. Next, rename the index.html file to `404.html`

To publish it, remove `/dist` from `.gitignore`, make a local commit and push to the gh-pages branch with:

```
$ git push origin `git subtree split --prefix dist master`:gh-pages --force
```

Lastly undo the edit in `.gitignore` and reset your master branch with `git reset HEAD~`.

[More Info](http://clontz.org/blog/2014/05/08/git-subtree-push-for-deployment/)

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
