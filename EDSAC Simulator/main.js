var memory = {}; //map of location number : contents

var processor = {
	counter: -2, // program counter, which instruction it reading
	accumulator: 0,
	continue: true,
	start: function() {
		io.parseInstruction();
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
		if (io.input.length === 0)
			io.parseInstruction();	
		this.executeInstruction();
		io.updateDisplays();
	},
	executeInstruction: function() {
		var opcode = io.input[this.counter].opcode;
		var number = io.input[this.counter].number;
		instructions[opcode](number);

		this.counter++;
	},
	execute: function() {
		for (var instruction in io.input) {
			this.executeInstruction();
			if (!this.continue)
				break;
		}
	}
}

/* instructions are set up like this
* opcode	location# (0 if emtpy)		F or D (short or long number) or K (end of instruction line)
*/

var io = {
	input: {}, // instruction location # : { opcode: #, number: # }
	parseInstruction: function() {
		var lines = $("#paper-tape-reader").val().split('\n');

		for(var i = 0; i < lines.length; i++){
			var location = processor.counter + i;
			var number = lines[i].slice(1, -1);
			if (number == "")
				number = 0;

			this.input[location] = {
				opcode: lines[i].charAt(0),
				number: lines[i].slice(1, -1)
			}
		}
	},
	print: function() {

	},
	updateDisplays: function() {
		$("#counter").html(processor.counter);
		$("#accumulator").html(processor.accumulator);
	}
}