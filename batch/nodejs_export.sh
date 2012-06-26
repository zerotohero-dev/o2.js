#
# o2.js NodeJS Export Script.
# Exports entire o2.js to o2.js/index.js, as a NodeJS Module, by properly
# ordering and merging the files.
#
# +----------------------------------------------------------------------------+
# | This program is distributed under the terms of the MIT license.            |
# | Please see the LICENSE file for details.                                   |
# +----------------------------------------------------------------------------+
#
# lastModified: 2012-06-25 22:58:12.32078
#

echo 'Starting node.js export...'

cat \
../o2.js/o2.nodejs.header.js \
../o2.js/o2.meta.js \
../o2.js/o2.core.js \
../o2.js/o2.string.core.js \
../o2.js/o2.string.encode.js \
../o2.js/o2.string.strip.js \
../o2.js/o2.string.transform.js \
../o2.js/o2.event.constants.js \
../o2.js/o2.event.core.js \
../o2.js/o2.event.extend.js \
../o2.js/o2.ajax.core.js \
../o2.js/o2.ajax.extend.js \
../o2.js/o2.ajaxstate.core.js \
../o2.js/o2.ajaxcontroller.core.js \
../o2.js/o2.validation.core.js \
../o2.js/o2.validation.regexp.js \
../o2.js/o2.method.core.js \
../o2.js/o2.method.event.js \
../o2.js/o2.method.inherit.js \
../o2.js/o2.method.repeat.js \
../o2.js/o2.method.timer.js \
../o2.js/o2.method.transpose.js \
../o2.js/o2.collection.core.js \
../o2.js/o2.convert.core.js \
../o2.js/o2.cookie.core.js \
../o2.js/o2.date.core.js \
../o2.js/o2.debugger.core.js \
../o2.js/o2.dom.class.js \
../o2.js/o2.dom.collide.js \
../o2.js/o2.dom.constants.js \
../o2.js/o2.dom.coordinate.js \
../o2.js/o2.dom.core.js \
../o2.js/o2.dom.style.js \
../o2.js/o2.dom.dimension.js \
../o2.js/o2.dom.form.js \
../o2.js/o2.dom.load.js \
../o2.js/o2.dom.modify.js \
../o2.js/o2.dom.ready.js \
../o2.js/o2.dom.scroll.js \
../o2.js/o2.dom.traverse.js \
../o2.js/o2.effect.core.js \
../o2.js/o2.object.core.js \
../o2.js/o2.jsonpstate.core.js \
../o2.js/o2.jsonpcontroller.core.js \
../o2.js/o2.jsonp.core.js \
../o2.js/o2.querystring.core.js \
../o2.js/o2.sortdelegate.core.js \
../o2.js/o2.supports.core.js \
../o2.js/o2.template.core.js \
../o2.js/o2.timer.core.js \
../o2.js/o2.try.core.js \
../o2.js/o2.unit.core.js \
../o2.js/o2.nodejs.footer.js \
> ../o2.js/index.js

echo 'Completed node.js export.'
