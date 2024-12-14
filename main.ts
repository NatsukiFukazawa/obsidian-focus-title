import { Editor, Plugin } from "obsidian";

interface MyPluginSettings {}

const DEFAULT_SETTINGS: MyPluginSettings = {};
export default class FocusTitle extends Plugin {
	settings: FocusTitle;

	async onload() {
		await this.loadSettings();

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: "focus-title",
			name: "Focus title",
			editorCallback: (_editor: Editor, view: any) => {
				view.inlineTitleEl.focus();
				const titleLength = view.inlineTitleEl.textContent.length;
				const caret = document.createRange();
				caret.setStart(view.inlineTitleEl.firstChild, titleLength);
				caret.setEnd(view.inlineTitleEl.firstChild, titleLength);
				const selection = window.getSelection();
				selection?.removeAllRanges();
				selection?.addRange(caret);
			},
		});
	}
	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}
}