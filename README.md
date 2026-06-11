# Prosta Tablica Ogłoszeń / Blog

## 1. Krótki opis
Projekt "Prosta Tablica Ogłoszeń" to aplikacja webowa typu klient-serwer. Umożliwia użytkownikom przeglądanie publicznej listy ogłoszeń oraz, po zarejestrowaniu i zalogowaniu, dodawanie i usuwanie własnych wpisów. Aplikacja wykorzystuje nowoczesne wzorce projektowe, zapewnia bezpieczeństwo dzięki autoryzacji JWT opartej o bezpieczne ciasteczka (HttpOnly) oraz implementuje zasady HATEOAS dla nawigacji po API.

## 2. Użyte technologie
**Backend:**
- Java 17
- Spring Boot 3.2 (Web, Data JPA, Security, HATEOAS, Validation)
- Hibernate / Spring Data JPA
- PostgreSQL (baza danych)
- JSON Web Tokens (JJWT) do bezstanowej autoryzacji
- MapStruct (mapowanie Encji na DTO)
- Springdoc OpenAPI (generowanie dokumentacji Swagger)

**Frontend:**
- React (z wykorzystaniem Vite)
- TypeScript
- React Router DOM (routing po stronie klienta)
- Axios (komunikacja HTTP z obsługą `withCredentials`)
- Lucide React (ikony)
- Czysty CSS (zmienne CSS, Flexbox)

**Infrastruktura:**
- Docker i Docker Compose (konteneryzacja bazy danych)
- Maven (budowanie backendu)
- NPM (budowanie frontendu)

## 3. Instrukcja uruchomienia

### Krok 1: Uruchomienie bazy danych (Docker)
W głównym katalogu projektu `rsi-projekt/` otwórz terminal i wykonaj:
```bash
docker-compose up -d
```
Spowoduje to pobranie obrazu PostgreSQL i uruchomienie bazy danych na porcie 5432.

### Krok 2: Uruchomienie backendu
Przejdź do podkatalogu `backend/`:
```bash
cd backend
mvn spring-boot:run
```
Serwer Spring Boot uruchomi się pod adresem `http://localhost:8080`.

### Krok 3: Uruchomienie frontendu
Otwórz nowy terminal, przejdź do podkatalogu `frontend/`, zainstaluj zależności i uruchom serwer deweloperski:
```bash
cd frontend
npm install
npm run dev
```
Aplikacja kliencka zostanie uruchomiona pod adresem `http://localhost:5173`. Wejdź pod ten adres w przeglądarce, aby korzystać z aplikacji.

## 4. Przykładowe przesyłane komunikaty HTTP

### Przykładowy Request - Dodanie ogłoszenia (Wymaga zalogowania)
**Opis:** Żądanie utworzenia nowego ogłoszenia przez autoryzowanego użytkownika. Przeglądarka automatycznie dołącza ciasteczko `jwt` uzyskane podczas logowania.

```http
POST /api/notices HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Cookie: jwt=eyJhbGciOiJIUzI1NiJ9...

{
  "title": "Sprzedam Rower",
  "content": "Stan bardzo dobry, mało używany."
}
```

### Przykładowy Response - Odpowiedź po dodaniu ogłoszenia
**Opis:** Serwer zwraca status 200 OK wraz z nowo utworzonym obiektem oraz linkami HATEOAS, które pozwalają na dalszą nawigację (np. link do pobrania wszystkich ogłoszeń).

```http
HTTP/1.1 200 OK
Content-Type: application/hal+json

{
  "id": 15,
  "title": "Sprzedam Rower",
  "content": "Stan bardzo dobry, mało używany.",
  "authorUsername": "jan_kowalski",
  "createdAt": "2026-06-11T22:30:00.000",
  "_links": {
    "all-notices": {
      "href": "http://localhost:8080/api/notices?page=0&size=20"
    }
  }
}
```
