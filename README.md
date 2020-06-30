# ONTRACK
Technical test for Ontrack

![Screenshot](https://i.imgur.com/i1r6vWD.png)

This repository contains a client webapp built using create-react-app.

## Dev Instructions
JavaScript assets are located in `src` and static assets are located in `public` folder. 

## Build Instructions

You can use the standard create-react-app commands to serve and build the web app. In order to build the app, follow the instructions below

Ensure that you have a NodeJS environment set up along with `npm` or `yarn` installed.

Depending on what's installed, navigate to the root directory of the repository and try the following commands 

|  yarn        |   npm           |
| ------------- |:-------------:|
| `yarn install`     | `npm install` |


## Serve Instructions

You can serve the web app without building using webpack's dev server using the command

|  yarn        |   npm           |
| ------------- |:-------------:|
| `yarn start`     | `npm start` |

This commands will serve the app on a in-built server running on port `3000`

Or you can build the app and then host the build directory in a HTTP server of your choice.

# NOTE

Be Advised that if you are running the code on `create-react-app`'s web server, it will spew errors in the browser console, as the page tries to load `serviceWorker.js` which is located in the `root` directory, and `react-router` would try to serve the content as `HTML` mime-type instead of `text/javascript`. 

If you are running the code on your own web server make sure that the server redirects all requests to `index.htmml` (read more about this here: https://www.andreasreiterer.at/fix-browserrouter-on-apache/) 

# Usage

Once the server is up and running, the webapp can be accessible via the url `http://localhost:3000/`
By default all routes on the server result in `404` except for the `/` which redirects the page to `/books/1` where `1` is the `pageNumber` for pagination.

You can select the number of items to display on the page by selecting the `itemsPerPage` dropdown on the page in `Settings` accordion. Alternatively, you can also search for a free text in the search field next to te `itemsPerPage` dropdown, which populates the filter and displays the result.

# Testing

A simple test case has been written in `*.test.js`.  This project uses [Jest](https://jestjs.io/) to test the scripts

# PWA-Ready!

This app is PWA ready. In order to see it in action make sure that the app is hosted on a server and you have already ran the app once. Refresh the page to see it load without API call!
