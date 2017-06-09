var instructions = { //part of the ALU
	T: function(number) {
		console.log("T", number);
		memory[number] = processor.accumulator;
		processor.accumulator = 0;
	},
	G: function(number) {
		console.log("G");
		if (processor.accumulator < 0)
			counter = number - 1;
	}
}
