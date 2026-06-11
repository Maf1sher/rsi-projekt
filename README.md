# Prosta Tablica Ogłoszeń / Blog

## Opis projektu
Projekt "Prosta Tablica Ogłoszeń" to aplikacja webowa umożliwiająca użytkownikom przeglądanie, dodawanie oraz usuwanie ogłoszeń. Aplikacja wspiera autoryzację opartą na tokenach JWT przechowywanych w bezpiecznych ciasteczkach (HttpOnly).

## Główne funkcjonalności
- **Rejestracja i logowanie:** Prosty system kont użytkowników.
- **Przeglądanie ogłoszeń:** Publiczna lista ogłoszeń z paginacją.
- **Zarządzanie ogłoszeniami:** Możliwość dodawania ogłoszeń przez zalogowanych użytkowników oraz usuwania własnych wpisów.
- **Bezpieczeństwo:** Wykorzystanie filtrów Spring Security oraz JWT.
- **HATEOAS:** Odpowiedzi API zawierają linki nawigacyjne.

## Użyte technologie
- **Backend:** Java 17, Spring Boot 3.2, Spring Security, Spring Data JPA, Hibernate, JWT (jjwt), HATEOAS, OpenAPI/Swagger.
- **Frontend:** React, TypeScript, Axios, Lucide React.
- **Baza danych:** PostgreSQL (Docker).

## Instrukcja uruchomienia

### 1. Baza danych
W głównym katalogu projektu `rsi-projekt/` wykonaj komendę:
```bash
docker-compose up -d
```
Uruchomi to kontener z bazą danych PostgreSQL na porcie 5432.

### 2. Backend
Przejdź do folderu `backend/` i uruchom aplikację za pomocą Maven:
```bash
mvn spring-boot:run
```
Aplikacja będzie dostępna pod adresem `http://localhost:8080`.
Dokumentacja Swagger UI dostępna pod: `http://localhost:8080/swagger-ui.html`

### 3. Frontend
Przejdź do folderu `frontend/`, zainstaluj zależności i uruchom serwer deweloperski:
```bash
npm install
npm run dev
```
Aplikacja będzie dostępna pod adresem `http://localhost:5173`.

## Przykładowe komunikaty HTTP

### Pobieranie ogłoszeń (GET /api/notices)
**Request:**
```http
GET /api/notices?page=0&size=5&sort=createdAt,desc HTTP/1.1
Host: localhost:8080
```

**Response (200 OK):**
```json
{
  "_embedded": {
    "notices": [
      {
        "id": 1,
        "title": "Przykładowe ogłoszenie",
        "content": "Treść ogłoszenia...",
        "authorUsername": "admin",
        "createdAt": "2026-06-11T21:50:00",
        "_links": {
          "self": { "href": "http://localhost:8080/api/notices?page=0&size=5" }
        }
      }
    ]
  },
  "_links": {
    "self": { "href": "http://localhost:8080/api/notices?page=0&size=5" }
  },
  "page": {
    "size": 5,
    "totalElements": 1,
    "totalPages": 1,
    "number": 0
  }
}
```

### Logowanie (POST /api/auth/login)
**Request:**
```http
POST /api/auth/login HTTP/1.1
Content-Type: application/json

{
  "username": "user1",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "username": "user1"
}
```
*Dodatkowo serwer ustawia nagłówek `Set-Cookie: jwt=...; HttpOnly; Path=/`*

## Dokumentacja API
Projekt wykorzystuje OpenAPI 3. Pełna specyfikacja w formacie JSON dostępna jest pod adresem: `http://localhost:8080/v3/api-docs`.
 Wizualna dokumentacja znajduje się pod `http://localhost:8080/swagger-ui.html`.
