import { PatientTitle } from './patient-title';

export const tiConfig = {
  title: 'Ti',
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
    'status',
    'manufacturedate',
  ],
  mappings: [
    { key: 'client', value: (ident) => ident },
    {
      key: 'patient',
      value: (patient) => ({
        html: <PatientTitle patient={patient} label="Ti" />,
        value: patient,
      }),
    },
    { key: 'job', value: (ident) => ident },
    { key: 'classification', value: (ident) => ident },
    { key: 'units', value: (ident) => ident },
    { key: 'jobfile', value: (ident) => ident },
    {
      key: 'manufacturedate',
      value: (ident) => ident,
    },
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
