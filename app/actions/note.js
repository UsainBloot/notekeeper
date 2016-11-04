import marked from 'marked';

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

export const NOTE_SAVE = 'NOTE_SAVE';
export const NOTE_UPDATE_TITLE = 'NOTE_UPDATE_TITLE';
export const NOTE_CONVERT_TO_HTML = 'NOTE_CONVERT_TO_HTML';

export function save() {
  return {
    type: NOTE_SAVE
  };
}

export function updateTitle(name) {
  return {
    type: NOTE_UPDATE_TITLE,
    payload: {
      title: name
    }
  };
}

export function convertToMarkdown(markdown) {
  const html = marked(markdown);
  return {
    type: NOTE_CONVERT_TO_HTML,
    payload: {
      markdown,
      html
    }
  };
}
