/**
 * Shared UI + demux runner for doc/examples/*.html demos.
 * Each page imports its Demux class and calls initDemuxDemo({ ... }).
 */

function formatBytes(n) {
  if (n == null || Number.isNaN(n)) return "—";
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(2)} MB`;
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function toHexPreview(bytes, max = 128) {
  const size = Math.min(bytes.length, max);
  const hex = [];
  for (let i = 0; i < size; i += 1) {
    hex.push(bytes[i].toString(16).padStart(2, "0"));
  }
  const suffix = bytes.length > max ? ` … (+${bytes.length - max} bytes)` : "";
  return hex.join(" ") + suffix;
}

function createKV(label, valueNode) {
  const row = document.createElement("div");
  row.className = "inspect-row";
  const key = document.createElement("span");
  key.className = "inspect-key";
  key.textContent = `${label}: `;
  row.appendChild(key);
  row.appendChild(valueNode);
  return row;
}

function createInlineValue(text, className = "inspect-value") {
  const span = document.createElement("span");
  span.className = className;
  span.textContent = text;
  return span;
}

function renderInspectable(value, depth = 0, seen = new WeakSet()) {
  const MAX_DEPTH = 4;
  const CHUNK_SIZE = 20;
  const LONG_STRING = 320;

  if (value == null) return createInlineValue(String(value), "inspect-value inspect-null");
  const t = typeof value;

  if (t === "string") {
    const isLong = value.length > LONG_STRING;
    if (!isLong) return createInlineValue(JSON.stringify(value), "inspect-value inspect-string");
    const wrap = document.createElement("span");
    wrap.className = "inspect-value inspect-string";
    wrap.textContent = JSON.stringify(`${value.slice(0, LONG_STRING)}…`);
    const btn = document.createElement("button");
    btn.className = "inspect-more";
    btn.type = "button";
    btn.textContent = "show full string";
    btn.addEventListener("click", () => {
      wrap.textContent = JSON.stringify(value);
      btn.remove();
    });
    const box = document.createElement("span");
    box.append(wrap, document.createTextNode(" "), btn);
    return box;
  }
  if (t === "number" || t === "boolean" || t === "bigint") return createInlineValue(String(value));
  if (t === "function") return createInlineValue("[Function]");

  if (value instanceof Uint8Array || value instanceof ArrayBuffer) {
    const bytes = value instanceof Uint8Array ? value : new Uint8Array(value);
    const box = document.createElement("div");
    box.className = "inspect-binary";
    const head = createInlineValue(
      `${value instanceof Uint8Array ? "Uint8Array" : "ArrayBuffer"}(${bytes.length})`,
      "inspect-value"
    );
    const hex = document.createElement("pre");
    hex.className = "inspect-hex";
    let shown = 128;
    const renderHex = () => {
      hex.textContent = toHexPreview(bytes, shown);
    };
    renderHex();
    box.appendChild(head);
    box.appendChild(hex);
    if (bytes.length > shown) {
      const btn = document.createElement("button");
      btn.className = "inspect-more";
      btn.type = "button";
      btn.textContent = "show more bytes";
      btn.addEventListener("click", () => {
        shown = Math.min(shown * 2, bytes.length);
        renderHex();
        if (shown >= bytes.length) btn.remove();
      });
      box.appendChild(btn);
    }
    return box;
  }

  if (seen.has(value)) return createInlineValue("[Circular]");
  seen.add(value);

  if (Array.isArray(value)) {
    const details = document.createElement("details");
    details.className = "inspect-block";
    details.open = depth < 2;
    const summary = document.createElement("summary");
    summary.textContent = `Array(${value.length})`;
    details.appendChild(summary);
    if (depth >= MAX_DEPTH) {
      details.appendChild(createInlineValue("[max depth reached]"));
      return details;
    }
    const body = document.createElement("div");
    body.className = "inspect-body";
    let shown = Math.min(CHUNK_SIZE, value.length);
    const renderItems = () => {
      body.innerHTML = "";
      for (let i = 0; i < shown; i += 1) {
        body.appendChild(createKV(i, renderInspectable(value[i], depth + 1, seen)));
      }
      if (shown < value.length) {
        const btn = document.createElement("button");
        btn.className = "inspect-more";
        btn.type = "button";
        btn.textContent = `show ${Math.min(CHUNK_SIZE, value.length - shown)} more`;
        btn.addEventListener("click", () => {
          shown = Math.min(shown + CHUNK_SIZE, value.length);
          renderItems();
        });
        body.appendChild(btn);
      }
    };
    renderItems();
    details.appendChild(body);
    return details;
  }

  if (t === "object") {
    const keys = Object.keys(value);
    const details = document.createElement("details");
    details.className = "inspect-block";
    details.open = depth < 2;
    const summary = document.createElement("summary");
    summary.textContent = `Object(${keys.length} keys)`;
    details.appendChild(summary);
    if (depth >= MAX_DEPTH) {
      details.appendChild(createInlineValue("{... max depth reached ...}"));
      return details;
    }
    const body = document.createElement("div");
    body.className = "inspect-body";
    let shown = Math.min(CHUNK_SIZE, keys.length);
    const renderKeys = () => {
      body.innerHTML = "";
      for (let i = 0; i < shown; i += 1) {
        const k = keys[i];
        body.appendChild(createKV(k, renderInspectable(value[k], depth + 1, seen)));
      }
      if (shown < keys.length) {
        const btn = document.createElement("button");
        btn.className = "inspect-more";
        btn.type = "button";
        btn.textContent = `show ${Math.min(CHUNK_SIZE, keys.length - shown)} more keys`;
        btn.addEventListener("click", () => {
          shown = Math.min(shown + CHUNK_SIZE, keys.length);
          renderKeys();
        });
        body.appendChild(btn);
      }
    };
    renderKeys();
    details.appendChild(body);
    return details;
  }

  return createInlineValue(String(value));
}

export function defaultEventSummary(e) {
  const parts = [];
  if (e && typeof e.type === "string") parts.push(`type=${e.type}`);
  if (e && e.stream_type != null) parts.push(`stream_type=${e.stream_type}`);
  if (e && e.tagType != null) parts.push(`tagType=${e.tagType}`);
  if (e && e.videoData && e.videoData.avcPacketType != null) {
    parts.push(`avcPacketType=${e.videoData.avcPacketType}`);
  }
  if (e && e.codec_type != null) parts.push(`codec=${e.codec_type}`);
  if (parts.length) return parts.join(" · ");
  try {
    const j = JSON.stringify(e);
    return j.length > 120 ? `${j.slice(0, 117)}…` : j;
  } catch {
    return String(e);
  }
}

/**
 * @param {object} config
 * @param {object} config.Events - demuxer Events enum (DEMUX_DATA, DONE, ERROR)
 * @param {string} config.formatLabel - e.g. "MP4"
 * @param {string} config.title - page title override
 * @param {string} [config.subtitle]
 * @param {string} config.accept - file input accept string
 * @param {string} [config.sampleUrl] - optional relative URL to bundled sample
 * @param {string} [config.sampleButtonLabel]
 * @param {() => object} config.createDemux - factory returning demuxer instance
 * @param {object} [config.pushOptions] - second argument to demux.push(buffer, pushOptions)
 * @param {(e: object) => string} [config.summarizeEvent]
 * @param {string[]} [config.hints] - short bullets under the dropzone
 */
export function initDemuxDemo(config) {
  const {
    Events,
    formatLabel,
    title,
    subtitle,
    accept,
    sampleUrl,
    sampleButtonLabel = "Load sample file",
    createDemux,
    pushOptions,
    summarizeEvent = defaultEventSummary,
    hints = [],
  } = config;

  const root = document.getElementById("demux-demo-root");
  if (!root) {
    console.error("initDemuxDemo: missing #demux-demo-root");
    return;
  }

  document.title = title || `Demux ${formatLabel} — demuxer`;

  root.innerHTML = `
    <div class="demo-shell">
      <header class="demo-header">
        <h1>${escapeHtml(title || `Demux ${formatLabel}`)}</h1>
        ${subtitle ? `<p>${escapeHtml(subtitle)}</p>` : ""}
        <span class="demo-badge">${escapeHtml(formatLabel)}</span>
      </header>
      <div class="demo-grid">
        <section class="demo-panel">
          <h2>1. Provide media</h2>
          <div class="dropzone" data-dropzone tabindex="0" role="button" aria-label="Choose file or drop here">
            <input type="file" id="demux-file" accept="${escapeHtml(accept)}" />
            <strong>Drop a file here or click to choose</strong>
            <span>Accepted: <code>${escapeHtml(accept)}</code></span>
          </div>
          <div class="demo-actions">
            ${
              sampleUrl
                ? `<button type="button" class="btn btn--primary" data-sample>${escapeHtml(
                    sampleButtonLabel
                  )}</button>`
                : ""
            }
          </div>
          <div class="demo-status" data-status>Select a file to parse in the browser. No upload to any server.</div>
          <dl class="metrics">
            <div class="metric"><dt>Events</dt><dd data-m-events>0</dd></div>
            <div class="metric"><dt>Bytes</dt><dd data-m-bytes>—</dd></div>
            <div class="metric"><dt>Parse time</dt><dd data-m-ms>—</dd></div>
          </dl>
          ${
            hints.length
              ? `<p class="demo-hint">${hints.map((h) => escapeHtml(h)).join("<br/>")}</p>`
              : ""
          }
        </section>
        <section class="demo-panel demo-panel--wide">
          <div class="demo-grid demo-grid--split">
            <div>
              <h2>2. Parsed events</h2>
              <p class="demo-hint" style="margin-top:0">Click a row to inspect full payload (right / below).</p>
              <div class="table-wrap">
                <table class="demo-events">
                  <thead><tr><th class="col-idx">#</th><th>Summary</th></tr></thead>
                  <tbody data-tbody></tbody>
                </table>
              </div>
            </div>
            <div>
              <h2>3. Selected event (inspectable)</h2>
              <div class="inspect-toolbar">
                <button type="button" class="btn" data-expand-all>Expand all</button>
                <button type="button" class="btn" data-collapse-all>Collapse all</button>
              </div>
              <div class="demo-json" data-json>Select an event from the table.</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;

  const dropzone = root.querySelector("[data-dropzone]");
  const fileInput = root.querySelector("#demux-file");
  const statusEl = root.querySelector("[data-status]");
  const tbody = root.querySelector("[data-tbody]");
  const jsonPre = root.querySelector("[data-json]");
  const expandAllBtn = root.querySelector("[data-expand-all]");
  const collapseAllBtn = root.querySelector("[data-collapse-all]");
  const sampleBtn = root.querySelector("[data-sample]");
  const mEvents = root.querySelector("[data-m-events]");
  const mBytes = root.querySelector("[data-m-bytes]");
  const mMs = root.querySelector("[data-m-ms]");

  let rows = [];
  let selectedTr = null;

  function setStatus(text, kind = "") {
    statusEl.textContent = text;
    statusEl.className = "demo-status" + (kind ? ` demo-status--${kind}` : "");
  }

  function resetTable() {
    rows = [];
    tbody.innerHTML = "";
    jsonPre.textContent = "Select an event from the table.";
    selectedTr = null;
    mEvents.textContent = "0";
    mBytes.textContent = "—";
    mMs.textContent = "—";
  }

  function selectRow(tr, payload) {
    if (selectedTr) selectedTr.classList.remove("is-selected");
    selectedTr = tr;
    tr.classList.add("is-selected");
    try {
      jsonPre.innerHTML = "";
      jsonPre.appendChild(renderInspectable(payload));
    } catch (err) {
      jsonPre.textContent = String(err);
    }
  }

  function setAllDetails(open) {
    const detailsList = jsonPre.querySelectorAll("details.inspect-block");
    detailsList.forEach((el) => {
      el.open = open;
    });
  }

  function appendEvent(payload, index) {
    const tr = document.createElement("tr");
    const sum = summarizeEvent(payload);
    tr.innerHTML = `<td class="col-idx">${index}</td><td class="col-sum">${escapeHtml(sum)}</td>`;
    tr.addEventListener("click", () => selectRow(tr, payload));
    tbody.appendChild(tr);
    if (index === 1) selectRow(tr, payload);
  }

  function runDemux(buffer) {
    resetTable();
    const t0 = performance.now();
    setStatus("Parsing…", "busy");

    const demux = createDemux();
    const events = [];
    let errored = false;
    let finished = false;

    function finish() {
      if (finished || errored) return;
      finished = true;
      const ms = Math.round(performance.now() - t0);
      mMs.textContent = `${ms} ms`;
      setStatus(`Done. ${events.length} event(s) emitted.`, "done");
    }

    demux.on(Events.DEMUX_DATA, (e) => {
      console.log(e);
      const idx = events.length + 1;
      events.push(e);
      appendEvent(e, idx);
      mEvents.textContent = String(events.length);
    });

    demux.on(Events.DONE, () => finish());

    demux.on(Events.ERROR, (err) => {
      console.error(err);
      errored = true;
      setStatus(`Error: ${err && err.message ? err.message : String(err)}`, "error");
    });

    try {
      if (pushOptions !== undefined) demux.push(buffer, pushOptions);
      else demux.push(buffer);
      mBytes.textContent = formatBytes(buffer.byteLength);
      // MP4Demux and some FLV paths may not emit Events.DONE; still show a clear result.
      queueMicrotask(() => finish());
    } catch (err) {
      console.error(err);
      errored = true;
      setStatus(`Error: ${err && err.message ? err.message : String(err)}`, "error");
    }
  }

  function handleFile(file) {
    if (!file) return;
    setStatus(`Reading ${file.name}…`, "busy");
    file.arrayBuffer().then(runDemux).catch((err) => {
      console.error(err);
      setStatus(`Read failed: ${err.message}`, "error");
    });
  }

  dropzone.addEventListener("click", () => fileInput.click());
  dropzone.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      fileInput.click();
    }
  });

  ["dragenter", "dragover"].forEach((ev) => {
    dropzone.addEventListener(ev, (e) => {
      e.preventDefault();
      dropzone.classList.add("dropzone--drag");
    });
  });
  ["dragleave", "drop"].forEach((ev) => {
    dropzone.addEventListener(ev, (e) => {
      e.preventDefault();
      dropzone.classList.remove("dropzone--drag");
    });
  });
  dropzone.addEventListener("drop", (e) => {
    const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
    if (f) handleFile(f);
  });

  fileInput.addEventListener("change", () => {
    const f = fileInput.files && fileInput.files[0];
    handleFile(f);
  });

  if (sampleBtn && sampleUrl) {
    sampleBtn.addEventListener("click", () => {
      setStatus(`Fetching sample…`, "busy");
      resetTable();
      fetch(sampleUrl)
        .then((r) => {
          if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
          return r.arrayBuffer();
        })
        .then(runDemux)
        .catch((err) => {
          console.error(err);
          setStatus(`Sample load failed: ${err.message}`, "error");
        });
    });
  }

  if (expandAllBtn) {
    expandAllBtn.addEventListener("click", () => setAllDetails(true));
  }
  if (collapseAllBtn) {
    collapseAllBtn.addEventListener("click", () => setAllDetails(false));
  }
}
