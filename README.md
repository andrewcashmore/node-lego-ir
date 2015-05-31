## LEGO Infrared

### What is is?
LEGO IR is module that returns an infrared buffer. This can then be used in combination with Tessel to control LEGO Power Functions!

### How do I use it?
There are several different modes, I'm going to use 'comboDirect' for this example but more instructions on how to use each mode are below.

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