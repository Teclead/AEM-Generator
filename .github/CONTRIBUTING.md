# How to contribute

The CustomDialog Generator was set up and implemented by team Online Sales 5. We are still working on new features and are maintaining this library. Yet we are very grateful and very happy about any contribution. You may contribute by opening a pull-request with a bugfix or new features. You may also report a bug or improve our documentation.

## Development Guideline

### Commits

We use [Conventional Commits](https://www.conventionalcommits.org/) to specify, which commits are features, bugfixes, documentation or other types of changes in the project. This is also used, to determine the next version of the package and also to generate our changelog. See the official documentation of conventional commits for more information.

### Pull Requests

We work with pull-requests. No commit is permitted on the master branch. The code will be merged after it was reviewed by at least one member of our team.

We like code reviews for two reasons:

1. The knowledge about the components is spread. The reviewer will automatically gain knownledge of the code and will be informed as well as the author.
2. The quality of the code is verfied
   - Is the documentation comprehensible and does it suffice  
   - Does the implementation behave as expected?  
   - Are all important branches covered by unit tests?
   - Does the code style fulfill the standards of this library?

Important notice: Pull requests that are opened while they're still being worked on should have the prefix 'WIP:', which will signal ongoing changes on the branch and that the pull request is not ready to be merged.

### Publish Package
> This is only important for the mantainers of the project

If you want to create a new release of the package in the npm registry, simply follow these steps:

1. Checkout the `master` branch
2. Pull all recent changes from origin
3. (Recommended) Run the tests with `yarn test`
4. If the test succeeds, run `yarn release`  
   This will bump the verson inside the `package.json`, updates the `CHANGELOG.md` and runs `yarn build`.
5. If everything succeeds, run `yarn publish:npm`.  
   This will push the latest git-Tag and publishes the package in the npm registry