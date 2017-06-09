var instructions = { //part of the ALU
	T: function(number) {
		console.log("T", number);
		memory[number] = processor.accumulator;
		processor.accumulator = 0;
	},
	G: function(number) {
		console.log("G");
		if (processor.accumulator <= 0)
			processor.counter = number;
	},
	Z: function() {
		console.log("Z");
		processor.stop();
		//ring alarm bell
	},
	O: function(number) {
		console.log("O");
		io.print(number);
	}
}
