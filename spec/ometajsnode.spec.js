var exec = require( 'child_process' ).exec;
var fs = require( 'fs' );

describe( 'omcc', function() {
  
  var usageMessage = 'Usage: omcc <-g|--grammar grammar_file> <--grammar-match expr_to_match> [options] input_file\n';
  
  it( 'should fail when no grammar is specified', function() {
    exec( './bin/omcc --grammar-match expr ./spec/data/program.file',
      function( error, stdout, stderr ) {
        expect( stderr ).toEqual( 
            'omcc[error]: no grammar specified\n' + usageMessage );
        expect( stdout ).toEqual( '' );
        asyncSpecDone();
    });
    asyncSpecWait();
  });
  
  it( 'should fail when no grammar-match is specified', function() {
    exec( './bin/omcc -g ./spec/data/grammar_to_ir.ometajs ./spec/data/program.file',
      function( error, stdout, stderr ) {
        expect( stderr ).toEqual( 
            'omcc[error]: no grammar-match expression specified\n' + 
            usageMessage );
        expect( stdout ).toEqual( '' );
        asyncSpecDone();
    });
    asyncSpecWait();
  });
  
  it( 'should parse program (6*(4+3)) from program.file using grammar_to_ir.ometajs and output to stdout', function() {
    exec('./bin/omcc -g ./spec/data/grammar_to_ir.ometajs --grammar-match expr ./spec/data/program.file',
      function( error, stdout, stderr ) {
        expect( stderr ).toEqual( '' );
        expect( stdout ).toEqual( '["mul",["num",6],["add",["num",4],["num",3]]]' );
        asyncSpecDone();
    });
    asyncSpecWait();
  });
  
  it( 'should parse program (6*(4+3)) from program.file using grammar_to_ir.ometajs and output to file', function() {
    exec('./bin/omcc -g ./spec/data/grammar_to_ir.ometajs --grammar-match expr -o ./spec/data/tmp/output.1.file ./spec/data/program.file',
      function( error, stdout, stderr ) {
        // should be nothing on stdout
        expect( stdout ).toEqual( '' );

        // file should contain the output of grammar
        fs.readFile( './spec/data/tmp/output.1.file', 'utf8', function( err, data ) {
          expect( err ).toBeNull();
          
          expect( data ).toEqual( '["mul",["num",6],["add",["num",4],["num",3]]]' );
          
          fs.unlink( './spec/data/tmp/output.1.file', function( err ) {
            expect( err ).toBeNull();
            asyncSpecDone();
          });
        });   
    });
    asyncSpecWait();
  });
  
  it( 'should parse program (6*(4+3)) from stdin using grammar_to_ir.ometajs and output to stdout', function() {
    exec( "echo '(6*(4+3))' | ./bin/omcc -g ./spec/data/grammar_to_ir.ometajs --grammar-match expr",
      function( error, stdout, stderr ) {
        expect( stderr ).toEqual( '' );
        expect( stdout ).toEqual( '["mul",["num",6],["add",["num",4],["num",3]]]' );
        asyncSpecDone();
    });
    asyncSpecWait();
  });
  
  it( 'should parse program (6*(4+3)) from stdin using grammar_to_ir.ometajs and output to file', function() {
    exec( "echo '(6*(4+3))' | ./bin/omcc -g ./spec/data/grammar_to_ir.ometajs --grammar-match expr -o ./spec/data/tmp/output.2.file",
      function( error, stdout, stderr ) {
        // should be nothing on stdout
        expect( stdout ).toEqual( '' );
        expect( stderr ).toEqual( '' );

        // file should contain the output of grammar
        fs.readFile( './spec/data/tmp/output.2.file', 'utf8', function( err, data ) {
          expect( err ).toBeNull();
          
          expect( data ).toEqual( '["mul",["num",6],["add",["num",4],["num",3]]]' );
          
          fs.unlink( './spec/data/tmp/output.2.file', function( err ) {
            expect( err ).toBeNull();
            asyncSpecDone();
          });
        });   
    });
    asyncSpecWait();
  });
  
  it( 'should parse piped output ["mul",["num",6],["add",["num",4],["num",3]]] from stdin using interpreter.ometajs and output to stdout', function() {
    exec( 'echo \'["mul",["num",6],["add",["num",4],["num",3]]]\' | ./bin/omcc -g ./spec/data/interpreter.ometajs --grammar-match interp --pipe-in',
      function( error, stdout, stderr ) {
        expect( stderr ).toEqual( '' );
        expect( stdout ).toEqual( '42' );
        asyncSpecDone();
    });
    asyncSpecWait();
  });
  
  it( 'should parse piped output ["mul",["num",6],["add",["num",4],["num",3]]] from stdin using interpreter.ometajs and output to file', function() {
    exec( 'echo \'["mul",["num",6],["add",["num",4],["num",3]]]\' | ./bin/omcc -g ./spec/data/interpreter.ometajs --grammar-match interp --pipe-in -o ./spec/data/tmp/output.3.file',
      function( error, stdout, stderr ) {
        expect( stderr ).toEqual( '' );

        // file should contain the output of grammar
        fs.readFile( './spec/data/tmp/output.3.file', 'utf8', function( err, data ) {
          expect( err ).toBeNull();
          
          expect( data ).toEqual( '42' );
          
          fs.unlink( './spec/data/tmp/output.3.file', function( err ) {
            expect( err ).toBeNull();
            asyncSpecDone();
          });
        });   
    });
    asyncSpecWait();
  });
  
  it( 'should parse intermediate representation ["mul",["num",6],["add",["num",4],["num",3]]] from ir.file using interpreter.ometajs and output to stdout', function() {
    exec( './bin/omcc -g ./spec/data/interpreter.ometajs --grammar-match interp --pipe-in ./spec/data/ir.file',
      function( error, stdout, stderr ) {
        expect( stderr ).toEqual( '' );
        expect( stdout ).toEqual( '42' );
        asyncSpecDone();
    });
    asyncSpecWait();
  });
  
  it( 'should parse intermediate representation ["mul",["num",6],["add",["num",4],["num",3]]] from ir.file using interpreter.ometajs and output to file', function() {
    exec( './bin/omcc -g ./spec/data/interpreter.ometajs --grammar-match interp --pipe-in -o ./spec/data/tmp/output.4.file ./spec/data/ir.file',
      function( error, stdout, stderr ) {
        expect( stderr ).toEqual( '' );

        // file should contain the output of grammar
        fs.readFile( './spec/data/tmp/output.4.file', 'utf8', function( err, data ) {
          expect( err ).toBeNull();
          
          expect( data ).toEqual( '42' );
          
          fs.unlink( './spec/data/tmp/output.4.file', function( err ) {
            expect( err ).toBeNull();
            asyncSpecDone();
          });
        });   
    });
    asyncSpecWait();
  });
  
  it( 'should parse program ((16-6)/(6*(4+3)))+((22/3)*(17+9+3)) from program2.file using grammar_to_ir.ometajs and output to stdout', function() {
    exec( './bin/omcc -g ./spec/data/grammar_to_ir.ometajs --grammar-match expr ./spec/data/program2.file',
      function( error, stdout, stderr ) {
        expect( stdout ).toEqual( 
            '["add",["div",["sub",["num",16],["num",6]],' +
            '["mul",["num",6],["add",["num",4],["num",3]]]],["mul",["div",' +
            '["num",22],["num",3]],["add",["add",["num",17],["num",9]],["num",3]]]]' );
        asyncSpecDone();
    });
    asyncSpecWait();
  });
  
  it( 'should parse program ((16-6)/(6*(4+3)))+((22/3)*(17+9+3)) from program2.file using grammar_to_ir.ometajs and output to file', function() {
    exec('./bin/omcc -g ./spec/data/grammar_to_ir.ometajs --grammar-match expr -o ./spec/data/tmp/output.5.file ./spec/data/program2.file',
      function( error, stdout, stderr ) {
        // should be nothing on stdout
        expect( stdout ).toEqual( '' );
        expect( stderr ).toEqual( '' );

        // file should contain the output of grammar
        fs.readFile( './spec/data/tmp/output.5.file', 'utf8', function( err, data ) {
          expect( err ).toBeNull();
          
          expect( data ).toEqual( 
              '["add",["div",["sub",["num",16],["num",6]],' +
              '["mul",["num",6],["add",["num",4],["num",3]]]],["mul",["div",' +
              '["num",22],["num",3]],["add",["add",["num",17],["num",9]],["num",3]]]]' );
          
          fs.unlink( './spec/data/tmp/output.5.file', function( err ) {
            expect( err ).toBeNull();
            asyncSpecDone();
          });
        });   
    });
    asyncSpecWait();
  });
  
  it( 'should parse program ((16-6)/(6*(4+3)))+((22/3)*(17+9+3)) from stdin using grammar_to_ir.ometajs and output to stdout', function() {
    exec( "echo '((16-6)/(6*(4+3)))+((22/3)*(17+9+3))' | ./bin/omcc -g ./spec/data/grammar_to_ir.ometajs --grammar-match expr",
      function( error, stdout, stderr ) {
        expect( stderr ).toEqual( '' );
        expect( stdout ).toEqual( 
            '["add",["div",["sub",["num",16],["num",6]],' +
            '["mul",["num",6],["add",["num",4],["num",3]]]],["mul",["div",' +
            '["num",22],["num",3]],["add",["add",["num",17],["num",9]],["num",3]]]]' );
        asyncSpecDone();
    });
    asyncSpecWait();
  });
  
  it( 'should parse program ((16-6)/(6*(4+3)))+((22/3)*(17+9+3)) from stdin using grammar_to_ir.ometajs and output to file', function() {
    exec( "echo '((16-6)/(6*(4+3)))+((22/3)*(17+9+3))' | ./bin/omcc -g ./spec/data/grammar_to_ir.ometajs --grammar-match expr -o ./spec/data/tmp/output.6.file",
      function( error, stdout, stderr ) {
        // should be nothing on stdout
        expect( stdout ).toEqual( '' );
        expect( stderr ).toEqual( '' );

        // file should contain the output of grammar
        fs.readFile( './spec/data/tmp/output.6.file', 'utf8', function( err, data ) {
          expect( err ).toBeNull();
          
          expect( data ).toEqual( 
              '["add",["div",["sub",["num",16],["num",6]],' +
              '["mul",["num",6],["add",["num",4],["num",3]]]],["mul",["div",' +
              '["num",22],["num",3]],["add",["add",["num",17],["num",9]],["num",3]]]]' );
          
          fs.unlink( './spec/data/tmp/output.6.file', function( err ) {
            expect( err ).toBeNull();
            asyncSpecDone();
          });
        });   
    });
    asyncSpecWait();
  });
  
});