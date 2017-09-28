# FrietDB

This web app shows the menu and more info about 'frituren' in the Ghent area.

## API Keys

You will have to add a file called `/src/keys.service.ts` with the necessary api keys. The file should look like this:

```
import { Injectable } from '@angular/core';
@Injectable() 
export class KeysService {
  apiKey : string = "<PASTE_API_KEY_HERE>";
}
```
You will need a [Google Maps Javascript API key](https://developers.google.com/maps/documentation/javascript/get-api-key).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
