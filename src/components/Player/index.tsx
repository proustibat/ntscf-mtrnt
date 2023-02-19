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
  // let tk = null;
  let svg = null;

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

    // https://book.verovio.org/first-steps/basic-rendering.html
    const MEI = await fetchMEI().catch((error) => {
      console.log(error);
    });
    if (!MEI) return;

    // load the data into Verovio
    global.tk.loadData(MEI);

    // generate the SVG for the first page
    svg = global.tk.renderToSVG(1);

    // gets the <div> element with the ID we specified, and sets the content (innerHTML) to the SVG that we just generated.
    document.getElementById('notation').innerHTML = svg;

    setIsNotationReady(true);

    // https://book.verovio.org/interactive-notation/css-and-svg.html
    changeSVGProgrammatically();
  };

  const onFileSaverReady = () => {
    console.log('Filesaver has loaded!');
    setIsFileSaverLoaded(true);
    console.log(global.tk);
  };

  const handleSaveMEI = () => {
    console.log(global.tk);
    const meiContent = global.tk.getMEI();
    const myBlob = new Blob([meiContent], { type: 'application/xml' });

    global.saveAs(myBlob, 'meifile.mei');
  };

  return (
    <section className={[styles.container, className].join(' ')}>
      <h2>{title}</h2>
      {isNotationReady && (
        <button disabled={!isFileSaverLoaded} onClick={handleSaveMEI}>
          save MEI
        </button>
      )}

      <Script
        src="https://www.verovio.org/javascript/latest/verovio-toolkit-wasm.js" // https://book.verovio.org/first-steps/getting-started.html
        onLoad={() => {
          global.verovio.module.onRuntimeInitialized = onRuntimeInitialized;
        }}
      />
      {isNotationReady && (
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.0/FileSaver.min.js" // https://book.verovio.org/interactive-notation/encoding-formats.html
          strategy="lazyOnload" // Load the script later during browser idle time.
          onLoad={onFileSaverReady}
        />
      )}
      <div id="notation" className={styles.notation}></div>
    </section>
  );
};
export default Player;
