(() => {
  const options = {
    width: 920,
    height: 570,
    bondThickness: 1.35,
    bondLength: 36,
    shortBondLength: 0.82,
    bondSpacing: 5.4,
    atomVisualization: "default",
    compactDrawing: false,
    explicitHydrogens: false,
    terminalCarbons: false,
    overlapSensitivity: 0.42,
    overlapResolutionIterations: 5,
    fontSizeLarge: 14,
    fontSizeSmall: 9,
    padding: 38,
    themes: {
      publication: {
        C: "#17231f", O: "#17231f", N: "#17231f", F: "#17231f",
        CL: "#17231f", BR: "#17231f", I: "#17231f", P: "#17231f",
        S: "#17231f", B: "#17231f", SI: "#17231f", H: "#17231f",
        BACKGROUND: "#fffdf8"
      }
    }
  };

  function fitToContent(target) {
    const apply = () => {
      let box;
      try { box = target.getBBox(); } catch (_) { return; }
      if (!box || !Number.isFinite(box.width) || !Number.isFinite(box.height) || box.width <= 0 || box.height <= 0) return;
      const padding = Math.max(box.width, box.height) * 0.1;
      target.setAttribute("viewBox", [
        box.x - padding,
        box.y - padding,
        box.width + padding * 2,
        box.height + padding * 2
      ].join(" "));
      target.setAttribute("preserveAspectRatio", "xMidYMid meet");
    };
    apply();
    requestAnimationFrame(apply);
    if (document.fonts?.ready) document.fonts.ready.then(apply);
  }

  function drawGenerated(smiles, target) {
    if (!target) return;
    target.replaceChildren();
    SmilesDrawer.parse(smiles, tree => {
      const drawer = new SmilesDrawer.SvgDrawer(options);
      drawer.draw(tree, target, "publication", false);
      fitToContent(target);
    }, error => {
      const message = document.createElementNS("http://www.w3.org/2000/svg", "text");
      message.setAttribute("x", "460");
      message.setAttribute("y", "285");
      message.setAttribute("text-anchor", "middle");
      message.textContent = `结构暂时无法绘制：${String(error)}`;
      target.appendChild(message);
      fitToContent(target);
    });
  }

  function drawExact(svgMarkup, target) {
    if (!target || !svgMarkup) return;
    const parsed = new DOMParser().parseFromString(svgMarkup, "image/svg+xml");
    const source = parsed.documentElement;
    target.replaceChildren(...Array.from(source.childNodes).map(node => document.importNode(node, true)));
    fitToContent(target);
  }

  function draw(entry, target) {
    if (entry.slideSvg) drawExact(entry.slideSvg, target);
    else drawGenerated(entry.smiles, target);
  }

  window.PublicationChem = { draw, fitToContent };
})();
