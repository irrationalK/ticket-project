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

Request:

- **URL:** `/api/auth/register`
- **Methode:** `POST`
- **Body:**
  - `username`: String - Der Benutzername des neuen Benutzers oder Anwalts.
  - `phoneNumber`: String - Die Telefonnummer des Benutzers, an die das OTP gesendet werden soll.
  - `role`: String - Die Rolle des Kontos, das erstellt wird (entweder "user" oder "attorney").

Beispiel:

```json
{
  "username": "johndoe",
  "phoneNumber": "+1234567890",
  "role": "user"
}
```

#### POST /api/auth/sendOtp

Beschreibung:
- Kann zum Login genutzt werden. Sendet ein OTP an eine Telefonnummer. 

Request:

- **URL:** `/api/auth/sendOtp`
- **Method:** `POST`
- **Body:**
  - `phoneNumber`: String - Die Telefonnummer des Benutzers, an die das OTP gesendet werden soll.

Beispiel:

```json
{
  "phoneNumber": "+1234567890"
}
```

#### POST /api/auth/verifyOtp

Beschreibung:
- Dieser Endpunkt wird zur Überprüfung des vom Benutzer eingegebenen OTP (One-Time Password) verwendet. Wenn das OTP gültig ist, authentifiziert das System den Benutzer und gibt einen JWT (JSON Web Token) zurück.

Request:

- **URL:** `/api/auth/verifyOtp`
- **Methode:** `POST`
- **Body:**
  - `phoneNumber`: String - Die Telefonnummer des Benutzers, die zur Überprüfung des OTP verwendet wird.
  - `code`: String - Das vom Benutzer erhaltene OTP.

Beispiel:

```json
{
  "phoneNumber": "+1234567890",
  "code": "123456"
}
```

### User Endpunkte

#### GET /api/users/me

Beschreibung:
- Dieser Endpunkt ruft die Informationen des aktuell authentifizierten Benutzers ab.

Request:

- **URL:** `/api/users/me`
- **Methode:** `GET`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein. Es hat nur der Nutzer selber Zugriff.

### PUT /api/users/me

Beschreibung:
- Dieser Endpunkt ermöglicht es dem aktuell authentifizierten Benutzer, seine Informationen zu aktualisieren.

Request:

- **URL:** `/api/users/me`
- **Methode:** `PUT`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein. Es hat nur der Nutzer selber Zugriff.
- **Body:** (Alle Felder sind optional, aber es muss mindestens eines angegeben werden)
  - `username`: String - Der neue Benutzername des Benutzers.
  - `phoneNumber`: String - Die neue Telefonnummer des Benutzers.

Beispiel:

```json
{
  "username": "neuerBenutzername",
  "phoneNumber": "+49123456789"
}
```

### DELETE /api/users/me

Beschreibung:
- Dieser Endpunkt ermöglicht es dem aktuell authentifizierten Benutzer, sein Konto zu löschen. (Bisher nur möglich, wenn keine Tickets vorhanden sind, wegen Fremdkey)

Request:

- **URL:** `/api/users/me`
- **Methode:** `DELETE`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein. Es hat nur der Nutzer selber Zugriff.


### Attorney Endpunkte

#### GET /api/attorneys/me

Beschreibung:
- Dieser Endpunkt ruft die Informationen des aktuell authentifizierten Anwalts ab.

Request:

- **URL:** `/api/attorneys/me`
- **Methode:** `GET`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein. Es hat nur der Nutzer selber Zugriff.

### PUT /api/attorneys/me

Beschreibung:
- Dieser Endpunkt ermöglicht es dem aktuell authentifizierten Benutzer, seine Informationen zu aktualisieren.

Request:

- **URL:** `/api/attorneys/me`
- **Methode:** `PUT`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein. Es hat nur der Nutzer selber Zugriff.
- **Body:** (Alle Felder sind optional, aber es muss mindestens eines angegeben werden)
  - `username`: String - Der neue Benutzername des Benutzers.
  - `phoneNumber`: String - Die neue Telefonnummer des Benutzers.

Beispiel:

```json
{
  "username": "neuerBenutzername",
  "phoneNumber": "+49123456789"
}
```

### DELETE /api/attorneys/me

Beschreibung:
- Dieser Endpunkt ermöglicht es dem aktuell authentifizierten Anwalt, sein Konto zu löschen. (Bisher nur möglich, wenn keine Offers vorhanden sind, wegen Fremdkey)

Request:

- **URL:** `/api/attorneys/me`
- **Methode:** `DELETE`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein. Es hat nur der Nutzer selber Zugriff.


### Ticket Endpunkte

### POST /api/tickets/

Beschreibung:
- Dieser Endpunkt wird verwendet, um ein neues Ticket zu erstellen. Der Benutzer muss authentifiziert sein und die Rolle "user" haben. Es werden auch Bilder unterstützt, die zusammen mit den Ticketdaten hochgeladen werden können.

Request:

- **URL:** `/api/tickets/`
- **Methode:** `POST`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein und die Rolle "user" haben.
- **FormData-Parameter:**
  - `offense`: String - Die Beschreibung des Verstoßes.
  - `notePicture`: File (optional) - Bild der Notiz, falls vorhanden.
  - `ticketPicture`: File (optional) - Bild des Tickets, falls vorhanden.

Beispiel:

```FormData:
offense: "parking"
notePicture: (File)
ticketPicture: (File)
```

### GET /api/tickets/open

Beschreibung:
- Dieser Endpunkt dient zum Abrufen aller offenen Tickets. Nur Benutzer mit der Rolle "attorney" (Anwalt) haben Zugriff. Der Benutzer muss authentifiziert sein.

Request:

- **URL:** `/api/tickets/open`
- **Methode:** `GET`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein und die Rolle "attorney" haben.

### GET /api/tickets/user

Beschreibung:
- Dieser Endpunkt ermöglicht es, alle Tickets des authentifizierten Benutzers abzurufen. Der Zugriff ist auf den authentifizierten Benutzer beschränkt, der die Tickets erstellt hat.

Request:

- **URL:** `/api/tickets/user`
- **Methode:** `GET`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein.

### PUT /api/tickets/:ticketID

Beschreibung:
- Dieser Endpunkt ermöglicht es dem Ersteller, ein bestimmtes Ticket zu aktualisieren. Es können neue Informationen zur Ordnungswidrigkeit und/oder neue Bilder hinzugefügt werden. Wenn neue Bilder hochgeladen werden, werden die alten Bilder aus dem Speicher gelöscht.

Request:

- **URL:** `/api/tickets/:ticketID`
- **Methode:** `PUT`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein und die Berechtigung 'ticketOwner' haben.
- **URL-Parameter:** 
  - `ticketID`: String - Die ID des zu aktualisierenden Tickets.
- **Body:** (multipart/form-data)
  - `offense`: String - Die Beschreibung der Ordnungswidrigkeit (optional).
  - `notePicture`: File - Das Bild der Notiz (optional).
  - `ticketPicture`: File - Das Bild des Tickets (optional).

Beispiel:
```Form-Data:
offense: "speeding"
notePicture: (File)
ticketPicture: (File)
```

### PUT /api/tickets/:ticketID/status

Beschreibung:
- Dieser Endpunkt ermöglicht es dem Ersteller, den Status eines bestimmten Tickets zu aktualisieren.

Request:

- **URL:** `/api/tickets/:ticketID/status`
- **Methode:** `PUT`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein und die Berechtigung 'ticketOwner' haben.
- **URL-Parameter:** 
  - `ticketID`: String - Die ID des Tickets, dessen Status aktualisiert werden soll.
- **Body:** (application/json)
  - `status`: String - Der neue Status des Tickets (erforderlich).

Beispiel:
```json:
{
"status": "closed"
}
```

### DELETE /api/tickets/:ticketID

Beschreibung:
- Dieser Endpunkt ermöglicht es dem Ersteller, ein bestimmtes Ticket zu löschen. Bei Erfolg werden auch alle zugehörigen Bilder aus dem S3-Speicher gelöscht.

Request:

- **URL:** `/api/tickets/:ticketID`
- **Methode:** `DELETE`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein und die Berechtigung 'ticketOwner' haben.
- **URL-Parameter:** 
  - `ticketID`: String - Die ID des Tickets, das gelöscht werden soll.

### GET /api/tickets/:ticketID

Beschreibung:
- Dieser Endpunkt ermöglicht es dem Ersteller des Tickets und allen Anwälten, Details eines bestimmten Tickets abzurufen.

Request:

- **URL:** `/api/tickets/:ticketID`
- **Methode:** `GET`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein und die Berechtigung 'attorney' oder 'ticketOwner' haben.
- **URL-Parameter:** 
  - `ticketID`: String - Die ID des Tickets, das abgerufen werden soll.

### GET /api/tickets/:ticketID/images

Beschreibung:
- Dieser Endpunkt ermöglicht es dem Ersteller des Tickets und allen Anwälten, die URLs der Bilder eines bestimmten Tickets abzurufen.

Request:

- **URL:** `/api/tickets/:ticketID/images`
- **Methode:** `GET`
- **Authentifizierung:** Erforderlich - Benutzer muss authentifiziert sein und die Berechtigung 'attorney' oder 'ticketOwner' haben.
- **URL-Parameter:** 
  - `ticketID`: String - Die ID des Tickets, dessen Bild-URLs abgerufen werden sollen.


### Offer Endpunkte

... [Endpunkte hier dokumentieren]

---

