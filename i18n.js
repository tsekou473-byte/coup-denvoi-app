/* Langues de Coup d'Envoi.
   Le français est la langue d'origine : chaque texte français sert de clé.
   Colonnes : en, es, pt, ar, de, it, tr.
   Un traducteur parcourt la page et remplace les textes français par ceux de la langue choisie. */
(function(){
'use strict';
const LANGS = [
  { code:'fr', name:'Français',  locale:'fr-FR' },
  { code:'en', name:'English',   locale:'en-US' },
  { code:'es', name:'Español',   locale:'es-ES' },
  { code:'pt', name:'Português', locale:'pt-BR' },
  { code:'ar', name:'العربية',   locale:'ar-u-nu-latn', rtl:true },
  { code:'de', name:'Deutsch',   locale:'de-DE' },
  { code:'it', name:'Italiano',  locale:'it-IT' },
  { code:'tr', name:'Türkçe',    locale:'tr-TR' }
];
const COLS = ['en','es','pt','ar','de','it','tr'];

// [français, en, es, pt, ar, de, it, tr]
const ROWS = [
 // navigation
 ['Matchs','Matches','Partidos','Jogos','المباريات','Spiele','Partite','Maçlar'],
 ['Favoris','Favorites','Favoritos','Favoritos','المفضلة','Favoriten','Preferiti','Favoriler'],
 ['Explorer','Explore','Explorar','Explorar','استكشف','Entdecken','Esplora','Keşfet'],
 ['Transferts','Transfers','Fichajes','Transferências','الانتقالات','Transfers','Trasferimenti','Transferler'],
 ['Infos','News','Noticias','Notícias','الأخبار','News','Notizie','Haberler'],
 ['Menu','Menu','Menú','Menu','القائمة','Menü','Menu','Menü'],
 ['Compétitions','Competitions','Competiciones','Competições','البطولات','Wettbewerbe','Competizioni','Turnuvalar'],
 ['Toutes les compétitions','All competitions','Todas las competiciones','Todas as competições','كل البطولات','Alle Wettbewerbe','Tutte le competizioni','Tüm turnuvalar'],
 ['Application','App','Aplicación','Aplicativo','التطبيق','App','App','Uygulama'],
 ['Réglages','Settings','Ajustes','Configurações','الإعدادات','Einstellungen','Impostazioni','Ayarlar'],
 ['Mon compte','My account','Mi cuenta','Minha conta','حسابي','Mein Konto','Il mio account','Hesabım'],
 ['Facultatif','Optional','Opcional','Opcional','اختياري','Optional','Facoltativo','İsteğe bağlı'],
 ['facultatif','optional','opcional','opcional','اختياري','optional','facoltativo','isteğe bağlı'],
 ['Bientôt','Soon','Pronto','Em breve','قريبًا','Bald','Presto','Yakında'],
 ['Équipes','Teams','Equipos','Equipes','الفرق','Teams','Squadre','Takımlar'],
 ['Équipe','Team','Equipo','Equipe','الفريق','Team','Squadra','Takım'],
 ['Joueurs','Players','Jugadores','Jogadores','اللاعبون','Spieler','Giocatori','Oyuncular'],
 ['Clubs et équipes','Clubs and teams','Clubes y equipos','Clubes e equipes','الأندية والفرق','Vereine und Teams','Club e squadre','Kulüpler ve takımlar'],
 ['Mes équipes','My teams','Mis equipos','Minhas equipes','فرقي','Meine Teams','Le mie squadre','Takımlarım'],
 // champs / attributs
 ['Rechercher une équipe ou une compétition','Search a team or competition','Buscar un equipo o competición','Buscar uma equipe ou competição','ابحث عن فريق أو بطولة','Team oder Wettbewerb suchen','Cerca una squadra o competizione','Takım veya turnuva ara'],
 ['Joueur, club, pays ou compétition','Player, club, country or competition','Jugador, club, país o competición','Jogador, clube, país ou competição','لاعب أو نادٍ أو بلد أو بطولة','Spieler, Verein, Land oder Wettbewerb','Giocatore, club, paese o competizione','Oyuncu, kulüp, ülke veya turnuva'],
 ['Rechercher','Search','Buscar','Pesquisar','بحث','Suchen','Cerca','Ara'],
 ['Choisir une date','Pick a date','Elegir una fecha','Escolher uma data','اختر تاريخًا','Datum wählen','Scegli una data','Tarih seç'],
 ['Retour','Back','Atrás','Voltar','رجوع','Zurück','Indietro','Geri'],
 ['Suivre ce match','Follow this match','Seguir este partido','Seguir este jogo','تابع هذه المباراة','Dieses Spiel verfolgen','Segui questa partita','Bu maçı takip et'],
 ['Retirer','Remove','Quitar','Remover','إزالة','Entfernen','Rimuovi','Kaldır'],
 ['Ex : Moussa','e.g. Moussa','Ej.: Moussa','Ex.: Moussa','مثال: موسى','z. B. Moussa','Es.: Moussa','Örn: Moussa'],
 // chargement / erreurs
 ['Chargement…','Loading…','Cargando…','Carregando…','جارٍ التحميل…','Wird geladen …','Caricamento…','Yükleniyor…'],
 ['Chargement des matchs…','Loading matches…','Cargando partidos…','Carregando jogos…','جارٍ تحميل المباريات…','Spiele werden geladen …','Caricamento delle partite…','Maçlar yükleniyor…'],
 ['Chargement du match…','Loading match…','Cargando partido…','Carregando jogo…','جارٍ تحميل المباراة…','Spiel wird geladen …','Caricamento della partita…','Maç yükleniyor…'],
 ['Chargement des compétitions…','Loading competitions…','Cargando competiciones…','Carregando competições…','جارٍ تحميل البطولات…','Wettbewerbe werden geladen …','Caricamento delle competizioni…','Turnuvalar yükleniyor…'],
 ['Chargement du classement…','Loading standings…','Cargando clasificación…','Carregando classificação…','جارٍ تحميل الترتيب…','Tabelle wird geladen …','Caricamento della classifica…','Puan durumu yükleniyor…'],
 ['Chargement de l\'effectif…','Loading squad…','Cargando plantilla…','Carregando elenco…','جارٍ تحميل التشكيلة…','Kader wird geladen …','Caricamento della rosa…','Kadro yükleniyor…'],
 ['Chargement de tes favoris…','Loading your favorites…','Cargando tus favoritos…','Carregando seus favoritos…','جارٍ تحميل مفضلتك…','Deine Favoriten werden geladen …','Caricamento dei tuoi preferiti…','Favorilerin yükleniyor…'],
 ['Chargement de l\'historique…','Loading history…','Cargando historial…','Carregando histórico…','جارٍ تحميل السجل…','Verlauf wird geladen …','Caricamento dello storico…','Geçmiş yükleniyor…'],
 ['Le serveur gratuit peut mettre un moment à répondre.','The free server may take a moment to respond.','El servidor gratuito puede tardar un momento en responder.','O servidor gratuito pode demorar um pouco para responder.','قد يستغرق الخادم المجاني بعض الوقت للرد.','Der kostenlose Server braucht manchmal einen Moment zum Antworten.','Il server gratuito può impiegare un momento a rispondere.','Ücretsiz sunucu yanıt vermek için biraz zaman alabilir.'],
 ['Le serveur gratuit peut mettre un moment à se réveiller.','The free server may take a moment to wake up.','El servidor gratuito puede tardar un momento en despertar.','O servidor gratuito pode demorar um pouco para acordar.','قد يستغرق الخادم المجاني بعض الوقت ليستيقظ.','Der kostenlose Server braucht manchmal einen Moment zum Aufwachen.','Il server gratuito può impiegare un momento a svegliarsi.','Ücretsiz sunucunun uyanması biraz zaman alabilir.'],
 ['Le serveur se réveille, cela peut prendre jusqu\'à une minute. Les prochaines fois seront rapides.','The server is waking up, this can take up to a minute. Next times will be fast.','El servidor está despertando, puede tardar hasta un minuto. Las próximas veces será rápido.','O servidor está acordando, pode levar até um minuto. Das próximas vezes será rápido.','الخادم يستيقظ، وقد يستغرق الأمر حتى دقيقة. ستكون المرات القادمة أسرع.','Der Server wacht auf, das kann bis zu einer Minute dauern. Beim nächsten Mal geht es schnell.','Il server si sta svegliando, può volerci fino a un minuto. Le prossime volte sarà veloce.','Sunucu uyanıyor, bu bir dakikaya kadar sürebilir. Sonraki seferler hızlı olacak.'],
 ['Réessayer','Try again','Reintentar','Tentar novamente','إعادة المحاولة','Erneut versuchen','Riprova','Tekrar dene'],
 ['Impossible de charger les matchs.','Couldn\'t load matches.','No se pudieron cargar los partidos.','Não foi possível carregar os jogos.','تعذّر تحميل المباريات.','Spiele konnten nicht geladen werden.','Impossibile caricare le partite.','Maçlar yüklenemedi.'],
 ['Impossible de charger le détail.','Couldn\'t load the details.','No se pudo cargar el detalle.','Não foi possível carregar os detalhes.','تعذّر تحميل التفاصيل.','Details konnten nicht geladen werden.','Impossibile caricare i dettagli.','Ayrıntılar yüklenemedi.'],
 ['Impossible de charger le classement.','Couldn\'t load the standings.','No se pudo cargar la clasificación.','Não foi possível carregar a classificação.','تعذّر تحميل الترتيب.','Tabelle konnte nicht geladen werden.','Impossibile caricare la classifica.','Puan durumu yüklenemedi.'],
 ['Impossible de charger l\'effectif.','Couldn\'t load the squad.','No se pudo cargar la plantilla.','Não foi possível carregar o elenco.','تعذّر تحميل التشكيلة.','Kader konnte nicht geladen werden.','Impossibile caricare la rosa.','Kadro yüklenemedi.'],
 ['Impossible de charger les compétitions.','Couldn\'t load competitions.','No se pudieron cargar las competiciones.','Não foi possível carregar as competições.','تعذّر تحميل البطولات.','Wettbewerbe konnten nicht geladen werden.','Impossibile caricare le competizioni.','Turnuvalar yüklenemedi.'],
 ['Impossible de charger tes favoris.','Couldn\'t load your favorites.','No se pudieron cargar tus favoritos.','Não foi possível carregar seus favoritos.','تعذّر تحميل مفضلتك.','Deine Favoriten konnten nicht geladen werden.','Impossibile caricare i tuoi preferiti.','Favorilerin yüklenemedi.'],
 ['Impossible de charger les actus. Réessaie dans un instant.','Couldn\'t load the news. Try again in a moment.','No se pudieron cargar las noticias. Inténtalo de nuevo en un momento.','Não foi possível carregar as notícias. Tente novamente em instantes.','تعذّر تحميل الأخبار. حاول مرة أخرى بعد قليل.','News konnten nicht geladen werden. Versuche es gleich noch einmal.','Impossibile caricare le notizie. Riprova tra un attimo.','Haberler yüklenemedi. Birazdan tekrar dene.'],
 ['Historique indisponible pour le moment.','History unavailable right now.','Historial no disponible por ahora.','Histórico indisponível no momento.','السجل غير متاح حاليًا.','Verlauf derzeit nicht verfügbar.','Storico non disponibile al momento.','Geçmiş şu an kullanılamıyor.'],
 ['Aucune confrontation trouvée dans l\'historique.','No previous meetings found in the history.','No se encontraron enfrentamientos en el historial.','Nenhum confronto encontrado no histórico.','لم يتم العثور على مواجهات سابقة.','Keine Begegnungen im Verlauf gefunden.','Nessuno scontro diretto trovato nello storico.','Geçmişte karşılaşma bulunamadı.'],
 ['Face-à-face','Head to head','Cara a cara','Confronto direto','المواجهات المباشرة','Direkter Vergleich','Scontri diretti','Karşılıklı maçlar'],
 // états de match
 ['Terminé','Full time','Finalizado','Encerrado','انتهت','Beendet','Terminata','Bitti'],
 ['Reporté','Postponed','Aplazado','Adiado','مؤجلة','Verschoben','Rinviata','Ertelendi'],
 ['HIER','YESTERDAY','AYER','ONTEM','أمس','GESTERN','IERI','DÜN'],
 ["AUJOURD'HUI",'TODAY','HOY','HOJE','اليوم','HEUTE','OGGI','BUGÜN'],
 ['DEMAIN','TOMORROW','MAÑANA','AMANHÃ','غدًا','MORGEN','DOMANI','YARIN'],
 ["Aujourd'hui",'Today','Hoy','Hoje','اليوم','Heute','Oggi','Bugün'],
 ['Demain','Tomorrow','Mañana','Amanhã','غدًا','Morgen','Domani','Yarın'],
 ['Hier','Yesterday','Ayer','Ontem','أمس','Gestern','Ieri','Dün'],
 ['EN DIRECT','LIVE','EN VIVO','AO VIVO','مباشر','LIVE','LIVE','CANLI'],
 ['Direct','Live','En vivo','Ao vivo','مباشر','Live','Live','Canlı'],
 ['À venir et en direct','Upcoming and live','Próximos y en vivo','Próximos e ao vivo','القادمة والمباشرة','Anstehend und live','In arrivo e live','Yaklaşan ve canlı'],
 ['Résultats récents','Recent results','Resultados recientes','Resultados recentes','النتائج الأخيرة','Letzte Ergebnisse','Risultati recenti','Son sonuçlar'],
 ['Aucun match ce jour-là.','No matches that day.','No hay partidos ese día.','Nenhum jogo nesse dia.','لا توجد مباريات في ذلك اليوم.','Keine Spiele an diesem Tag.','Nessuna partita quel giorno.','O gün maç yok.'],
 ['Aucun match en direct pour le moment.','No live matches right now.','No hay partidos en vivo ahora.','Nenhum jogo ao vivo no momento.','لا توجد مباريات مباشرة الآن.','Im Moment keine Live-Spiele.','Nessuna partita in diretta al momento.','Şu an canlı maç yok.'],
 ['Aucun match récent ou à venir pour cette compétition.','No recent or upcoming matches for this competition.','No hay partidos recientes ni próximos en esta competición.','Nenhum jogo recente ou futuro nesta competição.','لا توجد مباريات حديثة أو قادمة في هذه البطولة.','Keine aktuellen oder kommenden Spiele in diesem Wettbewerb.','Nessuna partita recente o in programma per questa competizione.','Bu turnuvada yakın zamanlı veya yaklaşan maç yok.'],
 ['Elle est peut-être en pause ou hors saison.','It may be on a break or out of season.','Puede estar en pausa o fuera de temporada.','Pode estar em pausa ou fora de temporada.','ربما هي في استراحة أو خارج الموسم.','Möglicherweise Pause oder spielfreie Zeit.','Potrebbe essere in pausa o fuori stagione.','Ara vermiş veya sezon dışı olabilir.'],
 ['Aucune compétition ne correspond.','No matching competition.','Ninguna competición coincide.','Nenhuma competição encontrada.','لا توجد بطولة مطابقة.','Kein passender Wettbewerb.','Nessuna competizione corrispondente.','Eşleşen turnuva yok.'],
 ['Pas de classement pour cette compétition.','No standings for this competition.','No hay clasificación para esta competición.','Sem classificação para esta competição.','لا يوجد ترتيب لهذه البطولة.','Keine Tabelle für diesen Wettbewerb.','Nessuna classifica per questa competizione.','Bu turnuva için puan durumu yok.'],
 ['Les coupes et les phases à élimination directe n\'en ont pas, ou le fournisseur de données ne l\'envoie pas.','Cups and knockout stages don\'t have one, or the data provider doesn\'t send it.','Las copas y las eliminatorias no tienen, o el proveedor de datos no lo envía.','Copas e mata-matas não têm, ou o provedor de dados não envia.','الكؤوس ومراحل خروج المغلوب ليس لها ترتيب، أو أن مزوّد البيانات لا يرسله.','Pokale und K.-o.-Runden haben keine, oder der Datenanbieter liefert sie nicht.','Le coppe e le fasi a eliminazione diretta non ce l\'hanno, oppure il fornitore di dati non la invia.','Kupalarda ve eleme turlarında yoktur ya da veri sağlayıcı göndermiyor.'],
 ['Les compositions seront affichées ici dès qu\'elles sont annoncées, environ 1 h avant le coup d\'envoi.','Lineups will appear here as soon as they are announced, about 1 hour before kick-off.','Las alineaciones aparecerán aquí en cuanto se anuncien, aproximadamente 1 h antes del inicio.','As escalações aparecerão aqui assim que forem anunciadas, cerca de 1 h antes do início.','ستظهر التشكيلات هنا فور الإعلان عنها، قبل نحو ساعة من انطلاق المباراة.','Die Aufstellungen erscheinen hier, sobald sie bekannt gegeben werden, etwa 1 Stunde vor Anpfiff.','Le formazioni appariranno qui non appena annunciate, circa 1 ora prima del calcio d\'inizio.','Kadrolar açıklanır açıklanmaz, maçtan yaklaşık 1 saat önce burada görünecek.'],
 ['Cette page se met à jour toute seule.','This page updates by itself.','Esta página se actualiza sola.','Esta página atualiza sozinha.','تتحدّث هذه الصفحة تلقائيًا.','Diese Seite aktualisiert sich automatisch.','Questa pagina si aggiorna da sola.','Bu sayfa kendiliğinden güncellenir.'],
 ['Pas de compositions pour ce match.','No lineups for this match.','No hay alineaciones para este partido.','Sem escalações para este jogo.','لا توجد تشكيلات لهذه المباراة.','Keine Aufstellungen für dieses Spiel.','Nessuna formazione per questa partita.','Bu maç için kadro yok.'],
 ['Le fournisseur de données ne les envoie pas pour toutes les compétitions, ni avant le coup d\'envoi.','The data provider doesn\'t send them for every competition, nor before kick-off.','El proveedor de datos no los envía para todas las competiciones, ni antes del inicio.','O provedor de dados não os envia para todas as competições, nem antes do apito inicial.','لا يرسلها مزوّد البيانات لكل البطولات، ولا قبل انطلاق المباراة.','Der Datenanbieter liefert sie nicht für alle Wettbewerbe und nicht vor dem Anstoß.','Il fornitore di dati non le invia per tutte le competizioni, né prima del fischio d\'inizio.','Veri sağlayıcı bunları tüm turnuvalar için ve maç başlamadan önce göndermez.'],
 ['Pas de statistiques pour ce match.','No statistics for this match.','No hay estadísticas para este partido.','Sem estatísticas para este jogo.','لا توجد إحصائيات لهذه المباراة.','Keine Statistiken für dieses Spiel.','Nessuna statistica per questa partita.','Bu maç için istatistik yok.'],
 ['Le fournisseur de données ne les envoie pas pour toutes les compétitions.','The data provider doesn\'t send them for every competition.','El proveedor de datos no los envía para todas las competiciones.','O provedor de dados não os envia para todas as competições.','لا يرسلها مزوّد البيانات لكل البطولات.','Der Datenanbieter liefert sie nicht für alle Wettbewerbe.','Il fornitore di dati non le invia per tutte le competizioni.','Veri sağlayıcı bunları tüm turnuvalar için göndermez.'],
 ['Le match n\'a pas encore commencé.','The match hasn\'t started yet.','El partido aún no ha comenzado.','O jogo ainda não começou.','لم تبدأ المباراة بعد.','Das Spiel hat noch nicht begonnen.','La partita non è ancora iniziata.','Maç henüz başlamadı.'],
 ['Aucun événement enregistré.','No events recorded.','No hay eventos registrados.','Nenhum evento registrado.','لا توجد أحداث مسجّلة.','Keine Ereignisse erfasst.','Nessun evento registrato.','Kayıtlı olay yok.'],
 // onglets du match
 ['Résumé','Summary','Resumen','Resumo','الملخص','Übersicht','Riepilogo','Özet'],
 ['Compos','Lineups','Alineaciones','Escalações','التشكيلات','Aufstellung','Formazioni','Kadrolar'],
 ['Stats','Stats','Estadísticas','Estatísticas','الإحصائيات','Statistik','Statistiche','İstatistik'],
 ['Classement','Standings','Clasificación','Classificação','الترتيب','Tabelle','Classifica','Puan durumu'],
 ['Matchs joués','Matches played','Partidos jugados','Jogos disputados','المباريات الملعوبة','Gespielte Spiele','Partite giocate','Oynanan maç'],
 ['Cartons','Cards','Tarjetas','Cartões','البطاقات','Karten','Cartellini','Kartlar'],
 ['Changements','Substitutions','Cambios','Substituições','التغييرات','Wechsel','Cambi','Değişiklikler'],
 ['Histoire du club','Club history','Historia del club','História do clube','تاريخ النادي','Vereinsgeschichte','Storia del club','Kulüp tarihi'],
 ['Chargement de l\'histoire…','Loading history…','Cargando historia…','Carregando história…','جارٍ تحميل التاريخ…','Geschichte wird geladen …','Caricamento della storia…','Tarih yükleniyor…'],
 ['Fondé en','Founded','Fundado en','Fundado em','تأسس عام','Gegründet','Fondato nel','Kuruluş'],
 ['Stade','Stadium','Estadio','Estádio','الملعب','Stadion','Stadio','Stadyum'],
 ['Ville','City','Ciudad','Cidade','المدينة','Stadt','Città','Şehir'],
 ['Compétition principale','Main competition','Competición principal','Competição principal','البطولة الرئيسية','Hauptwettbewerb','Competizione principale','Ana lig'],
 ['Lire la suite','Read more','Leer más','Ler mais','اقرأ المزيد','Weiterlesen','Leggi di più','Devamını oku'],
 ['Réduire','Show less','Mostrar menos','Mostrar menos','عرض أقل','Weniger','Mostra meno','Daha az'],
 ['Carrière','Career','Carrera','Carreira','المسيرة','Karriere','Carriera','Kariyer'],
 ['Chargement de la carrière…','Loading career…','Cargando carrera…','Carregando carreira…','جارٍ تحميل المسيرة…','Karriere wird geladen …','Caricamento della carriera…','Kariyer yükleniyor…'],
 ['Aujourd\'hui','Today','Hoy','Hoje','اليوم','Heute','Oggi','Bugün'],
 ['Prêt','Loan','Cesión','Empréstimo','إعارة','Leihe','Prestito','Kiralık'],
 ['Formation','Youth','Cantera','Formação','فئات الشباب','Jugend','Settore giovanile','Altyapı'],
 ['Biographie','Biography','Biografía','Biografia','السيرة','Biografie','Biografia','Biyografi'],
 ['Lieu de naissance','Birthplace','Lugar de nacimiento','Local de nascimento','مكان الميلاد','Geburtsort','Luogo di nascita','Doğum yeri'],
 ['Taille','Height','Altura','Altura','الطول','Größe','Altezza','Boy'],
 ['Nationalité','Nationality','Nacionalidad','Nacionalidade','الجنسية','Nationalität','Nazionalità','Uyruk'],
 ['Né le','Born','Nacimiento','Nascimento','تاريخ الميلاد','Geboren','Nato il','Doğum'],
 ['Aperçu','Overview','Resumen','Resumo','نظرة عامة','Überblick','Panoramica','Genel'],
 ['Dernier match','Last match','Último partido','Último jogo','آخر مباراة','Letztes Spiel','Ultima partita','Son maç'],
 ['Prochain match','Next match','Próximo partido','Próximo jogo','المباراة القادمة','Nächstes Spiel','Prossima partita','Sonraki maç'],
 ['Match en cours','Match in progress','Partido en curso','Jogo em andamento','مباراة جارية','Laufendes Spiel','Partita in corso','Devam eden maç'],
 ['Forme lors des derniers matchs','Form over recent matches','Forma en los últimos partidos','Forma nos últimos jogos','الأداء في المباريات الأخيرة','Form der letzten Spiele','Forma nelle ultime partite','Son maçlardaki form'],
 ['Aucun match récent ou à venir pour cette équipe.','No recent or upcoming matches for this team.','No hay partidos recientes ni próximos para este equipo.','Nenhum jogo recente ou futuro para esta equipe.','لا توجد مباريات حديثة أو قادمة لهذا الفريق.','Keine aktuellen oder kommenden Spiele für dieses Team.','Nessuna partita recente o in programma per questa squadra.','Bu takım için yakın zamanlı veya yaklaşan maç yok.'],
 ['À suivre','Up next','Próximo','A seguir','التالي','Als Nächstes','Prossimo','Sıradaki'],
 ['Dernier résultat','Last result','Último resultado','Último resultado','آخر نتيجة','Letztes Ergebnis','Ultimo risultato','Son sonuç'],
 ['Voir le classement complet','See full table','Ver clasificación completa','Ver classificação completa','عرض الترتيب كاملاً','Komplette Tabelle ansehen','Vedi classifica completa','Tüm puan durumunu gör'],
 ['Classement en direct · provisoire','Live table · provisional','Clasificación en directo · provisional','Classificação ao vivo · provisória','الترتيب المباشر · مؤقت','Live-Tabelle · vorläufig','Classifica live · provvisoria','Canlı puan durumu · geçici'],
 ['Classement mis à jour · provisoire','Updated table · provisional','Clasificación actualizada · provisional','Classificação atualizada · provisória','الترتيب المحدّث · مؤقت','Aktualisierte Tabelle · vorläufig','Classifica aggiornata · provvisoria','Güncel puan durumu · geçici'],
 ['Buts','Goals','Goles','Gols','الأهداف','Tore','Gol','Goller'],
 ['Passes décisives','Assists','Asistencias','Assistências','التمريرات الحاسمة','Vorlagen','Assist','Asistler'],
 ['Cartons jaunes','Yellow cards','Tarjetas amarillas','Cartões amarelos','البطاقات الصفراء','Gelbe Karten','Cartellini gialli','Sarı kartlar'],
 ['Cartons rouges','Red cards','Tarjetas rojas','Cartões vermelhos','البطاقات الحمراء','Rote Karten','Cartellini rossi','Kırmızı kartlar'],
 ['Note moyenne','Average rating','Nota media','Nota média','متوسط التقييم','Durchschnittsnote','Voto medio','Ortalama puan'],
 ['Tirs','Shots','Tiros','Chutes','التسديدات','Schüsse','Tiri','Şutlar'],
 ['Tirs cadrés','Shots on target','Tiros a puerta','Chutes no gol','تسديدات على المرمى','Schüsse aufs Tor','Tiri in porta','İsabetli şutlar'],
 ['Tirs non cadrés','Shots off target','Tiros fuera','Chutes para fora','تسديدات خارج المرمى','Schüsse neben das Tor','Tiri fuori','İsabetsiz şutlar'],
 ['Tirs bloqués','Blocked shots','Tiros bloqueados','Chutes bloqueados','تسديدات محجوبة','Geblockte Schüsse','Tiri bloccati','Engellenen şutlar'],
 ['Tirs dans la surface','Shots inside the box','Tiros dentro del área','Chutes dentro da área','تسديدات من داخل المنطقة','Schüsse im Strafraum','Tiri in area','Ceza sahası içi şutlar'],
 ['Tirs hors de la surface','Shots outside the box','Tiros fuera del área','Chutes fora da área','تسديدات من خارج المنطقة','Schüsse von außerhalb des Strafraums','Tiri da fuori area','Ceza sahası dışı şutlar'],
 ['Fautes','Fouls','Faltas','Faltas','الأخطاء','Fouls','Falli','Fauller'],
 ['Corners','Corners','Córners','Escanteios','الركنيات','Ecken','Calci d\'angolo','Kornerler'],
 ['Hors-jeu','Offsides','Fueras de juego','Impedimentos','التسلل','Abseits','Fuorigioco','Ofsayt'],
 ['Possession','Possession','Posesión','Posse de bola','الاستحواذ','Ballbesitz','Possesso palla','Topa sahip olma'],
 ['Arrêts','Saves','Paradas','Defesas','التصديات','Paraden','Parate','Kurtarışlar'],
 ['Passes','Passes','Pases','Passes','التمريرات','Pässe','Passaggi','Paslar'],
 ['Passes réussies','Accurate passes','Pases completados','Passes certos','التمريرات الناجحة','Angekommene Pässe','Passaggi riusciti','Başarılı paslar'],
 ['Attaques','Attacks','Ataques','Ataques','الهجمات','Angriffe','Attacchi','Ataklar'],
 ['Attaques dangereuses','Dangerous attacks','Ataques peligrosos','Ataques perigosos','هجمات خطيرة','Gefährliche Angriffe','Attacchi pericolosi','Tehlikeli ataklar'],
 ['Remplacements','Substitutions','Sustituciones','Substituições','التبديلات','Wechsel','Sostituzioni','Oyuncu değişiklikleri'],
 ['Touches','Throw-ins','Saques de banda','Laterais','رميات التماس','Einwürfe','Rimesse laterali','Taç atışları'],
 ['Six mètres','Goal kicks','Saques de puerta','Tiros de meta','ركلات المرمى','Abstöße','Rinvii dal fondo','Aut atışları'],
 ['Penaltys','Penalties','Penaltis','Pênaltis','ركلات الجزاء','Elfmeter','Rigori','Penaltılar'],
 ['Blessures','Injuries','Lesiones','Lesões','الإصابات','Verletzungen','Infortuni','Sakatlıklar'],
 ['Coups francs','Free kicks','Tiros libres','Faltas diretas','الركلات الحرة','Freistöße','Calci di punizione','Serbest vuruşlar'],
 ['Tacles','Tackles','Entradas','Desarmes','التدخلات','Tacklings','Contrasti','Müdahaleler'],
 ['Remplaçants','Substitutes','Suplentes','Reservas','البدلاء','Ersatzspieler','Panchina','Yedekler'],
 ['Entraîneur','Coach','Entrenador','Técnico','المدرب','Trainer','Allenatore','Teknik direktör'],
 ['Gardiens','Goalkeepers','Porteros','Goleiros','حراس المرمى','Torhüter','Portieri','Kaleciler'],
 ['Défenseurs','Defenders','Defensas','Defensores','المدافعون','Verteidiger','Difensori','Defans oyuncuları'],
 ['Milieux','Midfielders','Centrocampistas','Meio-campistas','لاعبو الوسط','Mittelfeldspieler','Centrocampisti','Orta saha oyuncuları'],
 ['Attaquants','Forwards','Delanteros','Atacantes','المهاجمون','Stürmer','Attaccanti','Forvetler'],
 ['Gardien','Goalkeeper','Portero','Goleiro','حارس مرمى','Torhüter','Portiere','Kaleci'],
 ['Défenseur','Defender','Defensa','Defensor','مدافع','Verteidiger','Difensore','Defans'],
 ['Milieu','Midfielder','Centrocampista','Meio-campista','لاعب وسط','Mittelfeldspieler','Centrocampista','Orta saha'],
 ['Attaquant','Forward','Delantero','Atacante','مهاجم','Stürmer','Attaccante','Forvet'],
 ['Blessé','Injured','Lesionado','Lesionado','مصاب','Verletzt','Infortunato','Sakat'],
 ['Actuellement blessé','Currently injured','Actualmente lesionado','Atualmente lesionado','مصاب حاليًا','Derzeit verletzt','Attualmente infortunato','Şu an sakat'],
 ['Aucun effectif disponible pour cette équipe.','No squad available for this team.','No hay plantilla disponible para este equipo.','Nenhum elenco disponível para esta equipe.','لا توجد تشكيلة متاحة لهذا الفريق.','Für dieses Team ist kein Kader verfügbar.','Nessuna rosa disponibile per questa squadra.','Bu takım için kadro yok.'],
 ['Aucune statistique disponible cette saison.','No statistics available this season.','No hay estadísticas disponibles esta temporada.','Nenhuma estatística disponível nesta temporada.','لا توجد إحصائيات متاحة لهذا الموسم.','Diese Saison sind keine Statistiken verfügbar.','Nessuna statistica disponibile questa stagione.','Bu sezon için istatistik yok.'],
 ['L\'historique des clubs précédents n\'est pas fourni par notre source de données.','The history of previous clubs isn\'t provided by our data source.','El historial de clubes anteriores no lo proporciona nuestra fuente de datos.','O histórico de clubes anteriores não é fornecido pela nossa fonte de dados.','سجل الأندية السابقة غير متوفر لدى مصدر بياناتنا.','Die Vereinshistorie wird von unserer Datenquelle nicht bereitgestellt.','Lo storico dei club precedenti non è fornito dalla nostra fonte di dati.','Önceki kulüplerin geçmişi veri kaynağımız tarafından sağlanmıyor.'],
 ['★ Suivie','★ Following','★ Siguiendo','★ Seguindo','★ تتابعها','★ Gefolgt','★ Seguita','★ Takipte'],
 ['☆ Suivre','☆ Follow','☆ Seguir','☆ Seguir','☆ متابعة','☆ Folgen','☆ Segui','☆ Takip et'],
 ['Équipe suivie','Team followed','Equipo seguido','Equipe seguida','فريق متابَع','Team gefolgt','Squadra seguita','Takip edilen takım'],
 // classement
 ['Ligue des champions','Champions League','Liga de Campeones','Liga dos Campeões','دوري الأبطال','Champions League','Champions League','Şampiyonlar Ligi'],
 ['Ligue Europa','Europa League','Liga Europa','Liga Europa','الدوري الأوروبي','Europa League','Europa League','Avrupa Ligi'],
 ['Ligue Europa Conférence','Conference League','Liga de la Conferencia','Liga da Conferência','دوري المؤتمر','Conference League','Conference League','Konferans Ligi'],
 ['Relégation','Relegation','Descenso','Rebaixamento','الهبوط','Abstieg','Retrocessione','Küme düşme'],
 ['Promotion / barrages','Promotion / play-offs','Ascenso / play-offs','Acesso / play-offs','الصعود / الملحق','Aufstieg / Play-offs','Promozione / playoff','Yükselme / play-off'],
 ['Autre','Other','Otro','Outro','أخرى','Sonstige','Altro','Diğer'],
 ['Pts','Pts','Pts','Pts','نقاط','Pkt','Pt','Puan'],
 // pages
 ['Ajoute des équipes en favoris pour les retrouver ici.','Add teams to your favorites to find them here.','Añade equipos a favoritos para encontrarlos aquí.','Adicione equipes aos favoritos para encontrá-las aqui.','أضف فرقًا إلى المفضلة لتجدها هنا.','Füge Teams zu den Favoriten hinzu, um sie hier zu finden.','Aggiungi squadre ai preferiti per ritrovarle qui.','Burada bulmak için takımları favorilere ekle.'],
 ['Tu n\'as pas encore de favoris.','You don\'t have any favorites yet.','Aún no tienes favoritos.','Você ainda não tem favoritos.','ليس لديك مفضلة بعد.','Du hast noch keine Favoriten.','Non hai ancora preferiti.','Henüz favorin yok.'],
 ['Ouvre un match, puis touche ☆ pour le suivre, ou « ☆ Suivre » sous une équipe pour voir ici ses prochains matchs et ses résultats.','Open a match, then tap ☆ to follow it, or “☆ Follow” under a team to see its next matches and results here.','Abre un partido y toca ☆ para seguirlo, o «☆ Seguir» bajo un equipo para ver aquí sus próximos partidos y resultados.','Abra um jogo e toque em ☆ para segui-lo, ou em “☆ Seguir” sob uma equipe para ver aqui os próximos jogos e resultados.','افتح مباراة ثم اضغط ☆ لمتابعتها، أو «☆ متابعة» تحت أي فريق لترى هنا مبارياته القادمة ونتائجه.','Öffne ein Spiel und tippe auf ☆, um es zu verfolgen, oder auf „☆ Folgen“ unter einem Team, um hier dessen nächste Spiele und Ergebnisse zu sehen.','Apri una partita e tocca ☆ per seguirla, oppure «☆ Segui» sotto una squadra per vedere qui le prossime partite e i risultati.','Bir maçı aç ve takip etmek için ☆ simgesine dokun ya da bir takımın altındaki «☆ Takip et» düğmesine bas; sıradaki maçlar ve sonuçlar burada görünür.'],
 ['Tu peux suivre 15 équipes au maximum.','You can follow up to 15 teams.','Puedes seguir hasta 15 equipos.','Você pode seguir até 15 equipes.','يمكنك متابعة 15 فريقًا كحد أقصى.','Du kannst höchstens 15 Teams folgen.','Puoi seguire al massimo 15 squadre.','En fazla 15 takımı takip edebilirsin.'],
 ['Explore les compétitions et classements du monde entier.','Explore competitions and standings from around the world.','Explora competiciones y clasificaciones de todo el mundo.','Explore competições e classificações do mundo todo.','استكشف البطولات والترتيب من كل أنحاء العالم.','Entdecke Wettbewerbe und Tabellen aus aller Welt.','Esplora competizioni e classifiche di tutto il mondo.','Dünyanın dört bir yanındaki turnuvaları ve puan durumlarını keşfet.'],
 ['Aucune actu pour le moment.','No news right now.','No hay noticias por ahora.','Nenhuma notícia no momento.','لا توجد أخبار حاليًا.','Derzeit keine News.','Nessuna notizia al momento.','Şu an haber yok.'],
 ['Aucun transfert pour le moment.','No transfers right now.','No hay fichajes por ahora.','Nenhuma transferência no momento.','لا توجد انتقالات حاليًا.','Derzeit keine Transfers.','Nessun trasferimento al momento.','Şu an transfer yok.'],
 ['Tire pour actualiser','Pull to refresh','Desliza para actualizar','Puxe para atualizar','اسحب للتحديث','Zum Aktualisieren ziehen','Trascina per aggiornare','Yenilemek için aşağı çek'],
 ['Relâche pour actualiser','Release to refresh','Suelta para actualizar','Solte para atualizar','أفلت للتحديث','Loslassen zum Aktualisieren','Rilascia per aggiornare','Yenilemek için bırak'],
 ['Actualisation…','Refreshing…','Actualizando…','Atualizando…','جارٍ التحديث…','Wird aktualisiert …','Aggiornamento…','Yenileniyor…'],
 // réglages
 ['Taille du texte','Text size','Tamaño del texto','Tamanho do texto','حجم النص','Textgröße','Dimensione del testo','Yazı boyutu'],
 ['Petit','Small','Pequeño','Pequeno','صغير','Klein','Piccolo','Küçük'],
 ['Normal','Normal','Normal','Normal','عادي','Normal','Normale','Normal'],
 ['Grand','Large','Grande','Grande','كبير','Groß','Grande','Büyük'],
 ['« Petit » est le réglage par défaut','“Small” is the default setting','«Pequeño» es el ajuste predeterminado','“Pequeno” é a configuração padrão','«صغير» هو الإعداد الافتراضي','„Klein“ ist die Standardeinstellung','«Piccolo» è l\'impostazione predefinita','«Küçük» varsayılan ayardır'],
 ['Probabilité de victoire','Win probability','Probabilidad de victoria','Probabilidade de vitória','احتمالية الفوز','Siegwahrscheinlichkeit','Probabilità di vittoria','Kazanma olasılığı'],
 ['Notifications','Notifications','Notificaciones','Notificações','الإشعارات','Benachrichtigungen','Notifiche','Bildirimler'],
 ["Buts, coups d'envoi et fins de match de tes favoris","Goals, kick-offs and final whistles of your favorites",'Goles, inicios y finales de tus favoritos','Gols, inícios e finais dos seus favoritos','أهداف ومواعيد انطلاق ونهايات مباريات مفضلتك','Tore, Anpfiffe und Abpfiffe deiner Favoriten','Gol, calci d\'inizio e fischi finali dei tuoi preferiti','Favorilerinin golleri, başlangıç ve bitiş bildirimleri'],
 ["Ajoute d'abord l'app à l'écran d'accueil (Partager, puis « Sur l'écran d'accueil »).","First add the app to your Home Screen (Share, then “Add to Home Screen”).",'Primero añade la app a la pantalla de inicio (Compartir y «Añadir a pantalla de inicio»).','Primeiro adicione o app à tela de início (Compartilhar e «Adicionar à Tela de Início»).','أضف التطبيق أولًا إلى الشاشة الرئيسية (مشاركة ثم «إضافة إلى الشاشة الرئيسية»).','Füge die App zuerst zum Home-Bildschirm hinzu (Teilen, dann „Zum Home-Bildschirm“).','Aggiungi prima l\'app alla schermata Home (Condividi, poi «Aggiungi a Home»).','Önce uygulamayı Ana Ekrana ekle (Paylaş, ardından «Ana Ekrana Ekle»).'],
 ["Ton téléphone ne gère pas les notifications pour cette app.","Your phone doesn't support notifications for this app.",'Tu teléfono no admite notificaciones para esta app.','Seu telefone não oferece suporte a notificações para este app.','هاتفك لا يدعم الإشعارات لهذا التطبيق.','Dein Telefon unterstützt keine Benachrichtigungen für diese App.','Il tuo telefono non supporta le notifiche per questa app.','Telefonun bu uygulama için bildirimleri desteklemiyor.'],
 ["Bloquées : autorise-les dans les Réglages de ton téléphone.","Blocked: allow them in your phone's Settings.",'Bloqueadas: permítelas en los Ajustes de tu teléfono.','Bloqueadas: permita-as nos Ajustes do seu telefone.','محظورة: اسمح بها من إعدادات هاتفك.','Blockiert: Erlaube sie in den Einstellungen deines Telefons.','Bloccate: consentile nelle Impostazioni del telefono.','Engellendi: telefonunun Ayarlarından izin ver.'],
 ["Envoyer une notification test","Send a test notification",'Enviar una notificación de prueba','Enviar uma notificação de teste','إرسال إشعار تجريبي','Test-Benachrichtigung senden','Invia una notifica di prova','Test bildirimi gönder'],
 ["Pour vérifier que tout fonctionne","To check that everything works",'Para comprobar que todo funciona','Para verificar se tudo funciona','للتأكد من أن كل شيء يعمل','Um zu prüfen, ob alles funktioniert','Per verificare che tutto funzioni','Her şeyin çalıştığını kontrol etmek için'],
 ["Envoyer","Send",'Enviar','Enviar','إرسال','Senden','Invia','Gönder'],
 ["Notifications refusées. Tu peux les autoriser dans les Réglages de ton téléphone.","Notifications denied. You can allow them in your phone's Settings.",'Notificaciones rechazadas. Puedes permitirlas en los Ajustes de tu teléfono.','Notificações negadas. Você pode permiti-las nos Ajustes do seu telefone.','تم رفض الإشعارات. يمكنك السماح بها من إعدادات هاتفك.','Benachrichtigungen abgelehnt. Du kannst sie in den Einstellungen deines Telefons erlauben.','Notifiche negate. Puoi consentirle nelle Impostazioni del telefono.','Bildirimler reddedildi. Telefonunun Ayarlarından izin verebilirsin.'],
 ["Les notifications ne sont pas encore disponibles sur le serveur.","Notifications aren't available on the server yet.",'Las notificaciones aún no están disponibles en el servidor.','As notificações ainda não estão disponíveis no servidor.','الإشعارات غير متاحة على الخادم بعد.','Benachrichtigungen sind auf dem Server noch nicht verfügbar.','Le notifiche non sono ancora disponibili sul server.','Bildirimler sunucuda henüz kullanılamıyor.'],
 ["Impossible d'activer les notifications pour le moment.","Couldn't turn on notifications right now.",'No se pudieron activar las notificaciones ahora.','Não foi possível ativar as notificações agora.','تعذّر تفعيل الإشعارات الآن.','Benachrichtigungen konnten gerade nicht aktiviert werden.','Impossibile attivare le notifiche al momento.','Bildirimler şu an açılamadı.'],
 ["Impossible d'envoyer la notification test.","Couldn't send the test notification.",'No se pudo enviar la notificación de prueba.','Não foi possível enviar a notificação de teste.','تعذّر إرسال الإشعار التجريبي.','Test-Benachrichtigung konnte nicht gesendet werden.','Impossibile inviare la notifica di prova.','Test bildirimi gönderilemedi.'],
 ['Estimation Coup d\'Envoi d\'après le classement et les buts marqués et encaissés.','Coup d\'Envoi estimate based on the standings and goals scored and conceded.','Estimación de Coup d\'Envoi basada en la clasificación y los goles a favor y en contra.','Estimativa do Coup d\'Envoi com base na classificação e nos gols marcados e sofridos.','تقدير Coup d\'Envoi بناءً على الترتيب والأهداف المسجَّلة والمستقبَلة.','Coup-d\'Envoi-Schätzung auf Basis von Tabelle sowie erzielten und kassierten Toren.','Stima di Coup d\'Envoi basata su classifica e gol fatti e subiti.','Coup d\'Envoi tahmini; puan durumu ile atılan ve yenen goller esas alınmıştır.'],
 ['Estimation d\'après les cotes du marché, à titre indicatif.','Estimate based on market odds, for information only.','Estimación basada en las cuotas del mercado, solo a modo indicativo.','Estimativa com base nas odds do mercado, apenas indicativa.','تقدير مبني على احتمالات السوق، للاستئناس فقط.','Schätzung auf Basis der Marktquoten, nur zur Information.','Stima basata sulle quote di mercato, a puro titolo indicativo.','Piyasa oranlarına dayalı tahmin; yalnızca bilgi amaçlıdır.'],
 ['Nul','Draw','Empate','Empate','تعادل','Remis','Pareggio','Beraberlik'],
 ['Estimation du fournisseur de données, à titre indicatif.','Estimate from the data provider, for information only.','Estimación del proveedor de datos, solo a modo indicativo.','Estimativa do provedor de dados, apenas indicativa.','تقدير من مزوّد البيانات، للاستئناس فقط.','Schätzung des Datenanbieters, nur zur Information.','Stima del fornitore di dati, a puro titolo indicativo.','Veri sağlayıcının tahmini; yalnızca bilgi amaçlıdır.'],
 ['Langue','Language','Idioma','Idioma','اللغة','Sprache','Lingua','Dil'],
 ['Langue de l\'application','App language','Idioma de la aplicación','Idioma do aplicativo','لغة التطبيق','App-Sprache','Lingua dell\'app','Uygulama dili'],
 ['Noms en français','Translated names','Nombres traducidos','Nomes traduzidos','أسماء مترجمة','Übersetzte Namen','Nomi tradotti','Çevrilmiş adlar'],
 ['Pays, sélections et compétitions','Countries and national teams','Países y selecciones','Países e seleções','البلدان والمنتخبات','Länder und Nationalteams','Paesi e nazionali','Ülkeler ve milli takımlar'],
 ['Logos des équipes et des compétitions','Team and competition logos','Logos de equipos y competiciones','Logos de equipes e competições','شعارات الفرق والبطولات','Logos von Teams und Wettbewerben','Loghi di squadre e competizioni','Takım ve turnuva logoları'],
 ['Désactive-les pour n\'afficher que les initiales','Turn them off to show initials only','Desactívalos para mostrar solo las iniciales','Desative para mostrar só as iniciais','عطّلها لعرض الأحرف الأولى فقط','Ausschalten, um nur Initialen zu zeigen','Disattivali per mostrare solo le iniziali','Yalnızca baş harfleri göstermek için kapat'],
 ['Actualisation automatique','Auto refresh','Actualización automática','Atualização automática','التحديث التلقائي','Automatische Aktualisierung','Aggiornamento automatico','Otomatik yenileme'],
 ['Met à jour les matchs en direct toutes les 90 secondes','Updates live matches every 90 seconds','Actualiza los partidos en vivo cada 90 segundos','Atualiza os jogos ao vivo a cada 90 segundos','يحدّث المباريات المباشرة كل 90 ثانية','Aktualisiert Live-Spiele alle 90 Sekunden','Aggiorna le partite live ogni 90 secondi','Canlı maçları her 90 saniyede bir günceller'],
 ['Données enregistrées','Saved data','Datos guardados','Dados salvos','البيانات المحفوظة','Gespeicherte Daten','Dati salvati','Kayıtlı veriler'],
 ['Vider','Clear','Vaciar','Limpar','مسح','Leeren','Svuota','Temizle'],
 ['Confidentialité','Privacy','Privacidad','Privacidade','الخصوصية','Datenschutz','Privacy','Gizlilik'],
 ['Ce que l\'app enregistre et envoie','What the app stores and sends','Lo que la app guarda y envía','O que o app armazena e envia','ما يحفظه التطبيق وما يرسله','Was die App speichert und sendet','Cosa l\'app salva e invia','Uygulamanın neyi kaydedip gönderdiği'],
 ['À propos','About','Acerca de','Sobre','حول','Über','Informazioni','Hakkında'],
 ['Taille du texte, langue, actualisation','Text size, language, refresh','Tamaño del texto, idioma, actualización','Tamanho do texto, idioma, atualização','حجم النص واللغة والتحديث','Textgröße, Sprache, Aktualisierung','Dimensione del testo, lingua, aggiornamento','Yazı boyutu, dil, yenileme'],
 // compte
 ['Tu utilises l\'app sans compte','You\'re using the app without an account','Estás usando la app sin cuenta','Você está usando o app sem conta','أنت تستخدم التطبيق بدون حساب','Du nutzt die App ohne Konto','Stai usando l\'app senza account','Uygulamayı hesapsız kullanıyorsun'],
 ['Se connecter','Sign in','Iniciar sesión','Entrar','تسجيل الدخول','Anmelden','Accedi','Giriş yap'],
 ['Créer un compte','Create an account','Crear una cuenta','Criar uma conta','إنشاء حساب','Konto erstellen','Crea un account','Hesap oluştur'],
 ['La connexion arrive bientôt. En attendant, tu peux choisir un pseudo ci-dessous : il reste enregistré sur cet appareil.','Sign-in is coming soon. Meanwhile, you can choose a nickname below: it stays saved on this device.','El inicio de sesión llega pronto. Mientras tanto, puedes elegir un apodo abajo: se guarda en este dispositivo.','O login chega em breve. Enquanto isso, você pode escolher um apelido abaixo: ele fica salvo neste aparelho.','تسجيل الدخول قادم قريبًا. في الأثناء يمكنك اختيار اسم مستعار أدناه، وسيبقى محفوظًا على هذا الجهاز.','Die Anmeldung kommt bald. Bis dahin kannst du unten einen Spitznamen wählen: Er bleibt auf diesem Gerät gespeichert.','L\'accesso arriverà presto. Nel frattempo puoi scegliere un soprannome qui sotto: resta salvato su questo dispositivo.','Giriş yakında geliyor. Bu arada aşağıdan bir takma ad seçebilirsin; bu cihazda kayıtlı kalır.'],
 ['Ton pseudo','Your nickname','Tu apodo','Seu apelido','اسمك المستعار','Dein Spitzname','Il tuo soprannome','Takma adın'],
 ['Enregistré uniquement sur cet appareil','Saved only on this device','Guardado solo en este dispositivo','Salvo apenas neste aparelho','محفوظ على هذا الجهاز فقط','Nur auf diesem Gerät gespeichert','Salvato solo su questo dispositivo','Yalnızca bu cihazda kayıtlı'],
 ['Enregistrer','Save','Guardar','Salvar','حفظ','Speichern','Salva','Kaydet'],
 ['Facultatif · pour retrouver tes favoris sur tous tes appareils','Optional · to find your favorites on all your devices','Opcional · para tener tus favoritos en todos tus dispositivos','Opcional · para ter seus favoritos em todos os aparelhos','اختياري · لتجد مفضلتك على كل أجهزتك','Optional · um deine Favoriten auf allen Geräten zu haben','Facoltativo · per ritrovare i preferiti su tutti i dispositivi','İsteğe bağlı · favorilerini tüm cihazlarında bulmak için'],
 ['Coup d\'Envoi','Coup d\'Envoi','Coup d\'Envoi','Coup d\'Envoi','Coup d\'Envoi','Coup d\'Envoi','Coup d\'Envoi','Coup d\'Envoi'],
 // phases
 ['Phase de groupes','Group stage','Fase de grupos','Fase de grupos','دور المجموعات','Gruppenphase','Fase a gironi','Grup aşaması'],
 ['Tour préliminaire','Preliminary round','Ronda preliminar','Rodada preliminar','الدور التمهيدي','Vorrunde','Turno preliminare','Ön eleme turu'],
 ['Huitièmes de finale','Round of 16','Octavos de final','Oitavas de final','دور الستة عشر','Achtelfinale','Ottavi di finale','Son 16 turu'],
 ['Quarts de finale','Quarter-finals','Cuartos de final','Quartas de final','ربع النهائي','Viertelfinale','Quarti di finale','Çeyrek final'],
 ['Demi-finales','Semi-finals','Semifinales','Semifinais','نصف النهائي','Halbfinale','Semifinali','Yarı final'],
 ['Match pour la 3e place','Third-place match','Partido por el tercer puesto','Disputa do 3º lugar','مباراة المركز الثالث','Spiel um Platz 3','Finale per il 3º posto','3.lük maçı'],
 ['Finale','Final','Final','Final','النهائي','Finale','Finale','Final'],
 ['Barrages','Play-offs','Play-offs','Play-offs','الملحق','Play-offs','Playoff','Play-off'],
 ['Éliminatoires','Qualifiers','Eliminatorias','Eliminatórias','التصفيات','Qualifikation','Qualificazioni','Eleme maçları'],
 // listes
 ['nul','draw','empate','empate','تعادل','Remis','pareggio','beraberlik'],
 ['nuls','draws','empates','empates','تعادلات','Remis','pareggi','beraberlik'],
 ['J','P','PJ','J','ل','Sp','G','O'],
 ['V','W','G','V','ف','S','V','G'],
 ['N','D','E','E','ت','U','N','B'],
 ['D','L','P','D','خ','N','P','M'],
 ['Mi-temps','Half-time','Descanso','Intervalo','استراحة','Halbzeit','Intervallo','Devre arası'],
 ['🟨 carton · ↓ remplacé','🟨 card · ↓ substituted','🟨 tarjeta · ↓ sustituido','🟨 cartão · ↓ substituído','🟨 بطاقة · ↓ استُبدل','🟨 Karte · ↓ ausgewechselt','🟨 cartellino · ↓ sostituito','🟨 kart · ↓ oyundan çıktı'],
 ['à l\'instant','just now','ahora mismo','agora mesmo','الآن','gerade eben','proprio ora','az önce'],
 ['actualisation en cours…','refreshing…','actualizando…','atualizando…','جارٍ التحديث…','wird aktualisiert …','aggiornamento in corso…','yenileniyor…']
];

const DICT = {};
COLS.forEach(c => DICT[c] = Object.create(null));
ROWS.forEach(r => COLS.forEach((c, i) => { DICT[c][r[0]] = r[i + 1]; }));

// Phrases construites avec des nombres ou des noms : { fr: regex, par langue: modèle avec {1} {2} {3} }
// Les pluriels : modèle [singulier, pluriel]
const PATS = [
 { re:/^Journée (\d+)$/, en:'Matchday {1}', es:'Jornada {1}', pt:'Rodada {1}', ar:'الجولة {1}', de:'Spieltag {1}', it:'Giornata {1}', tr:'{1}. hafta' },
 { re:/^Phase de groupes · journée (\d+)$/, en:'Group stage · matchday {1}', es:'Fase de grupos · jornada {1}', pt:'Fase de grupos · rodada {1}', ar:'دور المجموعات · الجولة {1}', de:'Gruppenphase · Spieltag {1}', it:'Fase a gironi · giornata {1}', tr:'Grup aşaması · {1}. hafta' },
 { re:/^Tour de qualification (\d+)$/, en:'Qualifying round {1}', es:'Ronda de clasificación {1}', pt:'Fase de qualificação {1}', ar:'دور التأهل {1}', de:'Qualifikationsrunde {1}', it:'Turno di qualificazione {1}', tr:'{1}. eleme turu' },
 { re:/^Arbitre : (.+)$/, en:'Referee: {1}', es:'Árbitro: {1}', pt:'Árbitro: {1}', ar:'الحكم: {1}', de:'Schiedsrichter: {1}', it:'Arbitro: {1}', tr:'Hakem: {1}' },
 { re:/^Saison (.+)$/, en:'Season {1}', es:'Temporada {1}', pt:'Temporada {1}', ar:'موسم {1}', de:'Saison {1}', it:'Stagione {1}', tr:'Sezon {1}' },
 { re:/^Mi-temps · (.+)$/, en:'Half-time · {1}', es:'Descanso · {1}', pt:'Intervalo · {1}', ar:'استراحة · {1}', de:'Halbzeit · {1}', it:'Intervallo · {1}', tr:'Devre arası · {1}' },
 { re:/^Fin du match · (.+)$/, en:'Full time · {1}', es:'Final del partido · {1}', pt:'Fim de jogo · {1}', ar:'نهاية المباراة · {1}', de:'Spielende · {1}', it:'Fine partita · {1}', tr:'Maç sonu · {1}' },
 { re:/^Aucun match de (.+) ce jour-là\.$/, en:'No {1} matches that day.', es:'No hay partidos de {1} ese día.', pt:'Nenhum jogo de {1} nesse dia.', ar:'لا توجد مباريات {1} في ذلك اليوم.', de:'Keine {1}-Spiele an diesem Tag.', it:'Nessuna partita di {1} quel giorno.', tr:'O gün {1} maçı yok.' },
 { re:/^Dernière mise à jour : (.+) · /, en:'Last updated: {1} · ', es:'Última actualización: {1} · ', pt:'Última atualização: {1} · ', ar:'آخر تحديث: {1} · ', de:'Zuletzt aktualisiert: {1} · ', it:'Ultimo aggiornamento: {1} · ', tr:'Son güncelleme: {1} · ', keep:true },
 { re:/^· N° (\d+)$/, en:'· No. {1}', es:'· N.º {1}', pt:'· N.º {1}', ar:'· رقم {1}', de:'· Nr. {1}', it:'· N. {1}', tr:'· No. {1}' },
 { re:/^N° (\d+)$/, en:'No. {1}', es:'N.º {1}', pt:'N.º {1}', ar:'رقم {1}', de:'Nr. {1}', it:'N. {1}', tr:'No. {1}' },
 { re:/^(\d+) ans$/, en:'{1} years old', es:'{1} años', pt:'{1} anos', ar:'{1} سنة', de:'{1} Jahre', it:'{1} anni', tr:'{1} yaşında' },
 { re:/^Né le (.+)$/, en:'Born {1}', es:'Nacido el {1}', pt:'Nascido em {1}', ar:'وُلد في {1}', de:'Geboren am {1}', it:'Nato il {1}', tr:'Doğum: {1}' },
 { re:/^(\d+) confrontations? · buts (\d+)-(\d+)$/, one:{ en:'{1} meeting · goals {2}-{3}', es:'{1} enfrentamiento · goles {2}-{3}', pt:'{1} confronto · gols {2}-{3}', ar:'{1} مواجهة · الأهداف {2}-{3}', de:'{1} Begegnung · Tore {2}-{3}', it:'{1} scontro · gol {2}-{3}', tr:'{1} karşılaşma · goller {2}-{3}' }, many:{ en:'{1} meetings · goals {2}-{3}', es:'{1} enfrentamientos · goles {2}-{3}', pt:'{1} confrontos · gols {2}-{3}', ar:'{1} مواجهات · الأهداف {2}-{3}', de:'{1} Begegnungen · Tore {2}-{3}', it:'{1} scontri · gol {2}-{3}', tr:'{1} karşılaşma · goller {2}-{3}' } },
 { re:/^victoires? (.+)$/, fn:(m, L) => {
     const pl = /^victoires/.test(m[0]);
     const T = { en:['wins','wins'], es:['victorias de','victorias de'], pt:['vitórias do','vitórias do'], ar:['فوز','فوز'], de:['Siege','Siege'], it:['vittorie','vittorie'], tr:['galibiyet','galibiyet'] }[L];
     return L === 'en' ? `${m[1]} ${pl ? 'wins' : 'win'}` : L === 'es' ? `${pl ? 'victorias' : 'victoria'} ${m[1]}` : L === 'pt' ? `${pl ? 'vitórias' : 'vitória'} ${m[1]}` : L === 'ar' ? `${pl ? 'انتصارات' : 'فوز'} ${m[1]}` : L === 'de' ? `${pl ? 'Siege' : 'Sieg'} ${m[1]}` : L === 'it' ? `${pl ? 'vittorie' : 'vittoria'} ${m[1]}` : `${m[1]} ${T[0]}`; } },
 { re:/^Données reçues : (\d+) buts?(?: · | · )(\d+) cartons?(?: · | · )(\d+) remplacements? · compositions (oui|non) · statistiques (oui|non)$/, fn:(m, L) => {
     const T = { en:['goal','goals','card','cards','substitution','substitutions','lineups','statistics','yes','no','Data received'], es:['gol','goles','tarjeta','tarjetas','sustitución','sustituciones','alineaciones','estadísticas','sí','no','Datos recibidos'], pt:['gol','gols','cartão','cartões','substituição','substituições','escalações','estatísticas','sim','não','Dados recebidos'], ar:['هدف','أهداف','بطاقة','بطاقات','تبديل','تبديلات','التشكيلات','الإحصائيات','نعم','لا','البيانات المستلمة'], de:['Tor','Tore','Karte','Karten','Wechsel','Wechsel','Aufstellungen','Statistiken','ja','nein','Empfangene Daten'], it:['gol','gol','cartellino','cartellini','sostituzione','sostituzioni','formazioni','statistiche','sì','no','Dati ricevuti'], tr:['gol','gol','kart','kart','değişiklik','değişiklik','kadrolar','istatistikler','evet','hayır','Alınan veriler'] }[L];
     const n = (v, i) => v + ' ' + T[v === '1' ? i : i + 1];
     const yn = x => x === 'oui' ? T[8] : T[9];
     return `${T[10]}: ${n(m[1],0)} · ${n(m[2],2)} · ${n(m[3],4)} · ${T[6]} ${yn(m[4])} · ${T[7]} ${yn(m[5])}`; } },
 { re:/^Copie pour le mode hors connexion · (\d+) éléments?$/, one:{ en:'Copy for offline mode · {1} item', es:'Copia para el modo sin conexión · {1} elemento', pt:'Cópia para o modo offline · {1} item', ar:'نسخة للعمل دون اتصال · {1} عنصر', de:'Kopie für den Offline-Modus · {1} Element', it:'Copia per la modalità offline · {1} elemento', tr:'Çevrimdışı mod kopyası · {1} öğe' }, many:{ en:'Copy for offline mode · {1} items', es:'Copia para el modo sin conexión · {1} elementos', pt:'Cópia para o modo offline · {1} itens', ar:'نسخة للعمل دون اتصال · {1} عناصر', de:'Kopie für den Offline-Modus · {1} Elemente', it:'Copia per la modalità offline · {1} elementi', tr:'Çevrimdışı mod kopyası · {1} öğe' } },
 { re:/^(?:Recherche du (.+) au (.+)\. )?Elle est peut-être en pause ou hors saison\.$/, fn:(m, L) => {
     const T = { en:['Searched from {1} to {2}. ','It may be on a break or out of season.'], es:['Búsqueda del {1} al {2}. ','Puede estar en pausa o fuera de temporada.'], pt:['Busca de {1} a {2}. ','Pode estar em pausa ou fora de temporada.'], ar:['البحث من {1} إلى {2}. ','ربما هي في استراحة أو خارج الموسم.'], de:['Gesucht vom {1} bis {2}. ','Möglicherweise Pause oder spielfreie Zeit.'], it:['Ricerca dal {1} al {2}. ','Potrebbe essere in pausa o fuori stagione.'], tr:['{1} – {2} arası arandı. ','Ara vermiş veya sezon dışı olabilir.'] }[L];
     return (m[1] ? T[0].replace('{1}', m[1]).replace('{2}', m[2]) : '') + T[1]; } },
 { re:/^Le serveur prépare la recherche de joueurs et de clubs \((\d+)\/(\d+)\)\. Réessaie dans un instant\.$/, en:'The server is preparing player and club search ({1}/{2}). Try again in a moment.', es:'El servidor está preparando la búsqueda de jugadores y clubes ({1}/{2}). Inténtalo en un momento.', pt:'O servidor está preparando a busca de jogadores e clubes ({1}/{2}). Tente em instantes.', ar:'الخادم يجهّز البحث عن اللاعبين والأندية ({1}/{2}). حاول بعد قليل.', de:'Der Server bereitet die Spieler- und Vereinssuche vor ({1}/{2}). Versuche es gleich noch einmal.', it:'Il server sta preparando la ricerca di giocatori e club ({1}/{2}). Riprova tra un attimo.', tr:'Sunucu oyuncu ve kulüp aramasını hazırlıyor ({1}/{2}). Birazdan tekrar dene.' },
 { re:/^Aucune compétition ne correspond à « (.*) »\.$/, en:'No competition matches “{1}”.', es:'Ninguna competición coincide con «{1}».', pt:'Nenhuma competição corresponde a “{1}”.', ar:'لا توجد بطولة مطابقة لـ «{1}».', de:'Kein Wettbewerb passt zu „{1}“.', it:'Nessuna competizione corrisponde a «{1}».', tr:'«{1}» ile eşleşen turnuva yok.' },
 { re:/^La liste contient toutes les compétitions incluses dans ton abonnement de données \((\d+) au total\)\.$/, en:'The list contains all competitions included in your data plan ({1} in total).', es:'La lista contiene todas las competiciones incluidas en tu suscripción de datos ({1} en total).', pt:'A lista contém todas as competições incluídas na sua assinatura de dados ({1} no total).', ar:'تحتوي القائمة على كل البطولات المشمولة في اشتراك البيانات ({1} في المجموع).', de:'Die Liste enthält alle in deinem Datenabo enthaltenen Wettbewerbe (insgesamt {1}).', it:'L\'elenco contiene tutte le competizioni incluse nel tuo abbonamento dati ({1} in totale).', tr:'Liste, veri aboneliğine dahil tüm turnuvaları içerir (toplam {1}).' },
 { re:/^(\d+) compétitions?( disponibles?)?$/, fn:(m, L) => {
     const T = { en:['competition','competitions','available'], es:['competición','competiciones','disponibles'], pt:['competição','competições','disponíveis'], ar:['بطولة','بطولات','متاحة'], de:['Wettbewerb','Wettbewerbe','verfügbar'], it:['competizione','competizioni','disponibili'], tr:['turnuva','turnuva','mevcut'] }[L];
     return `${m[1]} ${m[1] === '1' ? T[0] : T[1]}${m[2] ? ' ' + T[2] : ''}`; } },
 { re:/^Aucun match trouvé pour tes favoris entre le (.+) et le (.+)\.$/, en:'No matches found for your favorites between {1} and {2}.', es:'No se encontraron partidos de tus favoritos entre {1} y {2}.', pt:'Nenhum jogo encontrado para seus favoritos entre {1} e {2}.', ar:'لم يتم العثور على مباريات لمفضلتك بين {1} و{2}.', de:'Keine Spiele für deine Favoriten zwischen {1} und {2} gefunden.', it:'Nessuna partita trovata per i tuoi preferiti tra {1} e {2}.', tr:'Favorilerin için {1} ile {2} arasında maç bulunamadı.' },
 { re:/^(\d+) équipes? n'(?:ont|a) pas pu être chargées?\. Rouvre la page pour réessayer\.$/, en:'{1} team(s) couldn\'t be loaded. Reopen the page to try again.', es:'No se pudieron cargar {1} equipo(s). Vuelve a abrir la página para reintentar.', pt:'{1} equipe(s) não puderam ser carregadas. Reabra a página para tentar novamente.', ar:'تعذّر تحميل {1} فريق. أعد فتح الصفحة للمحاولة مجددًا.', de:'{1} Team(s) konnten nicht geladen werden. Öffne die Seite erneut, um es noch einmal zu versuchen.', it:'Impossibile caricare {1} squadra/e. Riapri la pagina per riprovare.', tr:'{1} takım yüklenemedi. Tekrar denemek için sayfayı yeniden aç.' },
 { re:/^· (\d+)\/(\d+)$/, skip:true }
];

/* ---- état ---- */
let lang = 'fr';
const meta = c => LANGS.find(l => l.code === c) || LANGS[0];
function detect(){
  const n = String((navigator.languages && navigator.languages[0]) || navigator.language || 'fr').slice(0, 2).toLowerCase();
  return LANGS.some(l => l.code === n) ? n : 'fr';
}
function fill(tpl, m){ return tpl.replace(/\{(\d)\}/g, (_, i) => m[+i] == null ? '' : m[+i]); }

function tr(text){
  if (lang === 'fr' || !text) return text;
  const t = String(text), trimmed = t.trim();
  if (!trimmed) return t;
  const d = DICT[lang];
  const lead = t.slice(0, t.indexOf(trimmed)), trail = t.slice(t.indexOf(trimmed) + trimmed.length);
  if (d[trimmed] !== undefined) return lead + d[trimmed] + trail;
  for (const p of PATS){
    if (p.skip) continue;
    const m = trimmed.match(p.re);
    if (!m) continue;
    let out;
    if (p.fn) out = p.fn(m, lang);
    else if (p.one){ const n = Number(m[1]); out = fill((n === 1 ? p.one : p.many)[lang], m); }
    else out = fill(p[lang], m);
    if (p.keep) out = out + trimmed.slice(m[0].length);
    return lead + out + trail;
  }
  return t;
}

/* ---- parcours de la page ---- */
const SKIP = new Set(['SCRIPT','STYLE','TEXTAREA','INPUT','CODE']);
const ATTRS = ['placeholder','aria-label','title'];
let obs = null, queued = false, pending = new Set();
const done = new WeakSet();   // textes déjà traduits (évite de traduire deux fois « N » → « D » → « L »)
function walk(root){
  if (!root) return;
  if (root.nodeType === 3){ if (done.has(root)) return; const v = root.nodeValue, n = tr(v); if (n !== v){ root.nodeValue = n; done.add(root); } return; }
  if (root.nodeType !== 1 || SKIP.has(root.tagName)) { if (root.nodeType === 1 && root.tagName === 'INPUT') attrs(root); return; }
  if (root.hasAttribute && root.hasAttribute('data-notr')) return;
  attrs(root);
  // l'élément marqué data-tx porte tout un paragraphe (avec du gras) : traduction du bloc entier
  if (root.dataset && root.dataset.tx){ const h = BLOCKS[root.dataset.tx] && BLOCKS[root.dataset.tx][lang]; if (h && root.dataset.txDone !== lang){ root.innerHTML = h; root.dataset.txDone = lang; } return; }
  for (let c = root.firstChild; c; c = c.nextSibling) walk(c);
}
function attrs(el){
  if (!el.getAttribute) return;
  for (const a of ATTRS){ const v = el.getAttribute(a); if (v){ const n = tr(v); if (n !== v) el.setAttribute(a, n); } }
}
const BLOCKS = {
  acc_intro:{
    en:'An account is <b>optional</b>: it lets you find your favorites and settings on all your devices. Everything else works fine without one.',
    es:'Una cuenta es <b>opcional</b>: sirve para tener tus favoritos y ajustes en todos tus dispositivos. Todo lo demás funciona muy bien sin cuenta.',
    pt:'Uma conta é <b>opcional</b>: serve para ter seus favoritos e configurações em todos os aparelhos. Todo o resto funciona muito bem sem conta.',
    ar:'الحساب <b>اختياري</b>: يفيد في استعادة مفضلتك وإعداداتك على كل أجهزتك. وكل شيء آخر يعمل جيدًا بدونه.',
    de:'Ein Konto ist <b>optional</b>: Damit findest du deine Favoriten und Einstellungen auf allen Geräten. Alles andere funktioniert auch ohne Konto.',
    it:'Un account è <b>facoltativo</b>: serve a ritrovare preferiti e impostazioni su tutti i dispositivi. Tutto il resto funziona benissimo senza account.',
    tr:'Hesap <b>isteğe bağlıdır</b>: favorilerini ve ayarlarını tüm cihazlarında bulmanı sağlar. Geri kalan her şey hesapsız da çok iyi çalışır.'
  }
};
function flush(){
  queued = false;
  if (lang === 'fr') { pending.clear(); return; }
  const nodes = [...pending]; pending.clear();
  if (obs) obs.disconnect();
  try { nodes.forEach(n => { if (document.contains(n)) walk(n); }); } catch(e) {}
  start();
}
function schedule(n){ pending.add(n); if (!queued){ queued = true; (window.requestAnimationFrame || setTimeout)(flush); } }
function start(){
  if (!obs || lang === 'fr') return;
  obs.observe(document.body, { childList:true, subtree:true, characterData:true, attributes:true, attributeFilter:ATTRS });
}
function setLang(code){
  lang = LANGS.some(l => l.code === code) ? code : 'fr';
  const m = meta(lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = m.rtl ? 'rtl' : 'ltr';
  if (obs){ obs.disconnect(); }
  if (lang !== 'fr'){
    obs = new MutationObserver(list => {
      for (const r of list){
        if (r.type === 'childList') r.addedNodes.forEach(n => schedule(n));
        else if (r.type === 'characterData'){ done.delete(r.target); schedule(r.target); }
        else if (r.type === 'attributes') schedule(r.target);
      }
    });
    walk(document.body);
    start();
  }
}

/* ---- aides pour l'application ---- */
let regionNames = null, regionMap = null;
function regionName(englishName){
  if (lang === 'fr' || !englishName || typeof Intl === 'undefined' || !Intl.DisplayNames) return null;
  try {
    if (!regionMap){
      const en = new Intl.DisplayNames(['en'], { type:'region' });
      regionMap = {};
      for (let a = 65; a <= 90; a++) for (let b = 65; b <= 90; b++){
        const code = String.fromCharCode(a, b);
        let n; try { n = en.of(code); } catch(e) { continue; }
        if (n && n !== code) regionMap[n.toLowerCase()] = code;
      }
      Object.assign(regionMap, { 'usa':'US','united states':'US','czech republic':'CZ','ivory coast':'CI',"cote d'ivoire":'CI','south korea':'KR','north korea':'KP','bosnia & herzegovina':'BA','bosnia and herzegovina':'BA','bosnia-herzegovina':'BA','turkey':'TR','türkiye':'TR','england':'GB-ENG','dr congo':'CD','cape verde':'CV','cape verde islands':'CV','republic of ireland':'IE','saudi-arabia':'SA','south-africa':'ZA','uae':'AE','curacao':'CW','russia':'RU','iran':'IR','syria':'SY','macedonia':'MK','north macedonia':'MK','eswatini':'SZ','swaziland':'SZ' });
    }
    const key = String(englishName).toLowerCase();
    const code = regionMap[key];
    if (!code) return null;
    if (code === 'GB-ENG') return ENG[lang] || null;
    if (!regionNames || regionNames.lang !== lang) regionNames = { lang, dn:new Intl.DisplayNames([meta(lang).locale.replace(/-u-.*/, '')], { type:'region' }) };
    return regionNames.dn.of(code) || null;
  } catch(e) { return null; }
}
const ENG = { en:'England', es:'Inglaterra', pt:'Inglaterra', ar:'إنجلترا', de:'England', it:'Inghilterra', tr:'İngiltere' };
const SUB = { Scotland:{ en:'Scotland', es:'Escocia', pt:'Escócia', ar:'اسكتلندا', de:'Schottland', it:'Scozia', tr:'İskoçya' }, Wales:{ en:'Wales', es:'Gales', pt:'País de Gales', ar:'ويلز', de:'Wales', it:'Galles', tr:'Galler' }, 'Northern Ireland':{ en:'Northern Ireland', es:'Irlanda del Norte', pt:'Irlanda do Norte', ar:'أيرلندا الشمالية', de:'Nordirland', it:'Irlanda del Nord', tr:'Kuzey İrlanda' } };
function country(name){
  if (lang === 'fr') return null;
  if (SUB[name]) return SUB[name][lang];
  return regionName(name);
}
const ROUNDS = {
  en:{ g:'Group stage · matchday $1', gs:'Group stage', r:'Matchday $1', pre:'Preliminary round', r16:'Round of 16', qf:'Quarter-finals', sf:'Semi-finals', third:'Third-place match', f:'Final', q:'Qualifying round $1', po:'Play-offs' },
  es:{ g:'Fase de grupos · jornada $1', gs:'Fase de grupos', r:'Jornada $1', pre:'Ronda preliminar', r16:'Octavos de final', qf:'Cuartos de final', sf:'Semifinales', third:'Partido por el tercer puesto', f:'Final', q:'Ronda de clasificación $1', po:'Play-offs' },
  pt:{ g:'Fase de grupos · rodada $1', gs:'Fase de grupos', r:'Rodada $1', pre:'Rodada preliminar', r16:'Oitavas de final', qf:'Quartas de final', sf:'Semifinais', third:'Disputa do 3º lugar', f:'Final', q:'Fase de qualificação $1', po:'Play-offs' },
  ar:{ g:'دور المجموعات · الجولة $1', gs:'دور المجموعات', r:'الجولة $1', pre:'الدور التمهيدي', r16:'دور الستة عشر', qf:'ربع النهائي', sf:'نصف النهائي', third:'مباراة المركز الثالث', f:'النهائي', q:'دور التأهل $1', po:'الملحق' },
  de:{ g:'Gruppenphase · Spieltag $1', gs:'Gruppenphase', r:'Spieltag $1', pre:'Vorrunde', r16:'Achtelfinale', qf:'Viertelfinale', sf:'Halbfinale', third:'Spiel um Platz 3', f:'Finale', q:'Qualifikationsrunde $1', po:'Play-offs' },
  it:{ g:'Fase a gironi · giornata $1', gs:'Fase a gironi', r:'Giornata $1', pre:'Turno preliminare', r16:'Ottavi di finale', qf:'Quarti di finale', sf:'Semifinali', third:'Finale per il 3º posto', f:'Finale', q:'Turno di qualificazione $1', po:'Playoff' },
  tr:{ g:'Grup aşaması · $1. hafta', gs:'Grup aşaması', r:'$1. hafta', pre:'Ön eleme turu', r16:'Son 16 turu', qf:'Çeyrek final', sf:'Yarı final', third:'3.lük maçı', f:'Final', q:'$1. eleme turu', po:'Play-off' }
};
function round(t){
  const R = ROUNDS[lang]; if (!R) return null;
  return String(t)
    .replace(/^Group Stage - (\d+)$/i, R.g).replace(/^Regular Season - (\d+)$/i, R.r)
    .replace(/Group Stage/i, R.gs).replace(/Preliminary Round/i, R.pre).replace(/Round of 16/i, R.r16)
    .replace(/Quarter-?finals?/i, R.qf).replace(/Semi-?finals?/i, R.sf).replace(/3rd Place Final/i, R.third)
    .replace(/^Final$/i, R.f).replace(/(\d+)(?:st|nd|rd|th) Qualifying Round/i, R.q).replace(/Play-?offs?/i, R.po);
}
function dayLabel(date){
  if (lang === 'fr') return null;
  try {
    const f = new Intl.DateTimeFormat(meta(lang).locale, { weekday:'short', day:'numeric', month:'short' });
    return f.format(date).replace(/[,،]/g, '').toLocaleUpperCase(meta(lang).locale.replace(/-u-.*/, ''));
  } catch(e) { return null; }
}
function birth(date){
  if (lang === 'fr') return null;
  try { return new Intl.DateTimeFormat(meta(lang).locale, { day:'numeric', month:'long', year:'numeric' }).format(date); } catch(e) { return null; }
}
function ago(ts){
  if (lang === 'fr') return null;
  try {
    const rtf = new Intl.RelativeTimeFormat(meta(lang).locale, { numeric:'auto' });
    const m = Math.max(1, Math.round((Date.now() - ts) / 60000));
    if (m < 60) return rtf.format(-m, 'minute');
    const h = Math.round(m / 60); if (h < 24) return rtf.format(-h, 'hour');
    return rtf.format(-Math.round(h / 24), 'day');
  } catch(e) { return null; }
}

window.I18N = { LANGS, detect, setLang, tr, country, round, dayLabel, birth, ago,
  get lang(){ return lang; }, get locale(){ return meta(lang).locale; } };
})();
