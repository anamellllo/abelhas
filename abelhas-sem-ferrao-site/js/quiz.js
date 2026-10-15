(function(){
  var Q=[
   {q:"A que tribo pertencem as abelhas sem ferrão?",o:["Meliponini","Apis","Bombini","Trigonini"],a:0,e:"As abelhas sem ferrão pertencem à tribo Meliponini e são muito abundantes no Brasil."},
   {q:"Aproximadamente quantas espécies de abelhas sem ferrão existem no Brasil?",o:["Cerca de 30","Cerca de 100","Cerca de 300","Mais de 3.000"],a:2,e:"O artigo cita aproximadamente 300 espécies no Brasil, de grande importância para os ecossistemas."},
   {q:"Por que elas são chamadas de “sem ferrão”?",o:["Nunca picam nem mordem","Têm o ferrão atrofiado, incapaz de ferroar","Só as operárias perderam o ferrão","O ferrão cai no inverno"],a:1,e:"O ferrão é atrofiado. Para se defender, usam mordidas e substâncias produzidas pela colônia."},
   {q:"Qual abelha tem nome indígena que significa “vigia bonito”?",o:["Jataí","Uruçu","Mandaçaia","Iraí"],a:2,e:"Mandaçaia (Melipona quadrifasciata): robusta, escura com listras amarelas, nativa da Mata Atlântica."},
   {q:"O que significa “uru-çu”, nome do tupi da abelha uruçu?",o:["Abelha pequena","Abelha grande","Abelha do mel","Abelha da mata"],a:1,e:"Uruçu vem do tupi “uru-çu”, que significa “abelha grande”."},
   {q:"O que acontece com a rainha após a fecundação (fisogastria)?",o:["Troca de colônia","Seu abdômen se expande e ela perde a capacidade de voar","Torna-se operária","Passa a coletar néctar"],a:1,e:"O abdômen se expande tanto que ela fica restrita à área de postura do ninho pelo resto da vida."},
   {q:"O que é a polinização?",o:["A produção de mel pelas abelhas","A transferência de grãos de pólen entre estruturas reprodutivas das plantas","A construção do ninho","A coleta de resina"],a:1,e:"É a transferência de pólen que possibilita a formação de frutos e sementes."},
   {q:"Segundo o artigo, o rendimento do café pode aumentar em até quanto com meliponíneos?",o:["5%","10%","30%","80%"],a:2,e:"O rendimento dos grãos de café pode aumentar em até 30% com a presença de meliponíneos."},
   {q:"Qual foi o valor estimado do serviço de polinização para a produção de alimentos no Brasil em 2018?",o:["R$ 4,3 milhões","R$ 43 milhões","R$ 4,3 bilhões","R$ 43 bilhões"],a:3,e:"Cerca de R$ 43 bilhões, segundo o relatório da BPBES e da REBIPP. É uma estimativa, não um valor exato."},
   {q:"Qual destas NÃO é citada no artigo como ameaça às abelhas sem ferrão?",o:["Desmatamento","Queimadas","Agrotóxicos","Excesso de flores nativas"],a:3,e:"As cinco ameaças são desmatamento, agrotóxicos, urbanização, queimadas e mudanças climáticas."},
   {q:"Quais são as quatro categorias de serviços ecossistêmicos?",o:["Provisão, regulação, suporte e culturais","Água, ar, solo e fogo","Produção, venda, consumo e descarte","Nativos, exóticos, urbanos e rurais"],a:0,e:"A polinização está inserida principalmente entre os serviços de regulação e suporte."},
   {q:"Na pesquisa com 30 participantes, quantos disseram conhecer as abelhas sem ferrão?",o:["12 pessoas (40%)","18 pessoas (60%)","9 pessoas (30%)","21 pessoas (70%)"],a:0,e:"12 conheciam (40%) e 18 (60%) não. Só 9 pessoas (30%) reconheceram a importância das abelhas para os alimentos."}
  ];
  var RANKS=[
   {min:0,i:"🥚",n:"Ovinho curioso",m:"Todo mundo começa em algum lugar. Leia o artigo e tente de novo!"},
   {min:400,i:"🐛",n:"Larva em formação",m:"Você já aprendeu bastante. Falta pouco para sair do ninho."},
   {min:800,i:"🐝",n:"Operária dedicada",m:"Ótimo desempenho! Você conhece bem o mundo das abelhas sem ferrão."},
   {min:1200,i:"👑",n:"Abelha-rainha",m:"Excelente! Você domina o assunto. Que tal compartilhar o que aprendeu?"}
  ];
  var $=function(i){return document.getElementById(i)};
  var st,order;
  function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
  function getBest(){try{return +localStorage.getItem('abelhas_best')||0}catch(e){return 0}}
  function setBest(v){try{localStorage.setItem('abelhas_best',v)}catch(e){}}
  function showBest(){var b=getBest();$('best').textContent=b?'🏆 Seu recorde: '+b+' pontos':''}
  function show(id){['start','game','end'].forEach(function(x){$(x).classList.toggle('hidden',x!==id)})}
  function start(){st={i:0,s:0,c:0,max:0,ok:0};order=Q.map(function(q){return {q:q.q,e:q.e,o:shuffle(q.o.map(function(t,k){return {t:t,r:k===q.a}}))}});order=shuffle(order);show('game');render()}
  function hud(){$('hq').textContent='Pergunta '+(st.i+1)+'/'+Q.length;$('hs').textContent=st.s;$('hc').textContent='🔥 Combo x'+st.c;$('hc').className='pill'+(st.c>1?' hot':'');$('pb').style.width=(st.i/Q.length*100)+'%'}
  function render(){
    var q=order[st.i];hud();$('qt').textContent=q.q;$('fb').className='fb';$('nx').classList.remove('show');
    var box=$('opts');box.innerHTML='';
    q.o.forEach(function(op,k){var b=document.createElement('button');b.className='opt';b.innerHTML='<b>'+'ABCD'[k]+'</b><span></span>';b.lastChild.textContent=op.t;b.onclick=function(){answer(k)};box.appendChild(b)});
  }
  function answer(k){
    var q=order[st.i],btns=$('opts').children,ok=q.o[k].r,fb=$('fb');
    for(var j=0;j<btns.length;j++){btns[j].disabled=true;if(q.o[j].r)btns[j].classList.add('right')}
    if(ok){st.c++;st.ok++;st.max=Math.max(st.max,st.c);var bonus=Math.min((st.c-1)*25,100);st.s+=100+bonus;
      fb.className='fb show ok';fb.innerHTML='<strong>✅ Correto! +'+(100+bonus)+' pts'+(bonus?' (bônus de combo +'+bonus+')':'')+'</strong>'}
    else{btns[k].classList.add('wrong');st.c=0;fb.className='fb show no';fb.innerHTML='<strong>❌ Quase! O combo foi zerado.</strong>'}
    var p=document.createElement('span');p.textContent=q.e;fb.appendChild(p);
    $('hs').textContent=st.s;$('hc').textContent='🔥 Combo x'+st.c;$('hc').className='pill'+(st.c>1?' hot':'');
    $('nx').textContent=st.i===Q.length-1?'Ver resultado 🏁':'Próxima';$('nx').classList.add('show');
  }
  function finish(){
    $('pb').style.width='100%';
    var r=RANKS[0];RANKS.forEach(function(x){if(st.s>=x.min)r=x});
    var prev=getBest(),rec=st.s>prev;if(rec)setBest(st.s);
    $('rIco').textContent=r.i;$('rName').textContent=r.n;$('rScore').textContent=st.s+' pts';
    $('rInfo').textContent=st.ok+' de '+Q.length+' acertos · maior combo: x'+st.max+(rec&&prev?' · 🏆 novo recorde!':'');
    $('rMsg').textContent=r.m;
    var B=[{i:"🌼",n:"Primeiro voo",d:"Acertou ao menos 1",g:st.ok>=1},{i:"🔥",n:"Combo 5",d:"5 acertos seguidos",g:st.max>=5},{i:"🍯",n:"Mel em dobro",d:"Mais de 800 pts",g:st.s>800},{i:"🌟",n:"Colmeia perfeita",d:"12 de 12",g:st.ok===Q.length}];
    $('badges').innerHTML='';B.forEach(function(b){var d=document.createElement('div');d.className='badge'+(b.g?' got pop':'');d.innerHTML='<span>'+b.i+'</span><div><b>'+b.n+'</b><br>'+b.d+'</div>';$('badges').appendChild(d)});
    show('end');window.scrollTo({top:0,behavior:'smooth'});
  }
  $('go').onclick=start;$('again').onclick=start;
  $('nx').onclick=function(){if(st.i===Q.length-1){finish()}else{st.i++;render()}};
  showBest();
})();
