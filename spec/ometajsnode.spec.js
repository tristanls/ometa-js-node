var exec = require( 'child_process' ).exec;

describe( 'ometajsnode', function() {
  
  it( 'should display version with --version option specified', function() {
    exec('./bin/ometajsnode --version',
      function( error, stdout, stderr ) {
        expect( stdout ).toEqual( 'ometajsnode 0.2.0\n' );
        asyncSpecDone();
      });      
    asyncSpecWait();
  });
  
});