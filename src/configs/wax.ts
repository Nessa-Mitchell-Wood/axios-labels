export const waxConfig = {
  title: 'Wax',
  specification: [
    [
      { key: 'Client', value: 'detail.client', span: 6 },
      { key: 'Material', value: '() => "Wax"', span: 6 },
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
    'machine',
    'jobfile',
    'status',
  ],
  update: function update() {
    this.details = this.text.split('\n').map((d) => {
      const [head, tail] = [
        d.split('\t').slice(0, 9),
        d.split('\t').slice(15, 18),
      ];
      return [...head, ...tail].reduce((a, d, i) => {
        a[this.keys[i]] = d;
        return a;
      }, {});
    });
  },
};
