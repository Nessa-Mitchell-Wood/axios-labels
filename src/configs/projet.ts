export const projetConfig = {
  title: 'Projet',
  specification: [
    [
      { key: 'Client', value: 'detail.client', span: 6 },
      { key: 'Material', value: '() => "Digital Models"', span: 6 },
    ],
    [
      { key: 'Due', value: 'detail.due', span: 6 },
      {
        key: 'Completed',
        value: 'new Date().toLocaleString().split(",")[0]',
        span: 6,
      },
    ],
    [
      { key: 'Job', value: 'detail.job', span: 4 },
      { key: 'Units', value: 'detail.units', span: 4 },
      {
        key: 'Job Name',
        value: '[detail.printer, detail.run].join("-")',
        span: 4,
      },
    ],
  ],
  keys: [
    'job',
    'priority',
    'client',
    'patient',
    'units',
    'notes',
    'due',
    'loading',
    'postprocessing',
    'status',
    'models',
    'dies',
    'printer',
    'run',
  ],
  update: function update() {
    this.details = this.text
      .split('\n')
      .map((d) =>
        d.split('\t').reduce((a, d, i) => {
          a[this.keys[i]] = d;
          return a;
        }, {})
      )
      .sort((a, b) => b.patient.localeCompare(a.patient));
  },
};
