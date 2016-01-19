import { NativeModules } from 'react-native';
const { EXFontLoader } = NativeModules;
let _FONTS$ = {};

/**
 * Load a font asynchronously from a url.
 *
 * NOTE: On iOS, we can infer the font family name and style
 * from the downloaded font, so a URL is all we need to
 * do the load.
 */
export default function loadFontAsync({ uri }) {
  if (!_FONTS$[uri]) {
    _FONTS$[uri] = EXFontLoader.loadFontAsync(uri).then((fontName) => {
      return fontName;
    }, (err) => {
      console.error('Failed to load font from ' + uri + ' : ', err);
      throw err;
    });
  }

  return _FONTS$[uri];
}
