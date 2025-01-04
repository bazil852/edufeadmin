import React, { createContext, useContext, useState } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    'dashboard': 'Dashboard',
    'users': 'Users',
    'employees': 'Employees',
    'investments': 'Investments',
    'reports': 'Reports',
    'chats': 'Chats',
    'total.users': 'Total Users',
    'total.investments': 'Total Investments',
    'active.portfolios': 'Active Portfolios',
    'pending.kyc': 'Pending KYC',
    'recent.activities': 'Recent Activities',
    'investment.overview': 'Investment Overview',
    'search.users': 'Search users...',
    'search.employees': 'Search employees...',
    'export.data': 'Export Data',
    'add.employee': 'Add Employee',
    'name': 'Name',
    'email': 'Email',
    'role': 'Role',
    'department': 'Department',
    'status': 'Status',
    'actions': 'Actions',
  },
  es: {
    'dashboard': 'Panel de Control',
    'users': 'Usuarios',
    'employees': 'Empleados',
    'investments': 'Inversiones',
    'reports': 'Informes',
    'chats': 'Chats',
    'total.users': 'Total de Usuarios',
    'total.investments': 'Total de Inversiones',
    'active.portfolios': 'Portafolios Activos',
    'pending.kyc': 'KYC Pendientes',
    'recent.activities': 'Actividades Recientes',
    'investment.overview': 'Resumen de Inversiones',
    'search.users': 'Buscar usuarios...',
    'search.employees': 'Buscar empleados...',
    'export.data': 'Exportar Datos',
    'add.employee': 'Agregar Empleado',
    'name': 'Nombre',
    'email': 'Correo',
    'role': 'Rol',
    'department': 'Departamento',
    'status': 'Estado',
    'actions': 'Acciones',
  },
};