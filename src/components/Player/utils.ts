// https://book.verovio.org/toolkit-reference/toolkit-options.html
import { VerovioOptions } from 'verovio';

export const toolkitOptions: VerovioOptions = {
  // inputFrom: 'musicxml',
  // landscape: true,
  // https://book.verovio.org/interactive-notation/css-and-svg.html
  // svgAdditionalAttribute: ['note@pname', 'note@oct'],
  // adjustPageHeight: true,
  scale: 50,
  svgHtml5: true,
  svgViewBox: true,
  breaks: 'line',
  footer: 'always',
  header: 'encoded',
  justifyVertically: true,
  minLastJustification: 1,
  openControlEvents: true,
  outputIndent: 10,
  unit: 12,
  barLineSeparation: 1,
  barLineWidth: 0.1,
  beamMaxSlope: 20,
  beamMixedStemMin: 8,
  bracketThickness: 2,
  dashedBarLineDashLength: 5,
  dashedBarLineGapLength: 5,
  dynamDist: 16,
  extenderLineMinSpace: 10,
  fingeringScale: 1,
  font: 'Bravura',
  graceFactor: 1,
  hairpinSize: 8,
  hairpinThickness: 0.8,
  harmDist: 16,
  justificationBraceGroup: 10,
  justificationBracketGroup: 10,
  justificationMaxVertical: 1,
  justificationStaff: 10,
  justificationSystem: 10,
  ledgerLineExtension: 1,
  ledgerLineThickness: 0.5,
  lyricHyphenLength: 3,
  lyricLineThickness: 0.5,
  lyricSize: 3.5,
  measureMinWidth: 30,
};

export const highlightNote = (note: string) => {
  const elementsToColor = [];

  // Note
  const noteElement = document.querySelector(
    `[data-id=${note}]`
  ) as SVGGElement;

  elementsToColor.push(noteElement);

  const parentElement =
    (noteElement.closest('.chord') as SVGGElement) ||
    (noteElement.closest('.tuplet') as SVGGElement);

  if (parentElement) {
    // notes and stem
    parentElement
      .querySelectorAll('.note, .stem, .dot')
      .forEach((currentNoteEl) => {
        elementsToColor.push(currentNoteEl);
      });
    // potential beam element to color
    const beamElement = parentElement.closest('.beam');
    if (beamElement) {
      // If all notes in a beam are playing then beam has been played
      if (
        Array.from(
          beamElement?.querySelectorAll('.chord:last-child .note')
        ).every((el) => el.classList.contains('playing'))
      ) {
        elementsToColor.push(beamElement as SVGGElement);
      }
    }
  }

  // Add class to color element
  elementsToColor.forEach((el) => {
    el.classList.add('playing');
  });
};

export const togglePlayingNotesToPlayed = () => {
  document.querySelectorAll('g.playing').forEach((el) => {
    el.classList.remove('playing');
    el.classList.add('played');
  });
};
export const clearNotesColor = () => {
  document.querySelectorAll('g.played, g.playing').forEach((el) => {
    el.classList.remove('playing');
    el.classList.remove('played');
  });
};

export const createACursor = ({
  className,
  x = 0,
  y = 0,
}: {
  className: string;
  x?: number;
  y?: number;
}): SVGGElement => {
  const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  group.classList.add(className);
  group.classList.add('cursor-displayed');

  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.classList.add(`${className}-rect`);
  rect.setAttribute('height', '2500');
  rect.setAttribute('width', '320');
  rect.setAttribute('y', y.toString());
  rect.setAttribute('x', x.toString());
  rect.style.fill = 'var(--color-orange)';
  rect.style.color = 'var(--color-orange)';
  rect.style.opacity = '0.5';

  group.appendChild(rect);

  return group;
};

export const displayCursorForNote = (note: string, name: string) => {
  const useEl = document
    .querySelector(`[data-id=${note}]`)
    ?.querySelector('.notehead use');

  const svg = document.querySelector('svg.definition-scale');
  svg?.appendChild(
    createACursor({
      className: name,
      x: useEl ? +(useEl.getAttribute('x') as string) : undefined,
      y: useEl ? +(useEl.getAttribute('y') as string) : undefined,
    })
  );
};

export const removeAllCursors = () => {
  document.querySelectorAll('.cursor-displayed').forEach((el) => {
    el.remove();
  });
};
