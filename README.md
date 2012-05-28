            ___       _
      ____ |__ \     (_)____
     / __ \__/ /    / / ___/
    / /_/ / __/_   / (__  )    A Coherent Solution
    \____/____(_)_/ /____/  to Your JavaScript Dilemma ;)
               /___/

About **[o2.js][2]**
--------------------------------------------------------------------------------

**[o2.js][2]** is a **JavaScript** Framework that's constantly evolving with
three main goals:

* **[o2.js][2]** will be **fast**,
* **[o2.js][2]** will be **flexible**,
* **[o2.js][2]** will be **reliable**.

> "In the land of heavy JavaScript libraries,
> o2.js will be like fresh oxygen **;)**."

**[o2.js][2]** is in still in its growth phase with a pretty stable code base.

Yet Another JavaScript Framework?! Seriously?
--------------------------------------------------------------------------------

We have to admit, **JavaScript**, in its native form is far from being perfect.
That's why there are so many frameworks around. Some of these frameworks provide
an **API** or **[Façade][4]** to query, manipulate and animate **DOM**, while
some of these frameworks extend the native **JavaScript** objects with a bunch
of useful functions and methods.

**[o2.js][2]** is somewhere in the middle. Actually, **[o2.js][2]** is not
and end-result. It is a **"by-product"**:

> Up till now, I've used various **JavaScript** techniques, analyzed and used
> almost all of the popular **JavaScript** frameworks, and have built a dozen
> of **JavaScript** libraries, from the ground up, myself.
>
> In that regard, my aim was **NOT** to develop yet another **JavaScript**
> framework. Per contra, my goal was to blog about peculiarities,
> intricacies, best-practices, patterns, use-cases, implementations of
> re-usable, cross-platform, optimized **JavaScript** code at
> <http://o2js.com/>.
>
> As a result, at <http://o2js.com/> I dived deep into the realm of
> **JavaScript**, trying to seek out library-independent solutions,
> and sharing my experiences along the way. I still actively blog and continue
> sharing my knowledge and experience [there][2].
>
> Ironically enough, while blogging at <http://o2js.com>, I realized that the
> code snippets that I was mixing together as blog posts were evolving into
> a solid and re-usable **JavaScript** *framework*.
>
> May the source be with you,
>
> Volkan.

Hope you like the outcome **;)**.

Supported Platforms & User Agents
--------------------------------------------------------------------------------

**[o2.js][2]** is being designed to run pretty smoothly in almost any
device/useragent. What makes this possible is the fact that **[o2.js][2]**
utilizes modern features whenever possible, while gracefully degrading to slower
alternatives for the less capable browsers.

For instance, **[o2.js][2]** **DomHelper** selectors will try to use
*DOM Level 2* *native* **querySelector** method if available, and will fall back
to a good-old for loop otherwise.

**[o2.js][2]** is constantly being developed keeping backwards compatibility in
mind. Before each major release, **[o2.js][2]** will be unit-tested in
**at least** the following browsers/platforms:

* **IE7 Windows** (and above -- o2.js also works on IE6,
but it will not be tested)
* **Firefox/Linux** (the Most Recent Stable Version)
* **Opera/Linux** (the Most Recent Stable Version)
* **Google Chrome/Linux** (the Most Recent Stable Version)
* **Firefox/Windows** (the Most Recent Stable Version)
* **Opera/Windows** (the Most Recent Stable Version)
* **Google Chrome/Windows** (the Most Recent Stable Version)
* **Safari/Windows** (the Most Recent Stable Version)

How to Install
--------------------------------------------------------------------------------

> Currently there are no distributable files. But
> [there is an open ticket](https://github.com/v0lkan/o2.js/issues/78) for those
> who are interested to create one.
>
> See also [How Do I Contribute][5]
> section if you are looking for other ways to add value to the project.

You can [directly download the zipball](https://github.com/v0lkan/o2.js/zipball/master)
of the recent version, but [if you want to contribute][5]

* Opening a **github** account;
* **[Forking us](http://help.github.com/fork-a-repo/)**;
* Reading [**o2.js** Conventions](https://github.com/v0lkan/o2.js/blob/master/CONVENTIONS.md)
(which is an *excellent read** even if you do not plan to contribute, so we
higly recommend you read it **;)**)
* Then reading "[How Do I Contribute][5]" section

is the way to go.

See [Installation and Configuration Instructions][6]
for a more in-depth information on how to set up **o2.js** for
local development.

A Quick Example
--------------------------------------------------------------------------------

Here is a quick code sample to give you a feeling of **o2.js** :

        (function(o2, window, document, undefined) {
            'use strict';

            /*
             * Aliases
             */
            var alert = window.alert;
            var on    = o2.Event.addEventListener;
            var ready = o2.ready;

            /*
             * Will be executed when DOM is ready.
             */
            ready(function() {
                on(document, 'click', function() {
                    alert('Hello World; Hello Stars; Hello Universe!');
                });
            });
        }(this.o2, this, this.document));

The above code will show you an alert when you click anywhere on the page.

You can [have a look at the **examples/hello-world** folder](https://github.com/v0lkan/o2.js/blob/master/examples/hello-world)
to see the whole code.

You can also [test it on your local environment](http://localhost/o2.js/examples/hello-world/index.html)
if you have completed the installation instructions in the previous section.

Directory Structure
--------------------------------------------------------------------------------

The directory structure of the project is as follows:

* **3rdparty**: 3rd party components and plugins that are utilized.
* **batch**: Documentation, deployment, and configuration scripts.
* **doc**: Generated documentation.
* **examples**: Sample projects and usage examples (*work in progress*).
* **o2.js**: The **o2.js** Framework source files.
* **tests**: Unit tests (*they are being rewritten*).
* **[CHANGELOG.md][9]: What's new in the current version. What development has
been done so far.
* **[CONVENTIONS.md][7]**: Code conventions and best practices for those who
want to contribute.
* **[INSTALL.md][6]**: Installation and configuration instructions for the
development environment.
* **[LICENSE.md][8]**: The usual *copyright* yadda yadda. **o2.j2** is
is distributed under **MIT** license, so feel free to **fork it**.
* **README.md**: This file that you are currently viewing.

Where Can I Get Help?
--------------------------------------------------------------------------------

//TODO: update me.

Where is the Documentation?
--------------------------------------------------------------------------------

//TODO: update me.

Contribution Guidelines
--------------------------------------------------------------------------------

//TODO: add contribution guidelines.
//instructions to submit bugs, feature requests, submit patches,
//get announcements

Contributor List
--------------------------------------------------------------------------------

* **Volkan Özçelik**
([geeklist](http://geekli.st/volkan) /
[twitter](http://twitter.com/linkibol) /
[blog](http://o2js.com/))
* **Jose Capablanca** ([github](https://github.com/josecapablanca))
* ([who else wants to contribute and be in this list?][5])

Change Log
--------------------------------------------------------------------------------

//TODO: link to changelog, maintain changelog.

License
--------------------------------------------------------------------------------

//TODO: link to changelog, maintain changelog.

Contact Information
--------------------------------------------------------------------------------

//TODO: update me.
//(email address, website, company name, address, etc)

            ___       _
      ____ |__ \     (_)____
     / __ \__/ /    / / ___/
    / /_/ / __/_   / (__  )    A Coherent Solution
    \____/____(_)_/ /____/  to Your JavaScript Dilemma ;)
               /___/

[1]: http://linkedin.com/in/volkanozcelik "Volkan Özçelik (LinkedIn)"
[2]: http://o2js.com/ "o2js.com - A Coherent Solution to Your JavaScript Dilemma"
[3]: http://twitter.com/linkibol "linkibol.com - Web2.0 Social Bookmarking"
[4]: http://en.wikipedia.org/wiki/Facade_pattern "Façade Pattern"
[5]: https://github.com/v0lkan/o2.js/blob/master/WE_LOVE_YOU.md "How Do I Contribute"
[6]: https://github.com/v0lkan/o2.js/blob/master/INSTALL.md "Installation and Configuration Instructions"
[7]: https://github.com/v0lkan/o2.js/blob/master/CONVENTIONS.md "Code Conventions and Best Practices"
[8]: https://github.com/v0lkan/o2.js/blob/master/LICENSE.md "Boring Copyright Stuff"
[8]: https://github.com/v0lkan/o2.js/blob/master/CHANGELOG.md "Change Log"