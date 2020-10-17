# File Block for the Kirby 3 Editor

The plugin provides basic file support for the Kirby Editor.
It's heavily based on the existing image plugin and still quite rough around the edges.

![Demo GIF](https://i.imgur.com/mv907ax.gif)

## References

- [Kirby 3](https://getkirby.com/)
- [Editor](https://github.com/getkirby/editor)

## Installation

Installation is currently only possible as file download or git submodule.
If anyone wants to help with setting up a composer package, I'm more than happy to accept a pull request.

**Note:** You can also use a different name for plugin directory, but [it needs to come after `editor` alphabetically](https://github.com/getkirby/editor/issues/238).

### Git Submodule

```
git submodule add https://github.com/eXpl0it3r/kirby-editor-file-block.git site/plugins/kirby-editor-file-block
```

### Download

1. Download the [source archive](https://github.com/eXpl0it3r/kirby-editor-file-block/archive/master.zip)
2. Unpack to `site/plugins/kriby-editor-file-block`

## Usage

### Template

In your templates you can use the normal Editor integration:

```php
<?= $page->text()->blocks() ?>
```

### Customization

As with any Editor blocks, you can provide a custom [snippet](https://getkirby.com/docs/guide/templates/snippets), so you can define how the file is rendered.

```php
<?php if ($attrs->displayname()): ?>
<div><?= $attrs->bold()->value() ? '<strong>' : '' ?><a <?= attr(['class' => $attrs->css()->value()], ' ') ?> href="<?= $attrs->url() ?>"><?= $attrs->displayname() ?></a><?= $attrs->bold()->value() ? '</strong>' : '' ?></div>
<?php endif ?>
```

## License

This plugin is licensed under [MIT](LICENSE.md)
