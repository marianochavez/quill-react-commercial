import { Range } from "quill";
import Quill from "quill";

interface KeyboardHandlerThis {
  quill: Quill;
}

export const keyboardBindsFn = (options: any) => {
  const { onSave } = options;
  return {
    // 有序列表只能输入"1. "才会触发，改变比如输入"30. "会变为"1. "开始的有序列表的行为
    "list autofill": {
      key: " ",
      collapsed: true,
      prefix: /^\d+\.$/,
      format: {
        list: false,
        "code-block": false,
        blockquote: false,
        header: false,
        table: false,
        "table-cell-line": false, // 在table中不触发有序列表
      },
      handler(this: KeyboardHandlerThis, range: Range, context: any) {
        const { prefix, line } = context;

        const start = parseInt(prefix.replace(".", ""), 10);
        if (start !== 1) {
          this.quill.formatLine(range.index, 1, "list", `ordered-${start}`);

          // // 这个ol在编辑器中本身没啥作用，编辑器css已经将ol的样式设置为none，主要样式在li的伪类中定义；主要给转html等富文本使用
          // const ol = line?.next?.parent?.domNode;
          // ol.setAttribute('start', start);
          // ol.style.setProperty('--list-item-start', start);
          // // 真正设置有序列表起始值
          // const li = line?.next?.domNode;
          // li.dataset.reset = parseInt(prefix.replace('.', ''), 10);
          // li.style.setProperty('counter-set', `list-0 ${parseInt(prefix.replace('.', ''), 10)}`);

          this.quill.formatLine(range.index, 1, "list", `ordered-${start}`);
        } else {
          this.quill.formatLine(range.index, 1, "list", "ordered");
          this.quill.formatLine(range.index, 1, "list", "ordered");
        }

        this.quill.deleteText(range.index - prefix.length, prefix.length);
        // this.quill.setSelection(range.index, 1);
      },
    },
    // bugfix: 当最开始是code块、list、引用块时，无法使用Backspace删除样式
    "code backspace": {
      key: "Backspace",
      format: ["code-block", "list", "blockquote"],
      handler(
        this: KeyboardHandlerThis,
        range: Range,
        context: {
          line: {
            parent: {
              domNode: HTMLDivElement;
            };
          };
          suffix: string;
          prefix: string;
          offset: number;
        }
      ) {
        if (this.quill) {
          // const [line] = this.quill.getLine(range.index);
          // const isEmpty = !line.children.head.text || line.children.head.text.trim() === '';
          const format = this.quill.getFormat(range);
          const allCode = context?.line?.parent?.domNode?.innerHTML
            .replace(/<select>(.+)<\/span><\/span>/, "")
            .replace(/<[^<>]+>/g, ""); // parent指代码块 div.ql-code-block-container

          // // 当是起始，代码块且整块中已无字符，或引用/列表且当前行为空，去除当前行格式；其他情况执行默认Backspace的handler
          // if (
          //   range.index === 0 &&
          //   context.suffix === '' &&
          //   ((format['code-block'] && (allCode === '\n' || allCode === '')) ||
          //     (!format['code-block'] && isEmpty))
          // ) {
          //   this.quill.removeFormat(range.index, range.length);
          //   return false;
          // }

          // 只要光标在list、引用的开头删除，直接移除格式；去除原只能文档开头的条件
          if (
            (format["list"] || format["blockquote"]) &&
            context.prefix === ""
          ) {
            this.quill.removeFormat(range.index, range.length);
            return false;
          } else if (
            format["code-block"] &&
            (allCode === "\n" || allCode === "" || allCode === undefined)
          ) {
            // 光标在Code块中，只要块内内容为空，直接移除格式
            this.quill.removeFormat(range.index, range.length);
            return false;
          }
        }

        return true;
      },
    },
    save: {
      key: "s",
      shortKey: true,
      handler(this: KeyboardHandlerThis, range: Range, context: any) {
        console.log("keyboard save!");
        if (onSave) {
          onSave();
          return false;
        }
        return true;
      },
    },
  };
};
