var assert = require('assert');
var LegoIR = require(__dirname + '/../lib/lego.js');

describe('lego-ir', function(){

  describe('in comboDirect mode on channel 1', function(){

    var lego = new LegoIR({
      mode: 'comboDirect',
      channel: 1
    });

    describe('_loadMode()', function(){

      it('requires the instantiated mode', function(){
        assert.equal(lego.config.mode.code, 0001);
      });

    });

    describe('_validOutput()', function(){

      it('returns true for a valid output', function(){
        assert.equal(lego._validOutput('outputA'), true);
        assert.equal(lego._validOutput('outputB'), true);
      });

      it('returns false for an invalid output', function(){
        assert.equal(lego._validOutput('someOutput'), false);
      });

      it('returns false for no params', function(){
        assert.equal(lego._validOutput(), false);
      });

    });

    describe('_validMove()', function(){

      it('returns true for a valid move', function(){
        assert.equal(lego._validMove('float'), true);
        assert.equal(lego._validMove('forward'), true);
        assert.equal(lego._validMove('backward'), true);
        assert.equal(lego._validMove('brake'), true);
      });

      it('returns false for an invalid move', function(){
        assert.equal(lego._validMove('sidewards'), false);
      });

      it('returns false for no params', function(){
        assert.equal(lego._validMove(), false);
      });

    });

    describe('_xorNibbles()', function(){

      it('returns a string', function(){
        var nibbles = { nib1: '0000', nib2: '0001', nib3: '0100' };
        var result = lego._xorNibbles(nibbles);
        assert.equal(typeof result, 'string');
      });

      it('throws an error for no params', function(){
        assert.throws(lego._xorNibbles);
      });

      describe('calcuates the correct xor', function(){

        it('for moving forward on outputA', function(){
          var nibbles = { nib1: '0000', nib2: '0001', nib3: '0100' };
          assert.equal(lego._xorNibbles(nibbles), '1010');
        });

        it('for moving backward on outputA', function(){
          var nibbles = { nib1: '0000', nib2: '0001', nib3: '1000' };
          assert.equal(lego._xorNibbles(nibbles), '0110');
        });

        it('for moving forward on outputB', function(){
          var nibbles = { nib1: '0000', nib2: '0001', nib3: '0001' };
          assert.equal(lego._xorNibbles(nibbles), '1111');
        });

        it('for moving backward on outputB', function(){
          var nibbles = { nib1: '0000', nib2: '0001', nib3: '0010' };
          assert.equal(lego._xorNibbles(nibbles), '1100');
        });

        it('for moving forward on outputA and outputB', function(){
          var nibbles = { nib1: '0000', nib2: '0001', nib3: '0101' };
          assert.equal(lego._xorNibbles(nibbles), '1011');
        });

        it('for moving backward on outputA and outputB', function(){
          var nibbles = { nib1: '0000', nib2: '0001', nib3: '1010' };
          assert.equal(lego._xorNibbles(nibbles), '0100');
        });

      });

    });

    describe('_buildNibbles()', function(){

      var nibbles = lego._buildNibbles('1010');

      it('throws an error for no params', function(){
        assert.throws(lego._buildNibbles);
      });

      it('calls _xorNibbles', function(){
        assert(false);
      });

      it('returns an object of 4 nibbles', function(){
        assert(nibbles.nib1, true);
        assert(nibbles.nib2, true);
        assert(nibbles.nib3, true);
        assert(nibbles.nib4, true);
      });

      it('returns nib1 with correct channel', function(){
        assert.equal(nibbles.nib1, '0000');
      });

      it('returns nib2 with correct mode code', function(){
        assert.equal(nibbles.nib2, '0001');
      });

      it('returns nib3 with the move binary', function(){
        assert.equal(nibbles.nib3, '1010');
      });

      it('returns nib4 with the xor calculation', function(){
        assert.equal(nibbles.nib4, '0100');
      });

    });

    describe('_binaryToBits()', function(){

      it('throws an error for no params', function(){
        assert.throws(lego._binaryToBits, 'Error: Missing binary, can\'t create bit array');
      });

      it('returns a bit array for binary input', function(){
        var bitArray = lego._binaryToBits(0000000110100100);
        assert.deepEqual(bitArray, [ 0, 200, 252, 24, 0, 200, 252, 24 ]);
      });

    });

    describe('_nibblesToBuffer()', function(){

      it('returns a 72 length buffer', function(){
        var nibbles = { nib1: '0000', nib2: '0001', nib3: '1010', nib4: '0100' };
        var buffer = lego._nibblesToBuffer(nibbles);
        assert.equal(buffer.length, 72);
      });

      it('calls _binaryToBits()', function(){
        sinon.stub(lego, '');
      });

    });

    describe('move()', function(){

      it('calls _validOutput()', function(){});

      it('calls _validMove()', function(){});

      it('calls _buildNibbles()', function(){});

      it('calls _nibblesToBuffer()', function(){});

    });

  });

});