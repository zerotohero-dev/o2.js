> Although this branch is (by definition) stable, it's missing **a lot** of features since it's being rewritten.
>
> The recent 1.x version with a larger feature set may be found at https://github.com/v0lkan/o2.js/releases/tag/v.0.25.8

...

### In Progress&hellip;

read **CONTRIBUTE.md** for now.

also read **INSTALL.md** for installation instructions.

### Installation

&hellip;

### Dependencies

Each folder in **src/o2/** is a separate **NPM module**.

Although some these modules depend on one another, the dependencies are **not** explicitly set in **package.json**; instead these dependencies are checked at runtime as in&hellip;

~~~
var o = require('../object/core'),

    ...

    if (!o) {
        throw new Error('Please run `npm install o2.object` first.');
    }
~~~

So if you see an error message in the console, make sure you `npm install` necessary modules first.

### Release Policy

// TODO: to be edited. This is a very rough outline right now.

Versions are in the form MAJOR.MINOR.PATCH

* PATCH: (backwards compatible) bug fixes (no new features)
* MINOR: (backwards compatible) features
* MAJOR: non-backwards-compatible changes.

every feature/bugfix to be added is forked into a feature branch (under features/branchname)

feature branches branch off from develop and merge back to develop.

every release branch branches off from develop and merges back to develop and master

release branches should not contain featured (i.e., only minor version increases in release branches)

release branch is higher than the version number in package.json

for for version: 2.0.12 the release branch should be at least 'release-2.1'.

before merging, make sure that the release branch does not have any CI build failures.

more info at http://semver.org/ and http://nvie.com/posts/a-successful-git-branching-model/

