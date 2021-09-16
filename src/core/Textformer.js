import { Textform } from './Textform';
import { TextformPlayer } from './TextformPlayer';
import { TextformAligner } from './TextformAligner';
import { ReversedTextform } from '../modes/ReversedTextform';
import { ExpandTextform } from '../modes/ExpandTextform';
import { CollapseTextform } from '../modes/CollapseTextform';
import { ShuffledTextform } from '../modes/ShuffledTextform';

class Textformer {

	/**
	 * Easy text tranform animation, based on random character changes.
	 * @constructor
	 * @param { Object }	options
	 * @param { Class }		options.mode		Animation mode, pick one from Textformer.modes.

	 * @param { String } 	options.from		Initial text.
	 * @param { String } 	options.to			Final text.
	 * @param { Number } 	options.steps		Number of character changes between both texts.
	 * @param { Number } 	options.stagger		Stagger ( in steps ) between different characters.
	 * @param { Number } 	options.randomness	Steps and stagger maximum randomness.
	 * @param { Number } 	options.origin		Character index the animation starts from.
	 * @param { Element } 	options.output		DOM element the text will be output to.
	 * @param { String } 	options.charset		Concatenated character pool for random character changes.

	 * @param { Function } 	options.align		Function to align both texts by filling the shorter text to match the longer text's length. Can use a number to align both text at this index instead.
	 * @param { String } 	options.fill		A single fill character used by the align function, will generate random characters if undefined.
	 *
	 * @param { Object } 	options.autoplay	Automatic animation settings. Set to false for no automatic animation
	 * @param { Number } 	options.speed		Number of changes per second.
	 * @param { Number } 	options.delay		Delay before playing the animation, in milliseconds.
	 * @param { Number } 	options.duration	Animation duration, in milliseconds. Overrides options.speed.
	 * @param { Function }	options.onBegin		Callback fired when the animation starts.
	 * @param { Function }	options.onChange	Callback fired on each Textform character change.
	 * @param { Function }	options.onComplet	Callback fired when the animation ends.
	 */
	constructor( {

		mode = Textformer.modes.default,

		//Textform settings
		from = '',
		to = '',
		steps = 5,
		stagger = 3,
		randomness = 0,
		origin,
		output,
		charset = Textformer.charsets.ALL,

		align = Textformer.aligns.left,
		fill = ' ',

		//TextformPlayer settings
		autoplay = {
			speed: 15,
			delay: 0,
			// duration, onBegin, onChange, onComplete,
		}


	} = {} ) {

		Object.assign( this, {
			mode,
			autoplay,
			options: {
				from, to, steps, stagger, randomness,
				origin, output, charset, align, fill
			},
		} );

		this.build();

	}

	build() {

		this.destroy();

		const textform = new this.mode( this.options );
		this.textform = textform;

		//Autoplay

		const { autoplay } = this;

		if ( ! autoplay ) return;
		const convertSpeedToDuration = () => {

			const speed = Math.abs( this.speed ) || 1;
			return textform.totalFrames * ( 1000 / speed );

		};

		autoplay.textform = textform;
		if ( ! autoplay.duration ) autoplay.duration = convertSpeedToDuration();

		this.player = new TextformPlayer( autoplay );
		this.play();

	}

	destroy() {

		delete this.textform;
		this.stop();
		delete this.player;
		//Remove Event Listeners

	}

	/*-------------------------------------------------------------------------/

		Playback

	/-------------------------------------------------------------------------*/

	play() {

		if ( this.player ) this.player.play();

	}

	stop() {

		if ( this.player ) this.player.stop();

	}

	replay() {

		this.stop();
		this.play();

	}

	/*-------------------------------------------------------------------------/

		Getters / Setters

	/-------------------------------------------------------------------------*/

	get progress() {

		return this.textform.progress;

	}

	set progress( progress ) {

		this.textform.progress = progress;

	}

	/*-------------------------------------------------------------------------/

		Read-only

	/-------------------------------------------------------------------------*/

	get text() {

		return this.textform.text;

	}

}

/*-----------------------------------------------------------------------------/

	Static

/-----------------------------------------------------------------------------*/

Textformer.aligns = TextformAligner.modes;
Textformer.charsets = Textform.charsets;
Textformer.modes = {
	default: Textform,
	reverse: ReversedTextform,
	expand: ExpandTextform,
	collapse: CollapseTextform,
	shuffle: ShuffledTextform,
};

export { Textformer };
