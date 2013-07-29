/*
 *  [ o2.js JavaScript Framework ]( http://o2js.com/ )
 *
 *  This program is distributed under the terms of the "MIT License".
 *  Please see the <LICENSE.md> file for details.
 */

// TODO: deleting all DOM-traverse code querySelector API is supported for
// all modern browsers including mobile chrome/opera/android/firefox/blackberry.
// This module will consist of a few lightweight helper methods around
// the queryselector api.

// if (!el.id) {
//     el.id = [frameworkName, generateGuid()].join(kEmpty);
// }

// if (name) {
//     return el.querySelectorAll(
//         format(kImmediateClassAndTagSelector, el.id, name,
//             className)
//     );
// }

// return el.querySelectorAll(
//     format(kImmediateClassSelector, el.id, className)
// );

// function select(el, selector) {
//     try {
//         return el.querySelectorAll(selector);
//     } catch(e) {
//         if (!el.id) {
//             el.id = [frameworkName, generateGuid()].join(kEmpty);
//         }

//         return el.querySelectorAll(
//             format("#", el.id, " ", selector);
//         );
//     }
// }

// TODO: select will give a collection of DOM nodes,
// we will need DOM-colleciton funcitons like
// filter(), find(), children(), parent(), map(), not()...
// the nodes filtered by those methods should be uniqe.
