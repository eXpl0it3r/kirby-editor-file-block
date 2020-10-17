editor.block("file", {
    label: "File",
    icon: "file-document",
    props: {
        attrs: {
            type: Object,
            default () {
                return {};
            }
        },
        endpoints: Object,
        spellcheck: Boolean
    },
    computed: {
        style() {
            if (this.attrs.ratio) {
                return 'padding-bottom:' + 100 / this.attrs.ratio + '%';
            }
        },
        fields() {
            return {
                bold: {
                    label: this.$t('editor.blocks.file.bold.label'),
                    type: "toggle",
                    icon: "bold"
                },
                css: {
                    label: this.$t('editor.blocks.file.css.label'),
                    type: "text",
                    icon: "code",
                }
            };
        }
    },
    methods: {
        displayname(html) {
            var $html = (new DOMParser).parseFromString(html, "text/html").documentElement.textContent;
            this.input({
                displayname: $html
            });
        },
        edit() {
            if (this.attrs.guid) {
                this.$router.push(this.attrs.guid);
            }
        },
        focus() {
            if (this.attrs.url) {
                this.$refs.element.focus();
            } else {
                this.$refs.element.$el.focus();
            }
        },
        input(data) {
            this.$emit("input", {
                attrs: {
                    ...this.attrs,
                    ...data,
                }
            });
        },
        fetchFile(link) {
            this.$api.get(link).then(response => {
                this.input({
                    guid: response.link,
                    url: response.url,
                    id: response.id,
                    filename: response.filename,
                    name: response.name,
                    extension: response.extension,
                    ratio: response.dimensions.ratio,
                    bold: true,
                });
            });
        },
        insertFile(files) {
            const file = files[0];
            this.fetchFile(file.link);
        },
        insertUpload(files, response) {
            this.fetchFile(response[0].link);
            this.$events.$emit("file.create");
            this.$events.$emit("model.update");
            this.$store.dispatch("notification/success", ":)");
        },
        menu() {
            if (this.attrs.url) {
                return [{
                        icon: "open",
                        label: this.$t("editor.blocks.file.open.browser"),
                        click: this.open
                    },
                    {
                        icon: "edit",
                        label: this.$t("editor.blocks.file.open.panel"),
                        click: this.edit,
                        disabled: !this.attrs.guid
                    },
                    {
                        icon: "cog",
                        label: this.$t("editor.blocks.file.settings"),
                        click: this.$refs.settings.open
                    },
                    {
                        icon: "file-document",
                        label: this.$t("editor.blocks.file.replace"),
                        click: this.replace
                    }
                ];
            } else {
                return [];
            }

        },
        open() {
            window.open(this.attrs.url);
        },
        onDrop(files) {
            this.$refs.fileUpload.drop(files, {
                url: window.panel.api + "/" + this.endpoints.field + "/upload",
                multiple: false,
                accept: "application/*"
            });
        },
        replace() {
            this.$emit("input", {
                attrs: {}
            });
        },
        selectFile() {
            this.$refs.fileDialog.open({
                endpoint: this.endpoints.field + "/files",
                multiple: false,
                selected: [this.attrs.id]
            });
        },
        settings() {
            this.$refs.settings.open();
        },
        saveSettings() {
            this.$refs.settings.close();
            this.input(this.attrs);
            this.$events.$emit("model.update");
        },
        uploadFile() {
            this.$refs.fileUpload.open({
                url: window.panel.api + "/" + this.endpoints.field + "/upload",
                multiple: false,
                accept: "application/*"
            });
        },
    },
    template: `<template>
    <div>
      <template v-if="attrs.url">
        <div
          ref="element"
          :style="style"
          class="k-editor-file-block-wrapper"
          tabindex="0"
          @keydown.enter="$emit('append')"
          @keydown.up="$emit('prev')"
          @keydown.down="$emit('next')"
        >
          <k-editable
            ref="link"
              :content="(attrs.bold ? '<strong>' : '') + '<a href=' + attrs.url + '>' + (attrs.displayname ? attrs.displayname : attrs.name + ' [' + attrs.extension.toUpperCase() + ']') + '</a>' + (attrs.bold ? '</strong>' : '')"
              :breaks="true"
              :spellcheck="spellcheck"
              @prev="focus"
              @shiftTab="focus"
              @tab="$emit('next', $event)"
              @next="$emit('next', $event)"
              @split="$emit('append')"
              @enter="$emit('append')"
              @input="displayname"
          />
        </div>
      </template>
      <template v-else>
        <k-dropzone
          ref="element"
          class="k-editor-file-block-placeholder"
          tabindex="0"
          @keydown.native.delete="$emit('remove')"
          @keydown.native.enter="$emit('append')"
          @keydown.native.up.prevent="$emit('prev')"
          @keydown.native.down.prevent="$emit('next')"
          @drop="onDrop"
        >
          <k-button icon="upload" @click="uploadFile" @keydown.enter.native.stop>{{ $t('editor.blocks.file.upload') }}</k-button>
          {{ $t('editor.blocks.file.or') }}
          <k-button icon="file-document" @click="selectFile" @keydown.enter.native.stop>{{ $t('editor.blocks.file.select') }}</k-button>
        </k-dropzone>
      </template>
  
      <k-files-dialog ref="fileDialog" @submit="insertFile($event)" />
      <k-upload ref="fileUpload" @success="insertUpload" />
  
      <k-dialog ref="settings" @submit="saveSettings" size="medium">
        <k-form :fields="fields" v-model="attrs" @submit="saveSettings" />
      </k-dialog>
  
    </div>
  </template>`
});