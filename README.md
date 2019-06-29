# Voice Control Library
Web application interface in the form of a library for controlling web content via voice commands. Only after a proper voice command from the end user, which must be sequential and distinct for its adequate recognition, can the library handle page content. VCL uses W3C speech api for voice recognition to text form.

## Funkcionality
 The main advantage library is simple implementation new and creative functions that improve work on the internet.
### API
You can choose :
- from 120 human language
- debug mode
- continuous recording voice
- count of maximal alternatives recognize result
### Client
You can implement :
- query selectors corresponding to elements on the page
- phrases by which will be unique on what functionality goes and which element are set
- listener can be implemented or not
  -- if is set, execute first
- actions various charater that executes only if return value is true 

## Configuration example
```JS
const vcl = new VCL({
    "#btn": {
        phrases: ['klikni na gombík', 'klikni na button',
            'klikni na tlačítko', 'stlač button', 'stlač tlačidlo'],
        listener: event => {
            event.element.innerText = event.result;
        },
        actions: {
            click: true,
            mouseover: event => {
                return (event.element.innerText === "Button");
            }
        }
    },
    global: {
        speechApi: {
            W3C: {
                lang: 'sk-SK',
                continuous: false,
                maxAlternatives: 1
            },
            GoogleCloudApi: {},
            debug: true
        },
    }
});
```

## Documentation

### Table of Contents

-   [VCL][1]
    -   [Parameters][2]
    -   [execute][3]
-   [SpeechApi][4]
    -   [Parameters][5]
    -   [dictate][6]
    -   [result][7]
    -   [stop][8]
-   [W3CApi][9]
    -   [Parameters][10]
    -   [dictate][11]
    -   [result][12]
    -   [stop][13]
-   [ServiceObjects][14]
    -   [Parameters][15]
    -   [trie][16]
    -   [controlObjects][17]
    -   [divideControlObjects][18]
        -   [Parameters][19]
-   [Trie][20]
    -   [root][21]
    -   [insert][22]
        -   [Parameters][23]
    -   [search][24]
        -   [Parameters][25]
    -   [delete][26]
        -   [Parameters][27]
    -   [update][28]
        -   [Parameters][29]
    -   [getDataNode][30]
        -   [Parameters][31]
    -   [getPath][32]
        -   [Parameters][33]
-   [TrieNode][34]
    -   [Parameters][35]
    -   [parent][36]
    -   [children][37]
    -   [update][38]
        -   [Parameters][39]
    -   [unlink][40]
    -   [hasChildren][41]
    -   [deleteChild][42]
        -   [Parameters][43]
    -   [addChild][44]
        -   [Parameters][45]
    -   [hasChild][46]
        -   [Parameters][47]

## VCL

### Parameters

-   `config`  

### execute

## SpeechApi

Facade that separates API functionality for speech recognition from control and others VCL services.
Provides the isolation of what a library user can and where they should not be accessed.

### Parameters

-   `config` **[Object][48]** SpeechApi configuration.

### dictate

Calls the configured method

### result

Returns **[Promise][49]** 

### stop

Calls the configured method

## W3CApi

W3C Speech API
It enables developers to use scripting to generate text-to-speech output
and to use speech recognition as an input for forms, continuous dictation and control.

### Parameters

-   `config` **([Object][48] | null)** W3C Speech API configuration

### dictate

Begin to listen to the audio.

### result

Asynchronous function that return transcript result in text form.

Returns **[Promise][49]&lt;[String][50]>** 

### stop

Stop listening to more audio.

## ServiceObjects

Services input configuration settings related to page elements and their properties.
Phrases are indexed to the associated selector using the Trie class

### Parameters

-   `config` **[Object][48]** 

### trie

Get Trie.

Returns **[Trie][51]** 

### controlObjects

Get map all control objects.

Returns **[Map][52]** 

### divideControlObjects

In Map on key position set querySelector from configuration and as his value set instance of ControlObject with his attributes.
Insert all phrases from the configuration into the trie that indexes to their querySelectors.

#### Parameters

-   `config` **[Object][48]** 

## Trie

Trie data structure.

### root

Get root node of the Trie

Returns **[TrieNode][53]** 

### insert

Insert word to the Trie and map data on the word.
If data is not provided it is automatically generated as an increasing number.

#### Parameters

-   `word` **[string][50]** 
-   `data` **[Object][48]?** 

### search

Searching Trie for data indexed by the provided word.
If the word is in the Trie a data object is returned.
If the word is not found in the Trie null is returned.

#### Parameters

-   `word` **[string][50]** 

Returns **([Object][48] | null)** 

### delete

Delete word from the Trie.
If the word is not in the Trie false is returned otherwise true.

#### Parameters

-   `word` **[string][50]** 

Returns **[boolean][54]** 

### update

#### Parameters

-   `word` **[string][50]** 
-   `data` **any** 

Returns **[boolean][54]** 

### getDataNode

#### Parameters

-   `word` **[string][50]** 

Returns **[TrieNode][53]** 

### getPath

#### Parameters

-   `word` **[string][50]** 

Returns **[Array][55]&lt;[TrieNode][53]>** 

## TrieNode

Node of a trie data structure.
The node can be root or any other node in Trie data structure.
The has access to its parent and all of its children.
If the node is index of the word inserted into the Trie it has flag isEndOfWorld set to true and word is set to the indexed word.
If the node is the end of a word it can contain some additional index data.

### Parameters

-   `parent` **[Object][48]** Parent config object (optional, default `{key:"",node:null}`)
-   `isRoot` **[boolean][54]?** Boolean flag of root node. If the node is root it is not check for parent (optional, default `false`)

### parent

Get parent object consisting of the child index and parent node.

Returns **{key: [string][50], node: [TrieNode][53]}** 

### children

Get map of all node's children.

Returns **({} | {TrieNode})** Child index is one character of a inserted word and value is child's node object.

### update

Update indexed data of the node.

#### Parameters

-   `data` **any** If data is set to some value the node is automatically set as the end of a word. If data has false value indexed word is removed from the node.

### unlink

Remove parent object from this node.
If this function is finished all reference to this node from the Trie root is lost.

### hasChildren

Check if the node has any child nodes attached to it.

Returns **[boolean][54]** True if has any children, otherwise false.

### deleteChild

Delete child indexed by the provided character.
If the child does not exists nothing happens.
If the child does exists, the child node object is deleted.

#### Parameters

-   `char` **[string][50]** 

### addChild

Add a child to the node.
If a child already exists on the index it is overridden by the new child.

#### Parameters

-   `char` **[string][50]** 
-   `node` **[TrieNode][53]** 

Returns **([TrieNode][53] | null)** If a child is overridden the old child node is return, otherwise false.

### hasChild

Check is the node has a child indexed by the provided character.

#### Parameters

-   `char` **[string][50]** 

Returns **[boolean][54]** True if a child exists, otherwise false.

[1]: #vcl

[2]: #parameters

[3]: #execute

[4]: #speechapi

[5]: #parameters-1

[6]: #dictate

[7]: #result

[8]: #stop

[9]: #w3capi

[10]: #parameters-2

[11]: #dictate-1

[12]: #result-1

[13]: #stop-1

[14]: #serviceobjects

[15]: #parameters-3

[16]: #trie

[17]: #controlobjects

[18]: #dividecontrolobjects

[19]: #parameters-4

[20]: #trie-1

[21]: #root

[22]: #insert

[23]: #parameters-5

[24]: #search

[25]: #parameters-6

[26]: #delete

[27]: #parameters-7

[28]: #update

[29]: #parameters-8

[30]: #getdatanode

[31]: #parameters-9

[32]: #getpath

[33]: #parameters-10

[34]: #trienode

[35]: #parameters-11

[36]: #parent

[37]: #children

[38]: #update-1

[39]: #parameters-12

[40]: #unlink

[41]: #haschildren

[42]: #deletechild

[43]: #parameters-13

[44]: #addchild

[45]: #parameters-14

[46]: #haschild

[47]: #parameters-15

[48]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[49]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise

[50]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[51]: #trie

[52]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map

[53]: #trienode

[54]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[55]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array
