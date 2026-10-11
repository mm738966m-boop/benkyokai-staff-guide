/* お金の勉強会 申込フォーム：見た目の調整と「満席」表示（UTAGE フォーム設定 > bodyタグの最後に挿入するJavaScript） */
(function(){
var HOURS=[9,10,11,12,13,14,15,16,17,18,19,20,21],WINDOW_DAYS=8;
var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@500;700;900&display=swap';document.head.appendChild(l);
var css=''
+'body{background:#EEF6F7!important;font-family:"Zen Maru Gothic","Hiragino Maru Gothic ProN","Hiragino Sans",sans-serif!important;font-size:17px;font-weight:500;color:#1C3236;line-height:1.8}'
+'#app .card{border:0;border-radius:22px;box-shadow:0 6px 24px rgba(10,90,98,.10);overflow:hidden}'
+'#app .card-header{border-bottom:4px solid #D9A441;padding:22px 20px}'
+'#app .card-header h2{font-size:clamp(19px,5.3vw,24px);font-weight:900;color:#0A5A62;line-height:1.5;word-break:auto-phrase;text-wrap:balance}'
+'#app .card-body{padding:22px 18px}'
+'#app h4{font-size:21px;font-weight:900;color:#1C3236;margin-top:26px}'
+'#app hr{border-top:2px solid #D5E4E6}'
+'#app .calendar-head{color:#0A5A62;font-weight:900!important}'
+'#app .schedule .btn-outline-secondary{border:2px solid #0E7C86;color:#0E7C86;border-radius:999px;font-weight:700;padding:4px 14px;background:#fff}'
+'#app .calendar-day-of-week-week{background:#0E7C86!important;border-radius:12px 12px 0 0;overflow:hidden}'
+'#app .calendar-day-of-week-day{background:#0E7C86!important;color:#fff!important;font-weight:700;padding:4px 0}'
+'#app .calendar-day{min-height:62px;font-size:17px}'
+'#app .calendar-day-nothing{background:#F1F5F5!important;color:#9DB0B3!important}'
+'#app .calendar-day-selectable{background:#fff;cursor:pointer;color:#0E7C86}'
+'#app .calendar-day-selectable .mb-1{font-weight:900;font-size:18px;color:#0E7C86}'
+'#app .calendar-day.selected-day{background:#FBF4E3!important;box-shadow:inset 0 0 0 3px #D9A441;border-color:transparent!important}'
+'#app .calendar-day[data-fx="full"]::after{content:"満席";display:block;font-size:13.5px;font-weight:700;color:#8A9A9C}'
+'#app .schedule ul.list-group{display:none!important}'
+'#fx-slots{display:grid;grid-template-columns:1fr;gap:10px;margin:10px 0 6px}'
+'@media(min-width:560px){#fx-slots{grid-template-columns:1fr 1fr}}'
+'.fx-slot{display:flex;justify-content:space-between;align-items:center;gap:10px;width:100%;min-height:56px;padding:8px 16px;border-radius:14px;font:inherit;font-weight:900;font-size:18px;font-variant-numeric:tabular-nums;text-align:left}'
+'.fx-slot span{font-size:14px;font-weight:700;border-radius:999px;padding:2px 12px;white-space:nowrap}'
+'.fx-ok{background:#fff;border:2px solid #0E7C86;color:#0A5A62;cursor:pointer}'
+'.fx-ok span{background:#EEF6F7;color:#0E7C86}'
+'.fx-ok:hover,.fx-ok:focus-visible{background:#EEF6F7;outline:3px solid #D9A441;outline-offset:2px}'
+'.fx-on{background:#0E7C86!important;color:#fff!important}.fx-on span{background:#fff;color:#0A5A62}'
+'.fx-full{background:#F1F5F5;border:2px solid #E3EAEB;color:#9DB0B3}'
+'.fx-full span{background:#E3EAEB;color:#6F8386}'
+'#app .table{font-size:17px}#app .table th{background:#EEF6F7;color:#0A5A62;font-weight:900}'
+'#app label{font-weight:900;font-size:17px}'
+'#app .form-control{font-size:18px;font-weight:500;border:2px solid #D5E4E6;border-radius:12px;min-height:52px;font-family:inherit;color:#1C3236}'
+'#app .form-control:focus{border-color:#0E7C86;box-shadow:0 0 0 3px rgba(14,124,134,.18)}'
+'#app .custom-control{padding:10px 12px 10px 46px;border:2px solid #D5E4E6;border-radius:12px;margin-bottom:8px;background:#fff}'
+'#app .custom-control-label{font-weight:700;font-size:17px;display:block;cursor:pointer}'
+'#app .custom-control-label::before,#app .custom-control-label::after{width:22px;height:22px;left:-32px;top:4px}'
+'#app .custom-control-input:checked~.custom-control-label::before{background:#0E7C86;border-color:#0E7C86}'
+'#fx-confirm{position:fixed;inset:0;background:#EEF6F7;z-index:9999;overflow:auto;padding:20px 14px 40px}'
+'#fx-confirm .fxc{max-width:640px;margin:0 auto;background:#fff;border-radius:22px;border-top:6px solid #D9A441;box-shadow:0 6px 24px rgba(10,90,98,.10);padding:24px 18px 28px}'
+'#fx-confirm h2{font-size:24px;font-weight:900;color:#0A5A62;margin:0 0 6px}#fx-confirm p{margin:0 0 16px;font-size:16px;color:#4A6468}'
+'#fx-confirm dl{margin:0 0 20px}#fx-confirm dt{font-size:14.5px;font-weight:700;color:#0E7C86;margin-top:14px}#fx-confirm dd{margin:2px 0 0;font-size:19px;font-weight:700;border-bottom:2px solid #D5E4E6;padding-bottom:10px;white-space:pre-wrap;word-break:break-word}'
+'#fx-confirm .fx-when{background:#FBF4E3;border:2px solid #D9A441;border-radius:14px;padding:12px 14px;font-size:22px;font-weight:900;color:#0A5A62;margin-bottom:6px}'
+'#fx-confirm button{display:block;width:100%;font:inherit;border-radius:999px;cursor:pointer}'
+'#fx-confirm .fx-go{background:#0E7C86;color:#fff;border:0;font-weight:900;font-size:21px;min-height:62px;box-shadow:0 5px 0 #0A5A62}'
+'#fx-confirm .fx-back{background:#fff;color:#0E7C86;border:2px solid #0E7C86;font-weight:700;font-size:17px;min-height:50px;margin-top:16px}'
+'#fx-confirm .fx-go[disabled]{opacity:.6}'
+'#app button[type=submit],#app .btn-success,#app .btn-primary{background:#0E7C86!important;border:0!important;border-radius:999px!important;font-weight:900;font-size:20px;min-height:60px;box-shadow:0 5px 0 #0A5A62;font-family:inherit}';
var st=document.createElement('style');st.textContent=css;document.head.appendChild(st);

var sig='';
function pad(n){return (n<10?'0':'')+n}
function render(){
  var sch=document.querySelector('#app .schedule');if(!sch)return;
  var box=document.getElementById('fx-slots');
  var real={};[].forEach.call(sch.querySelectorAll('button.calendar-time'),function(b){real[b.textContent.trim().slice(0,5)]=b});
  var selDay=sch.querySelector('.selected-day'),selected=!!selDay;
  var pk=((document.querySelector('#app .card-body table')||{}).textContent||'').match(/\d{4}\/\d{2}\/(\d{2})[^\d]*(\d{2}:\d{2})-/),picked=(pk&&selDay&&parseInt(pk[1],10)===parseInt((selDay.firstElementChild||selDay).textContent,10))?pk[2]:'';
  var parts=[],state=[];
  if(selected){HOURS.forEach(function(h){var k=pad(h)+':00',b=real[k];var on=!!b&&picked===k;state.push(k+(b?(on?'S':'O'):'X'));
    var label=k+'〜'+pad(h+1)+':00';
    parts.push(b?'<button type="button" class="fx-slot fx-ok'+(on?' fx-on':'')+'" data-k="'+k+'">'+label+'<span>'+(on?'選択中':'予約できます')+'</span></button>':'<div class="fx-slot fx-full" aria-disabled="true">'+label+'<span>満席</span></div>')})}
  var s=state.join(',');
  if(!box){box=document.createElement('div');box.id='fx-slots';sch.appendChild(box);box.addEventListener('click',function(e){var t=e.target.closest('.fx-ok');if(!t)return;var r=document.querySelector('#app .schedule').querySelectorAll('button.calendar-time');[].forEach.call(r,function(b){if(b.textContent.trim().slice(0,5)===t.getAttribute('data-k'))b.click()});setTimeout(render,200)});sig=''}
  if(s!==sig){sig=s;box.innerHTML=parts.join('')}
  /* 受付期間内で空きのない日に「満席」 */
  var head=(document.querySelector('#app .calendar-head')||{}).textContent||'',m=head.match(/(\d{4})年(\d{1,2})月/);if(!m)return;
  var t0=new Date();t0.setHours(0,0,0,0);var t1=new Date(t0.getTime()+WINDOW_DAYS*864e5);
  var seen=false,ended=false,prev=0;
  [].forEach.call(document.querySelectorAll('#app .calendar-day'),function(c){var n=parseInt((c.firstElementChild||c).textContent,10);var inMonth=false;
    if(!seen){if(n===1){seen=true;inMonth=true}}else if(!ended){if(n<prev){ended=true}else inMonth=true}
    if(inMonth)prev=n;
    var d=new Date(+m[1],+m[2]-1,n),v=(inMonth&&c.classList.contains('calendar-day-nothing')&&d>=t0&&d<t1)?'full':'';
    if((c.getAttribute('data-fx')||'')!==v){if(v)c.setAttribute('data-fx',v);else c.removeAttribute('data-fx')}});
}
/* 確認画面を、このページの中に同じデザインで出す（うまくいかないときは標準の確認画面へ進む） */
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function hookConfirm(){
  var form=document.querySelector('#app form');if(!form||form.__fx)return;form.__fx=true;
  form.addEventListener('submit',function(ev){
    if(form.__native)return;
    if(form.checkValidity&&!form.checkValidity())return;
    ev.preventDefault();ev.stopImmediatePropagation();
    var btn=form.querySelector('button[type=submit]');if(btn)btn.disabled=true;
    var fr=document.createElement('iframe');fr.name='fxcf';fr.setAttribute('aria-hidden','true');fr.style.cssText='position:absolute;width:1px;height:1px;border:0;opacity:0;pointer-events:none;left:-9999px';
    document.body.appendChild(fr);
    var settled=false,oldTarget=form.getAttribute('target');
    function restore(){if(oldTarget===null)form.removeAttribute('target');else form.setAttribute('target',oldTarget);if(btn)btn.disabled=false}
    function nativeGo(){if(settled)return;settled=true;try{fr.remove()}catch(e){}restore();form.__native=true;HTMLFormElement.prototype.submit.call(form)}
    var timer=setTimeout(nativeGo,9000);
    fr.addEventListener('load',function(){
      if(settled)return;
      var doc,cf,go;
      try{doc=fr.contentDocument;if(!doc||!/\/confirm$/.test(fr.contentWindow.location.pathname))throw 0;cf=doc.querySelector('form#form');go=cf&&cf.querySelector('button[value=submit]');if(!go)throw 0}catch(e){clearTimeout(timer);nativeGo();return}
      var rows=[];[].forEach.call(doc.querySelectorAll('table.d-md-table tr'),function(tr){var th=tr.querySelector('th'),td=tr.querySelector('td');if(th&&td)rows.push([th.textContent.trim(),td.textContent.replace(/[ \t]+/g,' ').replace(/\s*\n\s*/g,'\n').trim()])});
      if(!rows.length){clearTimeout(timer);nativeGo();return}
      clearTimeout(timer);settled=true;restore();
      var when=rows[0],rest=rows.slice(1);
      var ov=document.createElement('div');ov.id='fx-confirm';
      ov.innerHTML='<div class="fxc"><h2>この内容で申し込みますか？</h2><p>まだ申し込みは終わっていません。下のボタンを押すと完了します。</p><div class="fx-when">'+esc(when[1])+'</div><dl>'+rest.map(function(r){return '<dt>'+esc(r[0])+'</dt><dd>'+(esc(r[1])||'（なし）')+'</dd>'}).join('')+'</dl><button type="button" class="fx-go">この内容で申し込む</button><button type="button" class="fx-back">戻って直す</button></div>';
      document.body.appendChild(ov);window.scrollTo(0,0);
      ov.querySelector('.fx-back').addEventListener('click',function(){ov.remove();try{fr.remove()}catch(e){}});
      ov.querySelector('.fx-go').addEventListener('click',function(){
        this.disabled=true;this.textContent='送信しています…';
        try{cf.setAttribute('target','_top');go.click()}catch(e){form.__native=true;HTMLFormElement.prototype.submit.call(form)}
      });
    });
    form.setAttribute('target','fxcf');
    HTMLFormElement.prototype.submit.call(form);
  },true);
}
var q=false;function kick(){if(q)return;q=true;setTimeout(function(){q=false;render()},40)}
function boot(){var app=document.getElementById('app');if(!app)return;try{hookConfirm()}catch(e){}new MutationObserver(function(ms){for(var i=0;i<ms.length;i++){var t=ms[i].target;if(t.id==='fx-slots'||(t.closest&&t.closest('#fx-slots')))continue;if(ms[i].type==='attributes'&&ms[i].attributeName!=='class')continue;kick();return}}).observe(app,{childList:true,subtree:true,attributes:true,attributeFilter:['class'],characterData:true});render()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot);else boot();
})();
