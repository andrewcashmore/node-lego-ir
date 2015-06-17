var path = require('path');
var fs = require('fs');
var LegoIR = {};

var LegoIR = function(opts){
	if(!opts || !opts.mode || !opts.channel) throw new Error('Missing required params, please refer to documentation.');

	var configPath = path.join(__dirname, '../config');
	this.config = require(configPath);
	this.config.opts = opts;

	this._loadMode(opts.mode);
};

LegoIR.prototype._loadMode = function(mode){
	var modePath = path.join(__dirname, '../modes', mode);
  this.config.mode = require(modePath);
};

LegoIR.prototype._validOutput = function(output){
	var outputs = this.config.mode.outputs;
	return outputs.indexOf(output) > -1;
};

LegoIR.prototype._validMove = function(move){
	return move in this.config.mode.moves;
};

LegoIR.prototype._xorNibbles = function(nibbles){
	if(!nibbles) throw new Error('Missing nibbles for xor calculation');
  var xor = '';
  for(var i=0; i<4; i++){
    xor += 1 ^ nibbles.nib1[i] ^ nibbles.nib2[i] ^ nibbles.nib3[i];
  }
  return xor;
};

LegoIR.prototype._buildNibbles = function(moveBinary){
  if(!moveBinary) throw new Error('Missing move binary for nibble construction');
	var channel = this.config.opts.channel;
	var mode = this.config.mode;

	var nibbles = {
		nib1: '00'+this.config.channels[channel],
		nib2: mode.code,
		nib3: moveBinary
	};

	nibbles.nib4 = this._xorNibbles(nibbles);
	return nibbles;
};

LegoIR.prototype._binaryToBits = function(binary){
  if(!binary) throw new Error('Missing binary, can\'t create bit array');
	var bits = this.config.bits;
	var stream = bits.ss;

	for(var i=0; i<binary.length; i++){
		if(binary[i] == '1'){
			stream = stream.concat(bits.hb);
		} else {
			stream = stream.concat(bits.lb);
		}
	};

	return stream.concat(bits.ss);
};

LegoIR.prototype._nibblesToBuffer = function(n){
	var binary = n.nib1 + n.nib2 + n.nib3 + n.nib4;
	var stream = this._binaryToBits(binary);
	return new Buffer(stream);
};

LegoIR.prototype.move = function(move){
	if(!move) throw new Error('Missing outputs from move command');
	var mode = this.config.mode;
	var outputs = mode.outputs;

	var validOptions = true;
	for(var output in move) {
		validOptions = this._validOutput(output);
		validOptions = this._validMove(move[output]);
	};

	if(!validOptions) throw new Error('Invalid output or move for current mode.');

	var moveBinary = '';

	for(var i=0; i<outputs.length; i++){
		var isMoveSet = outputs[i] in move;
		var action = move[outputs[i]];

		if(isMoveSet) {
			moveBinary += mode.moves[action];
		} else {
			moveBinary += '00';
		};
	};

	var nibbles = this._buildNibbles(moveBinary);
	return this._nibblesToBuffer(nibbles);
};

module.exports = LegoIR;
