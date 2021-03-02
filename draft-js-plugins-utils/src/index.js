// @flow

import { RichUtils, EditorState } from '@wix/draft-js';
import type DraftEntityInstance from '@wix/draft-js/lib/DraftEntityInstance';

export default {
  createLinkAtSelection(editorState: EditorState, url: string): EditorState {
    const contentState = editorState.getCurrentContent().createEntity('LINK', 'MUTABLE', { url });
    const entityKey = contentState.getLastCreatedEntityKey();
    const withLink = RichUtils.toggleLink(
      editorState,
      editorState.getSelection(),
      entityKey
    );
    return EditorState.forceSelection(
      withLink, editorState.getSelection()
    );
  },

  removeLinkAtSelection(editorState: EditorState): EditorState {
    const selection = editorState.getSelection();
    return RichUtils.toggleLink(editorState, selection, null);
  },

  getCurrentEntityKey(editorState: EditorState): ?string {
    const selection = editorState.getSelection();
    const anchorKey = selection.getAnchorKey();
    const contentState = editorState.getCurrentContent();
    const anchorBlock = contentState.getBlockForKey(anchorKey);
    const offset = selection.anchorOffset;
    const index = selection.isBackward ? offset - 1 : offset;
    return anchorBlock.getEntityAt(index);
  },

  getCurrentEntity(editorState: EditorState): ?DraftEntityInstance {
    const contentState = editorState.getCurrentContent();
    const entityKey = this.getCurrentEntityKey(editorState);
    return entityKey ? contentState.getEntity(entityKey) : null;
  },

  hasEntity(editorState: EditorState, entityType: string): boolean {
    const entity = this.getCurrentEntity(editorState);
    return entity && entity.getType() === entityType;
  },
};
