export const brand = {name: {zh: 'Pillo', en: 'Pillo'}, year: 2026, version: '1.0.1'} as const
export const pricing = {monthly: 4.99, yearly: 47.99, yearlyMonthly: 3.99, saving: 20} as const
export const asset = (name: string) => `/templates/pillo/images/${name}.avif`
