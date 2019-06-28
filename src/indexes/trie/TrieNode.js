/**
 * Node of a trie data structure.
 * The node can be root or any other node in Trie data structure.
 * The has access to its parent and all of its children.
 * If the node is index of the word inserted into the Trie it has flag isEndOfWorld set to true and word is set to the indexed word.
 * If the node is the end of a word it can contain some additional index data.
 */
export default class TrieNode {

    /**
     * Constructor of a new node of Trie data structure
     * @param {Object} parent Parent config object
     * @param {string} parent.key Index for this node in its parent node
     * @param {TrieNode} parent.node Reference to the parent node
     * @param {boolean} [isRoot] Boolean flag of root node. If the node is root it is not check for parent
     */
    constructor(parent = {key: "", node: null}, isRoot = false) {
        if (!isRoot && (!parent.key || !(typeof parent.key === 'string')))
            throw new Error("Parent key cannot be null, empty or not type of string!");
        if (!isRoot && (!parent.node || !(parent.node instanceof TrieNode)))
            throw new Error("Parent node cannot be null, empty or not class of TrieNode");

        this._parent = parent;
        this._children = {};
        this.data = null;
        this.isEndOfWord = false;
        this.word = null;
    }

    /**
     * Get parent object consisting of the child index and parent node.
     * @returns {{key: string, node: TrieNode}}
     */
    get parent() {
        return this._parent;
    }

    /**
     * Get map of all node's children.
     * @returns {{}|{TrieNode}} Child index is one character of a inserted word and value is child's node object.
     */
    get children() {
        return this._children;
    }

    /**
     * Update indexed data of the node.
     * @param {*} data If data is set to some value the node is automatically set as the end of a word. If data has false value indexed word is removed from the node.
     */
    update(data) {
        this.isEndOfWord = !!data;
        this.data = data;

        if (!this.isEndOfWord)
            this.word = null;
    }

    /**
     * Remove parent object from this node.
     * If this function is finished all reference to this node from the Trie root is lost.
     */
    unlink() {
        this._parent = {
            key: "",
            node: null
        };
    }

    /**
     * Check if the node has any child nodes attached to it.
     * @returns {boolean} True if has any children, otherwise false.
     */
    hasChildren() {
        return Object.keys(this._children).length > 0;
    }

    /**
     * Delete child indexed by the provided character.
     * If the child does not exists nothing happens.
     * If the child does exists, the child node object is deleted.
     * @param {string} char
     */
    deleteChild(char) {
        if (!this._children[char])
            return;
        this._children[char].update(null);
        this._children[char].unlink();
        this._children[char].word = null;
        delete this._children[char];
    }

    /**
     * Add a child to the node.
     * If a child already exists on the index it is overridden by the new child.
     * @param {string} char
     * @param {TrieNode} node
     * @returns {TrieNode|null} If a child is overridden the old child node is return, otherwise false.
     */
    addChild(char, node) {
        if (!char || !node)
            return null;

        const old = this._children[char];
        this._children[char] = node;

        return old;
    }

    /**
     * Check is the node has a child indexed by the provided character.
     * @param {string} char
     * @returns {boolean} True if a child exists, otherwise false.
     */
    hasChild(char) {
        return !!this._children[char];
    }
}