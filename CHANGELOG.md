# o2.js v.2.2.0

* Implemented a basic debug module.

# o2.js v.2.1.0

* Created a debugger that does async logging on the server, and logs to the console on the client.
* Slightly changed the dependency mechanism between modules.

# o2.js v.2.0.12

* Created **o2.then**, a bare-bones **Promises/A+** compliant **Deferred** implementation.

# o2.js v.2.0.7

* Added minimally working **timer**, **object**, and **validate** modules.

# o2.js v.2.0.2

* Started creating `npm` modules for each **o2.js** module.
* Created a **CONTRIBUTE** file.

# o2.js v.0.26.12

* Started a major rewrite. The code is minimally complete.
* **o2.js** will be able to run in **Node.JS** and on the client.
* **o2.js** will fully support recent non-crappy user agents (*i.e., IE11.0 and above, Firefox 25.0 and above, Chrome 31.0 and above, Safari 7.0 and above, Opera 17.0 and above, iOS Safari 7.0 and above, Android Browser 4.3 and above, Opera Mini 7.0 and above, Blackberry Browser 10.0 and above, IE mobile 10.0 and above*)
* **o2.js** will, however, be extensible, so if a feature is not supported, it would be easy to write a plugin that shims the feature, and replace the functionality.
* We are in the year **2014** so **to hell with IE quirks mode**. The project will assume that IE browsers will be on **standards-compatible** mode.
