import { NativeModules } from 'react-native';
const { ExponentFontLoader } = NativeModules;
let _FONTS$ = {};

/**
 * Load a font asynchronously from a url, with a given `fontFamily`
 * and `fontStyle`.
 *
 * NOTE: Unlike on iOS, on Android, we can't infer fontFamily and
 * font style, so it has to be specified when loading the font.
 */
export default function loadFontAsync({ uri, fontFamily, fontStyle }) {
  let fontStyleAndroid;
  switch (fontStyle) {
    case 'regular':
      fontStyleAndroid = 0;
      break;
    case 'bold':
      fontStyleAndroid = 1;
      break;
    case 'italic':
      fontStyleAndroid = 2;
      break;
    case 'bold-italic':
      fontStyleAndroid = 3;
      break;
    default:
      throw new Error(
        'Invalid font style specified. Must be one of ' +
        '\'regular\', \'bold\', \'italic\', or \'bold-italic\''
      );
  }

  if (!_FONTS$[uri]) {
    _FONTS$[uri] = ExponentFontLoader.loadFontWithFamilyNameAsync(fontFamily, fontStyleAndroid, uri)
      .then((fontName) => {
        return fontName;
      })
      .catch((err) => {
        console.error('Failed to load font from ' + uri + ' : ', err);
        throw err;
      });
  }

  return _FONTS$[uri];
}
