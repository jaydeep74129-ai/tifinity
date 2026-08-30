/* Tifinity production runtime hardening patch — 2026-08-26 */
(function () {
  'use strict';

  window.TIFINITY_PATCH_VERSION =
    '2026-08-26-runtime-hardening-1';

  // Navigation contract:
  // Maximum two previous page steps.
  window.tifinityHandleBack = function () {
    try {
      var modal = document.getElementById('modal');

      if (modal && modal.classList.contains('show')) {
        if (typeof window.modalBack === 'function') {
          return window.modalBack();
        }

        if (typeof window.closePopupNow === 'function') {
          window.closePopupNow();
          return true;
        }
      }

      var drawer = document.getElementById('drawer');

      if (drawer && drawer.classList.contains('open')) {
        if (typeof window.closeDrawer === 'function') {
          window.closeDrawer();
        } else {
          drawer.classList.remove('open');
        }

        return true;
      }

      if (
        Array.isArray(window.pageBackStack) &&
        window.pageBackStack.length
      ) {
        var previous =
          window.pageBackStack.pop() || 'home';

        window.currentPage = previous;

        if (typeof window.render === 'function') {
          window.render();
        }

        return true;
      }

      if (typeof window.showExitConfirm === 'function') {
        return window.showExitConfirm();
      }
    } catch (error) {
      console.error(
        'Tifinity back patch error:',
        error
      );
    }

    return true;
  };

  // Unified app back handler.
  window.appBack = window.tifinityHandleBack;

  // X button:
  // Always close the current popup/modal directly.
  window.closeModal = function () {
    try {
      if (typeof window.closePopupNow === 'function') {
        window.closePopupNow();
      }
    } catch (error) {
      console.error(
        'Tifinity modal close patch error:',
        error
      );
    }
  };

  // Unified unread notification counter.
  window.unreadNotifications = function (target) {
    var list = Array.isArray(
      window.state?.notifications
    )
      ? window.state.notifications
      : [];

    var targets =
      typeof window.notificationTargets === 'function'
        ? window.notificationTargets(target)
        : [target];

    return list.filter(function (notification) {
      return (
        targets.indexOf(notification.target) >= 0 &&
        !notification.read
      );
    }).length;
  };

  // Patch version marker.
  try {
    document.documentElement.setAttribute(
      'data-tifinity-runtime-patch',
      window.TIFINITY_PATCH_VERSION
    );
  } catch (error) {
    console.error(
      'Tifinity patch marker error:',
      error
    );
  }
})();