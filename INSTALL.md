            ___       _
      ____ |__ \     (_)____
     / __ \__/ /    / / ___/
    / /_/ / __/_   / (__  )    A Coherent Solution
    \____/____(_)_/ /____/  to Your JavaScript Dilemma ;)
               /___/

**[o2.js](http://o2js.com/)** Installation and Configuration Instructions
--------------------------------------------------------------------------------

To view and build the **o2.js** examples locally you need the following set up:

* **Java™ SE Runtime Environment** <http://www.java.com/en/>
* **Apache Server** <http://httpd.apache.org/> (you can also use
[MAMP](http://mamp.info/en/index.html) for **Mac OSx**,
[WAMP](http://www.wampserver.com/en/) for **Windows**, and
[it is really easy](https://help.ubuntu.com/community/ApacheMySQLPHP) to insall
a **LAMP** stack on linux)
* [**node.js**](http://nodejs.org/) (not required right now, but it's
**cool** to have NodeJS on your machine)

After having all those set up, the following things should be done:

* Test that **PHP** works.
    * Go to `http://localhost/`;
    * You should see a welcome page depending on which server you are using.
    for **MAMP** it will look something like the following:

![MAMP Example](http://o2js.com/assets/mamp.png)

* Configure **o2.js/batch/publish.sh**

        ...
        rm -rf {YOUR_PATH_TO_WWW_ROOT}/o2.js
        ...
        rsync -rv --exclude=.git ../ {YOUR_PATH_TO_WWW_ROOT}/o2.js/

Simply replace `YOUR_PATH_TO_WWW_ROOT` with the **physical**
path where `http://localhost` points to.

* Run **publish.sh**

        cd {PATH_TO_YOUR_PROJECTS}/o2.js/batch/
        sh publish.sh

* If everything is okay, you should see something similar when you
browse `http://localhost/o2.js/`:

        //TODO: insert image here.

> We do not have a **Windows** alternative for **publish.sh**,
> Would you like to
> [help us create one](https://github.com/v0lkan/o2.js/issues/80)?

* Enable **URL Rewrite**

How to do this depends on your server environment. Most of the **\*AMP**
stacks already install an url-rewrite-enabled environment. In **Ubuntu/Linux**
it's as easy as `sudo a2enmod rewrite;sudo /etc/init.d/apache2 restart`.

* Check that **URL Rewrite** engine actually works:

Go to `http://localhost/o2.js/examples/vcardapp/people/volkan`.
You should see something like this:

//TODO: insert image.

That's it. You're ready to test **[o2.js](http://o2js.com/)** locally.