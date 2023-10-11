# Opiskelijakirpputori
## Pähkinänkuoressa... 
Sovelluksessa käyttäjät kauppaavat tavaroitaan toisilleen. Tässä prototyypissä pystyy luomaan käyttäjätilejä sekä lisäämään tavaroita myyntiin. Sovelluksen käyttäminen vaatii kirjautumisen sisään luodulla käyttäjätilillä, johon on liitetty salasana. Aluksi kullakin käyttäjällä on X määrä rahaa jota kuluttaa tavaroiden ostamiseen. Tiedot tavaraliikenteestä sekä käyttäjistä tallennetaan ulkoiseen tietovarastoon. 
## Alustava työnjako
- Ilmo luo serveripuolen johon tallentuu käyttäjä- ja tavaratiedot sekä hoitaa kirjautumisen validoinnin
- Arto luo kirjautumis- ja tilinluomissivun sekä huolehtii CSS-tyyleistä
- Ville luo markettisivun
---
### *Muistiinpanoja ja muita huomioita toiminnallisuudesta*
Kirjauduttuaan sisään käyttäjä näkee myytävästä tavarasta seuraavat tiedot:
- esineen nimi
- hinta
- myyjän nimi.

Sisäänkirjautuneen ID on saatava talteen, jotta mm. kirjautuneen nimi näkyy markettisivuilla sekä tuotetta lisättäessä myyjä voidaan lisätä kohteeseen. Lisäksi "Omat tuotteet"-sivu näyttää tällöin vain kirjautuneen käyttäjän ostamat/lisäämät tavarat.

Mitä tietoa "Oma historia"-sivulla esitellään?