Blockly.JavaScript['take_off'] = function(block) {
  // TODO: Assemble javascript into code variable.
  var code = 'launch_echo();' + '\n' + 'waitForSeconds(3);' + '\n';
  return code;
};

Blockly.JavaScript['land'] = function(block) {
  var code = 'land_echo();' + '\n' + 'waitForSeconds(3);' + '\n';
  return code;
};

Blockly.JavaScript['hover'] = function(block) {
  var value_seconds = Blockly.JavaScript.valueToCode(block, 'seconds', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'hover();' + '\n' + 'waitForSeconds(' + value_seconds + ');' + '\n';
  return code;
};

Blockly.JavaScript['fly'] = function(block) {
  var dropdown_fly = block.getFieldValue('fly');
  var value_seconds = Blockly.JavaScript.valueToCode(block, 'seconds', Blockly.JavaScript.ORDER_ATOMIC);
  var value_power = Blockly.JavaScript.valueToCode(block, 'power', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'fly('+ "'" + dropdown_fly + "'" + ',' + value_seconds + ',' + value_power +');' + '\n' + 'waitForSeconds(' + value_seconds + ');' + '\n';
  return code;
};

Blockly.JavaScript['spin'] = function(block) {
  var dropdown_spin = block.getFieldValue('spin');
  var value_seconds = Blockly.JavaScript.valueToCode(block, 'seconds', Blockly.JavaScript.ORDER_ATOMIC);
  var value_power = Blockly.JavaScript.valueToCode(block, 'power', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'spin('+ "'" + dropdown_spin + "'" + ',' + value_seconds + ',' + value_power +');' + '\n' + 'waitForSeconds(' + value_seconds + ');' + '\n';
  return code;
};
