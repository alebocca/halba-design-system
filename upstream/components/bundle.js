/* @ds-bundle: {"format":4,"namespace":"Halba","components":[{"name":"Button"},{"name":"Badge"},{"name":"StatTile"},{"name":"MetricCard"},{"name":"Input"},{"name":"PhotoPanel"},{"name":"OverlayCard"},{"name":"CheckoutStory"},{"name":"RetryStory"},{"name":"RevenueStory"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;

  function cx() {
    return Array.prototype.slice.call(arguments).filter(Boolean).join(' ');
  }

  function Button(p) {
    var variant = p.variant || 'primary';
    var size = p.size || 'md';
    return h(
      'button',
      {
        type: p.type || 'button',
        disabled: p.disabled,
        onClick: p.onClick,
        className: cx('hb-btn', 'hb-btn--' + variant, 'hb-btn--' + size, p.className)
      },
      p.children,
      p.withArrow ? h('span', { className: 'hb-btn__arrow', 'aria-hidden': 'true' }, '→') : null
    );
  }

  function Badge(p) {
    return h('span', { className: cx('hb-badge', 'hb-badge--' + (p.tone || 'neutral'), p.className) }, p.children);
  }

  function StatTile(p) {
    return h(
      'div',
      { className: cx('hb-stat', 'hb-stat--' + (p.tone || 'brand'), p.className) },
      h('div', { className: 'hb-stat__value' }, p.value),
      h('div', { className: 'hb-stat__label' }, p.label)
    );
  }

  function Sparkline(p) {
    var values = p.values || [];
    var w = 240, ht = 64, pad = 4;
    if (values.length < 2) return null;
    var min = Math.min.apply(null, values);
    var max = Math.max.apply(null, values);
    var span = max - min || 1;
    var pts = values.map(function (v, i) {
      var x = pad + (i * (w - 2 * pad)) / (values.length - 1);
      var y = ht - pad - ((v - min) / span) * (ht - 2 * pad);
      return [x, y];
    });
    var line = pts.map(function (q, i) { return (i ? 'L' : 'M') + q[0].toFixed(1) + ' ' + q[1].toFixed(1); }).join(' ');
    var area = line + ' L' + pts[pts.length - 1][0].toFixed(1) + ' ' + ht + ' L' + pts[0][0].toFixed(1) + ' ' + ht + ' Z';
    var last = pts[pts.length - 1];
    return h(
      'svg',
      { className: 'hb-spark', viewBox: '0 0 ' + w + ' ' + ht, role: 'img', 'aria-label': p.label || 'Trend' },
      h('path', { className: 'hb-spark__area', d: area }),
      h('path', { className: 'hb-spark__line', d: line, fill: 'none', pathLength: 1 }),
      h('circle', { className: 'hb-spark__dot', cx: last[0], cy: last[1], r: 4 })
    );
  }

  function MetricCard(p) {
    var trend = p.trend || 'flat';
    var tone = trend === 'good' ? 'success' : trend === 'bad' ? 'danger' : 'neutral';
    return h(
      'div',
      { className: cx('hb-metric', p.className) },
      h(
        'div',
        { className: 'hb-metric__head' },
        h('span', { className: 'hb-metric__label' }, p.label),
        p.delta ? h(Badge, { tone: tone }, p.delta) : null
      ),
      h('div', { className: 'hb-metric__value' }, p.value),
      p.series ? h(Sparkline, { values: p.series, label: p.label + ' trend' }) : null
    );
  }

  function Input(p) {
    var id = p.id || p.name || 'hb-input';
    var describedBy = p.error ? id + '-error' : p.hint ? id + '-hint' : undefined;
    return h(
      'div',
      { className: cx('hb-field', p.error ? 'hb-field--error' : '', p.className) },
      h('label', { className: 'hb-field__label', htmlFor: id }, p.label),
      h('input', {
        id: id,
        name: p.name,
        type: p.type || 'text',
        value: p.value,
        defaultValue: p.defaultValue,
        placeholder: p.placeholder,
        disabled: p.disabled,
        onChange: p.onChange,
        className: 'hb-field__input',
        'aria-invalid': p.error ? 'true' : undefined,
        'aria-describedby': describedBy
      }),
      p.error
        ? h('div', { id: id + '-error', className: 'hb-field__error' }, p.error)
        : p.hint
        ? h('div', { id: id + '-hint', className: 'hb-field__hint' }, p.hint)
        : null
    );
  }

  function OverlayCard(p) {
    var pos = {};
    ['top', 'left', 'right', 'bottom'].forEach(function (k) {
      if (p[k] !== undefined) pos[k] = p[k];
    });
    var tone = p.tone || 'success';
    return h(
      'div',
      { className: cx('hb-overlay', p.float ? 'hb-overlay--float' : '', p.className), style: pos },
      h('span', { className: 'hb-overlay__icon hb-overlay__icon--' + tone, 'aria-hidden': 'true' }, tone === 'danger' ? '✕' : tone === 'warning' ? '!' : '✓'),
      h(
        'div',
        null,
        h('div', { className: 'hb-overlay__title' }, p.title),
        p.value ? h('div', { className: 'hb-overlay__value' }, p.value) : null
      )
    );
  }

  function Network() {
    var nodes = [[60, 80], [180, 140], [320, 90], [340, 250], [120, 300], [250, 330]];
    var links = [[0, 1], [1, 2], [1, 3], [1, 4], [3, 5]];
    return h(
      'svg',
      { className: 'hb-net', viewBox: '0 0 400 400', preserveAspectRatio: 'xMidYMid slice', 'aria-hidden': 'true' },
      links.map(function (l, i) {
        return h('line', { key: 'l' + i, className: 'hb-net__line', x1: nodes[l[0]][0], y1: nodes[l[0]][1], x2: nodes[l[1]][0], y2: nodes[l[1]][1] });
      }),
      nodes.map(function (n, i) {
        return h('circle', { key: 'n' + i, className: cx('hb-net__node', i === 1 ? 'hb-net__node--live' : ''), cx: n[0], cy: n[1], r: i === 1 ? 9 : 6 });
      })
    );
  }

  function PhotoPanel(p) {
    return h(
      'div',
      {
        className: cx('hb-photo', p.image ? '' : 'hb-photo--empty', p.className),
        style: p.height ? { minHeight: p.height } : undefined
      },
      p.image ? h('img', { className: 'hb-photo__img', src: p.image, alt: p.alt || '' }) : h('span', { className: 'hb-photo__slot' }, 'Stock photo'),
      p.network ? h(Network) : null,
      p.children
    );
  }

  /* ---------- Animated stories ---------- */
  function reducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }
  function clamp01(x) { return Math.max(0, Math.min(1, x)); }
  function ease(x) { return 1 - Math.pow(1 - x, 3); }

  function useInView(ref) {
    var s = React.useState(false);
    var seen = s[0], setSeen = s[1];
    React.useEffect(function () {
      var el = ref.current;
      if (!el || typeof IntersectionObserver === 'undefined') { setSeen(true); return; }
      var io = new IntersectionObserver(function (es) { setSeen(es[0].isIntersecting); }, { threshold: 0.2 });
      io.observe(el);
      return function () { io.disconnect(); };
    }, []);
    return seen;
  }

  /* progress 0..1 over `duration` ms, then holds at 1 for `hold` ms, then loops; runs only while visible; 1 under reduced motion */
  function useProgress(ref, duration, hold) {
    var reduced = reducedMotion();
    var inView = useInView(ref);
    var s = React.useState(reduced ? 1 : 0);
    var prog = s[0], setProg = s[1];
    React.useEffect(function () {
      if (reduced || !inView) return;
      var start = null, raf;
      function frame(ts) {
        if (start === null) start = ts;
        var el = ts - start;
        if (el >= duration + hold) { start = ts; el = 0; }
        setProg(Math.min(1, el / duration));
        raf = requestAnimationFrame(frame);
      }
      raf = requestAnimationFrame(frame);
      return function () { cancelAnimationFrame(raf); };
    }, [reduced, inView, duration, hold]);
    return prog;
  }

  function Story(p) {
    return h(
      'div',
      { ref: p.rootRef, className: cx('hb-story', 'hb-story--' + p.tone, p.className), role: 'img', 'aria-label': p.label },
      h('div', { className: 'hb-story__eyebrow' }, p.eyebrow),
      p.children
    );
  }

  function CheckoutStory(p) {
    var ref = React.useRef(null);
    var prog = useProgress(ref, 4600, 2600);
    var t = prog * 38;
    var amount = p.amount || '$89.00';
    var merchant = p.merchant || 'Northwind';
    var checks = [
      { wait: p.check1Wait || 'Verifying account…', ok: p.check1 || 'Account verified' },
      { wait: p.check2Wait || 'Checking for fraud…', ok: p.check2 || 'Fraud check passed' },
      { wait: p.check3Wait || 'Choosing best route…', ok: p.check3 || 'Smart routing applied' }
    ];
    var dots = '••••';
    var numFull = dots + ' ' + dots + ' ' + dots + ' 4248';
    var n = Math.min(numFull.length, Math.round(clamp01(t / 16) * numFull.length));
    var k = Math.min(5, Math.max(0, Math.round(t - 16)));
    var c = Math.min(3, Math.max(0, Math.round(t - 21)));
    var active = t < 16 ? 0 : t < 21 ? 1 : t < 24 ? 2 : -1;
    var state = t >= 36 ? 'done' : t >= 24 ? 'busy' : 'idle';
    var label = state === 'done' ? 'Payment OK' : state === 'busy' ? 'Processing…' : 'Pay ' + amount;
    function field(i, text, extra) {
      return h('div', { className: cx('hb-story__field', active === i && state === 'idle' ? 'hb-story__field--active' : '', extra) }, text || ' ');
    }
    return h(
      Story,
      { rootRef: ref, tone: p.tone || 'brand', className: p.className, eyebrow: p.eyebrow || 'Checkout', label: 'Checkout form filled in; account, fraud and routing checks pass; payment OK, ' + amount },
      h(
        'div',
        { className: 'hb-story__card' },
        h('div', { className: 'hb-story__merchant' }, h('span', { className: 'hb-story__name' }, merchant), h('span', { className: 'hb-story__amount' }, amount)),
        h('div', null, h('div', { className: 'hb-story__label' }, 'Card number'), field(0, numFull.slice(0, n))),
        h(
          'div',
          { className: 'hb-story__row' },
          h('div', null, h('div', { className: 'hb-story__label' }, 'Expiry'), field(1, '04/29'.slice(0, k))),
          h('div', null, h('div', { className: 'hb-story__label' }, 'CVC'), field(2, dots.slice(0, c)))
        ),
        h(
          'div',
          { className: 'hb-story__checks' },
          checks.map(function (c, i) {
            var start = 24 + i * 4;
            var ok = t >= start + 2.5;
            var o = clamp01((t - start) * 2);
            return h(
              'div',
              { key: 'c' + i, className: 'hb-story__check', style: { opacity: o, transform: 'translateY(' + (1 - o) * 8 + 'px)' } },
              h('span', { className: 'hb-story__tick hb-story__tick--' + (ok ? 'ok' : 'wait'), 'aria-hidden': 'true' }, ok ? '✓' : ''),
              h('span', null, ok ? c.ok : c.wait)
            );
          })
        ),
        h('div', { className: cx('hb-story__pay', 'hb-story__pay--' + state) }, label)
      )
    );
  }

  function RetryStory(p) {
    var ref = React.useRef(null);
    var prog = useProgress(ref, 2600, 3200);
    var t = prog * 4;
    var amount = p.amount || '$89.00';
    var rows = [
      { id: 'A', name: p.first || 'Processor A', result: 'Declined', tone: 'danger', mark: '✕' },
      { id: 'B', name: p.second || 'Processor B', result: 'Declined', tone: 'danger', mark: '✕' },
      { id: 'C', name: p.backup || 'Backup route', result: 'Approved', tone: 'success', mark: '✓' }
    ];
    var heading = t < 1 ? 'Checking rules…' : t < 3 ? 'Trying the next route…' : 'Payment rescued';
    var out = [];
    rows.forEach(function (r, i) {
      var rp = clamp01(t - (i + 0.5));
      if (i > 0) {
        out.push(h('div', { key: 'k' + i, className: 'hb-story__link', style: { transform: 'scaleY(' + clamp01((t - i) * 2) + ')' } }));
      }
      out.push(
        h(
          'div',
          { key: 'r' + i, className: 'hb-story__attempt', style: { opacity: rp, transform: 'translateY(' + (1 - rp) * 10 + 'px)' } },
          h('div', { className: 'hb-story__node' }, r.id, h('span', { className: 'hb-story__dot hb-story__dot--' + r.tone, 'aria-hidden': 'true' }, r.mark)),
          h('div', null, h('div', { className: 'hb-story__name' }, r.name), h(Badge, { tone: r.tone }, r.result))
        )
      );
    });
    return h(
      Story,
      { rootRef: ref, tone: p.tone || 'sun', className: p.className, eyebrow: p.eyebrow || 'Smart retry', label: 'Two processors decline, the backup route approves ' + amount },
      h(
        'div',
        { className: 'hb-story__card' },
        h('div', { className: 'hb-story__head' }, heading),
        h('div', { className: 'hb-story__flow' }, out),
        h('div', { className: 'hb-story__footer', style: { opacity: clamp01((t - 3.3) * 3) } }, h(Badge, { tone: 'success' }, 'Rescued ' + amount))
      )
    );
  }

  function RevenueStory(p) {
    var ref = React.useRef(null);
    var prog = useProgress(ref, 2800, 3200);
    var target = p.target === undefined ? 225237 : p.target;
    var series = p.series || [{ m: 'Jan', a: 320, b: 250 }, { m: 'Feb', a: 360, b: 160 }, { m: 'Mar', a: 300, b: 380 }, { m: 'Apr', a: 340, b: 260 }];
    var max = p.max || 800;
    var H = 170;
    var count = Math.round(target * ease(clamp01(prog / 0.75)));
    var ticks = [0, 1, 2, 3, 4].map(function (i) { return (max / 4) * i; });
    var legendA = p.legendA || 'Retried payments';
    var legendB = p.legendB || 'First-attempt payments';
    return h(
      Story,
      { rootRef: ref, tone: p.tone || 'azure', className: p.className, eyebrow: p.eyebrow || 'Revenue', label: (p.label || 'Rescued revenue') + ' grows to $' + target.toLocaleString('en-US') },
      h(
        'div',
        { className: 'hb-story__card' },
        h('div', { className: 'hb-story__kpi' }, h('span', { className: 'hb-story__label' }, p.label || 'Rescued revenue'), h('span', { className: 'hb-story__counter' }, '$' + count.toLocaleString('en-US'))),
        h(
          'div',
          { className: 'hb-story__legend' },
          h('span', null, h('i', { className: 'hb-story__swatch hb-story__swatch--a' }), legendA),
          h('span', null, h('i', { className: 'hb-story__swatch hb-story__swatch--b' }), legendB)
        ),
        h(
          'div',
          { className: 'hb-story__chart', style: { height: H } },
          ticks.map(function (v) {
            return h('div', { key: 'g' + v, className: 'hb-story__grid', style: { bottom: (v / max) * H } }, h('span', null, v === 0 ? '0' : v + 'K'));
          }),
          h(
            'div',
            { className: 'hb-story__bars' },
            series.map(function (s, i) {
              var bp = ease(clamp01((prog - i * 0.06) / 0.55));
              return h(
                'div',
                { key: s.m, className: 'hb-story__bar' },
                h('div', { className: 'hb-story__seg hb-story__seg--b', style: { height: (s.b / max) * H * bp } }),
                h('div', { className: 'hb-story__seg hb-story__seg--a', style: { height: (s.a / max) * H * bp } })
              );
            })
          )
        ),
        h('div', { className: 'hb-story__months' }, series.map(function (s) { return h('span', { key: s.m }, s.m); }))
      )
    );
  }

  window.Halba = { Button: Button, Badge: Badge, StatTile: StatTile, MetricCard: MetricCard, Input: Input, PhotoPanel: PhotoPanel, OverlayCard: OverlayCard, CheckoutStory: CheckoutStory, RetryStory: RetryStory, RevenueStory: RevenueStory };
})();
