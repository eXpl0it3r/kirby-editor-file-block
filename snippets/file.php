<?php if ($attrs->displayname()): ?>
<div><?= $attrs->bold()->value() ? '<strong>' : '' ?><a <?= attr(['class' => $attrs->css()->value()], ' ') ?> href="<?= $attrs->url() ?>"><?= $attrs->displayname() ?></a><?= $attrs->bold()->value() ? '</strong>' : '' ?></div>
<?php endif ?>