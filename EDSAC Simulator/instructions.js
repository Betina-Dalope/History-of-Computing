var instructions = { //part of the ALU
	T: function(number) {
		memory[number] = controlUnit.accumulator;
		controlUnit.accumulator = 0;
	},
	G: function(number) {
		if (controlUnit.accumulator < 0)
			controlUnit.counter = number - 1;
	},
	Z: function() {
		controlUnit.stop();
		//ring alarm bell
	},
	O: function(number) {
		io.print(number);
	},
	A: function(number, flag) {
		controlUnit.accumulator = alu.add(controlUnit.accumulator, memory[number], flag);
	},
	U: function(number) {
		memory[number] = controlUnit.accumulator;
	},
	S: function(number, flag) {
		controlUnit.accumulator = alu.subtract(controlUnit.accumulator, memory[number], flag);
	}
}
