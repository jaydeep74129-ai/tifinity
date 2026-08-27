/* Tifinity production runtime hardening patch — 2026-08-26 */
(function(){
  'use strict';
  window.TIFINITY_PATCH_VERSION='2026-08-26-runtime-hardening-1';

  // Requested navigation contract: maximum two previous page steps.
  window.tifinityHandleBack=function(){
    try{
      var modal=document.getElementById('modal');
      if(modal&&modal.classList.contains('show')){
        if(typeof window.modalBack==='function')return window.modalBack();
        if(typeof window.closePopupNow==='function'){window.closePopupNow();return true;}
      }
      var drawer=document.getElementById('drawer');
      if(drawer&&drawer.classList.contains('open')){
        if(typeof window.closeDrawer==='function')window.closeDrawer();
        else drawer.classList.remove('open');
        return true;
      }
      if(Array.isArray(window.pageBackStack)&&window.pageBackStack.length){
        var previous=window.pageBackStack.pop()||'home';
        window.currentPage=previous;
        if(typeof window.render==='function')window.render();
        return true;
      }
      if(typeof window.showExitConfirm==='function')return window.showExitConfirm();
    }catch(e){console.error('Tifinity back patch',e)}
    return true;
  };

  window.appBack=window.tifinityHandleBack;

  // X is always a direct popup close.
  window.closeModal=function(){
    try{
      if(typeof window.closePopupNow==='function')window.closePopupNow();
    }catch(e){console.error(e)}
  };

  // One consistent unread counter for all notification targets.
  window.unreadNotifications=function(target){
    var list=Array.isArray(window.state?.notifications)?window.state.notifications:[];
    var targets=typeof window.notificationTargets==='function'
      ? window.notificationTargets(target)
      : [target];
    return list.filter(function(n){
      return targets.indexOf(n.target)>=0&&!n.read;
    }).length;
  };

  try{
    document.documentElement.setAttribute(
      'data-tifinity-runtime-patch',
      window.TIFINITY_PATCH_VERSION
    );
  }catch(e){}
})();
