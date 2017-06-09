var instructions = { //part of the ALU
	T: function(number) {
		memory[number] = controlUnit.accumulator;
		controlUnit.accumulator = 0;
	},
	G: function(number) {
		if (controlUnit.accumulator <= 0)
			controlUnit.counter = number;
	},
	Z: function() {
		controlUnit.stop();
		//ring alarm bell
	},
	O: function(number) {
		console.log(number);
		io.print(number);
	},
	A: function(number) {
		controlUnit.accumulator = alu.add(controlUnit.accumulator, memory[number]);
		//controlUnit.accumulator = alu.add(controlUnit.accumulator, memory[number]);
	},
	P: function(number) { // a constant

	}
}
