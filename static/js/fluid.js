(function fluid() {
  const cnv = document.querySelector('#fluid');
  const ctx = cnv.getContext('2d');
  const res = 10;

  const { width, height } = cnv.parentElement.getBoundingClientRect();
  cnv.width = width / res;
  cnv.height = height / res;

  const rand = () => 2 * Math.random() - 1;
  const randVect = (scale = 1) => [scale * rand(), scale * rand()];
  const screenVect = () => {
    const [x, y] = [0, 0];
    const scale = 0.5 * Math.max(width / res, height / res);
    return [scale * x + 0.5 * (width / res), scale * y + 0.5 * (height / res)];
  };

  const applyField = (x, v, f, dt) => {
    const scale = Math.max(width / res, height / res);
    const _v = v + f * dt;
    const _x = x + _v * dt;
    return [_x, _v];
  };

  const apply2DField = (pos, vel, field, dt) => {
    const [x0, x1] = pos;
    const [v0, v1] = vel;
    const [f0, f1] = field;
    const [_x0, _v0] = applyField(x0, v0, f0, dt);
    const [_x1, _v1] = applyField(x1, v1, f1, dt);
    return [
      [_x0, _x1],
      [_v0, _v1],
    ];
  };

  ctx.lineWidth = 0.1;
  ctx.lineCap = 'round';

  const curve = () => {
    let [p0, c0, c1, p1] = [
      screenVect(),
      screenVect(),
      screenVect(),
      screenVect(),
    ];
    let [vp0, vc0, vc1, vp1] = [
      randVect(1),
      randVect(1),
      randVect(1),
      randVect(1),
    ];
    let [hp, hv] = applyField(rand(), rand(), rand(), 0.1);
    let op = 0;
    const decay = 0.01;
    let acend = true;
    return function (frame) {
      ctx.strokeStyle = `hsla(${45 * Math.sin(hp) + 270}deg, 80%, 50%, ${op})`;
      ctx.moveTo(...p0);
      ctx.beginPath();
      ctx.bezierCurveTo(...c0, ...c1, ...p1);
      ctx.stroke();
      [p0, vp0] = apply2DField(p0, vp0, randVect(500), 0.01);
      [c0, vc0] = apply2DField(c0, vc0, randVect(500), 0.01);
      [c1, vc1] = apply2DField(c1, vc1, randVect(500), 0.01);
      [p1, vp1] = apply2DField(p1, vp1, randVect(500), 0.01);
      [hp, hv] = applyField(hp, hv, rand(), 0.01);
      if (acend && op < 1) {
        op += decay;
        return;
      }

      acend = false;
      op *= 1 - decay;
      return;
    };
  };

  const clear = () => {
    ctx.fillStyle = 'rgba(15, 23, 42, 0.01)';
    ctx.fillRect(0, 0, width / res, height / res);
  };

  function animator(fns) {
    let frame = 0;
    let added = fns.length - 2;
    return function update() {
      if (Math.random() < 0.002) {
        const [head, ...tail] = fns;
        added = (50 * Math.random() + 5) | 0;
        fns = [head, ...new Array(added).fill(curve).map((d) => d())];
      }
      fns.forEach((fn) => fn(frame));
      frame = requestAnimationFrame(update);
      return function cancel() {
        cancelAnimationFrame(frame);
        frame = 0;
        return update();
      };
    };
  }
  const actions = () => [
    clear,
    curve(),
    curve(),
    curve(),
    curve(),
    curve(),
    curve(),
    curve(),
    curve(),
    curve(),
    curve(),
    curve(),
    curve(),
  ];

  let update = animator(actions());
  let cancel = update();
})();
