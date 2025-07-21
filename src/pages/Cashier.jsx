import { useTranslation } from 'react-i18next';

const Cashier = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('cashierPage')}</h1>
    </div>
  );
};

export default Cashier;
