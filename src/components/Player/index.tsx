import Script from 'next/script';
import styles from '@/components/Player/Player.module.css';
import { toolkitOptions } from '@/components/Player/utils';
import { useState } from 'react';

export type PlayerProps = {
  className?: string;
};

const Player = ({ className }: PlayerProps) => {
  const [isMidiPlayerLoaded, setIsMidiPlayerLoaded] = useState(false);
  const [isNotationReady, setIsNotationReady] = useState(false);
  // let tk = null;
  let svg = null;
  // The current page, which will change when playing through the piece
  let currentPage = 1;

  const loadMasterpiece = () =>
    fetch(
      'https://www.verovio.org/examples/musicxml/Schubert_Staendchen_D.923.mxl'
    )
      .then((response) => response.arrayBuffer())
      .then((mxlData) => {
        window.tk.loadZipDataBuffer(mxlData);
        svg = window.tk.renderToSVG(1);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        document.getElementById('notation').innerHTML = svg;
        setIsNotationReady(true);
      })
      .catch((e) => {
        console.log('An error occurred when loading the file!');
        console.log(e);
      });

  const highlightNote = (note: string) => {
    const noteElement = document.querySelector(
      `[data-id=${note}]`
    ) as SVGGElement;
    noteElement.classList.add('playing');
    const parentElement = noteElement?.parentElement;
    if (parentElement) {
      noteElement.style.fill = '#f77026';
      noteElement.style.stroke = '#f77026';
    }
  };

  const togglePlayingNotesToPlayed = () => {
    console.log('TOGGLE PLAYING TO PLAYED');
    document.querySelectorAll('g.note.playing').forEach((note) => {
      note.classList.remove('playing');
      note.classList.add('played');
      note.style.stroke = 'var(--color-played-note)';
      note.style.fill = 'var(--color-played-note)';
    });
  };
  const clearNotesColor = () => {
    console.log('CLEAR ALL PLAYED NOTES');
    document
      .querySelectorAll('g.note.played, g.note.playing')
      .forEach((note) => {
        note.classList.remove('playing');
        note.classList.remove('played');
        note.style.stroke = 'black';
        note.style.fill = 'black';
      });
  };

  const handlePlayerCallback = (event: { time: number }) => {
    // Remove the color of all notes previously colored
    togglePlayingNotesToPlayed();

    // Get elements at a time in milliseconds (time from the player is in seconds)
    const currentElements = window.tk.getElementsAtTime(event.time * 1000);

    if (currentElements.page == 0) return;

    if (currentElements.page != currentPage) {
      console.log('CHANGE PAGE');
      currentPage = currentElements.page;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.getElementById('notation').innerHTML =
        window.tk.renderToSVG(currentPage);
    }

    // Get all notes playing and color them
    currentElements.notes.forEach((note: string) => {
      highlightNote(note);
    });
  };

  const onMidiPlayerReady = () => {
    console.log('MidiPlayer has loaded!');
    setIsMidiPlayerLoaded(true);
    // https://book.verovio.org/interactive-notation/playing-midi.html
    window.MIDIjs.player_callback = handlePlayerCallback;
  };

  // https://book.verovio.org/interactive-notation/playing-midi.html
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
  };

  // FIRST STEP
  const onRuntimeInitialized = async () => {
    console.log('Verovio has loaded!');

    window.tk = new window.verovio.toolkit();

    // https://book.verovio.org/first-steps/layout-options.html
    window.tk.setOptions(toolkitOptions);

    // https://book.verovio.org/interactive-notation/encoding-formats.html
    await loadMasterpiece();
  };

  return (
    <>
      <Script
        src="https://www.verovio.org/javascript/latest/verovio-toolkit-wasm.js" // https://book.verovio.org/first-steps/getting-started.html
        onLoad={() => {
          window.verovio.module.onRuntimeInitialized = onRuntimeInitialized;
        }}
      />
      <section className={[styles.container, className].join(' ')}>
        <button disabled={!isMidiPlayerLoaded} onClick={playMIDIHandler}>
          Play
        </button>
        <button disabled={!isMidiPlayerLoaded} onClick={stopMIDIHandler}>
          Stop
        </button>

        {isNotationReady && (
          <>
            <Script
              src="https://www.midijs.net/lib/midi.js" // https://book.verovio.org/interactive-notation/encoding-formats.html
              strategy="lazyOnload" // Load the script later during browser idle time.
              onLoad={onMidiPlayerReady}
            />
          </>
        )}
        <div id="notation" className={styles.notation}></div>
      </section>
    </>
  );
};

export default Player;
