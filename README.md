Callinary Arts
====================
This branch contains the source files for the portfolio website. Upon building via grunt, the `dist` folder contains files to be pushed to the master branch see *Deployment*). Github Pages runs on the master branch.

## Setup and Installation

Project uses `grunt` and `bower` for task and file management. Run the following in the root:
<pre>
npm install
bower install
</pre>

Website will run on simple web server, as triggered by the command `grunt serve`.

## Stack Overview
- [jQuery](http://jquery.com/)
- [jQuery lazyload](http://www.appelsiini.net/projects/lazyload)
- [PhysicsJS](http://wellcaffeinated.net/PhysicsJS/)
- [Modernizr](http://modernizr.com/)
- [Sass](http://sass-lang.com/)
- [Compass](http://compass-style.org/)
- [Handlebars.js](http://handlebarsjs.com/)
- [Grunt](http://gruntjs.com/)
- [Bower](http://bower.io/)
- [Yeoman](http://yeoman.io/)

## Structure
- Front page - showcase projects
	- Background animated with PhysicsJS
	- Hero
	- Content area templated with Handlebars.js
	- Footer
- Pantry - list useful tools and references
	- Background animated with PhysicsJS
	- Content area
	- Footer

## Deployment
Github pages runs on the master branch. The source branch builds production files to be pulled into master.

1. Commit files on source branch
2. Run `grunt` to build `dist` folder
3. Run the deploy script with `./deploy.sh -s`

## Reminders
- New file types and folders outside existing directories must be identified in Gruntfile.js for build purposes.