export const splintsConfig = {
  title: 'Splints',
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
      { key: 'Job', value: 'detail.job', span: 4 },
      { key: 'Units', value: 'detail.units', span: 4 },
      {
        key: 'Job Name',
        value: '[detail.depth, detail.holder].join("-")',
        span: 4,
      },
    ],
  ],
  keys: [
    'job',
    'priority',
    'client',
    'patient',
    'material',
    'units',
    'notes',
    'due',
    'loading',
    'status',
    'depth',
    'holder',
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
      .sort((a, b) => {
        b.holder.localeCompare(a.holder);
      });
  },
};
