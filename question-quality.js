/*
 * Professor-question quality gate.
 *
 * The old slide extractor produced questions from isolated PDF text fragments.
 * Those records remain visible in the developer audit, but are not allowed into
 * the learning/exam bank until a human has verified the complete slide context.
 */
(function () {
  const pageCounts = {1:38,2:47,3:26,4:50,5:31,6:27,7:35,8:11,9:23,10:36};
  const chapterNames = {
    1:"Polyester", 2:"Alkydharze", 3:"Amino- und Melaminharze",
    4:"Polyacrylate", 5:"Isocyanate", 6:"Polyurethane",
    7:"Klarlacke", 8:"Emulsionspolymerisation",
    9:"Dispersionsfarbe", 10:"Epoxid- und Phenolharze"
  };
  const vague = [
    /Wie ist das System bei/i, /Was passiert bei „/i, /Warum funktioniert „/i,
    /bei „Eigenschaften/i, /bei „Reaktion mit/i, /diese Komponenten/i,
    /\bdieses System\b/i, /\bdieser Vorgang\b/i,
    /Erklären Sie den Reaktionsmechanismus.+„[^“]{0,45}“/i,
    /Verfahrensschritte bei „[^“]{0,65}“/i
  ];
  const orphanField = /^(Eigenschaften|Reaktion mit|Anwendung|Vorteile|Nachteile|Bindemittel|Härter)\s*:?\s*$/i;
  const normalize = s => String(s || "").replace(/\s+/g, " ").trim();
  const sourcePages = q => {
    const nums = (String(q.source || "").match(/\d+/g) || []).map(Number);
    if (!nums.length) return [];
    if (nums.length === 1) return [nums[0]];
    const [a,b] = nums;
    if (b >= a && b-a <= 8) return Array.from({length:b-a+1},(_,i)=>a+i);
    return [...new Set(nums)];
  };
  const raw = (window.QUESTION_BANK || []).filter(q => Number(q.chapter) <= 10);
  const seenQuestion = new Map(), seenAnswer = new Map(), audit = [];

  raw.forEach((q, rawIndex) => {
    const errors = [];
    const question = normalize(q.qDe), answer = normalize(q.answer);
    const pages = sourcePages(q);
    const isFoundation = String(q.id || "").startsWith("foundation-");
    if (!question) errors.push("question_empty");
    if (!answer) errors.push("answer_empty");
    if (question.length < 24 && !isFoundation) errors.push("question_too_short");
    if (vague.some(rx => rx.test(question))) errors.push("ambiguous_or_fragment_question");
    if (orphanField.test(question.replace(/[?„“"]/g,"").trim())) errors.push("orphan_table_field");
    if (/^[•\-]|Eine vollständige Antwort sollte folgende Punkte/i.test(answer))
      errors.push("fragmentary_extracted_answer");
    if (q.id && /^ls\d+-slide-/i.test(q.id))
      errors.push("slide_extraction_not_human_verified");
    if (!pages.length && q.source !== "Grundlagenpfad")
      errors.push("source_page_missing");
    if (pages.some(p => p < 1 || p > (pageCounts[q.chapter] || 0)))
      errors.push("source_page_out_of_range");
    const qKey = question.toLocaleLowerCase("de");
    const aKey = answer.toLocaleLowerCase("de");
    if (seenQuestion.has(qKey)) errors.push("duplicate_question");
    else seenQuestion.set(qKey, rawIndex);
    if (seenAnswer.has(aKey) && aKey) errors.push("duplicate_answer");
    else if (aKey) seenAnswer.set(aKey, rawIndex);
    const status = errors.length
      ? (errors.includes("slide_extraction_not_human_verified") ? "需要修改" : "来源不足")
      : (isFoundation ? "已验证（课程基础路径）" : "已验证");
    audit.push({
      rawIndex, legacyId:q.id || "", chapter:Number(q.chapter), pages,
      question, answer, status, errors,
      recommendation: errors.length
        ? "回到完整课件页面，结合标题、表格行列、图注和相邻页后重写；未完成前不得进入正式题库。"
        : "保留"
    });
  });

  const activeRaw = raw.filter((_,i) => audit[i].errors.length === 0);
  const chapterCounters = {};
  const legacyToStable = {};
  const active = activeRaw.map(q => {
    const chapter = Number(q.chapter);
    chapterCounters[chapter] = (chapterCounters[chapter] || 0) + 1;
    const id = `LS${String(chapter).padStart(2,"0")}-Q${String(chapterCounters[chapter]).padStart(3,"0")}`;
    legacyToStable[q.id] = id;
    const pages = sourcePages(q);
    return {
      ...q, id, legacyId:q.id, chapter,
      sourceMeta:{
        chapter:`LS${String(chapter).padStart(2,"0")}`,
        pdfPage:pages[0] || null,
        sourcePages:pages,
        slideTitle:q.slideTitle || `${chapterNames[chapter]} · ${q.kind || q.phase || "Lehrinhalt"}`,
        sourceSummary:normalize(q.source || "Grundlagenpfad"),
        basis:q.source === "Grundlagenpfad" ? "课件知识框架的人工整理题" : "对应课件页"
      },
      reviewStatus:"verified"
    };
  });

  window.QUESTION_AUDIT = audit;
  window.QUESTION_ID_MIGRATION = legacyToStable;
  window.QUESTION_BANK = active;
  window.QUESTION_QUALITY_SUMMARY = {
    raw:raw.length, active:active.length,
    rejected:audit.filter(x=>x.errors.length).length,
    chapters:Object.fromEntries(Object.keys(chapterNames).map(n=>[
      n, active.filter(q=>q.chapter===Number(n)).length
    ]))
  };

  const invalid = audit.filter(x=>x.errors.length);
  if (invalid.length) {
    console.groupCollapsed(`[Lacklabor] 题库质量检查：${invalid.length} 道题被隔离`);
    invalid.forEach(x=>console.warn({
      id:x.legacyId, chapter:`LS${String(x.chapter).padStart(2,"0")}`,
      pages:x.pages, errorTypes:x.errors, question:x.question,
      recommendation:x.recommendation
    }));
    console.groupEnd();
  }
})();
