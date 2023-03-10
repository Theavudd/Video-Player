import {I18n} from 'i18n-js';

import translations from './locale/translations';

const i18n = new I18n(translations);

i18n.defaultLocale = 'en';

export default i18n;
