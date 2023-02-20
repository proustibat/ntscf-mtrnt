import Script from 'next/script';
import styles from '@/components/Player/Player.module.css';
import {
  clearNotesColor,
  createACursor,
  displayCursorForNote,
  highlightNote,
  removeAllCursors,
  togglePlayingNotesToPlayed,
  toolkitOptions,
} from '@/components/Player/utils';
import { useEffect, useState } from 'react';

export type PlayerProps = {
  className?: string;
  svgScore: SVGElement;
  mei: string;
};

const Player = ({ className, svgScore, mei }: PlayerProps) => {
  const [isMidiPlayerLoaded, setIsMidiPlayerLoaded] = useState(false);

  // The current page, which will change when playing through the piece
  let currentPage = 1;

  const handlePlayerCallback = (event: { time: number }) => {
    // Remove the color of all notes previously colored
    togglePlayingNotesToPlayed();

    // Remove all cursors
    removeAllCursors();

    // Get elements at a time in milliseconds (time from the player is in seconds)
    const currentElements = window.tk.getElementsAtTime(event.time * 1000);

    if (currentElements.page == 0) return;

    if (currentElements.page != currentPage) {
      currentPage = currentElements.page;
      if (document.getElementById('notation')) {
        document.getElementById('notation')!.innerHTML =
          window.tk.renderToSVG(currentPage);
      }
    }

    // Get all notes playing and color them
    currentElements.notes.forEach((note: string) => {
      highlightNote(note);
    });

    // find notehead for each note (they contain x and y coordinates)
    currentElements.notes.forEach((note: string, index) => {
      displayCursorForNote(note, `cursor-${note}-${index}`);
    });
  };

  const onMidiPlayerReady = () => {
    setIsMidiPlayerLoaded(true);
    // https://book.verovio.org/interactive-notation/playing-midi.html
    window.MIDIjs.player_callback = handlePlayerCallback;
  };
  //
  // // https://book.verovio.org/interactive-notation/playing-midi.html
  const playMIDIHandler = () => {
    // Get the MIDI file from the Verovio toolkit
    const base64midi = window.tk.renderToMIDI();
    // Add the data URL prefixes describing the content
    const midiString = 'data:audio/midi;base64,' + base64midi;
    // Pass it to play to MIDIjs
    window.MIDIjs.play(midiString);
  };
  const stopMIDIHandler = async () => {
    await window.MIDIjs.stop();
    clearNotesColor();
    removeAllCursors();
  };
  //
  // // FIRST STEP
  const onRuntimeInitialized = async () => {
    console.log('Verovio has loaded!');

    window.tk = new window.verovio.toolkit();

    // https://book.verovio.org/first-steps/layout-options.html
    window.tk.setOptions(toolkitOptions);

    // https://book.verovio.org/interactive-notation/encoding-formats.html
    window.tk.loadData(mei);
  };

  // useEffect(() => {
  //   if (!document.querySelector('.cursor')) {
  //     const svg = document.querySelector('svg.definition-scale');
  //     svg?.appendChild(createACursor({ className: 'cursor' }));
  //   }
  // }, []);

  return (
    <>
      <section className={[styles.container, className].join(' ')}>
        <button disabled={!isMidiPlayerLoaded} onClick={playMIDIHandler}>
          Play
        </button>
        <button disabled={!isMidiPlayerLoaded} onClick={stopMIDIHandler}>
          Stop
        </button>
        <div
          id="notation"
          dangerouslySetInnerHTML={{
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            __html: svgScore,
          }}
        ></div>
        <Script
          src="https://www.verovio.org/javascript/latest/verovio-toolkit-wasm.js" // https://book.verovio.org/first-steps/getting-started.html
          strategy="lazyOnload"
          onLoad={() => {
            window.verovio.module.onRuntimeInitialized = onRuntimeInitialized;
          }}
        />
        {mei && (
          <>
            <Script
              src="https://www.midijs.net/lib/midi.js" // https://book.verovio.org/interactive-notation/encoding-formats.html
              strategy="lazyOnload" // Load the script later during browser idle time.
              onLoad={onMidiPlayerReady}
            />
          </>
        )}
      </section>
    </>
  );
};

export default Player;
