(() => {
  const molecules = [
    ["O=C1OC(=O)c2ccccc12", "mol-psa"],
    ["CCC(CO)(CO)CO", "mol-tmp"],
    ["CC1(C)CC(N=C=O)CC(C)(CN=C=O)C1", "mol-ipdi"]
  ];
  const options = {
    width: 520,
    height: 350,
    bondThickness: 1.25,
    bondLength: 34,
    shortBondLength: 0.82,
    bondSpacing: 5.2,
    atomVisualization: "default",
    compactDrawing: false,
    explicitHydrogens: false,
    terminalCarbons: false,
    overlapSensitivity: 0.42,
    overlapResolutionIterations: 4,
    fontSizeLarge: 13,
    fontSizeSmall: 8,
    padding: 24,
    themes: {
      publication: {
        C: "#18211e", O: "#18211e", N: "#18211e", F: "#18211e",
        CL: "#18211e", BR: "#18211e", I: "#18211e", P: "#18211e",
        S: "#18211e", B: "#18211e", SI: "#18211e", H: "#18211e",
        BACKGROUND: "#fffdf8"
      }
    }
  };

  molecules.forEach(([smiles, id]) => {
    SmilesDrawer.parse(smiles, tree => {
      const drawer = new SmilesDrawer.SvgDrawer(options);
      drawer.draw(tree, document.getElementById(id), "publication", false);
    }, error => {
      document.getElementById(id).insertAdjacentHTML(
        "afterend",
        `<p class="render-error">结构无法解析：${String(error)}</p>`
      );
    });
  });
})();
