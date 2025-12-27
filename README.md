# Momo's Components

A simple website meant to show off different front-end components along with their source code. All components must be stored in the /components folder in its own named folder, with index.html, styles.css, and script.js files. There is a NodeJS script that grabs the content from all directories and generates a json file to display components dynamically.

## Installation

Local installation requires the live-server dependency, because the main script file fetches the generated JSON file, and CORS blocks requests that aren't http or https

Run `npm i` to install dependencies

You can run `npm run dev` to start the local server

As previously mentioned, there is a NodeJS script that generates a JSON file from the components directory. Run `node generateJSON.js` if you need to manually generate:

You usually shouldn't have to do this if you run `npm run watchComponents` while working in the components folder. Nodemon is used to detect changes and regenerate the file:

Husky is also installed as a dependency and the script is run pre-commit, as a failsafe.

## Components structure

Each component must be in its own folder, and consist of an index.html, styles.css, and script.js file. index.html must follow typical html format, and the script will take everything inside the body, with the exception of the script tag.

script.js files can be in an anonymous function for scope purposes, but the script will omit the wrapper in the JSON results

Treat styles.css like a normal CSS file for just the component, all content is scraped.

There are a few global css rules in the root css folder, mainly for normalization and styling the component viewing window.

## Final notes

All packages are only meant to aid local development, and the site is intended to run just as a static html file on github pages.
