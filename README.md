# Voorraadbeheer Applicatie voor Dierenwinkel

## Inhoudsopgave
- [Overzicht](#overzicht)
- [Vereisten](#vereisten)
- [Installatie](#installatie)
  - [Backend Opzetten](#backend-opzetten)
  - [Frontend Opzetten](#frontend-opzetten)
- [Best Practices](#best-practices)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Feedback en Testing](#feedback-en-testing)

## Overzicht
Deze applicatie is ontworpen om de voorraad van verschillende diersoorten in een dierenwinkel te beheren. Het biedt functionaliteiten om dieren toe te voegen aan de voorraad en statistische gegevens weer te geven in de vorm van grafieken.

## Vereisten
- .NET Core SDK
- Node.js en npm
- Angular CLI
- SQL Server of een andere compatibele database

## Installatie

### Backend Opzetten
1. **Kloon de repository:**
   ```bash
   git clone https://github.com/adelalrafiq/PetStoreInventory.git
   cd path/to/repository
2. **Navigeer naar de backend-map:**
   ```bash
    cd Backend
3. **Installeer de benodigde packages:**
   ```bash
    dotnet restore
4. **Configureer de database-verbinding:**
   - Open appsettings.json en zorg ervoor dat de verbindingstring correct is ingesteld voor jouw SQL Server-instantie.
