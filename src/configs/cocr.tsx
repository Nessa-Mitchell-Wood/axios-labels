import { PatientTitle } from './patient-title';

export const cocrConfig = {
  title: 'CoCr',
  keys: [
    'job',
    'priority',
    'client',
    'patient',
    'classification',
    'units',
    'notes',
    'due',
    'loading',
    'finishing',
    'jobfile',
    'position',
    'status',
    'manufacturedate',
  ],
  mappings: [
    { key: 'client', value: (i) => i },
    {
      key: 'patient',
      value: (patient, details) => ({
        html: <PatientTitle patient={patient} label="Cr" />,
        value: patient,
      }),
    },
    { key: 'job', value: (ident) => ident },
    { key: 'classification', value: (i) => i },
    { key: 'units', value: (ident) => ident },
    { key: 'jobfile', value: (ident) => ident },
    {
      key: 'manufacturedate',
      value: (ident) => ident,
    },
    { key: 'notes', value: (note) => (note ? note : '') },
  ],
  labelKeys: [
    ['Client', 'client'],
    ['Job', 'job'],
    ['Material', 'classification'],
    ['Units', 'units'],
    ['Job Name', 'jobfile'],
    ['Manufacture', 'manufacturedate'],
    ['Notes', 'notes'],
  ],
};
