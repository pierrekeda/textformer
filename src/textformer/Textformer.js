import { Textform } from './textforms/Textform.js';
import { RandomTextform } from './textforms/RandomTextform.js';
import { ReversedTextform } from './textforms/ReversedTextform.js';
import { ShuffledTextform } from './textforms/ShuffledTextform.js';
import { TextformPlayer } from './TextformPlayer.js';

class Textformer {

	/**
	 * Easy text tranform animation, based on random character changes.
	 * @constructor
	 * @param { Object }	options
	 * @param { Class }		options.mode		Animation mode, pick one from Textformer.modes.
	 * @param { Boolean } 	options.autoPlay	Animates automatically using the built-in TextformPlayer.
	 * @param { Number } 	options.speed		Number of character changes per second.
	 *
	 * @param { Element } 	options.output		DOM element the text will be output to.
	 * @param { String } 	options.from		Initial text.
	 * @param { String } 	options.to			Final text.
	 * @param { Number } 	options.steps		Number of character changes between both texts.
	 * @param { Number } 	options.stagger		Stagger ( in steps ) between different characters.
	 * @param { String } 	options.charset		Concatenated character pool for random character changes.
	 * @param { Function } 	options.align		Function to align both texts by filling the shorter text to match the longer text's length.
	 * @param { String } 	options.fill		A single fill character used by the align function, will generate random characters if undefined.
	 *
	 * @param { Number } 	options.delay		Delay before playing the animation, in milliseconds.
	 * @param { Number } 	options.duration	Animation duration, in milliseconds ( overrides options.speed ).
	 * @param { Function }	options.onBegin		Callback fired when the animation starts.
	 * @param { Function }	options.onChange	Callback fired on each Textform character change.
	 * @param { Function }	options.onComplet	Callback fired when the animation ends.
	 */
	constructor( {

		mode = Textformer.modes.default,
		autoPlay = true,
		speed = 15,

		//?// Textform settings
		output,
		from = 'Demo',
		to = 'Textformer',
		steps = 5,
		stagger = 3,
		charset = Textform.charsets.ALL,
		align = Textform.aligns.none,
		fill = ' ',

		//?// TextformPlayer settings
		delay = 0,
		duration,
		onBegin,
		onChange,
		onComplete,

	} = {} ) {

		Object.assign( this, {
			mode, autoPlay, speed,
			options: { output, from, to, steps, stagger, charset, align, fill },
			playerOptions: { duration, delay, onBegin, onChange, onComplete }
		} );

		this.build();

	}

	build() {

		if ( this.mode.prototype instanceof Textform === false )
			this.mode = Textformer.modes.default;

		const textform = new this.mode( this.options );
		this.textform = textform;

		if ( this.autoPlay ) {

			const playerOptions = this.playerOptions;

			if ( ! playerOptions.duration ) {

				const speed = Math.abs( this.speed ) || 1;
				playerOptions.duration = this.textform.totalFrames * ( 1000 / speed );

			}

			playerOptions.textform = textform;

			if ( this.player ) this.player.stop();
			this.player = new TextformPlayer( playerOptions );
			this.play();

		}

	}

	play() {

		if ( ! this.player ) return;
		this.player.play();

	}

	replay() {

		if ( ! this.player ) return;
		this.player.stop();
		this.player.play();

	}

	/*-----------------------------------------------------------------------------/

		Getters / Setters

	/-----------------------------------------------------------------------------*/

	get progress() {

		return this.textform.progress;

	}

	set progress( progress ) {

		this.textform.progress = progress;

	}

	/*-----------------------------------------------------------------------------/

		Read-only

	/-----------------------------------------------------------------------------*/

	get text() {

		return this.textform.text;

	}

}

/*-----------------------------------------------------------------------------/

	Static

/-----------------------------------------------------------------------------*/

Textformer.modes = {

	default: Textform,
	reversed: ReversedTextform,
	shuffled: ShuffledTextform,
	random: RandomTextform,

};

export { Textformer };
