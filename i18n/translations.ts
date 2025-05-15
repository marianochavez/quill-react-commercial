/**
 * i18n configuration for all UI text in the editor
 */
export const i18nConfig = {
  en: {
    toolbarHeader: 'Body',
    toolbarFont: 'System',
    fontYahei: 'MS Yahei',
    fontSong: 'SimSun',
    fontKai: 'KaiTi',
    tableDialogLabel: 'Slide & Click',
    imageDialogLocal: 'Select Local Image',
    imageDialogUrlLabel: 'Or input image url',
    iamgeDialogInsert: 'Insert',
    imageDialogTypeErr: 'File type is error, please upload again!',
    imageDialogSizeErr: 'Image size cannot exceed $M',
    dividerDialogColorLabel: 'Primary Color:',

    placeholder: 'Start Note(Support input markdown)...',
    alignLeft: 'Left align',
    alignRight: 'Right align',
    alignCenter: 'Center align',
    tableBackground: 'Background Colors',

    linkWords: 'Text',
    linkUrl: 'Link',
    linkSave: 'Save',
    linkTarget: 'Link To Url',
    linkClear: 'Remove Link',
    linkUrlErr: 'Please input correct Url!',

    imgStatusUploading: ' Image uploading... ',
    imgStatusFail: ' Upload fail & click to upload again ',
    imgRemarkPre: 'Fig. ',
    imgRemarkLabel: 'Add Remark',
    deleteImg: 'Delete Image',
  },
  zh: {
    toolbarHeader: '正文',
    toolbarFont: '系统字体',
    fontYahei: '微软雅黑',
    fontSong: '宋体',
    fontKai: '楷体',
    tableDialogLabel: '滑动点击生成',
    imageDialogLocal: '选择本地图片',
    imageDialogUrlLabel: '或输入网络图片URL',
    iamgeDialogInsert: '插入',
    imageDialogTypeErr: '图片格式错误，请重新上传！',
    imageDialogSizeErr: '图片大小不能超过$M',
    dividerDialogColorLabel: '主色：',

    placeholder: '开始笔记（支持直接Markdown输入）...',
    alignLeft: '居左',
    alignRight: '居右',
    alignCenter: '居中',
    tableBackground: '背景色',

    linkWords: '文本',
    linkUrl: '链接',
    linkSave: '保存',
    linkTarget: '跳转',
    linkClear: '取消链接',
    linkUrlErr: '请输入正确Url！',

    imgStatusUploading: ' 图片上传中... ',
    imgStatusFail: ' 上传失败，点击重新上传 ',
    imgRemarkPre: '图：',
    imgRemarkLabel: '添加备注',
    deleteImg: '删除图片',
  },
  es: {
    toolbarHeader: 'Texto',
    toolbarFont: 'Sistema',
    fontYahei: 'MS Yahei',
    fontSong: 'SimSun',
    fontKai: 'KaiTi',
    tableDialogLabel: 'Desliza y haz clic',
    imageDialogLocal: 'Subir imagen',
    imageDialogUrlLabel: 'O introduce la URL de la imagen',
    iamgeDialogInsert: 'Insertar',
    imageDialogTypeErr: '¡El tipo de archivo es incorrecto, por favor súbelo de nuevo!',
    imageDialogSizeErr: 'El tamaño de la imagen no puede exceder $M',
    dividerDialogColorLabel: 'Color principal:',

    placeholder: 'Empieza la nota (admite Markdown)...',
    alignLeft: 'Alinear a la izquierda',
    alignRight: 'Alinear a la derecha',
    alignCenter: 'Alinear al centro',
    tableBackground: 'Colores de fondo',

    linkWords: 'Texto',
    linkUrl: 'Enlace',
    linkSave: 'Guardar',
    linkTarget: 'Enlazar a URL',
    linkClear: 'Eliminar enlace',
    linkUrlErr: '¡Introduce una URL correcta!',

    imgStatusUploading: ' Subiendo imagen... ',
    imgStatusFail: ' Error al subir. Haz clic para volver a intentarlo ',
    imgRemarkPre: 'Fig. ',
    imgRemarkLabel: 'Agregar comentario',
    deleteImg: 'Eliminar imagen',
  },
};

/**
 * Get translated text for a key or array of keys
 * 
 * @param keys - Key or array of keys to get translations for
 * @param i18n - Language code
 * @returns Translated text or array of translated texts
 */
export const getI18nText = (
  keys: (keyof (typeof i18nConfig)['en'])[] | keyof (typeof i18nConfig)['en'],
  i18n: keyof typeof i18nConfig = 'en',
) => {
  if (Array.isArray(keys)) return keys.map((key) => i18nConfig[i18n][key]);
  return i18nConfig[i18n][keys];
}; 