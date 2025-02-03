export const emaxConfig = {
  title: 'Emax',
  specification: [
    [
      { key: 'Client', value: 'detail.client', span: 3 },
      { key: 'Material', value: '() => "Emax"', span: 3 },
      { key: 'Shade', value: 'detail.shade', span: 3 },
      { key: 'Position', value: 'detail.position', span: 3 },
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
      { key: 'Job', value: 'detail.job', span: 2 },
      { key: 'Units', value: 'detail.units', span: 2 },
      {
        key: 'Job Name',
        value: 'detail.jobfile',
        span: 8,
      },
    ],
  ],
  keys: [
    'job',
    'priority',
    'client',
    'patient',
    'shade',
    'units',
    'notes',
    'due',
    'loading',
    'position',
    'jobfile',
    'status',
  ],
  update: function update() {
    this.details = this.text.split('\n').map((d) =>
      d.split('\t').reduce((a, d, i) => {
        a[this.keys[i]] = d;
        return a;
      }, {})
    );
  },
};
