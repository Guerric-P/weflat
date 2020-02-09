import { compose } from '@weflat/app/core/utils/functionUtils';

export const findByPropertyValue = property => array => value => array.find(x => x[property] === value);
export const findById = array => id => findByPropertyValue('id')(array)(id);
export const findIndex = array => item => array.indexOf(item);
export const findIndexById = array => compose(findIndex(array))(findById(array));
