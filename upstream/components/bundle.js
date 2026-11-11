/* @ds-bundle: {"format":4,"namespace":"Halba","components":[{"name":"Button"},{"name":"Badge"},{"name":"StatTile"},{"name":"MetricCard"},{"name":"Input"},{"name":"PhotoPanel"},{"name":"OverlayCard"},{"name":"CheckoutStory"},{"name":"RetryStory"},{"name":"RevenueStory"},{"name":"StatusBadge"},{"name":"Card"},{"name":"Panel"},{"name":"TextLink"},{"name":"Logo"},{"name":"Spinner"},{"name":"Modal"},{"name":"Icon"},{"name":"SegmentedControl"},{"name":"Alert"},{"name":"PieChart"},{"name":"BarChart"},{"name":"AuthLayout"},{"name":"MethodBadge"},{"name":"Endpoint"},{"name":"CodeBlock"},{"name":"Tabs"},{"name":"Table"},{"name":"Callout"},{"name":"DocsHeader"},{"name":"DocsSearch"},{"name":"DocsLayout"},{"name":"TerminalStatus"},{"name":"TerminalFrame"},{"name":"IdleScreenUpload"},{"name":"StaffPin"},{"name":"ShareBar"},{"name":"PaymentFlow"},{"name":"Drawer"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;

  function cx() {
    return Array.prototype.slice.call(arguments).filter(Boolean).join(' ');
  }

  var ICONS = {
    check: ['M20 6 9 17l-5-5'],
    x: ['M18 6 6 18', 'M6 6l12 12'],
    alert: ['m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3', 'M12 9v4', 'M12 17h.01'],
    clock: ['M12 6v6l4 2', 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0'],
    undo: ['M9 14 4 9l5-5', 'M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5 5.5 5.5 0 0 1-5.5 5.5H11'],
    info: ['M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0', 'M12 16v-4', 'M12 8h.01'],
    'circle-check': ['M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0', 'm9 12 2 2 4-4'],
    'circle-x': ['M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0', 'm15 9-6 6', 'm9 9 6 6'],
    search: ['m21 21-4.34-4.34', 'M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0'],
    copy: ['M20 9h-9a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2z', 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'],
    menu: ['M4 6h16', 'M4 12h16', 'M4 18h16'],
    'chevron-right': ['m9 18 6-6-6-6'],
    'chevron-down': ['m6 9 6 6 6-6'],
    wifi: ['M12 20h.01', 'M2 8.82a15 15 0 0 1 20 0', 'M5 12.859a10 10 0 0 1 14 0', 'M8.5 16.429a5 5 0 0 1 7 0'],
    'wifi-off': ['M12 20h.01', 'M8.5 16.429a5 5 0 0 1 7 0', 'M5 12.859a10 10 0 0 1 5.17-2.69', 'M19 12.859a10 10 0 0 0-2.007-1.523', 'M2 8.82a15 15 0 0 1 4.177-2.643', 'M22 8.82a15 15 0 0 0-11.288-3.764', 'm2 2 20 20'],
    plug: ['M12 22v-5', 'M9 8V2', 'M15 8V2', 'M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z'],
    upload: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'm17 8-5-5-5 5', 'M12 3v12'],
    image: ['M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', 'M11 9a2 2 0 1 1-4 0 2 2 0 0 1 4 0', 'm21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'],
    play: ['M6 3l14 9-14 9z']
  };

  /* Lucide outline paths: 20px / 1.75 stroke by default, 2.5 stroke at 14px or smaller */
  function Icon(p) {
    var size = p.size || 20;
    return h(
      'svg',
      {
        className: cx('hb-icon', p.className), width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
        stroke: 'currentColor', strokeWidth: p.strokeWidth || (size <= 14 ? 2.5 : 1.75),
        strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true', focusable: 'false'
      },
      (ICONS[p.name] || []).map(function (d, i) { return h('path', { key: i, d: d }); })
    );
  }

  function Button(p) {
    var variant = p.variant || 'primary';
    var size = p.size || 'md';
    var cls = cx('hb-btn', 'hb-btn--' + variant, 'hb-btn--' + size, p.className);
    var arrow = p.withArrow ? h('span', { className: 'hb-btn__arrow', 'aria-hidden': 'true' }, '→') : null;
    if (p.href && !p.disabled) {
      return h('a', { href: p.href, target: p.target, rel: p.rel, onClick: p.onClick, className: cls }, p.children, arrow);
    }
    if (p.href) {
      return h('a', { className: cls, role: 'link', 'aria-disabled': 'true' }, p.children, arrow);
    }
    return h(
      'button',
      { type: p.type || 'button', disabled: p.disabled, onClick: p.onClick, className: cls },
      p.children,
      arrow
    );
  }

  var DEFAULT_ICON = { success: 'check', warning: 'alert', danger: 'x' };

  function Badge(p) {
    var tone = p.tone || 'neutral';
    var icon = p.icon === undefined ? DEFAULT_ICON[tone] : p.icon;
    return h(
      'span',
      { className: cx('hb-badge', 'hb-badge--' + tone, p.className) },
      icon ? h(Icon, { name: icon, size: 12 }) : null,
      p.children
    );
  }

  /* One list of state words and tones for the site, app, dashboard and API pages. */
  var STATUS = {
    approved: { label: 'Approved', tone: 'success' },
    rescued: { label: 'Rescued', tone: 'success' },
    declined: { label: 'Declined', tone: 'danger' },
    failed: { label: 'Failed', tone: 'danger' },
    fraud: { label: 'Fraud', tone: 'danger' },
    'high-risk': { label: 'High risk', tone: 'danger' },
    challenge: { label: 'Challenge', tone: 'warning' },
    'medium-risk': { label: 'Medium risk', tone: 'warning' },
    pending: { label: 'Pending', tone: 'neutral', icon: 'clock' },
    refunded: { label: 'Refunded', tone: 'brand', icon: 'undo' }
  };

  function StatusBadge(p) {
    var s = STATUS[p.status];
    if (!s) return h(Badge, { tone: 'neutral', className: p.className }, p.status);
    return h(Badge, { tone: s.tone, icon: s.icon, className: p.className }, s.label);
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
      h('span', { className: 'hb-overlay__icon hb-overlay__icon--' + tone, 'aria-hidden': 'true' }, h(Icon, { name: tone === 'danger' ? 'x' : tone === 'warning' ? 'alert' : 'check', size: 16 })),
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

  /* ---------- Surfaces, links, loading, modal ---------- */
  function Card(p) {
    var interactive = !!(p.href || p.onClick);
    var cls = cx('hb-card', p.variant === 'product' ? 'hb-card--product' : '', interactive ? 'hb-card--interactive' : '', p.className);
    if (p.href) return h('a', { href: p.href, onClick: p.onClick, className: cls }, p.children);
    if (p.onClick) return h('button', { type: 'button', onClick: p.onClick, className: cls }, p.children);
    return h('div', { className: cls }, p.children);
  }

  function Panel(p) {
    return h('div', { className: cx('hb-panel', 'hb-panel--' + (p.tone || 'brand-tint'), p.className) }, p.children);
  }

  function TextLink(p) {
    return h(
      'a',
      { href: p.href, target: p.target, rel: p.rel, onClick: p.onClick, className: cx('hb-link', p.className) },
      p.children,
      p.withArrow ? h('span', { className: 'hb-link__arrow', 'aria-hidden': 'true' }, '→') : null
    );
  }

  /* The mark: an open ring and a dot, both centred. Geometry is fixed (viewBox 157 173 683 683, ring r280 / 122 wide
     opening at the bottom right, dot r60); at 20px or less a fuller cut is used. Colours come from --logo-ring and --logo-dot. */
  var MARK_VIEW = '157 173 683 683';
  function Mark(p) {
    var small = p.size && p.size <= 20;
    return h(
      'svg',
      { className: cx('hb-mark', p.className), viewBox: MARK_VIEW, width: p.size, height: p.size, 'aria-hidden': 'true', focusable: 'false' },
      h('circle', { className: cx('hb-mark__ring', p.ringClass), cx: 498.5, cy: 514.5, r: small ? 276 : 280, pathLength: 360, style: small ? { strokeWidth: 136 } : undefined }),
      h('circle', { className: cx('hb-mark__dot', p.dotClass), cx: 498.5, cy: 514.5, r: small ? 78 : 60 })
    );
  }

  function Logo(p) {
    var size = p.size || 32;
    var lockup = p.variant === 'lockup';
    var tone = p.tone || 'default';
    return h(
      'span',
      Object.assign(
        { className: cx('hb-logo', tone !== 'default' && 'hb-logo--' + tone, p.className) },
        lockup ? {} : { role: 'img', 'aria-label': p.label || 'halba' }
      ),
      h(Mark, { size: size }),
      lockup ? h('span', { className: 'hb-logo__word', style: { fontSize: Math.round(size * 0.75) + 'px' } }, 'halba') : null
    );
  }

  /* Loading indicator made from the mark. orbit (default): the ring turns and stretches, the dot breathes; for short waits
     in components and buttons. compose: the dot appears, the ring turns around it and closes into the mark; for full-page waits. */
  function Spinner(p) {
    var size = p.size || 24;
    var variant = p.variant === 'compose' ? 'compose' : 'orbit';
    return h(
      'span',
      { className: cx('hb-spinner', 'hb-spinner--' + variant, p.tone === 'mono' && 'hb-logo--mono', p.className), role: 'status' },
      h(Mark, { size: size, className: 'hb-spinner__mark', ringClass: 'hb-spinner__ring', dotClass: 'hb-spinner__dot' }),
      h('span', { className: 'hb-sr' }, p.label || 'Loading')
    );
  }

  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

  function Modal(p) {
    var open = p.open === undefined ? true : p.open;
    var ref = React.useRef(null);
    var onClose = p.onClose;
    var titleId = (p.id || 'hb-modal') + '-title';
    React.useEffect(function () {
      if (!open || p.contained) return;
      var prev = document.activeElement;
      var node = ref.current;
      if (node) { var f = node.querySelector(FOCUSABLE); (f || node).focus(); }
      function onKey(e) {
        if (e.key === 'Escape' && onClose) { e.stopPropagation(); onClose(); return; }
        if (e.key !== 'Tab' || !node) return;
        var items = node.querySelectorAll(FOCUSABLE);
        if (!items.length) { e.preventDefault(); node.focus(); return; }
        var first = items[0], last = items[items.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === node)) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
      document.addEventListener('keydown', onKey);
      return function () { document.removeEventListener('keydown', onKey); if (prev && prev.focus) prev.focus(); };
    }, [open, p.contained]);
    if (!open) return null;
    return h(
      'div',
      {
        className: cx('hb-scrim', p.contained ? 'hb-scrim--contained' : ''),
        onMouseDown: function (e) { if (e.target === e.currentTarget && onClose) onClose(); }
      },
      h(
        'div',
        { ref: ref, className: cx('hb-modal', p.size === 'lg' ? 'hb-modal--lg' : '', p.className), role: p.confirm ? 'alertdialog' : 'dialog', 'aria-modal': 'true', 'aria-labelledby': titleId, tabIndex: -1 },
        h(
          'div',
          { className: 'hb-modal__head' },
          h('h2', { id: titleId, className: 'hb-modal__title' }, p.title),
          onClose ? h('button', { type: 'button', className: 'hb-modal__close', onClick: onClose, 'aria-label': 'Close' }, h(Icon, { name: 'x' })) : null
        ),
        h(
          'div',
          { className: 'hb-modal__body' },
          p.loading ? h('div', { className: 'hb-modal__loading' }, h(Spinner, { label: p.loadingLabel || 'Loading' })) : null,
          p.children
        ),
        p.footer ? h('div', { className: 'hb-modal__foot' }, p.footer) : null
      )
    );
  }

  var ALERT_ICON = { info: 'info', success: 'circle-check', warning: 'alert', danger: 'circle-x' };

  function Alert(p) {
    var tone = p.tone || 'info';
    return h(
      'div',
      { className: cx('hb-alert', 'hb-alert--' + tone, p.className), role: p.role || (tone === 'danger' ? 'alert' : 'status') },
      h('span', { className: 'hb-alert__icon' }, h(Icon, { name: ALERT_ICON[tone] })),
      h('div', { className: 'hb-alert__body' }, p.children),
      p.onDismiss ? h('button', { type: 'button', className: 'hb-alert__close', onClick: p.onDismiss, 'aria-label': 'Dismiss' }, h(Icon, { name: 'x', size: 16 })) : null
    );
  }

  /* ---------- Charts: flat soft fills, no outlines ---------- */
  function fmtNum(n) { return Number(n).toLocaleString('en-US'); }
  var PIE_TONES = ['success', 'danger', 'azure', 'warning', 'neutral'];

  /* Distribution of events (OK, KO, Retry...). Donut by default; donut={false} gives a full pie. */
  function PieChart(p) {
    var data = p.data || [];
    var format = p.format || fmtNum;
    var total = 0;
    data.forEach(function (d) { total += d.value; });
    var donut = p.donut !== false;
    var r = donut ? 66 : 40;
    var sw = donut ? 28 : 80;
    var C = 2 * Math.PI * r;
    var cum = 0;
    var segs = data.map(function (d, i) {
      var frac = total ? d.value / total : 0;
      var s = { d: d, i: i, frac: frac, len: frac * C, start: cum, tone: d.tone || PIE_TONES[i % PIE_TONES.length] };
      cum += s.len;
      return s;
    });
    var visible = segs.filter(function (s) { return s.len > 0; });
    var single = visible.length === 1;
    return h(
      'div',
      { className: cx('hb-pie', p.className), role: 'group', 'aria-label': p.label },
      h(
        'div',
        { className: 'hb-pie__plot' },
        h(
          'svg',
          { className: 'hb-pie__svg', viewBox: '0 0 200 200', 'aria-hidden': 'true' },
          visible.map(function (s) {
            return h('circle', {
              key: s.i, cx: 100, cy: 100, r: r, fill: 'none', strokeWidth: sw,
              className: 'hb-pie__seg hb-tone--' + s.tone,
              strokeDasharray: (single ? C : Math.max(0.5, s.len - 3)) + ' ' + C,
              strokeDashoffset: -s.start, transform: 'rotate(-90 100 100)'
            });
          })
        ),
        donut ? h('div', { className: 'hb-pie__center' }, h('div', { className: 'hb-pie__total' }, format(total)), p.totalLabel ? h('div', { className: 'hb-pie__caption' }, p.totalLabel) : null) : null
      ),
      h(
        'ul',
        { className: 'hb-pie__legend' },
        segs.map(function (s) {
          var pct = s.d.value > 0 && s.frac < 0.01 ? '<1%' : Math.round(s.frac * 100) + '%';
          return h(
            'li',
            { key: s.i, className: 'hb-pie__row' },
            h('span', { className: 'hb-dot hb-tone--' + s.tone, 'aria-hidden': 'true' }),
            h('span', { className: 'hb-pie__name' }, s.d.label),
            h('span', { className: 'hb-pie__val' }, format(s.d.value), h('span', { className: 'hb-pie__pct' }, pct))
          );
        })
      )
    );
  }

  function niceScale(v) {
    var pow = Math.pow(10, Math.floor(Math.log(v / 4) / Math.LN10));
    var steps = [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10];
    for (var i = 0; i < steps.length; i++) {
      var st = steps[i] * pow;
      if (st * 4 >= v) return { step: st, max: st * 4 };
    }
    return { step: 10 * pow, max: 40 * pow };
  }

  /* Values over time. Series are stacked (default) or side by side (stacked={false}). */
  function BarChart(p) {
    var data = p.data || [];
    var series = p.series && p.series.length ? p.series : [{ name: 'Value', tone: 'azure' }];
    var stacked = p.stacked !== false && series.length > 1;
    var H = p.height || 220;
    var format = p.format || fmtNum;
    var showValues = p.showValues !== false;
    var peak = 0;
    data.forEach(function (d) {
      var v = stacked ? d.values.reduce(function (a, b) { return a + b; }, 0) : Math.max.apply(null, d.values);
      if (v > peak) peak = v;
    });
    var sc = p.max ? { max: p.max, step: p.max / 4 } : niceScale(peak || 4);
    var summary = data.map(function (d) { return d.label + ' ' + format(d.values.reduce(function (a, b) { return a + b; }, 0)); }).join(', ');
    function px(v) { return v > 0 ? Math.max(3, (v / sc.max) * H) : 0; }
    return h(
      'div',
      { className: cx('hb-bars', p.className), role: 'img', 'aria-label': (p.label || 'Bar chart') + ': ' + summary },
      series.length > 1 || p.legend ? h(
        'div',
        { className: 'hb-bars__legend' },
        series.map(function (s) {
          return h('span', { key: s.name }, h('i', { className: 'hb-dot hb-tone--' + (s.tone || 'azure') }), s.name);
        })
      ) : null,
      h(
        'div',
        { className: 'hb-bars__plot', style: { height: H } },
        [0, 1, 2, 3, 4].map(function (i) {
          return h('div', { key: 'g' + i, className: 'hb-bars__grid', style: { bottom: (i / 4) * 100 + '%' } }, h('span', null, format(sc.step * i)));
        }),
        h(
          'div',
          { className: 'hb-bars__cols' },
          data.map(function (d, ci) {
            var total = d.values.reduce(function (a, b) { return a + b; }, 0);
            return h(
              'div',
              { key: ci, className: 'hb-bars__col' },
              h(
                'div',
                { className: cx('hb-bars__stack', stacked ? '' : 'hb-bars__stack--group') },
                showValues && stacked && total > 0 ? h('span', { className: 'hb-bars__value' }, format(total)) : null,
                d.values.map(function (v, si) {
                  if (!(v > 0)) return null;
                  var seg = h('div', { className: 'hb-bars__seg hb-tone--' + (series[si] && series[si].tone || 'azure'), style: { height: px(v), animationDelay: ci * 40 + 'ms' } });
                  if (stacked) return h('div', { key: si, className: 'hb-bars__cell' }, seg);
                  return h('div', { key: si, className: 'hb-bars__cell' }, showValues ? h('span', { className: 'hb-bars__value' }, format(v)) : null, seg);
                })
              )
            );
          })
        )
      ),
      h('div', { className: 'hb-bars__labels' }, data.map(function (d, i) { return h('span', { key: i }, d.label); }))
    );
  }

  /* ---------- Segmented control and auth layout ---------- */
  function SegmentedControl(p) {
    var opts = p.options || [];
    var ref = React.useRef(null);
    var base = p.id || 'hb-seg';
    function go(i) {
      var k = (i + opts.length) % opts.length;
      if (!opts[k]) return;
      if (p.onChange) p.onChange(opts[k].value);
      var tabs = ref.current && ref.current.querySelectorAll('.hb-seg__opt');
      if (tabs && tabs[k]) tabs[k].focus();
    }
    function onKey(e) {
      var cur = 0;
      for (var i = 0; i < opts.length; i++) if (opts[i].value === p.value) cur = i;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); go(cur + 1); }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); go(cur - 1); }
      else if (e.key === 'Home') { e.preventDefault(); go(0); }
      else if (e.key === 'End') { e.preventDefault(); go(opts.length - 1); }
    }
    return h(
      'div',
      { ref: ref, role: p.panelId ? 'tablist' : 'radiogroup', 'aria-label': p.label, onKeyDown: onKey, className: cx('hb-seg', p.tone === 'brand' ? 'hb-seg--brand' : '', p.block ? 'hb-seg--block' : '', p.className) },
      opts.map(function (o) {
        var sel = o.value === p.value;
        var attrs = { key: o.value, id: base + '-' + o.value, type: 'button', tabIndex: sel ? 0 : -1, className: 'hb-seg__opt', onClick: function () { if (p.onChange) p.onChange(o.value); } };
        if (p.panelId) { attrs.role = 'tab'; attrs['aria-selected'] = sel ? 'true' : 'false'; attrs['aria-controls'] = p.panelId; }
        else { attrs.role = 'radio'; attrs['aria-checked'] = sel ? 'true' : 'false'; }
        return h('button', attrs, o.label);
      })
    );
  }

  /* Split page for login and sign-up: form on the left, a graphic on the right (hidden below 900px). */
  function AuthLayout(p) {
    return h(
      'div',
      { className: cx('hb-auth', p.className) },
      h(
        'main',
        { className: 'hb-auth__main' },
        h('div', { className: 'hb-auth__logo' }, p.logo || h(Logo, { variant: 'lockup', size: 32 })),
        h('div', { className: 'hb-auth__form' }, p.children)
      ),
      p.aside ? h('aside', { className: 'hb-auth__aside', 'aria-hidden': 'true' }, p.aside) : null
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
              h('span', { className: 'hb-story__tick hb-story__tick--' + (ok ? 'ok' : 'wait'), 'aria-hidden': 'true' }, ok ? h(Icon, { name: 'check', size: 12 }) : null),
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
    var amount = p.amount || '$89.00';
    /* steps: 2 or 3 attempts, in order; the last one approves. first/second/backup keep the three-step default. */
    var steps = (p.steps && p.steps.length ? p.steps : [
      { name: p.first || 'Processor A', result: 'declined' },
      { name: p.second || 'Processor B', result: 'declined' },
      { name: p.backup || 'Backup route', result: 'approved' }
    ]).slice(0, 3);
    var n = steps.length;
    var prog = useProgress(ref, 650 * (n + 1), 3200);
    var t = prog * (n + 1);
    var rows = steps.map(function (s, i) {
      var ok = s.result === 'approved';
      return { id: String.fromCharCode(65 + i), name: s.name, result: ok ? 'Approved' : 'Declined', tone: ok ? 'success' : 'danger', icon: ok ? 'check' : 'x' };
    });
    var heading = t < 1 ? 'Checking rules…' : t < n ? 'Trying the next route…' : 'Payment rescued';
    var label = rows.map(function (r) { return r.name + ' ' + r.result.toLowerCase(); }).join(', ') + '; payment rescued ' + amount;
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
          h('div', { className: 'hb-story__node' }, r.id, h('span', { className: 'hb-story__dot hb-story__dot--' + r.tone, 'aria-hidden': 'true' }, h(Icon, { name: r.icon, size: 12 }))),
          h('div', null, h('div', { className: 'hb-story__name' }, r.name), h(Badge, { tone: r.tone }, r.result))
        )
      );
    });
    return h(
      Story,
      { rootRef: ref, tone: p.tone || 'sun', className: p.className, eyebrow: p.eyebrow || 'Smart retry', label: label },
      h(
        'div',
        { className: 'hb-story__card' },
        h('div', { className: 'hb-story__head' }, heading),
        h('div', { className: 'hb-story__flow' }, out),
        h('div', { className: 'hb-story__footer', style: { opacity: clamp01((t - (n + 0.3)) * 3) } }, h(Badge, { tone: 'success' }, 'Rescued ' + amount))
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

  /* ---------- Docs: plain, static, no images, no motion ---------- */
  var HTTP_TONE = { GET: 'sky', POST: 'success', PUT: 'warning', PATCH: 'warning', DELETE: 'danger' };

  /* HTTP method label: the word carries the meaning, the tint only groups it. */
  function MethodBadge(p) {
    var m = String(p.method || 'GET').toUpperCase();
    return h('span', { className: cx('hb-method', 'hb-method--' + (HTTP_TONE[m] || 'sky'), p.className) }, m);
  }

  /* Method and path on one line, e.g. POST /v1/payments */
  function Endpoint(p) {
    return h('div', { className: cx('hb-endpoint', p.className) },
      h(MethodBadge, { method: p.method }),
      h('code', { className: 'hb-endpoint__path' }, p.path));
  }

  /* Small tokenizer: strings, numbers, comments, keywords, JSON keys. Enough for docs samples, no dependency. */
  var KW = /^(?:const|let|var|function|return|await|async|import|from|export|new|if|else|for|of|in|true|false|null|undefined|def|class|None|True|False|curl|echo)$/;
  function tokenize(src) {
    var re = /(\/\/[^\n]*|#[^\n]*)|("(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`)|(-?\b\d+(?:\.\d+)?\b)|(\b[A-Za-z_][\w]*\b)|([\s\S])/g;
    var out = [], m, last = null;
    function push(type, text) {
      if (last && last.type === type && type === 'plain') { last.text += text; } else { last = { type: type, text: text }; out.push(last); }
    }
    while ((m = re.exec(src))) {
      if (m[1]) push('comment', m[1]);
      else if (m[2]) {
        var after = src.slice(re.lastIndex).match(/^\s*:/);
        push(after && m[2].charAt(0) === '"' ? 'key' : 'string', m[2]);
      }
      else if (m[3]) push('number', m[3]);
      else if (m[4]) push(KW.test(m[4]) ? 'keyword' : 'plain', m[4]);
      else push('plain', m[5]);
    }
    return out;
  }

  function copyText(text, done) {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
        return;
      }
    } catch (e) {}
    try {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = document.execCommand('copy'); document.body.removeChild(ta); done(!!ok);
    } catch (e2) { done(false); }
  }

  /* Code sample. Pass `code`, or `tabs` for one sample in several languages. */
  function CodeBlock(p) {
    var tabs = p.tabs, st = React.useState(0), idx = st[0], setIdx = st[1];
    var cp = React.useState(false), copied = cp[0], setCopied = cp[1];
    var id = React.useRef(p.id || 'cb' + Math.random().toString(36).slice(2, 8)).current;
    var cur = tabs ? tabs[Math.min(idx, tabs.length - 1)] : { code: p.code, label: p.title };
    var code = String(cur.code || '').replace(/\n$/, '');
    var plain = p.highlight === false;
    function onCopy() {
      copyText(code, function (ok) { setCopied(ok); if (ok) setTimeout(function () { setCopied(false); }, 2000); });
    }
    function onKey(e) {
      if (!tabs) return;
      var n = tabs.length, to = null;
      if (e.key === 'ArrowRight') to = (idx + 1) % n; else if (e.key === 'ArrowLeft') to = (idx - 1 + n) % n;
      else if (e.key === 'Home') to = 0; else if (e.key === 'End') to = n - 1;
      if (to === null) return;
      e.preventDefault(); setIdx(to);
      var el = document.getElementById(id + '-tab-' + to); if (el) el.focus();
    }
    var head = tabs
      ? h('div', { className: 'hb-code__tabs', role: 'tablist', 'aria-label': p.label || 'Language', onKeyDown: onKey },
          tabs.map(function (t, i) {
            return h('button', { key: i, type: 'button', role: 'tab', id: id + '-tab-' + i, 'aria-selected': i === idx, 'aria-controls': id + '-panel', tabIndex: i === idx ? 0 : -1, className: 'hb-code__tab', onClick: function () { setIdx(i); } }, t.label);
          }))
      : (p.title ? h('span', { className: 'hb-code__title' }, p.title) : h('span', null));
    var body = plain ? code : tokenize(code).map(function (t, i) { return t.type === 'plain' ? t.text : h('span', { key: i, className: 'hb-tok hb-tok--' + t.type }, t.text); });
    return h('div', { className: cx('hb-code', p.className) },
      h('div', { className: 'hb-code__bar' }, head,
        p.copy === false ? null : h('button', { type: 'button', className: 'hb-code__copy', onClick: onCopy },
          h(Icon, { name: copied ? 'check' : 'copy', size: 16 }), h('span', null, copied ? 'Copied' : 'Copy'))),
      h('pre', Object.assign({ className: 'hb-code__pre', tabIndex: 0 }, tabs ? { role: 'tabpanel', id: id + '-panel', 'aria-labelledby': id + '-tab-' + idx } : { 'aria-label': p.title || 'Code sample' }),
        h('code', null, body)),
      h('span', { className: 'hb-sr', 'aria-live': 'polite' }, copied ? 'Copied to clipboard' : ''));
  }

  /* Content tabs, underline style. SegmentedControl is the pill style for settings. */
  function Tabs(p) {
    var opts = p.options || [], id = p.id || 'tabs';
    function onKey(e) {
      var i = opts.map(function (o) { return o.value; }).indexOf(p.value), n = opts.length, to = null;
      if (e.key === 'ArrowRight') to = (i + 1) % n; else if (e.key === 'ArrowLeft') to = (i - 1 + n) % n;
      else if (e.key === 'Home') to = 0; else if (e.key === 'End') to = n - 1;
      if (to === null) return;
      e.preventDefault(); p.onChange(opts[to].value);
      var el = document.getElementById(id + '-' + opts[to].value); if (el) el.focus();
    }
    return h('div', { className: cx('hb-tabs', p.className), role: 'tablist', 'aria-label': p.label, onKeyDown: onKey },
      opts.map(function (o) {
        var sel = o.value === p.value;
        return h('button', { key: o.value, type: 'button', role: 'tab', id: id + '-' + o.value, 'aria-selected': sel, 'aria-controls': p.panelId, tabIndex: sel ? 0 : -1, className: 'hb-tabs__tab', onClick: function () { p.onChange(o.value); } }, o.label);
      }));
  }

  /* Reference table. columns: [{key,label,mono,width}], rows: objects whose values may be text or nodes. */
  function Table(p) {
    var cols = p.columns || [];
    return h('div', { className: cx('hb-table-wrap', p.className), role: 'region', 'aria-label': p.label, tabIndex: 0 },
      h('table', { className: 'hb-table' },
        p.caption ? h('caption', { className: 'hb-sr' }, p.caption) : null,
        h('thead', null, h('tr', null, cols.map(function (c) { return h('th', { key: c.key, scope: 'col', style: c.width ? { width: c.width } : undefined }, c.label); }))),
        h('tbody', null, (p.rows || []).map(function (r, i) {
          return h('tr', { key: i }, cols.map(function (c) {
            return h(c.header ? 'th' : 'td', Object.assign({ key: c.key }, c.header ? { scope: 'row' } : {}), c.mono && typeof r[c.key] === 'string' ? h('code', { className: 'hb-table__code' }, r[c.key]) : r[c.key]);
          }));
        }))));
  }

  var CALLOUT_ICON = { note: 'info', tip: 'circle-check', warning: 'alert', danger: 'circle-x' };
  var CALLOUT_WORD = { note: 'Note', tip: 'Tip', warning: 'Warning', danger: 'Important' };

  /* Note inside a docs page, with a title word so tone never rests on colour. */
  function Callout(p) {
    var tone = p.tone || 'note';
    return h('aside', { className: cx('hb-callout', 'hb-callout--' + tone, p.className), role: tone === 'danger' ? 'alert' : 'note' },
      h('span', { className: 'hb-callout__icon' }, h(Icon, { name: CALLOUT_ICON[tone] })),
      h('div', { className: 'hb-callout__body' },
        h('p', { className: 'hb-callout__title' }, p.title || CALLOUT_WORD[tone]),
        h('div', null, p.children)));
  }

  /* Top of a docs page: path, title, lead, and optional meta such as Endpoint. */
  function DocsHeader(p) {
    return h('header', { className: cx('hb-dochead', p.className) },
      p.breadcrumb ? h('nav', { 'aria-label': 'Breadcrumb' }, h('ol', { className: 'hb-dochead__crumbs' }, p.breadcrumb.map(function (b, i) {
        var last = i === p.breadcrumb.length - 1;
        return h('li', { key: i }, last ? h('span', { 'aria-current': 'page' }, b.label) : h('a', { href: b.href }, b.label), last ? null : h(Icon, { name: 'chevron-right', size: 12 }));
      }))) : null,
      h('h1', { className: 'hb-dochead__title' }, p.title),
      p.lead ? h('p', { className: 'hb-dochead__lead' }, p.lead) : null,
      p.children);
  }

  /* Search trigger: the page wires the dialog; this is only the button. */
  function DocsSearch(p) {
    return h('button', { type: 'button', className: cx('hb-docsearch', p.className), onClick: p.onClick, 'aria-label': p.label || 'Search the docs' },
      h(Icon, { name: 'search', size: 16 }), h('span', { className: 'hb-docsearch__text' }, p.placeholder || 'Search the docs'),
      p.shortcut === false ? null : h('kbd', { className: 'hb-docsearch__kbd' }, p.shortcut || 'Ctrl K'));
  }

  /* Docs shell: top bar, section navigation, page, on this page. Static; below 900px the navigation folds into a menu. */
  function DocsLayout(p) {
    var nav = p.nav || [], toc = p.toc || [];
    var navEl = nav.map(function (g, gi) {
      return h('div', { key: gi, className: 'hb-docsnav__group' },
        h('p', { className: 'hb-docsnav__title', id: 'docsnav-' + gi }, g.title),
        h('ul', { 'aria-labelledby': 'docsnav-' + gi }, g.items.map(function (it, i) {
          return h('li', { key: i }, h('a', Object.assign({ href: it.href, className: cx('hb-docsnav__link', it.current && 'is-current') }, it.current ? { 'aria-current': 'page' } : {}), it.label));
        })));
    });
    return h('div', { className: cx('hb-docs', p.className) },
      h('div', { className: 'hb-docs__top' },
        h('div', { className: 'hb-docs__brand' }, p.logo || h(Logo, { variant: 'lockup', size: 28 }), p.section ? h('span', { className: 'hb-docs__section' }, p.section) : null),
        h('div', { className: 'hb-docs__tools' }, p.search || null, p.tools || null)),
      h('div', { className: 'hb-docs__grid' },
        h('nav', { className: 'hb-docs__nav', 'aria-label': 'Documentation' },
          h('details', { className: 'hb-docs__menu' }, h('summary', null, h(Icon, { name: 'menu', size: 16 }), 'Menu'), h('div', null, navEl)),
          h('div', { className: 'hb-docs__navfull' }, navEl)),
        h('main', { className: 'hb-docs__main', id: p.mainId || 'content' }, p.children),
        toc.length ? h('nav', { className: 'hb-docs__toc', 'aria-label': 'On this page' },
          h('p', { className: 'hb-docsnav__title' }, 'On this page'),
          h('ul', null, toc.map(function (t, i) { return h('li', { key: i }, h('a', { href: t.href, className: cx('hb-docsnav__link', t.current && 'is-current') }, t.label)); }))) : null));
  }

  /* ---------- Terminal, dashboard side: status, idle screen upload, staff PIN ---------- */
  var TERM_STATUS = { online: { tone: 'success', icon: 'wifi' }, offline: { tone: 'danger', icon: 'wifi-off' }, power: { tone: 'warning', icon: 'plug' } };

  /* Terminal state for tables and cards. The word and the icon carry the state, colour only groups it. */
  function TerminalStatus(p) {
    var s = TERM_STATUS[p.status] ? p.status : 'online';
    var word = s === 'online' ? 'Online' : s === 'offline' ? (p.since ? 'Offline for ' + p.since : 'Offline') : 'Not charging';
    return h(Badge, { tone: TERM_STATUS[s].tone, icon: TERM_STATUS[s].icon, className: p.className }, word);
  }

  /* Portrait terminal bezel (9:16) around a preview. `guides` marks the bands the status pill and the halba mark cover. */
  function TerminalFrame(p) {
    var w = p.width || 180, ht = Math.round(w * 16 / 9), k = w / 360;
    return h('div', { className: cx('hb-tfr', p.className), style: {} },
      h('div', { className: 'hb-tfr__screen', style: { width: w + 'px', height: ht + 'px' }, role: 'img', 'aria-label': p.label || 'Terminal screen preview' },
        p.children,
        p.guides ? h('div', { className: 'hb-tfr__guides', 'aria-hidden': 'true' },
          h('span', { className: 'hb-tfr__band', style: { top: 0, height: 72 * k + 'px' } }, 'Status'),
          h('span', { className: 'hb-tfr__band', style: { bottom: 0, height: 72 * k + 'px' } }, 'Mark'),
          h('span', { className: 'hb-tfr__safe', style: { top: 72 * k + 'px', bottom: 72 * k + 'px', left: 24 * k + 'px', right: 24 * k + 'px' } })) : null));
  }

  function fmtBytes(n) { return n >= 1048576 ? (n / 1048576).toFixed(1).replace(/\.0$/, '') + ' MB' : Math.max(1, Math.round(n / 1024)) + ' KB'; }
  var IDLE_RULES = ['Portrait 9:16', 'Image: JPG, PNG or WebP, up to 5 MB', 'Video: MP4 H.264, no audio, up to 30 s and 30 MB, loops without a cut', 'Best at 1080 × 1920 px; 720 × 1280 px at least'];

  /* Idle screen of the terminals: one for the workspace, replaceable per store. Validation errors come from the page. */
  function IdleScreenUpload(p) {
    var gs = React.useState(false), guides = gs[0], setGuides = gs[1];
    var file = p.file, errs = p.errors || [], d = p.distribution;
    var store = p.scope === 'store';
    var scopeText = store ? (p.storeName || 'This store') + (p.usesWorkspace ? ' uses the workspace idle screen.' : ' has its own idle screen.') : 'Shown on every terminal of the workspace unless a store has its own.';
    var media = file && file.src ? (file.kind === 'video' ? h('video', { src: file.src, muted: true, loop: true, autoPlay: true, playsInline: true, className: 'hb-idleup__media', 'aria-hidden': 'true' }) : h('img', { src: file.src, alt: '', className: 'hb-idleup__media' }))
      : file ? h('div', { className: 'hb-idleup__ph' }, file.kind === 'video' ? 'Video' : 'Image') : h('div', { className: 'hb-idleup__ph hb-idleup__ph--default' }, h(Logo, { variant: 'mark', tone: 'mono', size: 48 }), h('span', null, 'halba'));
    return h('section', { className: cx('hb-idleup', p.className), 'aria-labelledby': 'idleup-t' },
      h('div', { className: 'hb-idleup__head' },
        h('div', null, h('h3', { id: 'idleup-t', className: 'hb-idleup__title' }, 'Idle screen'), h('p', { className: 'hb-idleup__scope' }, scopeText)),
        store && !p.usesWorkspace ? h(Button, { variant: 'secondary', size: 'sm', onClick: p.onUseWorkspace }, 'Use the workspace screen') : null),
      h('div', { className: 'hb-idleup__grid' },
        h('div', { className: 'hb-idleup__preview' },
          h(TerminalFrame, { width: 180, guides: guides, label: 'Idle screen preview' }, media),
          h('button', { type: 'button', className: 'hb-idleup__toggle', 'aria-pressed': guides, onClick: function () { setGuides(!guides); } }, guides ? 'Hide safe areas' : 'Show safe areas')),
        h('div', { className: 'hb-idleup__side' },
          h('ul', { className: 'hb-idleup__rules', 'aria-label': 'File requirements' }, IDLE_RULES.map(function (r, i) { return h('li', { key: i }, r); })),
          file ? h('div', { className: 'hb-idleup__file' },
              h(Icon, { name: file.kind === 'video' ? 'play' : 'image', size: 20 }),
              h('div', { className: 'hb-idleup__fileinfo' }, h('strong', null, file.name), h('span', null, [file.kind === 'video' ? 'MP4' : String(file.type || '').toUpperCase(), fmtBytes(file.size), file.width ? file.width + ' × ' + file.height : null, file.duration ? file.duration + ' s' : null].filter(Boolean).join(' · '))),
              h(Button, { variant: 'ghost', size: 'sm', onClick: p.onRemove }, 'Remove')) : null,
          errs.length ? h(Alert, { tone: 'danger' }, h('div', null, h('strong', null, errs.length === 1 ? 'This file cannot be used' : 'This file cannot be used: ' + errs.length + ' problems'), h('ul', { className: 'hb-idleup__errs' }, errs.map(function (e, i) { return h('li', { key: i }, e); })))) : null,
          h('label', { className: 'hb-btn hb-btn--secondary hb-btn--md hb-idleup__pick' }, h(Icon, { name: 'upload', size: 18 }), file ? 'Replace file' : 'Upload image or video',
            h('input', { type: 'file', className: 'hb-sr', accept: 'image/jpeg,image/png,image/webp,video/mp4', onChange: function (e) { if (p.onPick && e.target.files && e.target.files[0]) p.onPick(e.target.files[0]); } })),
          d ? h('div', { className: 'hb-idleup__dist' },
            h('div', { className: 'hb-idleup__distrow' }, h('span', null, 'Downloaded by ' + d.done + ' of ' + d.total + ' terminals'), d.failed ? h(Badge, { tone: 'danger' }, d.failed + ' failed') : d.done === d.total ? h(Badge, { tone: 'success' }, 'Done') : h(Badge, { tone: 'neutral', icon: 'clock' }, 'In progress')),
            h('div', { className: 'hb-idleup__bar', role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': d.total, 'aria-valuenow': d.done, 'aria-label': 'Terminals that downloaded the file' }, h('i', { style: { width: (d.total ? d.done / d.total * 100 : 0) + '%' } }))) : null)));
  }

  /* Staff PIN of a store: set or change, never shown again after saving. */
  function StaffPin(p) {
    var st = React.useState(false), editing = st[0], setEditing = st[1];
    var a = React.useState(''), pin = a[0], setPin = a[1];
    var b = React.useState(''), conf = b[0], setConf = b[1];
    var e = React.useState(''), err = e[0], setErr = e[1];
    function digits(v) { return v.replace(/\D/g, '').slice(0, 6); }
    function save(ev) {
      ev.preventDefault();
      if (pin.length !== 6) return setErr('Enter 6 digits.');
      if (/^(\d)\1{5}$/.test(pin) || pin === '123456' || pin === '654321') return setErr('Choose a PIN that is not a simple sequence or repeated digit.');
      if (pin !== conf) return setErr('The two PINs do not match.');
      setErr(''); setEditing(false); setPin(''); setConf('');
      if (p.onSave) p.onSave(pin);
    }
    return h('section', { className: cx('hb-pinset', p.className), 'aria-labelledby': 'pinset-t' },
      h('div', { className: 'hb-pinset__head' },
        h('div', null, h('h3', { id: 'pinset-t', className: 'hb-idleup__title' }, 'Staff PIN'), h('p', { className: 'hb-idleup__scope' }, (p.storeName ? p.storeName + ': ' : '') + 'opens the hidden staff menu on the terminals.')),
        p.isSet ? h(Badge, { tone: 'success', icon: 'check' }, 'PIN set') : h(Badge, { tone: 'warning' }, 'Not set')),
      !editing ? h('div', { className: 'hb-pinset__row' },
        h('span', { className: 'hb-pinset__mask', 'aria-hidden': 'true' }, p.isSet ? '••••••' : '—'),
        h('span', { className: 'hb-sr' }, p.isSet ? 'A PIN is set. It cannot be shown.' : 'No PIN is set.'),
        h(Button, { variant: 'secondary', size: 'sm', onClick: function () { setEditing(true); } }, p.isSet ? 'Change PIN' : 'Set PIN')) : null,
      !editing && !p.isSet ? h(Alert, { tone: 'warning' }, 'Until a PIN is set, nobody can open the staff menu on this store’s terminals.') : null,
      !editing && p.saved ? h(Alert, { tone: 'success' }, 'PIN saved. It reaches the terminals of this store within a minute. It cannot be shown again.') : null,
      editing ? h('form', { className: 'hb-pinset__form', onSubmit: save, noValidate: true },
        h(Input, { label: 'New PIN', id: 'pin-new', type: 'password', value: pin, onChange: function (ev) { setPin(digits(ev.target.value)); }, hint: '6 digits.' }),
        h(Input, { label: 'Confirm PIN', id: 'pin-conf', type: 'password', value: conf, onChange: function (ev) { setConf(digits(ev.target.value)); }, error: err || undefined }),
        h('div', { className: 'hb-pinset__actions' }, h(Button, { type: 'submit' }, 'Save PIN'), h(Button, { variant: 'ghost', onClick: function () { setEditing(false); setErr(''); setPin(''); setConf(''); } }, 'Cancel'))) : null);
  }

  /* ---------- Dashboard: breakdown bar, payment flow, side drawer ---------- */
  var SHARE_TONES = { success: 'var(--success)', danger: 'var(--danger)', warning: 'var(--chart-4)', neutral: 'var(--border-strong)', azure: 'var(--chart-1-line)', violet: 'var(--chart-2-line)' };

  /* One horizontal bar split in parts, with a legend row per part. For shares of a whole that have few parts (authentication, 3DS outcome). */
  function ShareBar(p) {
    var data = p.data || [], total = 0, format = p.format || fmtNum;
    data.forEach(function (d) { total += d.value; });
    function pct(v) { return total ? Math.round(v / total * 1000) / 10 : 0; }
    var desc = data.map(function (d) { return d.label + ' ' + pct(d.value) + '%'; }).join(', ');
    return h('div', { className: cx('hb-share', p.className) },
      h('div', { className: 'hb-share__bar', role: 'img', 'aria-label': (p.label || 'Breakdown') + ': ' + desc },
        data.map(function (d, i) { return d.value > 0 ? h('i', { key: i, style: { flexGrow: d.value, background: SHARE_TONES[d.tone || ['success', 'warning', 'danger', 'neutral'][i % 4]] } }) : null; })),
      h('ul', { className: 'hb-share__list' }, data.map(function (d, i) {
        return h('li', { key: i, className: 'hb-share__row' },
          h('span', { className: 'hb-share__dot', style: { background: SHARE_TONES[d.tone || ['success', 'warning', 'danger', 'neutral'][i % 4]] } }),
          h('span', { className: 'hb-share__name' }, d.label, d.hint ? h('small', null, d.hint) : null),
          h('span', { className: 'hb-share__val' }, format(d.value)),
          h('span', { className: 'hb-share__pct' }, pct(d.value) + '%'));
      })));
  }

  var FLOW_ICON = { success: 'check', danger: 'x', warning: 'alert', neutral: 'clock', brand: 'circle-check' };
  /* The story of one payment as a vertical flow: each step is a node, each hand-over is a labelled arrow. */
  function PaymentFlow(p) {
    var steps = p.steps || [];
    return h('div', { className: cx('hb-flow', p.className) },
      p.summary ? h('div', { className: cx('hb-flow__summary', 'hb-flow__summary--' + (p.summary.tone || 'neutral')) },
        h('span', { className: 'hb-flow__sumicon' }, h(Icon, { name: FLOW_ICON[p.summary.tone || 'neutral'], size: 20 })),
        h('div', null, h('strong', null, p.summary.title), p.summary.text ? h('p', null, p.summary.text) : null)) : null,
      h('ol', { className: 'hb-flow__list', 'aria-label': p.label || 'Payment flow' }, steps.map(function (s, i) {
        var tone = s.status || 'neutral';
        return h('li', { key: i, className: cx('hb-flow__step', 'hb-flow__step--' + tone) },
          i > 0 ? h('div', { className: 'hb-flow__link' }, h('span', { className: 'hb-flow__line', 'aria-hidden': 'true' }), s.via ? h('span', { className: 'hb-flow__via' }, s.via) : null) : null,
          h('div', { className: 'hb-flow__node' },
            h('span', { className: 'hb-flow__icon', 'aria-hidden': 'true' }, h(Icon, { name: s.icon || FLOW_ICON[tone], size: 16 })),
            h('div', { className: 'hb-flow__body' },
              h('div', { className: 'hb-flow__head' }, h('span', { className: 'hb-flow__title' }, s.title), s.time ? h('span', { className: 'hb-flow__time' }, s.time) : null),
              s.sub ? h('p', { className: 'hb-flow__sub' }, s.sub) : null,
              s.meta && s.meta.length ? h('dl', { className: 'hb-flow__meta' }, s.meta.map(function (m, j) { return h(React.Fragment, { key: j }, h('dt', null, m.k), h('dd', null, m.v)); })) : null)));
      })));
  }

  /* Panel that slides in from the right over the page, for detail that would crowd the main view. */
  function Drawer(p) {
    var open = p.open !== false;
    React.useEffect(function () {
      if (!open || !p.onClose) return;
      function key(e) { if (e.key === 'Escape') p.onClose(); }
      document.addEventListener('keydown', key);
      return function () { document.removeEventListener('keydown', key); };
    }, [open, p.onClose]);
    if (!open) return null;
    var tid = (p.id || 'drawer') + '-title';
    return h('div', { className: cx('hb-drawer', p.contained ? 'hb-drawer--contained' : '', p.className) },
      h('div', { className: 'hb-drawer__scrim', onClick: p.onClose }),
      h('aside', { className: 'hb-drawer__panel', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': tid },
        h('header', { className: 'hb-drawer__head' },
          h('div', null, h('h2', { id: tid, className: 'hb-drawer__title' }, p.title), p.subtitle ? h('p', { className: 'hb-drawer__sub' }, p.subtitle) : null),
          p.onClose ? h('button', { type: 'button', className: 'hb-drawer__close', onClick: p.onClose, 'aria-label': 'Close' }, h(Icon, { name: 'x', size: 20 })) : null),
        h('div', { className: 'hb-drawer__body' }, p.children),
        p.footer ? h('footer', { className: 'hb-drawer__foot' }, p.footer) : null));
  }

  window.Halba = { Button: Button, Badge: Badge, StatTile: StatTile, MetricCard: MetricCard, Input: Input, PhotoPanel: PhotoPanel, OverlayCard: OverlayCard, CheckoutStory: CheckoutStory, RetryStory: RetryStory, RevenueStory: RevenueStory, StatusBadge: StatusBadge, Card: Card, Panel: Panel, TextLink: TextLink, Logo: Logo, Spinner: Spinner, Modal: Modal, Icon: Icon, SegmentedControl: SegmentedControl, AuthLayout: AuthLayout, Alert: Alert, PieChart: PieChart, BarChart: BarChart, MethodBadge: MethodBadge, Endpoint: Endpoint, CodeBlock: CodeBlock, Tabs: Tabs, Table: Table, Callout: Callout, DocsHeader: DocsHeader, DocsSearch: DocsSearch, DocsLayout: DocsLayout, TerminalStatus: TerminalStatus, TerminalFrame: TerminalFrame, IdleScreenUpload: IdleScreenUpload, StaffPin: StaffPin, ShareBar: ShareBar, PaymentFlow: PaymentFlow, Drawer: Drawer };
})();
