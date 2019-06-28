import TrieNode from "./TrieNode.js";

/**
 * Trie data structure.
 */
export default class Trie {

    /**
     * @constructor
     */
    constructor() {
        this._root = new TrieNode(null, true);
        this._lastIndex = 1;
    }

    /**
     * Get root node of the Trie
     * @returns {TrieNode}
     */
    get root() {
        return this._root;
    }

    /**
     * Insert word to the Trie and map data on the word.
     * If data is not provided it is automatically generated as an increasing number.
     * @param {string}word
     * @param {Object}[data]
     */
    insert(word, data) {
        return this._insertWord(word, data, this._root, 0);
    }

    /**
     *
     * @param {string}word
     * @param {Object}data
     * @param {TrieNode}currentNode
     * @param {number}wordIndex
     * @private
     */
    _insertWord(word, data, currentNode, wordIndex) {
        if (wordIndex === word.length) {
            currentNode.word = word;
            currentNode.update(data || this._getNextIndex());
            return true;
        }

        let c = word.charAt(wordIndex);
        if (!currentNode.hasChild(c)) {
            currentNode.addChild(c, new TrieNode({key: c, node: currentNode}))
        }
        return this._insertWord(word, data, currentNode.children[c], wordIndex + 1);
    }

    /**
     * Searching Trie for data indexed by the provided word.
     * If the word is in the Trie a data object is returned.
     * If the word is not found in the Trie null is returned.
     * @param {string}word
     * @returns {Object | null}
     */
    search(word) {
        const node = this._searchNode(word, this._root, 0);
        return !node ? null : node.data;
    }

    /**
     * Get index node for the word.
     * If the word is not in the Trie null is returned.
     * @param {string}word
     * @param {TrieNode}currentNode
     * @param {number}wordIndex
     * @returns {TrieNode | null}
     * @private
     */
    _searchNode(word, currentNode, wordIndex) {
        if (wordIndex === word.length) {
            return currentNode.isEndOfWord ? currentNode : null;
        }

        let c = word.charAt(wordIndex);
        return currentNode.hasChild(c) ? this._searchNode(word, currentNode.children[c], wordIndex + 1) : null;
    }

    /**
     * Delete word from the Trie.
     * If the word is not in the Trie false is returned otherwise true.
     * @param {string}word
     * @returns {boolean}
     */
    delete(word) {
        const node = this._searchNode(word, this._root, 0);
        if (!node)
            return false;

        if (node.hasChildren()) {
            node.update(null);
            return true;
        }

        this._deleteWord(node);
        return true;
    }

    /**
     *
     * @param {TrieNode} currentNode
     * @private
     */
    _deleteWord(currentNode) {
        if (currentNode === this._root)
            return;
        const parent = currentNode.parent;

        // if(currentNode.parentKey === word.charAt(wordIndex))

        parent.node.deleteChild(parent.key);
        if (parent.node.hasChildren())
            return;
        this._deleteWord(parent.node);
    }

    /**
     *
     * @param {string} word
     * @param {*} data
     * @returns {boolean}
     */
    update(word, data) {
        const node = this._searchNode(word, this._root, 0);
        if (!node)
            return false;

        node.update(data);
        return true;
    }

    /**
     *
     * @param {string} word
     * @returns {TrieNode}
     */
    getDataNode(word) {
        return this._searchNode(word, this._root, 0);
    }

    /**
     *
     * @param {string} word
     * @returns {Array<TrieNode>}
     */
    getPath(word) {
        const path = [];
        path.push(this._root);

        for (let i = 1; i <= word.length; i++) {
            path.push(this._searchNode(word.substring(0, i), this._root, 0));
        }

        return path;
    }

    /**
     *
     * @returns {number}
     * @private
     */
    _getNextIndex() {
        return this._lastIndex++;
    }
}