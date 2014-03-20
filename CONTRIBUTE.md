            ___       _
      ____ |__ \     (_)____
     / __ \__/ /    / / ___/
    / /_/ / __/_   / (__  )    A Coherent Solution
    \____/____(_)_/ /____/  to Your JavaScript Dilemma ;)
               /___/

How Can I Contribute to **[o2.js][o2jscom]**
--------------------------------------------------------------------------------

### Introduction

> Open source software has changed the world, and it will continue to do so, and it’s true that many of you would love to **contribute**. And many of you are also daunted by the glass ceiling over them, as they see the barrier to entry of a project overwhelming.

At this repo, there are certain things (*such as this CONTRIBUTE document*) that are designed just to decrease this “pseudo” barrier.

Another thing is when you browse [the issue list][open-issues] you'll see that the issues are labeled with **@@beginner**, **@@intermediate**, and **@@advanced** tags to give you a feeling of “where to start”.

> Admittedly, [the issue list][open-issues] is a mess in an of itself. &ndash; If you find an issue interesting, but it looks too daunting to start, just **comment on it** and you will receive the help you need.

But first let us start with addressing the usual excuses:

* **You do not** need to be a rock-star programmer to contribute;
* **You do not** need to have plenty of time to contribute;
* **You do not** need to to read the entire code base to contribute;
* **You do not** even have to write code to contribute.

Per contra:

* **Anyone** can contribute;
* **Any** contribution is better than none;
* **There's no spoon**: The barrier to entry does not exist; It's nowhere but in your mind.

Designing a new framework may require some lead and inspiration, and the rest what makes a project succeed is “perspiration”. Your contribution **will** get noticed, and **will** be appreciated, not only by the users of this framework but also

* By other open-source enthusiasts;
* By your friends and colleagues;
* And by your *potential* employers.

There are several ways you can add value, and actively coding is just one of them. Here are several ways to contribute:

### Use **[o2.js][o2jscom]** in Your Projects

Send your feedback if you use **[o2.js][o2jscom]** in your projects.

You can [open an issue][issues] to share your comments and suggestions.

### Spread the Word Around

Write about **[o2.js][o2jscom]**;

Do you have a blog? Write about **[o2.js][o2jscom]**.

Do you use Facebook? Then share **[o2.js][o2jscom]** on **Facebook**.

Are you a tweeter? Then tweet about **[o2.js][o2jscom]**. 

### Raise New Issues

Have an idea, have a suggestion? &ndash; Then [open an issue][issues].

### Suggest a Feature

Related to the above, you can help by suggesting an interesting or innovative feature to **[o2.js][o2jscom]**.

Bonus points if you start actually implementing it **;)**çç.

### Trace and Diagnose an Issue

Issues are generally poorly reported. 

When you diagnose a bug and come up with additional findings, sharing them as **comments** under the issue will help people save time. 

So try to figure out the specifics of the problem:

* Is it reproducible, or is it ad-hoc?
* What are the steps to reproduce the problem?
* What's the OS/User Agent that the problem occurs?
* Can you narrow the problem down? (*e.g., it work in one user agent, but fails in another*)

Add your findings to the issue as comments for everyone else to see. Your efforts will definitely make it easier for someone else to fix the issue.

### Help with the Documentation

> Documentation is like sex. When it’s good, it's **really** good.
> And when it's bad, it’s better than nothing ;)

Documentations generally suffer from having been written from the point of view of the people who are familiar with the project. 

> The vision of someone just **getting into** the project is ultimately necessary to create a good documentation:
> 
> If you see things that are missing, or counter-intuitive in the documentation, **suggest an update** for it. 
> 
> Most of the things are taken for granted may not be so apparent when you are not familiar with the project.

#### Documentation Syntax

**[o2.js][o2jscom]** uses [YUIDoc syntax][yuidoc] for documentation. You can get used to it by simply reading the source code.

Here is a sample function documentation:

~~~
/**
 * Defers tasks to `requestAnimationFrame`. 
 * 
 * Use this instead of `window.setTimeout`.
 *
 * @method setTimeout
 * @static
 * @final
 *
 * @example
 *     var timer = require('amd/o2/timer/core');
 *
 *     var id = timer.setTimeout(function() {
 *         console.log('This will run at least after a second');
 *     }, 1000);
 *
 * @param {Function} delegate - the delegate to execute in the future.
 * @param {Number} timeout - timeout in milliseconds.
 * 
 * @returns {Number} - a timeout id that we can use to clear the timeout.
 */
~~~

> To compile **[o2.js][o2jscom] documentation, run `grunt doc`.
> 
> Read **[INSTALL.md][install]** for further installation and configuration instructions.

### Seek the Code for Hidden “TODO’ Items

You can `grep -RIn TODO .` the `o2.js/src` folder and either **fork** the repository (we'll come to that soon below) and try to fix them yourself; or you can [open an issue][issues] for them.

### Implement a Feature that You Need

Are you experiencing a problem? Do you need a feature? Then, try **forking** the repository, implementing it yourself, and then sending a **pull request**.

Your solution does not need to be perfect. It will be a starting point to discuss and develop.

### Add a Usage Example

The **examples** folder needs your attention. You are more than welcome to create a usage example and put it there.

You can also write a blog post about your particular use case, and share the link as an **issue** so that we can add it to a **related links** section.

> No project can have too many examples. And a solid example that explains the proper usage of the project is worth a thousand pages of documentation.

### Add Unit Tests

**[o2.js][o2jscom]** uses two test directories:

* **test/web** for testing **AMD** modules;
* And **test/node** for testing **Node.JS** modules.

> There is no such thing as “too many tests”. Feel free to add additional tests to the **test** folder.

Use `grunt testAll` to execute all the tests.

### Add a Comment

When you're reading the code, you can find parts of it tricky or confusing. If you find them confusing, someone else also will. 

Even if you cannot find the purpose of an algorithm update, you can always add a comment in the code asking for further documentation and clarification.

### Get Your Hands Dirty and Fork **[o2.js][o2git]**

> Every time someone forks **[o2.js][o2git]**, a unicorn jumps over a rainbow.

It's **awesome** that you really want to dive into the source and actually get stuff done.

If that's the case, here's a brief guideline for you:

![Read the Source Luke](http://o2js.com/assets/luke.png)

1. Before starting anything **carefully** read the [o2.js **JavaScript** Conventions & Best Practices][conventions].
2. Read the **Source Code** to get a feeling of the practical application of those conventions, variable namings, indentation, and the like.
3. Fork **[o2.js][o2git]**.
4. Clone your fork into your local repository.
5. Make sure you are working on the **dev** branch.
6. **Branch out from the dev branch**, and create a thoughtfully named **topic branch** containing your change.
7. Implement your change.
8. `grunt lint` your code, make sure that everything is green.
9.  Run `grunt complexity` and check that your patch is not too complex. If it is, refactor it to make it simpler.
10. Run the **publish** script (`grunt publish`).
11. **merge** the **topic branch** into the **dev** branch.
12. Push the **dev** branch.
13. Send a **pull request** to <https://github/v0lkan/o2.js/> project.

#### A Step by Step Introduction

#### Setup grunt

[Follow this “getting started” guide][grunt-start].

[grunt-start]: http://gruntjs.com/getting-started

#### Setup git

* [git setup for Mac][gitmac]
* [git setup for Windows][gitwin]
* [git setup for Linux][gittux]

[gitmac]: http://help.github.com/mac-set-up-git/
[gitwin]: http://help.github.com/win-set-up-git/
[gittux]: http://help.github.com/linux-set-up-git/

#### Fork **[o2.js][o2jscom]**

Forking **[o2.js][o2jscom]** is easy:

* Go to <https://github/v0lkan/o2.js/>;
* Click the **fork** button.

![Fork Example](http://o2js.com/assets/fork.png)

* Your **forked** repository will look like the following, on github:

![Forked Repository](http://o2js.com/assets/jose.png)

* Go to your Projects folderİŞÇ:

~~~ 
$ cd ~/PROJECT/
~~~

* Clone your forked repository, and checkout the dev branch:

~~~
git clone git@github.com:josecapablanca/o2.js.git
cd o2.js
git checkout -b dev origin/dev
~~~

* Make sure that you are on the dev branch:

~~~
$ git branch
        * dev
          master
~~~

* Branch out from **dev**:

~~~ 
$ git branch DocumentationReminder
$ git checkout DocumentationReminder
~~~

* Hack around, do your code changes.

* Lint your code when doneŞÇ:

~~~
$ grunt lint

Running "jshint:src" (jshint) task
>> 10 files lint free.

Done, without errors.
~~~

* Do a complexity analysisŞ:

~~~
$ grunt complexity

Running "complexity:generic" (complexity) task
 
✓ src/o2/ajax/core.js                         ████████ 161.23
✓ src/o2/ajax/node_modules/o2.string/core.js  █████████ 171.00
✓ src/o2/debug/core.js                        █████████ 173.48
✓ src/o2/io/core.js                           █████████ 171.00
✓ src/o2/object/core.js                       ████████ 170.10
✓ src/o2/string/core.js                       █████████ 171.00
✓ src/o2/timer/config.js                      ██████ 133.03
✓ src/o2/timer/core.js                        ██████ 135.74
✓ src/o2/timer/node_modules/o2.debug/core.js  █████████ 173.48

Done, without errors.
~~~

* Run the publish script. The output should be similar to the following:

~~~
$ grunt publish

Running "exec:clean" (exec) task

Running "exec:install" (exec) task
>> npm
>> http GET https://registry.npmjs.org/o2.string/0.0.7
>> npm
>> http 304 https://registry.npmjs.org/o2.string/0.0.7
o2.string@0.0.7 node_modules/o2.string
>> npm
>> 
>> http
>> GET https://registry.npmjs.org/o2.debug/0.0.2
>> npm
>> http 304 https://registry.npmjs.org/o2.debug/0.0.2
o2.debug@0.0.2 node_modules/o2.debug

Running "exec:amdify" (exec) task

Running "jshint:src" (jshint) task
>> 10 files lint free.

Running "complexity:generic" (complexity) task
 
✓ src/o2/ajax/core.js                         ████████ 161.23
✓ src/o2/ajax/node_modules/o2.string/core.js  █████████ 171.00
✓ src/o2/debug/core.js                        █████████ 173.48
✓ src/o2/io/core.js                           █████████ 171.00
✓ src/o2/object/core.js                       ████████ 170.10
✓ src/o2/string/core.js                       █████████ 171.00
✓ src/o2/timer/config.js                      ██████ 133.03
✓ src/o2/timer/core.js                        ██████ 135.74
✓ src/o2/timer/node_modules/o2.debug/core.js  █████████ 173.48

Done, without errors.
~~~

* merge with the **dev** branch:

> If everything was successful so far, then it’s time to merge with the **dev** branch.

~~~
$ git checkout dev
$ git merge DocumentationReminder
$ git branch -D DocumentationReminder
~~~

* Push your changes to the remote repository:

~~~
$ git push origin dev
~~~

* Point your upstream to the **[o2.js][o2jscom]** original repository:

~~~
$ git remote add upstream git@github.com:v0lkan/o2.js.git
~~~

* Send a **pull request** on github by clicking on the **pull** button in your repository:

![Pull](http://o2js.com/assets/pull.png)

* Make sure that you are doing the pull request from the **dev branch** on your local repo, to the **dev branch** of the remote repo.

![Dev Branch](http://o2js.com/assets/devbranch.png)

* The code will be merged, into **[o2.js][o2jscom]** code base if the change is useful, addresses and issue, or enhances the library.
* If the code, at its current state, cannot be merged, it'll be kindly rejected by giving pointers to how it can be improved further, so that it can be merged.

That ends a typical **[o2.js][o2jscom]** project contribution cycle. If you want to do another change, you most probably would want to get the updates from your **upstream** first:

~~~
$ git checkout dev
$ git fetch upstream
$ git merge upstream/dev
$ git push origin dev
~~~

* You can then **branch out** from **dev**, and start the contribution cycle over again.

That is the end of this quick tutorial.

**May the source be with you**.

[o2jscom]:       http://o2js.com/  "o2js.com - A Coherent Solution to Your JavaScript Dilemma"
[issues]:        https://github.com/v0lkan/o2.js/issues/new "o2.js - Open an Issue"
[open-issues]:   https://github.com/v0lkan/o2.js/issues?state=open&utf8=%E2%9C%93
[yuidoc]:        http://yui.github.io/yuidoc/syntax/
[grunt]:         http://gruntjs.com/
[grunt-install]: http://gruntjs.com/getting-started
[install]:       https://github.com/v0lkan/o2.js/blob/dev/INSTALL.md
[o2git]:         https://github.com/volkan/o2.js
[conventions]:   https://github.com/v0lkan/o2.js/blob/dev/CONVENTIONS.md