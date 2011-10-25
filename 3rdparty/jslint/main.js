load("jslint.js");
load("prefs.js");

var HEADER_TPL = 'JSLint found {length} problems:\nFile: {file}.';
var ERROR_TPL = 'ERROR: [Lint on file ({file}) at line {line} character {character}]: {reason}\n\t ===> {evidence}';
var GLOBALS_TPL = 'NOTICE: Global variable ({name}).';
var VARIABLE_TPL = 'NOTICE: {type} variable ({name}) inside function ({function}) on file ({file}) at line {line}.';

var file = arguments[0];
var source = readFile(file);
var output = [];

var isUndefined = function(o) {
    return typeof o === 'undefined';
};

var trim = function (s) {
    try {
        return s.replace(/^\s+|\s+$/g, '');
    } catch (e) {
        return s;
    }
};

var sub = function(s, o) {
    return s.replace ? s.replace(/\{\s*([^|}]+?)\s*(?:\|([^}]*))?\s*\}/g, function (match, key) {
        return isUndefined(o[key]) ? match : o[key];
    }) : s;
};

var repeat = function(string, length) {
	return new Array(length + 1).join(string);
};

var pushln = function(string, lines) {
	output.push(string + repeat('\n', lines || 1));
};

var report = function(data) {
	var errors = data.errors,
		globals = data.globals,
		unused = data.unused,
		dUndefined = data['undefined'];

	if (errors) {
		for (var i = 0; i < errors.length; i++) {
			var data = errors[i];

            if(!data) {
                continue;
            }
            
			data.evidence = trim(data.evidence);
			data.file = file;

			pushln(sub(ERROR_TPL, data), 2);
		}
	}

	if (globals) {
		globals = globals.sort();

		for (var i = 0; i < globals.length; i++) {
			pushln(sub(GLOBALS_TPL, { name: globals[i] }), 1);
		}
	}

	if (unused) {
		pushln('');

		for (var i = 0; i < unused.length; i++) {
			var data = unused[i];

			data.file = file;
			data.type = 'Unused';

			pushln(sub(VARIABLE_TPL, data));
		}
	}

	if (dUndefined) {
		pushln('');

		for (var i = 0; i < dUndefined.length; i++) {
			var data = dUndefined[i];

			data.file = file;
			data.type = 'Undefined';

			pushln(sub(VARIABLE_TPL, data));
		}
	}

    return output.join('');
};

var jslint = JSLINT(source, JSLINT_PREFS);
var data = JSLINT.data();

pushln(repeat('=', 70));
pushln(
	sub(HEADER_TPL, {
		file: file,
		length: data.errors ? data.errors.length : 0
	})
);
pushln(repeat('=', 70), 2);

print( report(data) );	
