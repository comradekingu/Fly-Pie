//////////////////////////////////////////////////////////////////////////////////////////
//                                                                                      //
//    _____                    ___  _     ___       This software may be modified       //
//   / ___/__  ___  __ _  ___ / _ \(_)__ |_  |      and distributed under the           //
//  / (_ / _ \/ _ \/  ' \/ -_) ___/ / -_) __/       terms of the MIT license. See       //
//  \___/_//_/\___/_/_/_/\__/_/  /_/\__/____/       the LICENSE file for details.       //
//                                                                                      //
//  Authors: Simon Schneegans (code@simonschneegans.de)                                 //
//                                                                                      //
//////////////////////////////////////////////////////////////////////////////////////////

const Main = imports.ui.main;
const Lang = imports.lang;
const Shell = imports.gi.Shell;
const Meta = imports.gi.Meta;

const REAL_SHORTCUT_SETTING_KEY = "real-shortcut";

//////////////////////////////////////////////////////////////////////////////////////////
// This class can be used to bind functions to global hot keys. The code is based on    //
// code by zzrough (https://github.com/zzrough/gs-extensions-drop-down-terminal)        //
//////////////////////////////////////////////////////////////////////////////////////////

const KeyBindings = new Lang.Class({
  Name : 'KeyBindings',

  // -------------------------------------------------------------------- public interface

  bindShortcut : function(settings, func) {
    if (Main.wm.addKeybinding && Shell.ActionMode) // introduced in 3.16
      Main.wm.addKeybinding(REAL_SHORTCUT_SETTING_KEY, settings,
                            Meta.KeyBindingFlags.NONE,
                            Shell.ActionMode.NORMAL,
                            Lang.bind(this, func));
    else if (Main.wm.addKeybinding && Shell.KeyBindingMode) // introduced in 3.7.5
      Main.wm.addKeybinding(
          REAL_SHORTCUT_SETTING_KEY, settings, Meta.KeyBindingFlags.NONE,
          Shell.KeyBindingMode.NORMAL,
          Lang.bind(this, func));
    else if (Main.wm.addKeybinding && Main.KeybindingMode) // introduced in 3.7.2
      Main.wm.addKeybinding(REAL_SHORTCUT_SETTING_KEY, settings,
                            Meta.KeyBindingFlags.NONE,
                            Main.KeybindingMode.NORMAL,
                            Lang.bind(this, func));
    else
      global.display.add_keybinding(REAL_SHORTCUT_SETTING_KEY, settings,
                                    Meta.KeyBindingFlags.NONE,
                                    Lang.bind(this, func));

  },

  unbindShortcut : function() {
    if (Main.wm.removeKeybinding) // introduced in 3.7.2
      Main.wm.removeKeybinding(REAL_SHORTCUT_SETTING_KEY);
    else
      global.display.remove_keybinding(REAL_SHORTCUT_SETTING_KEY);
  }
});
