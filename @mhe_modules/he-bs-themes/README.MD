# HE BS Themes
Bootstrap themes for McGraw Hill Higher Education UI applications.

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

## Requirements
1. Your project uses [SCSS](https://sass-lang.com/).
2. Your application imports the SCSS files for [Bootstrap](https://getbootstrap.com/).
  - specifically a major version of Bootstrap that this repo supports. Currently: v5

## Installation
1. Install this package as a dependency of your application.
  - `npm i @mhe/he-bs-themes`
2. Import the scss file into your project before importing bootstrap files.
  - ```scss
    @import '~node_modules/@mhe/he-bs-themes/5.2/index';
    // import bootstrap scss. More info: https://getbootstrap.com/docs/5.2/customize/overview/
    @import '~node_modules/bootstrap/scss/bootstrap';
    ```
3. If you need to import variables for use in your own custom styles, just import the `_variables.scss` file.
    
## Themes
 - Themes are found in the src directory under the version of Bootstrap they were developed for. 
   - ex. `src/5.2/he-bs5/index.scss`

## Contributing
See [CONTRIBUTING.md](CONTRIBUTING.MD) for more info about commit message styles, versioning, and releases.

## Troubleshooting
 - You should be able to override theme styles if you want to, but if you are adding reusuable styles, consider adding them to the theme instead.

## Resources
 - Repo: https://github.mheducation.com/MHEducation/he-bs-themes
 - **Demo**: https://isss.mhe.io/he-bs-themes-demo/index.html