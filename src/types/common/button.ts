import { IClickable, IClickableEvent } from '../view';
import { BaseView } from '../../types';
import { createElement, ElementCreator  } from '../../utils/utils';

export interface ButtonData {
	label: string;
}

export interface ButtonSettings<T> extends IClickable<T> {}

export class ButtonView<T> extends BaseView<ButtonData, ButtonSettings<T>> {
	init() {
		this.element.addEventListener('click', this.onClickHandler.bind(this));
	}

	onClickHandler(event: MouseEvent) {
		this.settings.onClick({ event });
	}

	set label(value: string) {
		this.setValue(this.element, value);
	}

	/**
	 * Фабричный метод для создания кнопки, но возвращаем сразу элемент,
	 * так как кнопки особо не меняются и взаимодействие с классом не требуется
	 */
	static make<T extends HTMLElement>(
		label: string,
		settings: ElementCreator,
		onClick: (args: IClickableEvent<never>) => void
	): T {
		const el = new ButtonView(createElement(...settings), { onClick });
		return el.render({ label }) as T;
	}
}