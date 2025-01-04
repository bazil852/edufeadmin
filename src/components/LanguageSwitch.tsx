import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSwitch: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
      className="px-3 py-1 rounded-md bg-[#114A55] text-white hover:bg-[#114A55]/90 text-sm font-medium"
    >
      {language === 'en' ? 'ES' : 'EN'}
    </button>
  );
};

export default LanguageSwitch;