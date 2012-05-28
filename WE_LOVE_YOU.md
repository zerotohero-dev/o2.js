            ___       _
      ____ |__ \     (_)____
     / __ \__/ /    / / ___/
    / /_/ / __/_   / (__  )    A Coherent Solution
    \____/____(_)_/ /____/  to Your JavaScript Dilemma ;)
               /___/

How Can I Contribute to **[o2.js](http://o2js.com/)**
--------------------------------------------------------------------------------

### Introduction

Open source software has changed the world, and it will continue to do so.
And we know that many of you would love to **contribute**. And many of you
are also daunted by the glass ceiling over them, as they see the barrier to
entry of a project overwhelming.

At **o2.js** we, to the best of our ability, try to decrease this "pseudo"
barrier to entry. When you browse
[the issue list](https://github.com/v0lkan/o2.js/issues?state=open&utf8=%E2%9C%93)
you'll see that the isues are labeled with **@@beginner**, **@@intermediate**,
and **@@advanced** tags to give you a feeling of "where to start".

But first let us start with addressing the usual excuses:

* You do not need to be a rock-star programmer to contribute;
* You do not need to have plenty of time to contribute;
* You do not need to to read the entire code base to contribute.

Per contra:

* **Anyone** can contribute.
* **Any** contribution is better than none.
* **There's no spoon**: The barrier to entry does not exist. It's nowhere but
in your mind.

Designing a new framework may require some lead and inspiration, and the rest
what makes a project succeed is "perspiration". Your contribution **will**
get noticed, and **will** be appreciated, not only by the users of this
framework but also

* by other open-source enthusiasts,
* by your friends and colleagues,
* and by your *potential* employers.

There are several ways you can add value, and actively coding is just one of
them. Here are several ways to contribute:

### Use **o2.js** in Your Projects

We'd love to have your feedback if you use **[o2.js][1]** in your projects.

You can [open an issue][2] to share your comments and suggestions.

We **love** to hear from you!

### Spread the Word Around

Write about **[o2.js][1]**; share it on **Facebook**, tweet about it. Do you
have a blog? Write about **[o2.js][1]**.

### Raise New Issues

Have an idea, have a suggestion.
Then [open an issue][2].

### Suggest a Feature

Related to the above, you can be helpful and suggest an interesting or
innovative feature for **[o2.js][1].

Bonus points if you start actually implementing it **;)**,

### Trace and Diagnose an Issue

Issues are generally poorly reported. When you diagnose a bug and come up
with additional findings, sharing them as **comments** under the issue will
help people save time. So try to figure out the specifics of the problem:

* Is it reproducable, or is it ad-hoc?
* What are the steps to reproduce the problem?
* What's the OS/User Agent that the problem occurs?
* Can you narrow the problem down? (i.e. work in one user agent, but
fails in another)

Add your findings to the issue as comments for everyone else to see. Your
efforts will definitely make it easier for someone else to fix the issue.

### Help with the Documentation

> Documentation is like sex. When it's good, it's **really** good.
> And when it's bad, it's better than nothing ;)

Documentations generally suffer from having been written from the point of
view of the people who are familiar with the project. The vision of someone
just **getting into** the project is ultimately necessary to create a good
documentation. If you see things that are missing, or counter-intuitive in
the documentation, **suggest an update** for it. Most of the things we take
for granted may not be so apparent when you are not familiar with the project.

#### Documentation Syntax

**o2.js** uses [jgrousedoc syntax](http://code.google.com/p/jgrousedoc/) for
documentation. You can get used to it by simply reading the source code.

Here is a sample function documentation:

    /**
     * @function {protected static} o2.AjaxState.addObserver
     *
     * <p>An implementation of the <code>Observer.addObserver</code>
     * method.</p>
     * <p>Registers an <code>Observer</code>.</p>
     *
     * <p>This method is <strong>protected</strong>, in a sense that it's not
     * meant to be called directly. {@link o2.AjaxController} and
     * {@link o2.JsonpController} use it indirectly to register themselves.</p>
     *
     * @param {Object} observer - the <code>Observer</code> to register.
     */
#### How to Compile the Documentation

Running `cd batch;sh publish.sh` will automagically create the documentation and
put it into the **doc** folder if you have
[followed the installation steps](https://github.com/v0lkan/o2.js/blob/master/INSTALL.md).

### Seek the Code for Hidden "TODO" Items

You can `grep -RIn TODO .` the `o2.js/o2.js` folder and either **fork** the
repository (we'll come to that soon below) and try to fix them yourself; or
you can [open an issue][2] for them.

### Implement a Feature that You Need

Are you experiencing a problem. Do you need a feature. Try **forking** the
repository, implementing it yourself, and then sending a **pull request**.

Your solution does not need to be perfect. It will be a starting point to
discuss and develop.

### Add a Usage Example

The **examples** folder needs your attention. We'd very much appreciate if
you create a usage example and put it there.

You can also write a blog post about your particular use case, and share the
link as an **issue** so that we can add it to a **links** section.

No project can have too many examples. And a solid example explaining the
proper usage of the project is worth a thousand pages of documentation.

### Add Unit Tests

// TODO: the test runner is currently under heavy development. update this
// part when the unit test runner is finalized.

### Add a Comment

When you're reading the code, you can find parts of it tricky or confusing.
If you find them confusing, someone else also will. Even if you cannot propose
an algorithm update, you can add comment in the code asking for further
documentation and clarification.

### Get Your Hands Dirty and Fork Us

> Every time someone forks **[o2.js](github.com/volkan/o2.js)**, a unicorn
> jumps over a rainbow.

It's **awesome** that you really want to dive into the source and actually
get stuff done.

If that's the case, here's a brief guideline for you:

![Read the Source Luke](http://o2js.com/assets/localhost.png)

1. Before starting anything **carefully** read the
[o2.js **JavaScript** Conventions & Best Practices](https://github.com/v0lkan/o2.js/blob/master/CONVENTIONS.md)
document.
2. Read the Source Code to get a feeling of the practical application of those
conventions, variable namings, indentation, and the like.
3. Fork **o2.js**.
4. Clone your fork into your local repository.
5. Make sure you are working on the **dev** branch.
6. Create a thoughtfully-named topic branch containing your change.
7. Implement your change.
7. Push your branch.
9. Send a **pull request** to <https://github/v0lkan/o2.js/> project.

#### A Step by Step Introduction

#### Setup git

* [git setup for Mac](http://help.github.com/mac-set-up-git/)
* [git setup for Windows](http://help.github.com/win-set-up-git/)
* [git setup for Linux](http://help.github.com/linux-set-up-git/)

#### Fork **[o2.js][1]**

Forking **[o2.js][1]** is easy:

* Go to <https://github/v0lkan/o2.js/>
* Click the **fork** button.

![Fork Example](http://o2js.com/assets/fork.png)

* Your **forked** repository will look like the following, on github:

![Forked Repository](http://o2js.com/assets/jose.png)

* Go to your Projects folder.

        cd ~/PROJECT/

* Clone your forked repository, and checkout the dev branch:

        git clone git@github.com:josecapablanca/o2.js.git
        cd o2.js
        git checkout -b dev origin/dev

* Make sure that you are on the dev branch:

        $ git branch
        * dev
          master

* Branch out from **dev**:

        $ git branch DocumentationReminder
        $ git checkout DocumentationReminder

* Hack around, do your code changes.

* Merge with the **dev** branch":

        $ git checkout dev
        $ git merge DocumentationReminder
        $ git branch -D DocumentationReminder

* Push your changes to the remote repository:

        $ git push origin dev

* Point your upstream to the **[o2.js][1]** original repository:

        $ git remote add upstream git@github.com:v0lkan/o2.js.git

* Send a **pull request** on github by clicking on the **pull** button
in your repository:

![Read the Source Luke](http://o2js.com/assets/pull.png)

* Make sure that you are doing the pull request from the **dev branch** on
your local repo, to the **dev branch** on the remote repo.

![Read the Source Luke](http://o2js.com/assets/devbranch.png)

* We will do our best to merge your change into **[o2.js][1]** code base
if the change is useful, addresses and issue, or enhances the library,
**AND** the code adheres to **[o2.js Conventions and Best Practices](https://github.com/v0lkan/o2.js/blob/master/CONVENTIONS.md)**.
If the code cannot be merged, it'll be kindly rejected by giving pointers to
how it can be improved further.

* That ends a typical **[o2.js][1]** project contribution cycle. If you want
to do another change, you most probably would want to get the updates from
your **upstream** first:

        $ git checkout dev
        $ git fetch upstream
        $ get merge upstream/dev
        $ git push origin dev

* You can then **branch out** from **dev**, and start the contribution
cycle over again.

That's the end of this quick tutorial.

**May the source be with you**.

[1]: http://o2js.com/  "o2js.com - A Coherent Solution to Your JavaScript Dilemma"
[2]: https://github.com/v0lkan/o2.js/issues/new "o2.js - Open an Issue"