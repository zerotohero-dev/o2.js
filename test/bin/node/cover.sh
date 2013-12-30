cd ../../..
rm -rf instrumented/src/o2
rm -rf instrumented/test/node
jscoverage test/node instrumented/test/node
jscoverage src/o2 instrumented/src/o2
vows instrumented/test/node/*.js --cover-html
mv coverage.html reports/coverage/node/coverage.html
