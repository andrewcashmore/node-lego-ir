## LEGO Infrared

### What is is?
LEGO IR is module that returns an infrared buffer. This can then be used in combination with Tessel to control LEGO Power Functions!

### How do I use it?
```
var lego-ir = require('lego-ir');
var lego = new lego-ir({
  mode: 'comboDirect',
  channel: 1
});

var buffer = lego.move({
  outputA: 'forward',
  outputB: 'float'
});

// Send buffer to Tessel IR and watch your lego move!
```

## Modes

#### ComboDirect
ComboDirect allows you to control two outputs at once on a single channel.

**outputs**

* `outputA`
* `outputB`

**Move Options**

* `float`
* `brake`
* `forward`
* `backward`

**Payload Example**

```
lego.move({
  outputA: 'forward',
  outputB: 'float'
});
```

## Examples

#### Tessel IR

```
var tessel = require('tessel');
var infraredlib = require('ir-attx4');
var infrared = infraredlib.use(tessel.port['A']);  

var LegoIR = require('lego-ir');
var lego = new LegoIR({
  mode: 'comboDirect',
  channel: 1
});

var legoBuffer = lego.move({
  outputA: 'backward',
  outputB: 'forward'
});

infrared.on('ready', function() {
  if(err) throw new Error(err);
  console.log("Connected to IR module!");

  setInterval(function() {
    infrared.sendRawSignal(38, legoBuffer, function(err) {
      if(err) throw new Error(err);
      console.log("IR Signal Sent!");
    });
  }, 500);
});
```