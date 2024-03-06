
import {useLocale, useTranslations} from 'next-intl';
import {locales} from '../config';
import LocaleSwitcherSelect from './LocalSwitcherSelect';
export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  let myLocale = [
    {
      name : "English",
      value : "en"
    },
    {
      name : "Chinese",
      value : "zh"
    },
  
  ]
  return (
    <LocaleSwitcherSelect defaultValue={locale} label={t('label')}>
     

       {myLocale.map((cur, i) =>  {
   console.log("the curr value", cur)
        return(
          <option key={cur.value} value={cur.value}>
          {/*t('locale', {locale: cur})*/} 
          {cur.name}
        </option>
        )
       })}
    </LocaleSwitcherSelect>
  );
}