var instructions = { //part of the ALU
	T: function(number) {
		memory[number] = controlUnit.accumulator;
		controlUnit.accumulator = 0;
		return true;
	},
	G: function(number) {
		if (controlUnit.accumulator < 0)
			controlUnit.counter = number;
		return true;
	},
	Z: function() {
		//controlUnit.stop();
		//ring alarm bell
		return false;
	},
	O: function(number) {
		io.print(number);
		return true;
	},
	A: function(number, flag) {
		controlUnit.accumulator = alu.add(controlUnit.accumulator, memory[number], flag);
		return true;
	},
	U: function(number) {
		memory[number] = controlUnit.accumulator;
		return true;
	},
	S: function(number, flag) {
		controlUnit.accumulator = alu.subtract(controlUnit.accumulator, memory[number], flag);
		return true;
	},
	E: function(number) {
		if (controlUnit.accumulator > 0)
			controlUnit.counter = number;
		return true;		
	},
	H: function(number) {
		alu.multiplier = number;
		return true;
	},
	L: function(number) {
		var shiftedAcc = controlUnit.accumulator.toString();
		for (var i = 0; i < number; i++) {
			shiftedAcc = shiftedAcc + "0";
		}
		return true;
	},
	V: function(number) {
		controlUnit.accumulator = alu.multiply(memory[number], alu.multiplier);
		return true;
	}
}
