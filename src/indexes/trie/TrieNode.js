export default class TrieNode {

    constructor(parentNode = null, parentKey = null) {
        this._parentNode = parent;
        this._parentKey = parentKey;
        this._children = {};
        this.data = null;
        this.isEndOfWord = false;
        this.word = null;
    }

    get parent() {
        return {
            key: this._parentKey,
            node: this._parentNode
        };
    }

    get children() {
        return this._children;
    }

    update(data) {
        this.isEndOfWord = !!data;
        this.data = data;

        if(!this.isEndOfWord)
            this.word = null;
    }

    hasChildren() {
        return Object.keys(this._children).length > 0;
    }

    deleteChild(char) {
        this.children[char].update(null);
        this.children[char]._parentNode = null;
        this.children[char]._parentKey = null;
        this.children[char].word = null;
        delete this._children[char];
    }

    addChild(char, node) {
        this._children[char] = node;
    }

    hasChild(char) {
        return !!this._children[char];
    }
}