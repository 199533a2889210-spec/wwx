window.LEARNING_DATA={
chapters:[
{n:1,t:"Polyester",de:"Die chemische Grammatik der Lacksysteme",why:"先学会官能团、缩聚、分子结构和后交联。后面的 Alkyd、PUR、Melamin 和粉末聚酯都在调用这些概念。",before:"这是全课的底层语言",core:["Esterbindung","Funktionalität","OH-/Säurezahl","Veresterung","Struktur–Eigenschaft"],next:[2,3,5,13]},
{n:2,t:"Alkydharze",de:"Polyester wird durch Fettsäuren funktional",why:"紧跟 Polyester，是因为 Alkyd 就是脂肪酸改性聚酯。它首次引入“不靠外部交联剂，而靠空气氧化成膜”。",before:"把 LS01 的聚酯骨架做油改性",core:["Fettsäuren","Öllänge","Iodzahl","Autoxidation","Sikkative"],next:[3,7,12]},
{n:3,t:"Aminoharze",de:"Der erste große Fremdvernetzer",why:"前两章已经得到带 OH 的树脂，现在需要学习如何把可溶树脂变成耐久网络。Melamin 是典型烘烤交联剂。",before:"从树脂合成进入漆膜交联",core:["Methylolierung","Veretherung","Selbstkondensation","Co-Vernetzung","Einbrennen"],next:[4,7,13]},
{n:4,t:"Polyacrylate",de:"Kettenpolymerisation und präzises Eigenschaftsdesign",why:"课程从缩聚切换到自由基链聚合，学习如何用单体、Tg、引发剂和滴加控制现代耐候树脂。",before:"建立第二套聚合反应语言",core:["Initiierung","Kettenwachstum","Abbruch","Tg/Fox","Lösungspolymerisation"],next:[7,8,12]},
{n:5,t:"Isocyanate",de:"NCO als hochreaktiver Vernetzer",why:"再次调用 OH，但交联从烘烤 Melamin 变成 NCO/OH 加成。它连接 Polyester、Acrylat、PUR、Klarlack 和 KTL。",before:"比较第二种 OH 交联路径",core:["NCO-Reaktivität","Wasserreaktion","HDI/IPDI/MDI/TDI","Blockierung","Äquivalente"],next:[6,7,11]},
{n:6,t:"Polyurethane",de:"Vom Reaktionspartner zum Netzwerk",why:"LS05 讲交联剂，LS06 讲完整 PUR 体系：软段、硬段、交联密度、适用期与最终性能。",before:"把 NCO 反应变成材料设计",core:["Urethanbindung","Hart-/Weichsegment","NCO/OH","Topfzeit","PUD"],next:[7,11]},
{n:7,t:"Klarlacke",de:"Alle Grundlagen treffen auf eine reale Oberfläche",why:"这是前六章的综合应用：树脂、交联剂、UV 稳定、硬度、柔韧、划伤和外观必须同时平衡。",before:"第一次做完整系统设计",core:["Schichtaufbau","OH-Acrylat","Witterung","Kratzbeständigkeit","Additive"],next:[12,15]},
{n:8,t:"Emulsionspolymerisation",de:"Polymerisation in diskreten Teilchen",why:"从均相溶液进入水性分散体系。需要重新理解反应场所、胶束、粒径和界面稳定。",before:"为水性墙面漆建立粒子基础",core:["Mizellen","Keimbildung","Teilchenwachstum","Emulgator","Koagulation"],next:[9,11]},
{n:9,t:"Dispersionsfarbe",de:"Vom Latexpartikel zur Wandfarbe",why:"直接应用 LS08 的分散体，再加入颜填料、PVK/KPVK 和成膜过程，形成真实墙面漆配方。",before:"把粒子化学转成配方工程",core:["PVK/KPVK","Pigmente/Füllstoffe","MFFT","Koaleszenz","Nassabrieb"],next:[15]},
{n:10,t:"Epoxidharze",de:"Ringöffnung, Haftung und Korrosionsschutz",why:"环氧提供另一类高附着、高屏障网络，并为下一章 KTL 的主体树脂做准备。",before:"先理解 KTL 为什么选环氧",core:["BADGE","Epoxidring","Aminhärtung","EEW","Korrosionsschutz"],next:[11,13]},
{n:11,t:"KTL",de:"Elektrochemie steuert die Lackabscheidung",why:"综合环氧、胺质子化、分散体、封闭 NCO 和烘烤，把复杂车身均匀防腐。",before:"课程最典型的多学科系统",core:["Kathodenreaktion","Deprotonierung","Sekundärdispersion","Abscheidung","Einbrennen"],next:[7]},
{n:12,t:"UV-Härtung",de:"Licht erzeugt das Netzwerk",why:"再次调用 LS04 的自由基机理，但引发能量来自光；同时解释超快固化、氧阻聚与阴影区问题。",before:"同一自由基机理的不同触发方式",core:["Photoinitiator","Spektrum","α-Spaltung","O₂-Inhibierung","Schrumpf"],next:[7,13]},
{n:13,t:"Pulverlacke",de:"Lösemittelfreie Formulierung als Feststoff",why:"重新汇总 Polyester、Epoxid、Melamin/NCO：没有溶剂后，粒径、Tg、熔融流平和交联窗口成为核心。",before:"把树脂化学转换成粉体工艺",core:["Extrusion","Mahlen","Korngröße","Corona/Tribo","Schmelzverlauf"],next:[14]},
{n:14,t:"Sol-Gel",de:"Organisch-anorganische Hybridnetzwerke",why:"最后超越传统有机聚合物，用水解/缩合建立 Si–O–Si 纳米网络，并把结构控制扩展到粒子和孔尺度。",before:"从有机树脂进入杂化功能涂层",core:["Sol/Kolloid","Hydrolyse","Kondensation","pH-Effekt","Hybridisierung"],next:[]}
],
edges:[[1,2,"Fettsäuremodifikation"],[1,3,"OH + Melamin"],[1,5,"OH + NCO"],[1,13,"Pulverpolyester"],[2,12,"Radikalische Oxidation"],[3,7,"Einbrennklarlack"],[4,7,"OH-Acrylat"],[4,8,"Radikalpolymerisation"],[4,12,"Acrylat-Doppelbindung"],[5,6,"Urethanbildung"],[5,7,"2K-Klarlack"],[5,11,"blockiertes NCO"],[6,7,"PUR-Netzwerk"],[8,9,"Latexpartikel"],[8,11,"Dispersion"],[10,11,"Epoxid-Bindemittel"],[10,13,"Epoxidpulver"],[12,7,"UV-Schutz"],[13,14,"Funktionsoberflächen"]],
confusions:[
["Alkydharz ≠ Polyester?","Falsch","Alkydharz ist ein mit Monocarbonsäuren/Fettsäuren modifizierter Polyester.","LS01 → LS02"],
["Aminoharz = Amin?","Falsch","Die Grundbausteine sind Amide wie Melamin oder Harnstoff; Formaldehyd erzeugt Methylolgruppen.","LS03"],
["Polyurethan = einzelnes Harz?","Unvollständig","Im Lack ist PUR häufig das Netzwerk, das erst aus Polyol und Polyisocyanat entsteht.","LS05 → LS06"],
["Oxidative Trocknung = Lösemittel verdunstet?","Falsch","Es ist chemische oxidative Vernetzung mit Luftsauerstoff.","LS02"],
["Monomertröpfchen = Hauptreaktor?","Falsch","Bei der Emulsionspolymerisation wachsen Ketten hauptsächlich in Polymerpartikeln.","LS08"],
["Hohe Härte = immer guter Klarlack?","Falsch","Zu hohe Vernetzungsdichte kann Sprödigkeit, Spannungen und schlechte Steinschlagbeständigkeit erzeugen.","LS06 → LS07"],
["KTL-Partikel werden nur elektrisch angezogen?","Falsch","Kathodisch erzeugtes OH⁻ deprotoniert das Bindemittel; der Löslichkeitsverlust verursacht die Abscheidung.","LS11"],
["Feineres Pulver = immer glatter?","Falsch","Sehr feine Partikel aggregieren und fluidisieren schlecht.","LS13"],
["Mehr Photoinitiator = immer bessere UV-Härtung?","Falsch","Zu viel kann Vergilbung, oberflächennahe Absorption und ungleichmäßige Tiefenhärtung verursachen.","LS12"],
["Sol = echte molekulare Lösung?","Falsch","Ein Sol ist eine kolloidale Dispersion nanoskaliger Partikel.","LS14"]
],
whyChains:[
{t:"Warum wird TMP eingesetzt?",ls:1,steps:["TMP besitzt drei OH-Gruppen.","Dadurch steigt die mittlere Funktionalität und Verzweigung.","Mehr verbleibende OH-Gruppen schaffen mehr spätere Vernetzungsstellen.","Eine höhere Vernetzungsdichte erhöht meist Härte und Chemikalienbeständigkeit.","Das Netzwerk senkt Kettenbeweglichkeit, Quellung und freien Volumenanteil."],trap:"Zu viel TMP überschreitet den Gelpunkt bereits im Reaktor."},
{t:"Warum wird Xylol als Schleppmittel eingesetzt?",ls:1,steps:["Bei der Veresterung entsteht Wasser.","Die Veresterung ist eine Gleichgewichtsreaktion.","Azeotrope Wasserentfernung verschiebt das Gleichgewicht zur Esterseite.","Damit sinkt die Säurezahl weiter und die Molmasse kann steigen.","Zusätzlich senkt Xylol die Reaktionsviskosität und verbessert Stofftransport."],trap:"Xylol ist hier nicht primär Katalysator."},
{t:"Warum muss Isocyanat trocken bleiben?",ls:5,steps:["NCO reagiert mit Wasser.","Es entsteht instabile Carbaminsäure.","Sie zerfällt zu Amin und CO₂.","Das Amin bildet mit weiterem NCO Harnstoffbindungen.","CO₂ verursacht Blasen; NCO-Verbrauch verfälscht die NCO/OH-Stöchiometrie."],trap:"Feuchtigkeit verändert sowohl Optik als auch Netzwerkchemie."},
{t:"Warum braucht Pulverlack eine hohe Tg?",ls:13,steps:["Das Produkt wird als feines Pulver gelagert.","Unterhalb ausreichender Tg werden Partikeloberflächen klebrig.","Sie backen zusammen und verkleben Mahl- oder Dosieraggregate.","Hohe Tg stabilisiert Lagerung und Fluidisierung.","Im Ofen muss die Viskosität trotzdem vor der Vernetzung stark sinken."],trap:"Hohe Tg allein verschlechtert den Verlauf; Schmelzviskosität muss separat gestaltet werden."},
{t:"Warum steigt KTL an der Kathode aus?",ls:11,steps:["An der Kathode wird Wasser reduziert.","Dabei entstehen H₂ und OH⁻.","Der lokale pH-Wert steigt.","Protonierte Amingruppen werden deprotoniert.","Das Polymer verliert Hydrophilie, koaguliert und scheidet sich ab."],trap:"Nicht bloße elektrostatische Anziehung, sondern lokale pH-Umschaltung ist entscheidend."},
{t:"Warum hemmt Sauerstoff die UV-Härtung?",ls:12,steps:["UV erzeugt reaktive Radikale.","Sauerstoff diffundiert besonders an die Filmoberfläche.","O₂ fängt C-Radikale ab und erzeugt Peroxyradikale.","Diese propagieren Acrylate deutlich langsamer.","Die Oberfläche bleibt klebrig und geringer vernetzt."],trap:"Mehr Aminsynergist kann helfen, aber auch Vergilbung fördern."}
],
experiments:[
{id:"pe",ls:1,t:"Polyestersynthese",goal:"OH-funktionellen Polyester kontrolliert herstellen",steps:[
["Inertisierung starten","N₂ einschalten","Sauerstoff und oxidative Verfärbung reduzieren; kontrollierte Atmosphäre schaffen.",["Sofort auf 240 °C heizen","Katalysator ohne Rohstoffe vorlegen"]],
["Rohstoffe vorlegen","Polyole, Säure/Anhydrid und berechneten OH-Überschuss einwiegen","Die Stöchiometrie definiert Endgruppen, Funktionalität und Gelrisiko.",["Beliebige Mengen mischen","Nur Xylol vorlegen"]],
["Mischen und kontrolliert erwärmen","Rühren starten, stufenweise erwärmen","Lokale Überhitzung vermeiden; Schmelzen und Stofftransport sichern.",["Rühren erst am Ende","Direkt maximal heizen"]],
["Kondensationswasser entfernen","Kolonne/Abscheider betreiben, 2–5 % Schleppmittel nutzen","Wasserentzug verschiebt das Gleichgewicht; flüchtige Diole sollen zurückgeführt werden.",["Wasser im Reaktor lassen","Offen verdampfen ohne Kolonne"]],
["Reaktionsfortschritt prüfen","Säurezahl, Viskosität und Wasseranfall verfolgen","Nicht Zeit allein, sondern chemischer Umsatz und Molmassenaufbau bestimmen den Endpunkt.",["Nur Farbe ansehen","Bis zum Stillstand weiterheizen"]],
["Abkühlen und einstellen","Bei Ziel-SZ abkühlen, ggf. Lösemittel/Festkörper einstellen","Reaktion stoppen, sichere Verdünnung und definierte Verarbeitungsviskosität erreichen.",["Heiß mit beliebigem Lösemittel fluten","Weiterheizen bis Gelierung"]]]},
{id:"alkyd",ls:2,t:"Alkydharz und oxidative Trocknung",goal:"Fettsäuremodifizierten Polyester formulieren und trocknen",steps:[
["Öl/Fettsäure wählen","Iodzahl und gewünschte Öllänge festlegen","Doppelbindungszahl bestimmt oxidative Reaktivität; Öllänge beeinflusst Flexibilität und Löslichkeit.",["Nur nach Preis wählen","Nichttrocknendes Cocosöl für Lufttrocknung wählen"]],
["Polyol und Polyacid bilanzieren","Mittlere Funktionalität unterhalb des Gelpunkts halten","Monofunktionelle Fettsäure begrenzt, Polyol verzweigt; das Gleichgewicht entscheidet die Molekülarchitektur.",["Nur Fettsäure und Diol verwenden","Maximal viel Pentaerythrit"]],
["Harz kochen","Veresterung unter Wasserabzug bis Ziel-Säurezahl","Rest-COOH, Molmasse und Lagerstabilität werden kontrolliert.",["Ohne Wasserabzug","Nur nach Uhrzeit stoppen"]],
["Sikkative dosieren","Primär- und Durchtrockner abgestimmt niedrig dosieren","Metalle beschleunigen Hydroperoxidbildung/-zerfall und müssen Oberfläche/Tiefe ausbalancieren.",["Sehr viel Cobalt","Keine Prüfung der Hautbildung"]],
["Film applizieren","Definierte Schichtdicke bei kontrollierter Luftzufuhr","Sauerstoffdiffusion und Schichtdicke bestimmen Oberflächen- und Durchtrocknung.",["Sehr dick geschlossene Schicht","Unter Inertgas trocknen"]]]},
{id:"acryl",ls:4,t:"Lösungspolymerisation eines OH-Acrylats",goal:"Zusammensetzung, Molmasse und Reaktionswärme kontrollieren",steps:[
["Monomerrezeptur berechnen","harte, weiche und OH-funktionelle Monomere über Tg/Funktion abstimmen","Copolymerzusammensetzung legt Tg, OH-Zahl und Vernetzbarkeit fest.",["Monomere zufällig mischen","Nur MMA verwenden"]],
["Lösemittel vorlegen","Rückflusstemperatur und Lösekraft passend wählen","Lösemittel nimmt Wärme auf, begrenzt Viskosität und hält Polymer in Lösung.",["Kein Lösemittel","Schlechtes Fällungsmittel wählen"]],
["Inertisieren und auf Reaktionstemperatur bringen","N₂ und kontrollierte Temperatur","O₂ fängt Radikale; Initiatorzerfall braucht definierte Temperatur.",["Luft einblasen","Initiator bei Raumtemperatur zugeben"]],
["Monomer/Initiator dosieren","Getrennt und gleichmäßig zudosieren","Momentane Konzentration, Exothermie und Molmasse bleiben kontrollierbar.",["Alles auf einmal","Initiator erst nach allen Monomeren"]],
["Nachreaktion","Initiator-Nachschuss und Restmonomerprüfung","Verbliebene Monomere umsetzen, ohne Hauptphase unkontrolliert zu verlängern.",["Sofort abkühlen","Nur Viskosität prüfen"]]]},
{id:"epoxy",ls:10,t:"2K-Epoxid-Amin-Härtung",goal:"Epoxidnetzwerk stöchiometrisch herstellen",steps:[
["EEW und AHEW bestimmen","Epoxid- und Amin-Wasserstoff-Äquivalente berechnen","Massenverhältnis muss reaktive Äquivalente, nicht bloß Volumen, ausgleichen.",["1:1 nach Volumen","Nach Farbe mischen"]],
["Komponenten konditionieren","Temperatur, Feuchte und Viskosität kontrollieren","Beeinflusst Mischbarkeit, Reaktionsrate und Luftentweichung.",["Sehr kalt verarbeiten","Nassen Untergrund ignorieren"]],
["Gründlich mischen","Wände/Boden abstreifen, homogene Mischung erzeugen","Lokale Unterdosierung bleibt sonst weich oder klebrig.",["Nur kurz schütteln","Härter oberflächlich einrühren"]],
["Induktions-/Topfzeit beachten","systemspezifisches Reaktionsfenster einhalten","Einige Systeme benötigen Vorreaktion; danach steigt Viskosität bis Gel.",["Unbegrenzt stehen lassen","Nach Gelierung verdünnen"]],
["Definiert härten und prüfen","Temperatur/Zeit, Lösungsmittelbeständigkeit und Härte prüfen","Vollständiger Umsatz und Netzwerkentwicklung brauchen ausreichende Zeit/Temperatur.",["Nur oberflächentrocken bewerten","Zu früh belasten"]]]},
{id:"ktl",ls:11,t:"KTL-Dispersion und Abscheidung",goal:"Kationisches Epoxidharz elektrochemisch abscheiden",steps:[
["Harz aminofunktionalisieren","Epoxidgruppen kontrolliert mit Aminen umsetzen","Aminstellen ermöglichen spätere Protonierung und Wasserdispergierbarkeit.",["Amin nur ins Wasser geben","Alle Epoxide unverändert lassen"]],
["Teilneutralisieren","organische Säure dosiert zugeben","Protonierung stabilisiert die kationische Dispersion; zu viel Säure erhöht Leitfähigkeit.",["Vollständig stark ansäuern","Keine Neutralisation"]],
["Sekundärdispersion erzeugen","Wasser zunächst langsam unter hoher Scherung einkneten","Bäckertransformation bildet viel Grenzfläche und die Gradientenpartikel.",["Harz schlagartig in viel Wasser","Ohne Mischen stehen lassen"]],
["Bad einstellen","Festkörper, pH, Leitfähigkeit, Temperatur und Pigmentpaste kontrollieren","Nur ein enges Badfenster liefert reproduzierbare Abscheidung.",["Nur Farbe kontrollieren","Leitfähigkeit ignorieren"]],
["Kathodisch abscheiden","Werkstück als Kathode schalten, Spannung/Zeit regeln","OH⁻ deprotoniert das Harz lokal; Film wächst selbstbegrenzend.",["Werkstück als Anode","Maximale Spannung sofort"]],
["Spülen und einbrennen","Ultrafiltrat spülen, blockierten Vernetzer thermisch aktivieren","Lose Anteile zurückführen; erst Ofen erzeugt das endgültige Netzwerk.",["Ungewaschen direkt nutzen","Nicht einbrennen"]]]},
{id:"uv",ls:12,t:"UV-Härtung eines Acrylatlacks",goal:"Lichtdosis, Initiator und Sauerstoff kontrollieren",steps:[
["Substrat und Geometrie prüfen","Schattenzonen und Temperaturgrenze bewerten","UV braucht direkte Strahlung; 3D-Schatten bleiben sonst ungehärtet.",["Lampe beliebig positionieren","Schatten ignorieren"]],
["Photoinitiator wählen","Absorptionsspektrum an Lampe, Pigment und Schichtdicke anpassen","Nur absorbierte passende Wellenlänge erzeugt wirksame Radikale in richtiger Tiefe.",["Nur maximale Menge wählen","Initiator ohne Spektrum wählen"]],
["Formulierung applizieren","definierte Schichtdicke und Sauerstoffstrategie","Dicke/Pigment steuern Lichtpenetration; Oberfläche ist O₂ ausgesetzt.",["Beliebig dick","Keine Entlüftung"]],
["UV-Dosis einstellen","Intensität × Zeit über Bandgeschwindigkeit/Lampenleistung regeln","Dosis muss Umsatz erreichen, ohne thermisch oder photochemisch zu schädigen.",["Nur sehr schnell fahren","Unbegrenzt bestrahlen"]],
["Aushärtung prüfen","Oberflächenklebrigkeit, Doppelbindungsumsatz, Härte/Haftung prüfen","Trockenes Aussehen beweist keine Tiefen- oder Vollhärtung.",["Nur anfassen","Keine Unterseite/Tiefe prüfen"]]]},
{id:"powder",ls:13,t:"Pulverlack-Herstellung und Applikation",goal:"Lagerstabiles Pulver mit gutem Verlauf herstellen",steps:[
["Trockenmischen","Harz, Vernetzer, Pigment, Füllstoff und Additive vorhomogenisieren","Gleichmäßige Dosierung bereitet die Schmelzdispergierung vor.",["Alle Stoffe direkt mahlen","Vernetzer weglassen"]],
["Extrudieren","kurz oberhalb Schmelzbereich intensiv mischen","Pigmente dispergieren und Komponenten homogenisieren, ohne vorzeitig auszuhärten.",["Sehr lange maximal erhitzen","Nur kalt mischen"]],
["Kühlen und brechen","Extrudat schnell zur spröden Schuppe kühlen","Reaktion stoppen und mahlfähiges Material erzeugen.",["Heiß lagern","Langsam im Reaktor lassen"]],
["Mahlen und klassieren","Korngrößenfenster einstellen, Fein-/Grobanteil entfernen","Teilchengröße bestimmt Fluidisierung, Aufladung, Oberfläche und Mindestschichtdicke.",["Je feiner desto besser","Keine Siebung"]],
["Elektrostatisch applizieren","Corona/Tribo passend zu Pulver und Geometrie wählen","Ladung transportiert und hält Partikel; Faraday-Käfig beeinflusst Ecken.",["Ohne Erdung","Maximale Spannung überall"]],
["Einbrennen","erst Schmelzen/Verlauf, dann Vernetzung","Das Zeitfenster muss niedrige Schmelzviskosität vor Gelierung erlauben.",["Sofort gelieren","Unter Tg einbrennen"]]]},
{id:"solgel",ls:14,t:"TEOS-Sol-Gel-Synthese",goal:"Hydrolyse und Kondensation reproduzierbar steuern",steps:[
["Precursor/Lösemittel wählen","TEOS mit Ethanol/Wasser homogenisieren","TEOS ist mit Wasser schlecht mischbar; Alkohol koppelt Phasen und entsteht bei Hydrolyse.",["TEOS direkt ungerührt in Wasser","Beliebiges Lösemittel"]],
["Wasserverhältnis berechnen","H₂O/Si–OR nach gewünschtem Hydrolysegrad einstellen","Wasser ist Reaktand und verschiebt Hydrolyse/Kondensation.",["Wasser unbegrenzt","Ohne Wasser"]],
["pH einstellen","sauer für eher kettenförmig/klein, basisch für stärker verzweigt/größer","pH ändert die relativen Geschwindigkeiten und damit Morphologie.",["pH nicht messen","Säure und Base gleichzeitig"]],
["Kontrolliert zugeben und altern","Mischen, Temperatur und Alterungszeit konstant halten","Lokale Konzentration und Kondensationsfortschritt bestimmen Reproduzierbarkeit.",["Alles schlagartig","Sofort stark erhitzen"]],
["Applizieren und gelieren/trocknen","Topfzeit, Schichtdicke und Schrumpfung beachten","Sol wird erst durch Vernetzung und Lösemittelabgabe zum Gel/Film.",["Nach Gelierung applizieren","Sehr dick ohne Trocknungsführung"]]]}
]
};
window.LEARNING_DATA.chapters=window.LEARNING_DATA.chapters.filter(c=>c.n<=10).map(c=>({...c,next:c.next.filter(n=>n<=10)}));
window.LEARNING_DATA.edges=window.LEARNING_DATA.edges.filter(e=>e[0]<=10&&e[1]<=10);
window.LEARNING_DATA.confusions=window.LEARNING_DATA.confusions.filter(x=>!/LS1[1-4]/.test(x[3]));
window.LEARNING_DATA.whyChains=window.LEARNING_DATA.whyChains.filter(x=>x.ls<=10);
window.LEARNING_DATA.experiments=window.LEARNING_DATA.experiments.filter(x=>x.ls<=10);
