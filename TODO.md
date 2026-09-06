# Requirements
1. Opprett et nytt anlegg med detaljer som:
   - Navn på anlegget
   - Fiskearter på anlegget (liste)
   - Oppdrettsorganisasjoner på anlegget (liste)
   - Plassering av anlegget (sjø eller land)
   - Dato for opprettelse av anlegget (Skal ikke være mulig å registrere frem i tid)
2. Hent en liste over alle anlegg
   - Videre utvidelse hvis tid
     - alle anlegg for en oppdrettsorganisasjon 
     - alle anlegg for fiskeart 
     - alle anlegg plassert i sjø 
     - alle anlegg på et gitt tidspunkt
3. Oppdater detaljene for et eksisterende anlegg.
4. Slett et anlegg fra registeret.

# Ideas
- Websocket, simultaneous caseworkers
- Spring Security Roles
- Tests
- Nynorsk språkstøtte
- Pagination hvis veldig mange anlegg
- React 19: use/useActionState https://dev.to/rakhee/can-react-v19-replace-react-querytanstack-5gmh
- Verktøy-fane for å kunne legge til forhåndsdefinerte anlegg og fisketyper
- Refactor EditOrganizations and EditFishes