ometa-js-node
====

This project is a fork of OMetaJS by Alex Warth [master branch](https://github.com/alexwarth/ometa-js).

It is also initially based on nodejs conversion written by Sergey Berezhnoy [nodejs branch](https://github.com/veged/ometa-js).

#### OMetaJS

OMetaJS is a JavaScript implementation of OMeta, an object-oriented language for pattern matching. 

To learn more:

* [http://tinlizzie.org/ometa/](http://tinlizzie.org/ometa/)
* [http://tinlizzie.org/ometa-js/#Sample_Project](http://tinlizzie.org/ometa-js/#Sample_Project)
* [OMeta mailing list](http://vpri.org/mailman/listinfo/ometa)
* [mailing list archirves](http://vpri.org/pipermail/ometa/)

About
----
The goal of this project is to provide a tool-chain tool for easily working with OMetaJS. `omcc` allows one to specify grammar, utility modules, and program files via command line, and offers a way of linking them together into an execution chain.

Usage
----

See below walkthrough.

For command usage try `./omcc -h` or `./omcc --help`

#### Parser example:

from the `bin` directory:

`./omcc -g ../spec/data/grammar_to_ir.ometajs --grammar-match expr -o output.file ../spec/data/program.file --debug`

Let's breakdown that command step by step:

* `-g ../spec/data/grammar_to_ir.ometajs` specifies the file containing ometajs grammar to use
* `--grammar-match expr` specifies 'expr' as the root element of the grammar for the parser to try to match
* `-o output.file` specifies the file to which output will be written ( if `-o` is not present, output is directed to `stdout` )
* `../spec/data/program.file` specifies the program to process
* `--debug` sets mode to debug, which will display a lot of information detailing the execution process



#### Combined parser and interpreter example:

from the `bin` directory:

`./omcc -g ../spec/data/grammar_and_interpreter.ometajs --grammar-match expr -o output.file ../spec/data/program2.file --verbose`

This command uses grammar that also interprets, so the `output.file` will contain `212.90476...`; also, a different logging mode is used:

* `--verbose` sets mode to verbose, which is not as detailed as `debug`, but will give you more detailed information



#### Parser to intermediate representation which then is interpreted example:

from the `bin` directory:

`./omcc -g ../spec/data/grammar_to_ir.ometajs --grammar-match expr ../spec/data/program.file | ./omcc -g ../spec/data/interpreter.ometajs --grammar-match interp -o output.file --pipe-in --debug`

We introduce the `--pipe-in` option here:

* `--pipe-in` indicates that the input has been previously generated by `omcc`. notice that we are piping output from one `omcc` to another; `--pipe-in` is a flag that lets `omcc` know that it is working with input formatted by itself



#### Parser to intermediate representation, then intermediate representation to "assembly" code example:

from the `bin` directory:

`./omcc -g ../spec/data/grammar_to_ir.ometajs --grammar-match expr ../spec/data/program.file | ./omcc -g ../spec/data/compiler.ometajs --grammar-match comp -u example-utilities --pipe-in -o output.file --debug --no-pipe-out`

We introduce the utilities option here:

* `-u example-utilities` specifies a comma separated list of utility modules (here only one) that `compiler.ometajs` uses in order to help it to generate "assembly". `omcc` will attempt to `require('module name')` and will make it available to any `*.ometajs` files via `__Utilities[ <utilityName> ]`. `utilityName` must be exported by the module: `exports.utilityName = 'some name'`;
* `--no-pipe-out` prevents the output from being encoded. Usually output is encoded so that it can be understood by another instance of `omcc` taking it in for the next step in the pipeline. `--no-pipe-out` prevents that, allowing for special characters to take effect ( this is useful in code emitting scenarios )