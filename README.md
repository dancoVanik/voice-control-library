# Voice Control Library

## Funkcionality
- ovládať ľubovolný element hlasovým príkazom
  - príkaz musí byť dopredu jasny
  - spustiť event na danom elemente
    - event sa spustí jedine ak object je true (hodnota, návrat funkcie)
  - spustiť funkciu, ktorá manipuluje s elementom
- spätná väzba
  - v prípade erroru
  - vlastné eventy
- poskytnúť API na konfiguráciu
  - pri štarte
  - dynamicky za behu (API funkcie)
- defaultné správanie pri rozpoznaní ale neexistuje mapovanie

```JS
const voice = new VoiceControl({
    "<querySelector>": {
      phrases: [],
      listener: event => {
        event.element.innerHtml = event.result;
      },
      actions: {
        click: true,
        mouseover: event => {
          if(event.element.innerHtml == "prd")
            return false;
          return true;
        }
      }
    }
  })
```

`$("p").on("click", event => console.log("click event"));`

## Workflow
example: "Choď domov a otvor prvý link"
example EN: "Go home and open the first link"

Recognition -> Intent -> Actions -> Result

Intent Recognition
String parsing
!! Zložité !!
Natural Language processing nejdeme robiť

## Architektúra
- main classu
- event
- registre
  - index element -> atributy
  - index fráz -> elementy
    - prefix tree
- interface na SpeechAPI

