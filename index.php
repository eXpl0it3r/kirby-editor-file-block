<?php

Kirby::plugin('eXpl0it3r/kirby-editor-file-block', [
  'snippets' => [
    'editor/file' => __DIR__ . '/snippets/file.php'
  ],
  'translations' => [
    'de'    => @include_once __DIR__ . '/i18n/de.php',
    'en'    => @include_once __DIR__ . '/i18n/en.php',
  ]
]);
