var memory = {}; //map of location number : contents

var processor = {
	counter: -2, // program counter, which instruction it reading
	accumulator: 0,
	continue: true,
	start: function() {
		io.loadInstructions();
		this.execute();
		io.updateDisplays();
	},
	stop: function() {
		this.continue = false;
	},
	reset: function() {
		counter = -2;
	},
	singleEP: function() {
		if (Object.keys(memory).length === 0)
			io.loadInstructions();	
		this.executeInstruction();
		io.updateDisplays();
	},
	executeInstruction: function() {
		var operation = this.parseInstruction();
		console.log(operation);
		var opcode = operation.opcode;
		var number = operation.number;
		instructions[opcode](number);

		this.counter++;
	},
	execute: function() {
		for (var instruction in io.input) {
			this.executeInstruction();
			if (!this.continue)
				break;
		}
	},
	parseInstruction: function() {
		var currentInstruction = memory[this.counter]; 
		var number = currentInstruction.slice(1, -1);
		if (number == "")
			number = 0;

		return {
			opcode: currentInstruction.charAt(0),
			number: number
		};
	}
}

/* instructions are set up like this
* opcode	location# (0 if emtpy)		F or D (short or long number) or K (end of instruction line)
*/

var io = {
	//input: {}, // instruction location # : { opcode: #, number: # }
	loadInstructions: function() {
		var lines = $("#paper-tape-reader").val().split('\n');
		for(var i = 0; i < lines.length; i++){
			memory[processor.counter + i] = lines[i];
		}
	},
	print: function(number) {
		var character = memory[number];
		console.log("number", number, memory[number]);
		$("#teleprinter").append(character);
	},
	updateDisplays: function() {
		$("#counter").html(processor.counter);
		$("#accumulator").html(processor.accumulator);
	}
}