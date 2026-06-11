# Tablica Ogłoszeń

## 1. Opis
Aplikacja webowa typu klient-serwer. Funkcjonalności: przeglądanie publicznej listy ogłoszeń, rejestracja, logowanie oraz dodawanie i usuwanie własnych ogłoszeń po uwierzytelnieniu.

## 2. Technologie
**Backend:**
- Java 17
- Spring Boot 3.2 (Web, Data JPA, Security, HATEOAS, Validation)
- Hibernate
- PostgreSQL

**Frontend:**
- React
- TypeScript

**Infrastruktura:**
- Docker

## 3. Uruchomienie projektu

### Baza danych
Z poziomu katalogu `rsi-projekt/` należy uruchomić kontener bazy danych:
```bash
docker-compose up -d
```

### Backend
Z poziomu katalogu `backend/` należy zbudować i uruchomić aplikację serwerową:
```bash
cd backend
mvn spring-boot:run
```
Serwer uruchamia się pod adresem: `http://localhost:8080`.

### Frontend
Z poziomu katalogu `frontend/` należy zainstalować zależności i uruchomić serwer deweloperski:
```bash
cd frontend
npm install
npm run dev
```
Aplikacja jest dostępna pod adresem: `http://localhost:5173`.

## 4. Przykładowe komunikaty HTTP

### Request: Dodanie ogłoszenia
Wymagane uwierzytelnienie za pomocą ciasteczka JWT.

```http
POST /api/notices HTTP/1.1
Host: localhost:8080
Content-Type: application/json
Cookie: jwt=eyJhbGciOiJIUzI1NiJ9...

{
  "title": "Tytuł ogłoszenia",
  "content": "Treść ogłoszenia."
}
```

### Response: Dodanie ogłoszenia
Zwracany kod 200 OK. Odpowiedź zawiera obiekt ogłoszenia oraz linki HATEOAS.

```http
HTTP/1.1 200 OK
Content-Type: application/hal+json

{
  "id": 1,
  "title": "Tytuł ogłoszenia",
  "content": "Treść ogłoszenia.",
  "authorUsername": "uzytkownik",
  "createdAt": "2026-06-11T22:30:00.000",
  "_links": {
    "all-notices": {
      "href": "http://localhost:8080/api/notices?page=0&size=20"
    }
  }
}
```
