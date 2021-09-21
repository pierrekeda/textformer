import { Textform } from './Textform';
import { TextformPlayer } from './TextformPlayer';
import { ReversedTextform } from '../modes/ReversedTextform';
import { ExpandTextform } from '../modes/ExpandTextform';
import { CollapseTextform } from '../modes/CollapseTextform';
import { ShuffledTextform } from '../modes/ShuffledTextform';
import { charsets } from '../utils/charsets';
import { basicEasing } from '../utils/basicEasing';
import { stringAlign } from '../utils/stingAlign';
import { TextformOutput } from './TextformOutput';

class Textformer {

	/**
	 * Easy text animations with random character changes.
	 *
	 * @constructor
	 * @param { Object }	options
	 * @param { Class }		options.mode		Animation mode, pick one from Textformer.modes.
     *
	 * @param { String } 	options.from		Initial text.
	 * @param { String } 	options.to			Final text.
	 * @param { Number } 	options.steps		Number of character changes between both texts.
	 * @param { Number } 	options.stagger		Stagger ( in steps ) between different
	 * 											characters.
	 * @param { Number } 	options.noise		Maximum random noise for steps and staggers.
	 * @param { String } 	options.charset		Concatenated character pool for random
	 * 											character changes.
	 * @param { Number } 	options.origin		Character index the animation starts from.
	 * @param { TextformOutput } options.output	Automatic text output.

	 * @param { String | Number } options.align	A position to align both text at,
												padding the shorter text to match
												the longer's text's length.
	 * 											Either pick one from Textformer.align,
	 * 											or specify an index to align at.
	 * 											Invalid values will default to 0.
	 * @param { String } 	options.fill		String used for align padding.
	 *
	 * @param { Boolean } 	options.autoplay 	Automatic animation settings.
												Set to false for manual animation
												( change textformer.progress
												from 0 to 1 ).
	 * @param { Number } 	options.speed		Number of changes per second.
	 * @param { String }	options.easing		Easing function name, pick one from
	 * 											Textformer.ease.
	 * @param { Number } 	options.delay		Delay before playing the animation,
	 * 											in milliseconds.
	 * @param { Number } 	options.duration	Animation duration, in milliseconds.
	 * 											Overrides options.speed.
	 * @param { Boolean }	options.reversed	Play the animation backwards.
	 * @param { Number }  options.reverseSpeed  Speed multiplier for reversed
	 * 											animation.
	 * @param { Number }	options.repeat		Number of times to repeat
	 * 											the animation after the first
	 * 											iteration. Set to -1 for infinite
	 * 											looping.
	 * @param { Boolean }	options.loop		Loop the animation. Equivalent to
	 * 											options.repeat = -1.
	 * @param { Boolean }	options.yoyo		Toggle animation direction when
	 * 											reaching either end.
	 * @param { Function }	options.onBegin		Callback fired on animation start.
	 * @param { Function }	options.onUpdate	Callback fired on every frame.
	 * @param { Function }	options.onChange	Callback fired on text change.
	 * @param { Function }	options.onComplete	Callback fired on animation end.
	 *
	 * @param { Boolean }	options.hover		Control the animation with
	 * 											pointerenter & pointerleave.
	 * @param { Boolean }	options.press		Control the animation with
	 * 											pointerdown & pointerup.
	 */
	constructor( {

		mode = Textformer.modes.BASIC,

		//Textform
		from, to,
		steps = 5,
		stagger = 3,
		noise = 0,
		charset = Textformer.charsets.ALL,
		origin, output,

		//Align
		align = Textformer.align.NONE,
		fill = ' ',

		//Player
		autoplay = true,
		speed = Textformer.DEFAULT_SPEED,
		easing = Textformer.DEFAULT_EASING,
		delay = 0,
		duration = 0,
		reversed = false,
		reverseSpeed = 1,
		repeat = 0,
		loop = false,
		yoyo = false,
		onBegin, onUpdate, onChange, onComplete,

		//Events
		hover = false,
		press = false,

	} = {} ) {

		this.__init();

		this.build( {

			mode,

			//Textform
			from, to, steps, stagger, noise, charset, origin, output,

			//Align
			align, fill,

			//Player
			autoplay, speed, easing, delay, duration,
			reversed, reverseSpeed, repeat, loop, yoyo,
			onBegin, onUpdate, onChange, onComplete,

			//Events
			hover, press

		} );

	}

	build( options = this.options ) {

		this.options = options;

		this.destroy();

		const textformClasses = {
			default: 	Textform,
			basic: 		Textform,
			reverse: 	ReversedTextform,
			expand: 	ExpandTextform,
			collapse: 	CollapseTextform,
			shuffle: 	ShuffledTextform,
		};
		const TextformClass = textformClasses[ options.mode ]
			|| textformClasses.default;
		const textform = new TextformClass( this.__.textformOptions() );
		this.textform = textform;

		if ( options.hover || options.press ) this.bind();
		else if ( ! options.autoplay ) return;
		this.player = new TextformPlayer( this.__.autoplayOptions() );
		if ( options.autoplay ) this.play();

	}

	clone( overrides = { output: undefined } ) {

		const options = { ...this.options, ...overrides };
		return new Textformer( options );

	}

	destroy() {

		this.stop();
		delete this.player;
		delete this.textform;
		this.unbind();

	}

	convertSpeedToDuration( speed = this.options.speed ) {

		if ( ! this.textform ) return Textformer.DEFAULT_DURATION;
		const finalFrame = this.textform.finalFrame;
		return finalFrame * ( 1000 / speed );

	}

	/*-------------------------------------------------------------------------/

		Private

	/-------------------------------------------------------------------------*/

	__init() {

		const __ = {};

		__.in = function () {

			const { player } = this;
			if ( player ) player.isReversed = false;
			if ( ! player.isPlaying && player.progress < 1 ) player.play();

		}.bind( this );

		__.out = function () {

			const { player } = this;
			if ( player ) player.isReversed = true;
			if ( ! player.isPlaying && player.progress > 0 ) player.play();

		}.bind( this );

		__.textformOptions = function () {

			const { DEFAULT_TEXT } = Textformer;

			const options =  { ...this.options };
			const { from, to, align, fill } = options;

			const output = new TextformOutput( options.output );
			if ( output.isValid ) {

				options.output = output;
				//If valid output, uses output's initial text as automatic to/from
				const initialText = output.inputText || DEFAULT_TEXT;
				if ( from === undefined ) options.from = initialText;
				if ( to === undefined ) options.to = initialText;

			} else delete options.output;

			if ( from === undefined ) options.from = DEFAULT_TEXT;
			if ( to === undefined ) options.to = DEFAULT_TEXT;

			if ( align ) {

				const alignedTexts = stringAlign
					.align( [ options.from, options.to ], align, fill );
				options.from = alignedTexts[ 0 ];
				options.to = alignedTexts[ 1 ];

			}

			return options;

		}.bind( this );

		__.autoplayOptions = function () {

			const { textform } = this;
			const options = { ...this.options, textform };

			if ( ! options.duration )
				options.duration = this.convertSpeedToDuration( options.speed );

			if ( options.loop ) options.repeat = - 1;

			return options;

		}.bind( this );

		this.__ = __;

	}

	/*-------------------------------------------------------------------------/

		Event Handling

	/-------------------------------------------------------------------------*/

	bind( hover = this.options.hover, press = this.options.press ) {

		const { textform, options } = this;

		Object.assign( options, { hover, press } );

		if ( ! hover && ! press ) return;

		if ( ! textform || ! textform.output || ! textform.output.elements )
			return;

		const { elements } = textform.output;

		elements.forEach( ( element ) => {

			if ( hover ) {

				element.addEventListener( 'pointerenter', this.__.in );
				element.addEventListener( 'pointerleave', this.__.out );

			}

			if ( press ) {

				element.addEventListener( 'pointerdown', this.__.in );
				element.addEventListener( 'pointerup', this.__.out );

			}

		} );

		this.dispatchers = elements;

	}

	unbind() {

		if ( ! this.dispatchers ) return;

		this.dispatchers.forEach( ( dispatcher ) => {

			dispatcher.addEventListener( 'pointerenter', this.__.in );
			dispatcher.addEventListener( 'pointerleave', this.__.out );
			dispatcher.addEventListener( 'pointerdown', this.__.in );
			dispatcher.addEventListener( 'pointerup', this.__.out );

		} );

		delete this.dispatchers;

	}

	/*-------------------------------------------------------------------------/

		Player shorthands

	/-------------------------------------------------------------------------*/

	play() {

		if ( this.player ) this.player.play();

	}

	pause() {

		if ( this.player ) this.player.pause();

	}

	stop() {

		if ( this.player ) this.player.stop();

	}

	/*-------------------------------------------------------------------------/

		Getters / Setters

	/-------------------------------------------------------------------------*/

	get progress() {

		if ( this.player ) return this.player.progress;
		else return this.textform.progress;

	}

	set progress( progress ) {

		if ( this.player ) this.player.progress = progress;
		else this.textform.progress = progress;

	}

	get speed() {

		return this.options.speed;

	}

	set speed( speed ) {

		const { options } = this;
		if ( speed < 1 ) speed = Textformer.DEFAULT_SPEED;
		options.speed = speed;
		options.duration = this.convertSpeedToDuration( speed );

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

Textformer.align = stringAlign.to;

Textformer.charsets = charsets;

Textformer.ease = basicEasing.keys;

Textformer.modes = {
	BASIC: 		'basic',
	REVERSE: 	'reverse',
	EXPAND: 	'expand',
	COLLAPSE: 	'collapse',
	SHUFFLE: 	'shuffle',
};

Textformer.DEFAULT_TEXT = '';
Textformer.DEFAULT_SPEED = 15;
Textformer.DEFAULT_DURATION = 1000;
Textformer.DEFAULT_EASING = Textformer.ease.LINEAR;

export { Textformer };
