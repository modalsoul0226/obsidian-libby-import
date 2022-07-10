import { Plugin } from 'obsidian';
import ImporterModal from 'src/components/importer';
import SettingsTab from 'src/components/settings';
import { GeneralSettings, DEFAULT_SETTINGS } from 'src/settings/general';


// libby to obsidian plugin
export default class LibbyPlugin extends Plugin {
	settings: GeneralSettings;

	async onload() {
		await this.loadSettings();

		// command for opening the importer tool
		this.addCommand({
			id: 'open-libby-importer',
			name: 'Open',
			callback: () => {
				new ImporterModal(this.app).open();
			}
		});

		// settings tab
		this.addSettingTab(new SettingsTab(this.app, this));
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
