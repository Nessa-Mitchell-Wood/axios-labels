export const sintecConfig = {
  title: 'Sintec',
  specification: [
    [
      { key: 'Client', value: 'detail.client', span: 6 },
      { key: 'Material', value: '() => "Sintec"', span: 6 },
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
    'units',
    'notes',
    'due',
    'loading',
    'finishing',
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
