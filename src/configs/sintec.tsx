import { PatientTitle } from './patient-title';

export const sintecConfig = {
  title: 'Sintec',
  keys: [
    'job',
    'priority',
    'client',
    'patient',
    'units',
    'notes',
    'due',
    'loading',
    'finishing',
    'pos1',
    'pos2',
    'pos3',
    'pos4',
    'pos5',
    'pos6',
    'jobfile',
    'status',
    'manufacturedate',
  ],
  mappings: [
    { key: 'client', value: (ident) => ident },
    {
      key: 'patient',
      value: (patient) => ({
        html: <PatientTitle patient={patient} label="Sn" />,
        value: patient,
      }),
    },
    { key: 'job', value: (ident) => ident },
    { key: 'material', value: (ident) => 'Sintec' },
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
    ['Material', 'material'],
    ['Units', 'units'],
    ['Job Name', 'jobfile'],
    ['Manufacture', 'manufacturedate'],
    ['Notes', 'notes'],
  ],
};
