Blockly.Blocks['take_off'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("up_arrow.png", 20, 20, { alt: "*", flipRtl: "FALSE" }))
        .appendField("take off");
    this.setNextStatement(true, null);
    this.setColour("#7B1FA2");
 this.setTooltip("Launch ECHO");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['land'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("down_arrow.png", 20, 20, { alt: "*", flipRtl: "FALSE" }))
        .appendField("land");
    this.setPreviousStatement(true, null);
    this.setColour("#7B1FA2");
 this.setTooltip("Land ECHO");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['hover'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("hover.png", 20, 20, { alt: "*", flipRtl: "FALSE" }))
        .appendField("hover for");
    this.appendValueInput("seconds")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField("second(s)");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#7B1FA2");
 this.setTooltip("Hover ECHO in place for number of seconds");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['fly'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("fly.png", 20, 20, { alt: "*", flipRtl: "FALSE" }))
        .appendField("fly")
        .appendField(new Blockly.FieldDropdown([["forward","forward"], ["backward","backward"], ["up","up"], ["down","down"], ["left","left"], ["right","right"]]), "fly");
    this.appendValueInput("seconds")
        .setCheck("Number")
        .appendField("for");
    this.appendDummyInput()
        .appendField("second(s) at");
    this.appendValueInput("power")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField("% speed");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#7B1FA2");
 this.setTooltip("Fly ECHO in the selected direction for number of seconds at 0 - 100% speed");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['spin'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldImage("spin.png", 25, 25, { alt: "*", flipRtl: "FALSE" }))
        .appendField("spin")
        .appendField(new Blockly.FieldDropdown([["left","left"], ["right","right"]]), "spin");
    this.appendValueInput("seconds")
        .setCheck("Number")
        .appendField("for");
    this.appendDummyInput()
        .appendField("second(s) at");
    this.appendValueInput("power")
        .setCheck("Number");
    this.appendDummyInput()
        .appendField("% speed");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour("#7B1FA2");
 this.setTooltip("Spin ECHO in selected direction for number of seconds at 0 - 100% speed");
 this.setHelpUrl("");
  }
};
