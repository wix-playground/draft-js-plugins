/**
 * Create an editor state with some text in it already
 */

import {
  ContentState,
  EditorState,
} from '@wix/draft-js';

export default (text) => EditorState.createWithContent(
  ContentState.createFromText(text)
);
