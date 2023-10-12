# Ticket Project API Dokumentation

Diese Dokumentation bietet eine Übersicht über die Endpunkte, die in der Ticket Project API zur Verfügung stehen. Jeder Endpunkt hat eine kurze Beschreibung, die angibt, welche Aktion er ausführt, welche Anforderungen er stellt und ein Beispiel.

## Inhaltsverzeichnis

- [Allgemeine Information](#allgemeine-information)
- [Authentifizierung](#authentifizierung)
- [API Endpunkte](#api-endpunkte)
  - [Auth Endpunkte](#auth-endpunkte)
  - [User Endpunkte](#user-endpunkte)
  - [Attorney Endpunkte](#attorney-endpunkte)
  - [Ticket Endpunkte](#ticket-endpunkte)
  - [Offer Endpunkte](#offer-endpunkte)

## Allgemeine Information

Diese API wurde entwickelt, um...

Basis-URL für alle API-Anfragen: `http://<host-url>/api`

## Authentifizierung

### Schritte zur Authentifizierung:

1. **Benutzerregistrierung und Telefonnummer-Verifizierung:**
- Der Benutzer registriert sich über den Endpunkt POST /api/auth/register mit einer Telefonnummer und weiteren erforderlichen Informationen.
- Bereits registrierte Nutzen den Endpunkt POST /api/auth/sendOtp mit ihrer registierten Telefonnummer.
- Die API verwendet Twilio, um ein One-Time Password (OTP) an die Telefonnummer des Benutzers zu senden.
- Der Benutzer sendet dieses OTP zurück an die API über den Endpunkt POST /api/auth/verifyOtp, um seine Telefonnummer zu verifizieren.

2. **Token-Erzeugung und -Verwendung:**
- Nach erfolgreicher Verifizierung der Telefonnummer generiert die API einen JWT, der die Identität des Benutzers repräsentiert.
- Dieser Token enthält eingebettete Benutzerinformationen und ist für eine bestimmte Zeit gültig, die durch das Feld expiresIn definiert ist.
- Der Token wird an den Client gesendet, der ihn bei jeder nachfolgenden Anfrage an geschützte Endpunkte im Authorization Header verwenden muss.

3. **Verwendung des Tokens:**
- Bei Anfragen an Endpunkte, die Authentifizierung erfordern, muss der Client den Token im Authorization Header der Anfrage einfügen.
- Das Format des Headers sollte wie folgt sein: `Authorization: Bearer <TOKEN>`.


## API Endpunkte

### Auth Endpunkte

#### POST /api/auth/register

Beschreibung:
- Dieser Endpunkt registriert einen neuen Benutzer oder Anwalt. Wenn die angegebene Telefonnummer noch nicht registriert ist, erstellt dieser Endpunkt einen neuen Eintrag in der Datenbank und sendet ein OTP (One-Time Password) zur Verifizierung an die angegebene Nummer. 

##### Request

- **URL:** `/api/auth/register`
- **Methode:** `POST`
- **Body:**
  - `username`: String - Der Benutzername des neuen Benutzers oder Anwalts.
  - `phoneNumber`: String - Die Telefonnummer des Benutzers, an die das OTP gesendet werden soll.
  - `role`: String - Die Rolle des Kontos, das erstellt wird (entweder "user" oder "attorney").

##### Beispiel

```json
Anfrage:
POST /api/auth/register
{
  "username": "johndoe",
  "phoneNumber": "+1234567890",
  "role": "user"
}
```

#### POST /api/auth/sendOtp

Beschreibung:
- Kann zum Login genutzt werden. Sendet ein OTP an eine Telefonnummer. 

##### Request

- **URL:** `/api/auth/sendOtp`
- **Method:** `POST`
- **Body:**
  - `phoneNumber`: String - Die Telefonnummer des Benutzers, an die das OTP gesendet werden soll.

##### Beispiel

```json
Request:
POST /api/auth/sendOtp
{
  "phoneNumber": "+1234567890"
}
```

#### POST /api/auth/verifyOtp

Beschreibung:
- Dieser Endpunkt wird zur Überprüfung des vom Benutzer eingegebenen OTP (One-Time Password) verwendet. Wenn das OTP gültig ist, authentifiziert das System den Benutzer und gibt einen JWT (JSON Web Token) zurück.

##### Request

- **URL:** `/api/auth/verifyOtp`
- **Methode:** `POST`
- **Body:**
  - `phoneNumber`: String - Die Telefonnummer des Benutzers, die zur Überprüfung des OTP verwendet wird.
  - `code`: String - Das vom Benutzer erhaltene OTP.

##### Beispiel

```json
Anfrage:
POST /api/auth/verifyOtp
{
  "phoneNumber": "+1234567890",
  "code": "123456"
}
```

### User Endpunkte

... [Endpunkte hier dokumentieren]

### Attorney Endpunkte

... [Endpunkte hier dokumentieren]

### Ticket Endpunkte

... [Endpunkte hier dokumentieren]

### Offer Endpunkte

... [Endpunkte hier dokumentieren]

---

