in progress...

read **CONTRIBUTE.md** for now.

also read **INSTALL.md** for installation instructions.

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

