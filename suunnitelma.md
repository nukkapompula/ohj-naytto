# Opiskelijakirpputori
## Pähkinänkuoressa... 
Sovelluksessa käyttäjät kauppaavat tavaroitaan toisilleen. Tässä prototyypissä pystyy luomaan käyttäjätilejä sekä lisäämään tavaroita myyntiin. Sovelluksen käyttäminen vaatii kirjautumisen sisään luodulla käyttäjätilillä, johon on liitetty salasana. Aluksi kullakin käyttäjällä on X määrä rahaa jota kuluttaa tavaroiden ostamiseen. Tiedot tavaraliikenteestä sekä käyttäjistä tallennetaan ulkoiseen tietovarastoon. 
## Alustava työnjako
- Ilmo luo serveripuolen johon tallentuu käyttäjä- ja tavaratiedot sekä hoitaa kirjautumisen validoinnin
- Arto luo kirjautumis- ja tilinluomissivun
- Ville luo markettisivun
---
### *Muistiinpanoja ja muita huomioita toiminnallisuudesta*
Kirjautuessa käyttäjän nimi tallennetaan localStorageen avaimella "loggedIn".

Sisäänkirjautumisen jälkeen kaikilla selattavilla sivuilla on tieto kirjautuneen nimestä ja rahamäärästä. Käyttäjä näkee markettisivulla myytävästä tavarasta seuraavat tiedot:
- esineen nimi
- hinta
- myyjän nimi.

"Oma historia"-sivu näyttää käyttäjän ostamia tuotteita.

"Omat tuotteet"-sivu näyttää käyttäjän lisäämät myyntiin asetetut tuotteet.