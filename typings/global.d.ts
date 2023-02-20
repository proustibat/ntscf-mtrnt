import { VerovioToolkit } from 'verovio/esm';
import { VerovioModule } from 'verovio';

export {};
declare global {
  interface Window {
    tk: VerovioToolkit;
    verovio: {
      module: VerovioModule;
      toolkit: any;
    };
    MIDIjs: any;
    saveAs: any;
  }
}
