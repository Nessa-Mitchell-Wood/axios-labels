export const asigaConfig = {
  title: 'Asiga',
  specification: [
    [
      { key: 'Client', value: 'detail.client', span: 6 },
      { key: 'Material', value: 'detail.material', span: 6 },
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
      { key: 'Job', value: 'detail.job', span: 3 },
      { key: 'Job Name', value: 'detail.run', span: 6 },
      { key: 'Units', value: 'detail.units', span: 3 },
    ],
  ],
  keys: [
    'job',
    'priority',
    'client',
    'patient',
    'units',
    'material',
    'notes',
    'due',
    'loading',
    'postprocessing',
    'status',
    'printer',
    'run',
    'manufacture',
  ],
  update: function update() {
    this.details = this.text
      .split(/\n/)
      .map((d) =>
        d.split(/\t/).reduce((a, d, i) => {
          a[this.keys[i]] = d;
          return a;
        }, {})
      )
      .sort((a, b) => b.patient.localeCompare(a.patient))
      .sort((a, b) => b.run.localeCompare(a.run));
  },
};
