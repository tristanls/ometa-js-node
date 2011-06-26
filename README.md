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
The goal of this project is to provide a tool-chain tool for easily working with OMetaJS. `ometajsnode` allows one to specify grammar file, interpreter file, ( in future also compiler files/modules ), and program files via command line, and offers a number of options of execution such as parse mode, interpreter mode, and compile mode.

Work in progress
----
Incorporating compiler / code emitting code is going to get worked on soon.
I'm not sure if packaging works with `npm` yet, but I'll get there.
`stdin` input is not working yet.

Usage
----

Currently, parsing and interpreting works. See below walkthrough.

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

Feedback
----

I welcome your input and feedback.

Cheers!