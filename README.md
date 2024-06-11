# Spring-project-2024

Testuotojams - kaip paleisti serverį per pgadmin 
windows versija -  https://www.pgadmin.org/download/pgadmin-4-windows/
macOS versija - https://www.pgadmin.org/download/pgadmin-4-macos/

1. Įsirašius pgadmin, bus skiltis kur reikės nurodyti port numerį ir slaptažodį: port numeris: 5432, pasw: 1234

2. Spaudžiame add server, general skiltyje įrašome ProjectManagement, Connection skiltyje įrašome kur Host name/address - localhost, port turi būti 5432, maintenance db - postgres, username - postgres (tikriausiai bus įrašyta), password - 1234, spaudžiame save, turi pasikurti serveris 

3. Nueiname į servers (išplečiame, rodyklė žemyn), Turi atrodyti Servers -> ProjectManagement, išplečiame ProjectManagemente
4. Po ProjectManagement atsiranda skiltis Databases, Databases spaudžiame dešinį pelės klavišą ir create -> database

5. Atsiras General skiltyje Database pavadinimas, kuris turi sutapti su pavadinimu ProjectManagementDbUsers

6. Išplečiame ProjectManagementDbUsers, atsiranda skiltis Schemas, išplečiame Schemas -> public -> Tables

7. Spaudžiame dešinį pelės ant Tables ir pasirenkame paskutinį įrankį - Query Tool

8. Atsiradus query tool naujam langui, įkopijuojame kodą iš šiame projekte egzistuojančio kodo server/db/DatabaseDesign.sql, ir run script, jeigu successfull , lange rodys kad pavyko

9. Klonuojame Spring-project-2024, atsidarome terminalą GitHub\Spring-project-2024> turi atrodyti taip, rašome - npm install, rašome cd.\server\ , spaudžiame enter, ir vėl rašome npm install,
taip įrašys visus modules, kitaip nepasileis nei front nei back dalys

10. Jeigu sėkmingai prisijunges prie duomenų bazės, rodys Database Connected Successfully 

