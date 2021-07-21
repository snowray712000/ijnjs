declare namespace Ijnjs {
    /**
     * Ijnjs 所有的套件都戴入成功了嗎
     * 可以直接使用 testThenDo 即可
     */
    export function isReady():boolean
    /**
     * 初始化，是動態的載入
     * @param cbDo 要作的事。callback Do
     * @param cbTest 條件成立，才去作 cbDo。若 undefined, 則預設為 isReady, 也就是 Ijnjs 的所有 都初始化好了嗎
     * @param ms 每次等待幾 ms
     */
    export function testThenDo(cbDo:() => void, cbTest?: (a1)=>boolean , ms?:number)
    /**
     * assert 工具
     * @param cbTest assert 條件。
     * @param msg 預設值，若 cbTest 是函式，會顯示出它的 function；若 cbTest 是值，只會寫 assert fail.
     */
    export function assert(cbTest: () => boolean | boolean, msg?: string )
    /** 以 class 方式實作 split by regex */
    export class SplitStringByRegex {
      /**
       * 因為 string.split 不夠我使用，所以開發一個 regex 的來用
       * @param str 
       * @param reg 
       * @example
       * new SplitStringByRegex().main("取出eng的word",/\w+/ig)
       */
      main(str:string, reg:RegExp):{w:string; exec?:RegExpExecArray }[]
    }
    /**
     * 以 class 方式實作 dialog base
     */
    export class DialogBase {
    }

    /**
     * 以 DialogBase 為底，實作 聖經版本選擇
     */
    export class BibleVersionDialog {

    }
    
}
export = Ijnjs
export as namespace Ijnjs