import { IDictionary } from '../../types';
import { error, isFunction } from '../helpers';
import { Component, STATUSES } from '../component';

/**
 * Wrap function in debounce wrapper
 * @param timeout
 */
export function debounce(timeout?: number) {
	return function<T extends Component & IDictionary>(
		target: IDictionary,
		propertyKey: string
	) {
		if (!isFunction(target[propertyKey])) {
			throw error('Handler must be a Function');
		}

		target.hookStatus(STATUSES.ready, (component: Component) => {
			target[propertyKey] = component.j.async.debounce(
				target[propertyKey].bind(component),
				timeout || component.j.defaultTimeout
			);
		});
	};
}