(() => {
  const lexicon = {
    "Phthalsäureanhydrid": ["/ˈftaːlˌzɔʏʁəʔanhyˌdʁiːt/", ["Phthal", "säure", "anhydrid"]],
    "Isophthalsäure": ["/ˈiːzoˌftaːlˌzɔʏʁə/", ["Iso", "phthal", "säure"]],
    "Terephthalsäure": ["/teʁeˈftaːlˌzɔʏʁə/", ["Tere", "phthal", "säure"]],
    "Maleinsäureanhydrid": ["/maleˈiːnˌzɔʏʁəʔanhyˌdʁiːt/", ["Malein", "säure", "anhydrid"]],
    "Trimethylolpropan": ["/tʁiːmetyˈloːlproˌpaːn/", ["Tri", "methylol", "propan"]],
    "Hexamethylendiisocyanat": ["/hɛksaˌmetyˈleːndiːʔizoˌtsy̯aˈnaːt/", ["Hexa", "methylen", "di", "isocyanat"]],
    "Isophorondiisocyanat": ["/iːzofoˈʁoːndiːʔizoˌtsy̯aˈnaːt/", ["Iso", "phoron", "di", "isocyanat"]],
    "Epoxidharz": ["/epoˈksiːtˌhaʁts/", ["Epoxid", "harz"]],
    "Melaminharz": ["/melaˈmiːnˌhaʁts/", ["Melamin", "harz"]],
    "Vernetzung": ["/fɛɐ̯ˈnɛtsʊŋ/", ["Ver", "netzung"]],
    "Polykondensation": ["/ˌpoːliːkɔndɛnzaˈtsi̯oːn/", ["Poly", "kondensation"]],
    "Veresterung": ["/fɛɐ̯ˈʔɛstəʁʊŋ/", ["Ver", "esterung"]],
    "Esterbindung": ["/ˈɛstɐˌbɪndʊŋ/", ["Ester", "bindung"]],
    "Polyester": ["/ˌpoːliˈɛstɐ/", ["Poly", "ester"]],
    "Isocyanat": ["/iːzoˌtsy̯aˈnaːt/", ["Iso", "cyanat"]],
    "Polyurethan": ["/ˌpoːliʔuʁeˈtaːn/", ["Poly", "urethan"]],
    "Acrylatharz": ["/akʁyˈlaːtˌhaʁts/", ["Acrylat", "harz"]],
    "Epoxidharzöffnung": ["/epoˈksiːtˌhaʁtsʔœfnʊŋ/", ["Epoxid", "harz", "öffnung"]],
    "Emulsionspolymerisation": ["/emʊlˈzi̯oːnspoˌlymeʁizaˈtsi̯oːn/", ["Emulsions", "polymerisation"]],
    "Säurezahl": ["/ˈzɔʏʁəˌtsaːl/", ["Säure", "zahl"]],
    "Hydroxylzahl": ["/hydʁoˈksyːlˌtsaːl/", ["Hydroxyl", "zahl"]],
    "Schleppmittel": ["/ˈʃlɛpˌmɪtl̩/", ["Schlepp", "mittel"]],
    "Viskosität": ["/vɪskoziˈtɛːt/", ["Viskosität"]]
  };
  let activeLoop = null;

  const attr = text => encodeURIComponent(String(text || "").trim());
  const decode = text => decodeURIComponent(text || "");
  const entry = term => lexicon[term] || ["尚未人工校订", [term]];

  function chooseGermanVoice() {
    const voices = speechSynthesis.getVoices().filter(v => /^de-DE$/i.test(v.lang));
    const preferred = ["Anna", "Petra", "Katja", "Conrad", "Google Deutsch", "German"];
    return voices.sort((a, b) => {
      const ai = preferred.findIndex(x => a.name.includes(x));
      const bi = preferred.findIndex(x => b.name.includes(x));
      return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi) || Number(b.localService) - Number(a.localService);
    })[0] || null;
  }

  function stop() {
    activeLoop = null;
    speechSynthesis.cancel();
    document.querySelectorAll(".speak-button.playing").forEach(x => x.classList.remove("playing"));
  }

  function speak(text, rate = 1, loop = false, button = null) {
    stop();
    const voice = chooseGermanVoice();
    if (!voice) {
      alert("此设备没有可用的德国德语（de-DE）语音。系统不会改用英语语音。请先在设备的语音设置中安装德国德语语音。");
      return;
    }
    const loopKey = loop ? `${text}|${rate}` : null;
    activeLoop = loopKey;
    if (button) button.classList.add("playing");
    const play = () => {
      if (loop && activeLoop !== loopKey) return;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "de-DE";
      utterance.voice = voice;
      utterance.rate = rate;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.onend = () => {
        if (loop && activeLoop === loopKey) setTimeout(play, 280);
        else if (button) button.classList.remove("playing");
      };
      utterance.onerror = () => {
        if (button) button.classList.remove("playing");
        activeLoop = null;
      };
      speechSynthesis.speak(utterance);
    };
    play();
  }

  function button(text, compact = false) {
    return `<button type="button" class="speak-button ${compact ? "compact" : ""}" data-speak="${attr(text)}" data-rate="1" aria-label="标准德国德语朗读">🔊${compact ? "" : " 正常"}</button>`;
  }

  function controls(term) {
    const [ipa, syllables] = entry(term);
    return `<div class="pronunciation" data-pronunciation-term="${attr(term)}">
      <div class="pronunciation-actions">
        ${button(term)}
        <button type="button" class="speak-button" data-speak="${attr(term)}" data-rate=".7" aria-label="慢速德国德语朗读">🐢 慢速</button>
        <button type="button" class="speak-button loop" data-speak="${attr(term)}" data-rate="1" data-loop="true" aria-label="循环德国德语朗读">🔁 循环</button>
        <button type="button" class="speak-stop" aria-label="停止朗读">■ 停止</button>
      </div>
      <p class="ipa"><b>IPA</b> ${ipa}</p>
      <div class="syllables" aria-label="音节拆分">${syllables.map((x, i) => `${i ? "<i>│</i>" : ""}<span title="${ipa}">${x}</span>`).join("")}</div>
    </div>`;
  }

  function installSelectionTool() {
    if (document.querySelector("#germanSelectionTool")) return;
    document.body.insertAdjacentHTML("beforeend", `<div id="germanSelectionTool" class="selection-speech">
      <span>选中德语文字后：</span>
      <button type="button" data-selected-speak="1">🔊 正常</button>
      <button type="button" data-selected-speak=".7">🐢 慢速</button>
      <button type="button" class="speak-stop">■</button>
    </div>`);
  }

  document.addEventListener("click", event => {
    const speakButton = event.target.closest("[data-speak]");
    if (speakButton) {
      event.preventDefault();
      event.stopPropagation();
      const text = decode(speakButton.dataset.speak);
      const loop = speakButton.dataset.loop === "true";
      if (loop && speakButton.classList.contains("playing")) return stop();
      speak(text, Number(speakButton.dataset.rate || 1), loop, speakButton);
      return;
    }
    if (event.target.closest(".speak-stop")) return stop();
    const selected = event.target.closest("[data-selected-speak]");
    if (selected) {
      const text = String(window.getSelection()).trim();
      if (!text) return alert("请先选中需要朗读的德语文字。");
      speak(text, Number(selected.dataset.selectedSpeak || 1));
    }
  });
  window.addEventListener("beforeunload", stop);
  installSelectionTool();
  window.GermanPronunciation = { button, controls, speak, stop, lexicon };
})();
