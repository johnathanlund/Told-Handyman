/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
      // other libraries
      'rxjs':                      'npm:rxjs',
      'ng2-page-scroll/ng2-page-scroll': 'npm:ng2-page-scroll/bundles/ng2-page-scroll.umd.js',
      'angular2-useful-swiper': 'npm:angular2-useful-swiper/lib',
      'ng2-modal': 'npm:ng2-modal',
      // 'angular2-dropzone-wrapper': 'npm:angular2-dropzone-wrapper/bundles/angular2-dropzone-wrapper.umd.min.js',
      // 'angular2-dropzone-wrapper':  'npm:angular2-dropzone-wrapper',
      // 'dropzone': 'dropzone.js',
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      'rxjs': {
        defaultExtension: 'js'
      },
      'angular2-useful-swiper': {
        main: 'swiper.module.js',
        defaultExtension: 'js'
      },
      'ng2-modal': {
        main: 'index.js',
        defaultExtension: 'js'
      },
      // 'angular2-dropzone-wrapper': {
      //   main: 'bundles/angular2-dropzone-wrapper.umd.js',
      //   defaultExtension: 'js'
      // },
      // 'dropzone': {
      //   main: 'dropzone.js',
      //   defaultExtension: 'js'
      // },
    }
  });
})(this);
