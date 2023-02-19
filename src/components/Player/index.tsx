import Script from 'next/script';
import styles from '@/components/Player/Player.module.css';
import { toolkitOptions } from '@/components/Player/utils';
import { useState } from 'react';

export type PlayerProps = {
  className?: string;
  title: string;
};
const Player = ({ className, title }: PlayerProps) => {
  const [isNotationReady, setIsNotationReady] = useState(false);
  const [isFileSaverLoaded, setIsFileSaverLoaded] = useState(false);
  const [isMidiPlayerLoaded, setIsMidiPlayerLoaded] = useState(false);
  // let tk = null;
  let svg = null;
  // The current page, which will change when playing through the piece
  let currentPage = 1;

  const changeSVGProgrammatically = () => {
    // Get all the rests by selecting <g> with attribute class 'rest' ...
    const rests = document.querySelectorAll('g.rest');
    // ... and change their color by setting their style.fill value
    for (const rest of rests) {
      rest.style.fill = 'dodgerblue';
    }

    // Get all the notes with @pname="c" and @oct="5" and change their color
    const c5s = document.querySelectorAll('g[data-pname="c"][data-oct="5"]');
    for (const c5 of c5s) {
      c5.style.fill = 'aqua';
    }

    // Get all the verses ...
    const verses = document.querySelectorAll('g.verse');
    // ... and use the 'getElementAttr()' to retrieve all attributes ...
    for (const verse of verses) {
      const attr = global.tk.getElementAttr(verse.id);
      // ... and change to color when @n exists and is greater than 1
      if (attr.n && attr.n > 1) verse.style.fill = 'darkcyan';
    }
  };

  const fetchMEI = async () =>
    new Promise(async (resolve, reject) => {
      const response = await fetch(
        'https://www.verovio.org/examples/downloads/Schubert_Lindenbaum.mei'
      ).catch(reject);

      !response && reject('No response while fetching');

      const meiXML = await response?.text();
      !meiXML && reject("Can't transform the result");

      resolve(meiXML);
    });

  const onRuntimeInitialized = async () => {
    console.log('Verovio has loaded!');

    global.tk = new global.verovio.toolkit();

    // https://book.verovio.org/first-steps/layout-options.html
    global.tk.setOptions(toolkitOptions);

    // TODO: remove the part after the return
    // https://book.verovio.org/interactive-notation/encoding-formats.html
    fetch(
      'https://www.verovio.org/examples/musicxml/Schubert_Staendchen_D.923.mxl'
    )
      .then((response) => response.arrayBuffer())
      .then((mxlData) => {
        global.tk.loadZipDataBuffer(mxlData);
        svg = global.tk.renderToSVG(1);
        document.getElementById('notation').innerHTML = svg;
        setIsNotationReady(true);
      })
      .catch((e) => {
        console.log('An error occurred when loading the file!');
        console.log(e);
      });

    return;

    // https://book.verovio.org/first-steps/basic-rendering.html
    const MEI = await fetchMEI().catch((error) => {
      console.log(error);
    });
    if (!MEI) return;

    // load the data into Verovio
    global.tk.loadData(MEI);

    // generate the SVG for the first page
    svg = global.tk.renderToSVG(currentPage);

    // gets the <div> element with the ID we specified, and sets the content (innerHTML) to the SVG that we just generated.
    document.getElementById('notation').innerHTML = svg;

    setIsNotationReady(true);

    // https://book.verovio.org/interactive-notation/css-and-svg.html
    // changeSVGProgrammatically();
  };

  const onFileSaverReady = () => {
    console.log('Filesaver has loaded!');
    setIsFileSaverLoaded(true);
  };

  const onMidiPlayerReady = () => {
    console.log('MidiPlayer has loaded!');
    setIsMidiPlayerLoaded(true);
    // https://book.verovio.org/interactive-notation/playing-midi.html
    global.MIDIjs.player_callback = midiHightlightingHandler;
  };

  const handleSaveMEI = () => {
    console.log(global.tk);
    const meiContent = global.tk.getMEI();
    const myBlob = new Blob([meiContent], { type: 'application/xml' });

    global.saveAs(myBlob, 'meifile.mei');
  };

  // https://book.verovio.org/interactive-notation/playing-midi.html
  const playMIDIHandler = () => {
    // Get the MIDI file from the Verovio toolkit
    const base64midi = global.tk.renderToMIDI();
    // Add the data URL prefixes describing the content
    const midiString = 'data:audio/midi;base64,' + base64midi;
    // Pass it to play to MIDIjs
    global.MIDIjs.play(midiString);
  };
  const stopMIDIHandler = () => {
    global.MIDIjs.stop();
  };

  const midiHightlightingHandler = (event) => {
    // console.log(event);

    // Remove the color of all notes previously colored
    document.querySelectorAll('g.note').forEach((note) => {
      const noteElement = note.parentElement;
      if (noteElement) {
        console.log('remove color on ', note);
        noteElement.style.fill = 'black';
      }
    });

    // Get elements at a time in milliseconds (time from the player is in seconds)
    const currentElements = global.tk.getElementsAtTime(event.time * 1000);

    if (currentElements.page == 0) return;

    if (currentElements.page != currentPage) {
      console.log('CHANGE PAGE');
      currentPage = currentElements.page;
      document.getElementById('notation').innerHTML =
        global.tk.renderToSVG(currentPage);
    }

    // Get all notes playing and color them
    currentElements.notes.forEach((note) => {
      const noteElement = document.querySelector(`[data-id=${note}]`);
      // TODO: scroll
      const parentElement = noteElement?.parentElement;
      if (parentElement) {
        console.log('add color on ', note);
        noteElement.style.fill = '#f77026';
      }
    });
  };

  return (
    <section className={[styles.container, className].join(' ')}>
      <h2>{title}</h2>

      {/*<button*/}
      {/*  disabled={!isFileSaverLoaded || !isNotationReady}*/}
      {/*  onClick={handleSaveMEI}*/}
      {/*>*/}
      {/*  save MEI*/}
      {/*</button>*/}

      <button disabled={!isMidiPlayerLoaded} onClick={playMIDIHandler}>
        Play
      </button>
      <button disabled={!isMidiPlayerLoaded} onClick={stopMIDIHandler}>
        Pause
      </button>

      <Script
        src="https://www.verovio.org/javascript/latest/verovio-toolkit-wasm.js" // https://book.verovio.org/first-steps/getting-started.html
        onLoad={() => {
          global.verovio.module.onRuntimeInitialized = onRuntimeInitialized;
        }}
      />
      {isNotationReady && (
        <>
          <Script
            src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.0/FileSaver.min.js" // https://book.verovio.org/interactive-notation/encoding-formats.html
            strategy="lazyOnload" // Load the script later during browser idle time.
            onLoad={onFileSaverReady}
          />
          <Script
            src="https://www.midijs.net/lib/midi.js" // https://book.verovio.org/interactive-notation/encoding-formats.html
            strategy="lazyOnload" // Load the script later during browser idle time.
            onLoad={onMidiPlayerReady}
          />
        </>
      )}
      <div id="notation" className={styles.notation}></div>
    </section>
  );
};
export default Player;
