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
The goal of this project is to provide a tool-chain tool for easily working with OMetaJS. `ometajsnode` allows one to specify grammar, interpreter, and compiler files, utility modules, and program files via command line, and offers a number of options of linking them together into an execution chain such as parse mode, interpreter mode, and compile mode.

Work in progress
----
I'm not sure if packaging works with `npm` yet, but I'll get there.
`stdin` input is not working yet.

Usage
----

Currently, parsing, interpreting, and "compiling" works. See below walkthrough.

see usage via `./ometajsnode -h` or `./ometajsnode --help`

#### Parser example:

from the `bin` directory:

`./ometajsnode -P -g ../examples/grammar_to_ir.ometajs --parser-root expr -o output.file ../examples/program.file ../examples/program2.file --debug`

Let's breakdown that command step by step:

* `-P` sets `ometajsnode` into Parse mode, which will essentially output the Abstract Syntax Tree for each of the programs
* `-g ../examples/grammar_to_ir.ometajs` specifies the file containing ometajs grammar to use
* `--parser-root expr` specifies 'expr' as the root element of the grammar for the parser to try to match
* `-o output.file` specifies the file to which output will be written ( if `-o` is not present, output is directed to `stdout` )
* `../examples/program.file ../examples/program2.file` specifies two programs to process
* `--debug` sets mode to debug, which will display a lot of information detailing the execution process

#### Combined parser and interpreter example:

from the `bin` directory:

`./ometajsnode -I -g ../examples/grammar_and_interpreter.ometajs --interpreter-root expr -o output.file ../examples/program.file ../examples/program2.file --verbose`

This command is similar to the one above with some differences:

* `-I` sets `ometajsnode` into Interpret mode, which will actually interpret each of the programs and display the result
* `--interpreter-root expr` similarly to `--parser-root`, this specifies the root element of the grammar for the interpreter to try to match
* `--verbose` sets mode to verbose, which is not as detailed as `debug`, but will give you more detailed information

#### Parser to intermediate representation which then is interpreted example:

from the `bin` directory:

`./ometajsnode -I -g ../examples/grammar_to_ir.ometajs --parser-root expr -i ../examples/interpreter.ometajs --interpreter-root interp -o output.file ../examples/program.file ../examples/program2.file --debug`

We have little bit more going on here:

* `-i` in addition to `-g` which specified the grammar file, we add an interpreter file that will work with the output of parsing according to grammar file
* because we specified both a grammar and an interpreter, we need to provide both `--parser-root` and `--interpreter-root`

#### Parser to intermediate representation, then intermediate representation to "assembly" code example:

from the `bin` directory:

`./ometajsnode -C -g ../examples/grammar_to_ir.ometajs --parser-root expr -c ../examples/compiler.ometajs --compiler-root comp -o output.file -u example-utilities ../examples/program.file --debug`

* `-C` indicates compile mode. I'm not yet sure this is named correctly, perhaps a more appropriate name would be emit mode. Nevertheless, in this example it uses `compiler.ometajs` to emit assembly-like code to a file
* `-c ../examples/compiler.ometajs` specifies the OMetaJS compiler file
* `-u example-utilities` specifies a comma separated list of utility modules (here only one) that `compiler.ometajs` uses in order to help it to generate "assembly". `ometajsnode` will attempt to `require('module name')` and will make it available to any `*.ometajs` files via `__Utilities[ <utilityName> ]`. `utilityName` must be exported by the module: `exports.utilityName = 'some name';

Feedback
----

I am not quite convinced that the 'parse', 'interpret', 'compile' mode breakdown makes sense, I'm open to suggestions on how to better organize execution modes. And of course, I welcome any other input or feedback. 

Cheers!