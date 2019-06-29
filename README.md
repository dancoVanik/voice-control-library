# Voice Control Library
Web application interface in the form of a library for controlling web content via voice commands. Only after a proper voice command from the end user, which must be sequential and distinct for its adequate recognition, can the library handle page content. VCL uses W3C speech api for voice recognition to text form.

## Funkcionality
 The main advantage library is simple implementation new and creative functions that improve work on the internet.
 Library is fully available on Google Chrome browser.
 
 Check your web browser can to use this library on : https://whatwebcando.today/speech-recognition.html
 
 Library you can turn on : 
 ```JS
 vcl.execute();
 ```
or the keyboard shortcut ```Ctrl + Shift + V```
### API
You can choose :
- from 120 human language
- debug mode in web browser console
- continuous recording voice
- count of maximal alternatives recognize result
### Client
You can implement :
- query selectors corresponding to elements on the page
- phrases by which will be unique on what functionality goes and which element are set
- listener can be implemented or not
  - if is set, execute first
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
-   [--------------------  Voice Control Library (VCL)  --------------------][2]
    -   [Parameters][3]
    -   [execute][4]
-   [SpeechApi][5]
    -   [Parameters][6]
    -   [dictate][7]
    -   [result][8]
    -   [stop][9]
-   [W3CApi][10]
    -   [Parameters][11]
    -   [dictate][12]
    -   [result][13]
    -   [stop][14]
-   [ServiceObjects][15]
    -   [Parameters][16]
    -   [trie][17]
    -   [controlObjects][18]
    -   [divideControlObjects][19]
        -   [Parameters][20]
-   [Trie][21]
    -   [root][22]
    -   [insert][23]
        -   [Parameters][24]
    -   [search][25]
        -   [Parameters][26]
    -   [delete][27]
        -   [Parameters][28]
    -   [update][29]
        -   [Parameters][30]
    -   [getDataNode][31]
        -   [Parameters][32]
    -   [getPath][33]
        -   [Parameters][34]
-   [TrieNode][35]
    -   [Parameters][36]
    -   [parent][37]
    -   [children][38]
    -   [update][39]
        -   [Parameters][40]
    -   [unlink][41]
    -   [hasChildren][42]
    -   [deleteChild][43]
        -   [Parameters][44]
    -   [addChild][45]
        -   [Parameters][46]
    -   [hasChild][47]
        -   [Parameters][48]
-   [ControlObject][49]
    -   [Parameters][50]
-   [Runner][51]
    -   [run][52]
        -   [Parameters][53]
    -   [executeEvents][54]
        -   [Parameters][55]
    -   [executeListener][56]
        -   [Parameters][57]
-   [VCLEvent][58]
    -   [Parameters][59]
    -   [actions][60]
    -   [phrases][61]
    -   [element][62]
    -   [result][63]
    -   [listener][64]

## VCL

* * *

## --------------------  Voice Control Library (VCL)  --------------------

Web application interface in the form of a library for controlling web content via voice commands.
Only after a proper voice command from the end user, which must be sequential and distinct for its adequate recognition, can the library handle page content.
VCL uses W3C speech api for voice recognition to text form.

The VCL class is at the core of the entire library that handles execution controlling web content via voice commands.

### Parameters

-   `config` **[Object][65]** Can be object, JSON, or external file with object structure. Must contains global part configuration and also at least one querySelector with his properties.

### execute

Starts recording audio.
Asynchronous function

## SpeechApi

Facade that separates API functionality for speech recognition from control and others VCL services.
Provides the isolation of what a library user can and where they should not be accessed.

### Parameters

-   `config` **[Object][65]** SpeechApi configuration.

### dictate

Calls the configured function

### result

Returns **[Promise][66]** 

### stop

Calls the configured function

## W3CApi

W3C Speech API
It enables developers to use scripting to generate text-to-speech output
and to use speech recognition as an input for forms, continuous dictation and control.

### Parameters

-   `config` **([Object][65] | null)** W3C Speech API configuration

### dictate

Begin to listen to the audio.

### result

Asynchronous function that return transcript result in text form.

Returns **[Promise][66]&lt;[String][67]>** 

### stop

Stop listening to more audio.

## ServiceObjects

Services input configuration settings related to page elements and their properties.
Phrases are indexed to the associated selector using the Trie class

### Parameters

-   `config` **[Object][65]** 

### trie

Get Trie.

Returns **[Trie][68]** 

### controlObjects

Get map all control objects.

Returns **[Map][69]** 

### divideControlObjects

In Map on key position set querySelector from configuration and as his value set instance of ControlObject with his attributes.
Insert all phrases from the configuration into the trie that indexes to their querySelectors.

#### Parameters

-   `config` **[Object][65]** 

## Trie

Trie data structure.

### root

Get root node of the Trie

Returns **[TrieNode][70]** 

### insert

Insert word to the Trie and map data on the word.
If data is not provided it is automatically generated as an increasing number.

#### Parameters

-   `word` **[string][67]** 
-   `data` **[Object][65]?** 

### search

Searching Trie for data indexed by the provided word.
If the word is in the Trie a data object is returned.
If the word is not found in the Trie null is returned.

#### Parameters

-   `word` **[string][67]** 

Returns **([Object][65] | null)** 

### delete

Delete word from the Trie.
If the word is not in the Trie false is returned otherwise true.

#### Parameters

-   `word` **[string][67]** 

Returns **[boolean][71]** 

### update

#### Parameters

-   `word` **[string][67]** 
-   `data` **any** 

Returns **[boolean][71]** 

### getDataNode

#### Parameters

-   `word` **[string][67]** 

Returns **[TrieNode][70]** 

### getPath

#### Parameters

-   `word` **[string][67]** 

Returns **[Array][72]&lt;[TrieNode][70]>** 

## TrieNode

Node of a trie data structure.
The node can be root or any other node in Trie data structure.
The has access to its parent and all of its children.
If the node is index of the word inserted into the Trie it has flag isEndOfWorld set to true and word is set to the indexed word.
If the node is the end of a word it can contain some additional index data.

### Parameters

-   `parent` **[Object][65]** Parent config object (optional, default `{key:"",node:null}`)
-   `isRoot` **[boolean][71]?** Boolean flag of root node. If the node is root it is not check for parent (optional, default `false`)

### parent

Get parent object consisting of the child index and parent node.

Returns **{key: [string][67], node: [TrieNode][70]}** 

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

Returns **[boolean][71]** True if has any children, otherwise false.

### deleteChild

Delete child indexed by the provided character.
If the child does not exists nothing happens.
If the child does exists, the child node object is deleted.

#### Parameters

-   `char` **[string][67]** 

### addChild

Add a child to the node.
If a child already exists on the index it is overridden by the new child.

#### Parameters

-   `char` **[string][67]** 
-   `node` **[TrieNode][70]** 

Returns **([TrieNode][70] | null)** If a child is overridden the old child node is return, otherwise false.

### hasChild

Check is the node has a child indexed by the provided character.

#### Parameters

-   `char` **[string][67]** 

Returns **[boolean][71]** True if a child exists, otherwise false.

## ControlObject

Keeps data configured by user.
Find HTMLElement if exists on page.
Simplify phrases by putting all the letters in the lowercase and removes accent from them.

### Parameters

-   `querySelector` **[String][67]** 
-   `controlElementValue` **[Object][65]** 

## Runner

At first verify configured event can be execute.
Then execute all listener function and event functions configured by user.

### run

If listener exist, first execute listener and then all others events.

#### Parameters

-   `recognizeResult` **[String][67]** 
-   `controlObject` **[ControlObject][73]** 

### executeEvents

Execute all configured actions.
First check if action is function or boolean and then is execute only if return value from action function is true.

#### Parameters

-   `vclEvent` **[VCLEvent][74]** 

### executeListener

If listener is function, execute it.

#### Parameters

-   `vclEvent` **[VCLEvent][74]** 

## VCLEvent

All attributes user can access using and are apply only to their particular selector.
 VCLEvent class contains attributes like :
     listener - is function execute as first,
     element  - representing HTMLElement on the page,
     actions  - are events that configured by user,
     phrases  - thanks to which we can use speech to recognize what the library should do on which element,
     result   - string of recognize result from speech API.

### Parameters

-   `recognizeResult` **[String][67]** Recognize text result from speech API.
-   `controlObject` **[ControlObject][73]** Object contains configured properties for one HTMLElement.

### actions

Get array of event function.

Returns **[Array][72]&lt;[function][75]>** 

### phrases

Get array strings of all phrases set one querySelector

Returns **[Array][72]&lt;[string][67]>** 

### element

Get HTMLElement

Returns **[Element][76]** 

### result

Get string of recognize result from speech API.

Returns **[String][67]** 

### listener

Get listener function.

Returns **[function][75]** 

[1]: #vcl

[2]: #----------------------voice-control-library-vcl----------------------

[3]: #parameters

[4]: #execute

[5]: #speechapi

[6]: #parameters-1

[7]: #dictate

[8]: #result

[9]: #stop

[10]: #w3capi

[11]: #parameters-2

[12]: #dictate-1

[13]: #result-1

[14]: #stop-1

[15]: #serviceobjects

[16]: #parameters-3

[17]: #trie

[18]: #controlobjects

[19]: #dividecontrolobjects

[20]: #parameters-4

[21]: #trie-1

[22]: #root

[23]: #insert

[24]: #parameters-5

[25]: #search

[26]: #parameters-6

[27]: #delete

[28]: #parameters-7

[29]: #update

[30]: #parameters-8

[31]: #getdatanode

[32]: #parameters-9

[33]: #getpath

[34]: #parameters-10

[35]: #trienode

[36]: #parameters-11

[37]: #parent

[38]: #children

[39]: #update-1

[40]: #parameters-12

[41]: #unlink

[42]: #haschildren

[43]: #deletechild

[44]: #parameters-13

[45]: #addchild

[46]: #parameters-14

[47]: #haschild

[48]: #parameters-15

[49]: #controlobject

[50]: #parameters-16

[51]: #runner

[52]: #run

[53]: #parameters-17

[54]: #executeevents

[55]: #parameters-18

[56]: #executelistener

[57]: #parameters-19

[58]: #vclevent

[59]: #parameters-20

[60]: #actions

[61]: #phrases

[62]: #element

[63]: #result-2

[64]: #listener

[65]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object

[66]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise

[67]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String

[68]: #trie

[69]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map

[70]: #trienode

[71]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean

[72]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array

[73]: #controlobject

[74]: #vclevent

[75]: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/function

[76]: https://developer.mozilla.org/docs/Web/API/Element
