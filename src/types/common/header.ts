import { IClickable } from '../view';
import { BaseView } from '../../types';

export interface HeaderData {
	title: string;
	description: string;
	action?: string;
}

export interface HeaderSettings extends IClickable<never> {
	action: string;
	title: string;
	description: string;
}

export class HeaderView extends BaseView<HeaderData, HeaderSettings> {
	init() {
		this.ensure(this.settings.action).addEventListener(
			'click',
			this.onClickHandler.bind(this)
		);
	}

	onClickHandler(event: MouseEvent) {
		this.settings.onClick({ event });
	}

	set title(value: string) {
		this.setValue(this.settings.title, value);
	}

	set description(value: string) {
		this.setValue(this.settings.description, value);
	}

	set action(value: string) {
		this.setValue(this.settings.action, value);
	}
}